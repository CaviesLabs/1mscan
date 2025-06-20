import {
  Alert,
  Box,
  Center,
  Code,
  GridItem,
  Skeleton,
  Stack,
  chakra,
} from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { Log } from "types/api/log"
import ContractVerificationButton from "ui/address/contract/ContractVerificationButton"
import LogDecodedInputData from "ui/shared/logs/LogDecodedInputData"
import LogTopic from "ui/shared/logs/LogTopic"
import AddressEntityV2 from "../entities/address/AddressEntityV2"
import DetailsInfoGroup from "../group/DetailsInfoGroup"
import InfoItem from "../group/InfoItem"
import TooltipV2 from "../tootltip/TooltipV2"

type Props = {
  item: Log
  type: "address" | "transaction"
  isLoading?: boolean
  hasCollapse?: boolean
}

const LogItem = ({ type, item, isLoading, hasCollapse = false }: Props) => {
  const address = item.address
  const index = item.index
  const topics = item.topics
  const data = item.data
  const decoded = item.decoded

  return (
    <DetailsInfoGroup
      displayEmpty="none"
      width="full"
      overflow="hidden"
      hasCollapsed={hasCollapse}
      header={{
        isAvailabe: true,
        element: (
          <Skeleton
            isLoaded={!isLoading}
            borderRadius="base"
            alignItems="center"
            gap={2}
            display="flex"
          >
            <TooltipV2 label="Log index">
              <Center
                minWidth={8}
                cursor="pointer"
                height={6}
                backgroundColor="secondary.03.text"
                color="secondary.03.bg"
                textStyle="875"
                paddingX={2}
                borderRadius="0.25rem"
              >
                {index}
              </Center>
            </TooltipV2>
          </Skeleton>
        ),
      }}
      contentProps={{ overflow: "hidden", width: "full", paddingTop: 4 }}
    >
      <InfoItem
        displayPadding="none"
        displayDivider="block"
        dividerProps={{
          insetX: 0,
        }}
        title={getLanguage("address.address")}
        isLoading={isLoading}
        padding={0}
      >
        <AddressEntityV2
          address={address}
          isLoading={isLoading}
          truncation="tail"
          textStyle="1"
          mr={{ base: 9, lg: 4 }}
        />
      </InfoItem>
      {Boolean(decoded) && (
        <InfoItem
          padding={0}
          isLoading={isLoading}
          displayPadding="none"
          displayDivider="block"
          dividerProps={{
            insetX: 0,
          }}
          title={decoded ? getLanguage("address.decode_input_data") : ""}
        >
          <LogDecodedInputData data={decoded!} isLoading={isLoading} />
        </InfoItem>
      )}
      <InfoItem
        padding={0}
        isLoading={isLoading}
        displayPadding="none"
        displayDivider="block"
        dividerProps={{
          insetX: 0,
        }}
        title={getLanguage("address.topic")}
        rowGap={2}
      >
        <Stack gap={0} maxWidth="100%">
          {topics.filter(Boolean).map((item, index) => (
            <Box _notLast={{ pb: "10px" }}>
              <LogTopic
                key={index}
                hex={item!}
                index={index}
                isLoading={isLoading}
              />
            </Box>
          ))}
        </Stack>
      </InfoItem>
      <InfoItem
        padding={0}
        isLoading={isLoading}
        displayPadding="none"
        displayDivider="block"
        dividerProps={{
          insetX: 0,
        }}
        title="Data"
        w="full"
        // overflowX="scroll"
        width="full"
        hasSkeleton
      >
        <Code
          variant="outline"
          paddingX={4}
          paddingY={3}
          borderRadius="0.5rem"
          borderColor="neutral.light.3"
          borderWidth="1px"
          whiteSpace="pre-wrap"
          backgroundColor="neutral.light.2"
          width="full"
          wordBreak="break-all"
          color="neutral.light.7"
        >
          {data}
        </Code>
      </InfoItem>

      {!decoded && !address.is_verified && type === "transaction" && (
        <GridItem order={-1} colSpan={{ base: 1, lg: 2 }}>
          <Alert
            status="warning"
            display="flex"
            variant="verifyContract"
            alignItems="center"
            colorScheme="orange"
            justifyContent="space-between"
            flexWrap="wrap"
            paddingX={4}
            paddingY={3}
            gap={1}
          >
            <chakra.span>
              {getLanguage(
                "address.to_see_accurate_decoded_input_data_the_contract_must_be_verified",
              )}
            </chakra.span>
            <ContractVerificationButton
              addressHash={address.hash}
              isLoading={isLoading}
            ></ContractVerificationButton>
          </Alert>
        </GridItem>
      )}
    </DetailsInfoGroup>
  )
}

export default memo(LogItem, (prev, next) => {
  return (
    prev.item === next.item &&
    prev.isLoading === next.isLoading &&
    prev.hasCollapse === next.hasCollapse
  )
})
