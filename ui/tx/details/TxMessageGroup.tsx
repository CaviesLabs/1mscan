import { Code, Flex, Switch, Text, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { isSeiAddress } from "lib/getOSType"
import { isJSON } from "lib/json"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { NativeMessage } from "types/api/transaction"
import Collapse from "ui/shared/Collapse"
import ExpandedText from "ui/shared/ExpandedText"
import IconSvg from "ui/shared/IconSvg"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import TxMessageEvent from "../TxMessageEvent"

type Props = {
  message: NativeMessage
  isLoading: boolean
}

const TxMessageGroup = ({ isLoading, message }: Props) => {
  return (
    <DetailsInfoGroup
      backgroundColor="neutral.light.1"
      hasCollapsed
      headerProps={{
        color: "neutral.light.7",
        whiteSpace: "pre-line",
        wordBreak: "break-all",
        alignItems: "flex-start",
        as: "h3",
      }}
      header={{
        hasArrow: true,
        icon: (
          <IconSvg
            name="setting"
            boxSize={6}
            mt="0.15rem"
            color="neutral.light.5"
          />
        ),
        element: (
          <span>{`${getLanguage(
            "transaction_details_page.native_cosmos_details.details_tab_content.message",
          )}: ${message.content["@type"].split(".").pop()}`}</span>
        ),
      }}
    >
      <InfoItem
        displayPadding="none"
        isLoading={isLoading}
        title={getLanguage(
          "transaction_details_page.native_cosmos_details.details_tab_content.type",
        )}
        displayDivider="block"
        hasSkeleton
      >
        <Text
          whiteSpace="pre-line"
          wordBreak="break-all"
          color="neutral.light.7"
          textStyle="1"
          as="span"
        >
          {message.content["@type"]}
        </Text>
      </InfoItem>

      <InfoItem
        displayPadding="none"
        displayDivider="block"
        isLoading={isLoading}
        title={getLanguage(
          "transaction_details_page.native_cosmos_details.details_tab_content.sender",
        )}
      >
        <AddressEntityV2
          color="accent.blue"
          textStyle="1"
          lineHeight="1.5rem"
          fontSize="1rem"
          noIcon
          truncation="tail"
          isLoading={isLoading}
          address={{ hash: message.sender }}
        />
      </InfoItem>

      {...Object.entries(message.content)
        .filter(([key]) => !["@type", "sender"].includes(key))
        .map(([key, value], index) => {
          const isSei = isSeiAddress(value)
          const isCode = isJSON(value)

          return (
            <InfoItem
              key={generateKey(index, isLoading, key)}
              displayPadding="none"
              isLoading={isLoading}
              title={key}
              displayDivider="block"
              hasSkeleton
            >
              {isCode ? (
                <Code
                  variant="outline"
                  wordBreak="break-all"
                  whiteSpace="pre-wrap"
                  color="neutral.light.7"
                  textStyle="1"
                  maxHeight="300px"
                  overflowY="auto"
                  width="full"
                >
                  {JSON.stringify(JSON.parse(value as any), null, 2)}
                </Code>
              ) : typeof value === "object" ? (
                <Code
                  variant="outline"
                  wordBreak="break-all"
                  whiteSpace="pre-wrap"
                  color="neutral.light.7"
                  textStyle="1"
                  overflowY="auto"
                  width="full"
                >
                  {JSON.stringify(value, null, 2)}
                </Code>
              ) : isSei ? (
                <AddressEntityV2
                  color="accent.blue"
                  textStyle="1"
                  noIcon
                  truncation="tail"
                  address={{ hash: value }}
                  isValidator={key === "validator"}
                >
                  {value}
                </AddressEntityV2>
              ) : (
                (() => {
                  const formattedValue =
                    typeof value === "string" ? value : JSON.stringify(value)

                  return key === "wasm_byte_code" ? (
                    <ExpandedText>{formattedValue}</ExpandedText>
                  ) : (
                    <Text
                      whiteSpace="pre-line"
                      wordBreak="break-all"
                      color="neutral.light.7"
                      textStyle="1"
                      as="span"
                    >
                      {formattedValue}
                    </Text>
                  )
                })()
              )}
            </InfoItem>
          )
        })}

      <InfoItem
        displayPadding="none"
        isLoading={isLoading}
        title={getLanguage(
          "transaction_details_page.native_cosmos_details.details_tab_content.event_logs",
        )}
        displayDivider="block"
        titleProps={{
          alignSelf: "flex-start",
        }}
      >
        <Collapse
          groupProps={{ width: "full", overflow: "visible" }}
          header={({ onToggle, isExpanded }) => (
            <Flex alignItems="center" gap={2} cursor="pointer">
              <Switch
                colorScheme="blue"
                size="sm"
                onChange={onToggle}
                isChecked={isExpanded}
              ></Switch>
              <chakra.span color="neutral.light.7" textStyle="1">
                {getLanguage(
                  "transaction_details_page.native_cosmos_details.details_tab_content.show_all_events",
                )}
              </chakra.span>
            </Flex>
          )}
        >
          <TxMessageEvent events={message.events}></TxMessageEvent>
        </Collapse>
      </InfoItem>
    </DetailsInfoGroup>
  )
}

export default memo(TxMessageGroup, (prev, next) => {
  return prev.message === next.message && prev.isLoading === next.isLoading
})
