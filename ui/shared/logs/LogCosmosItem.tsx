import { Code, Flex, Text } from "@chakra-ui/react"
import { isJSON } from "lib/json"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { NativeEvent } from "types/api/transaction"
import Tag from "../chakra/Tag"
import DetailsInfoGroup from "../group/DetailsInfoGroup"
import InfoItem from "../group/InfoItem"
import SkeletonText from "../text/SkeletonText"

type Props = {
  event: NativeEvent
  index: number
  isLoading: boolean
  hasCollapsed?: boolean
}

const LogCosmosItem = ({
  event,
  index,
  isLoading,
  hasCollapsed = true,
}: Props) => {
  return (
    <DetailsInfoGroup
      backgroundColor="neutral.light.1"
      hasCollapsed={hasCollapsed}
      header={{
        hasArrow: true,
        element: (
          <Flex alignItems="flex-start" gap="0.625rem">
            <Tag variant="solid" colorScheme="purple" isLoading={isLoading}>
              {String(index)}
            </Tag>

            <SkeletonText
              color="neutral.light.8"
              textStyle="1"
              isLoading={isLoading}
            >
              {event.type}
            </SkeletonText>
          </Flex>
        ),
      }}
    >
      {event.attributes.map((attribute, index) => {
        const value = attribute.value
        const isCode = isJSON(value)
        return (
          <InfoItem
            key={generateKey(
              index,
              isLoading,
              attribute.key,
              attribute.tx_id,
              attribute.index,
              attribute.event_id,
            )}
            displayPadding="none"
            titleProps={{ textStyle: "1", color: "neutral.light.7", py: 0 }}
            title={attribute.key}
            displayDivider="block"
            dividerProps={{
              insetX: 0,
            }}
            isLoading={isLoading}
            hasSkeleton
          >
            {isCode ? (
              <Code
                variant="outline"
                wordBreak="break-all"
                whiteSpace="pre-wrap"
                color="neutral.light.6"
                textStyle="1"
                width="full"
                overflowY="auto"
              >
                {JSON.stringify(JSON.parse(value as any), null, 2)}
              </Code>
            ) : typeof value === "object" ? (
              <Code
                variant="outline"
                wordBreak="break-all"
                whiteSpace="pre-wrap"
                color="neutral.light.6"
                textStyle="1"
                overflowY="auto"
              >
                {JSON.stringify(value, null, 2)}
              </Code>
            ) : (
              <Text
                whiteSpace="pre-line"
                wordBreak="break-all"
                color="neutral.light.6"
                textStyle="1"
                as="span"
              >
                {typeof value === "string" ? value : JSON.stringify(value)}
              </Text>
            )}
          </InfoItem>
        )
      })}
    </DetailsInfoGroup>
  )
}

export default memo(LogCosmosItem, (prev, next) => {
  return (
    prev.event === next.event &&
    prev.isLoading === next.isLoading &&
    prev.hasCollapsed === next.hasCollapsed &&
    prev.index === next.index
  )
})
