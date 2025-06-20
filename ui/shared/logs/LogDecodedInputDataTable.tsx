import { Box, Flex, Grid, Skeleton, Text, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import type React from "react"
import type { DecodedInput } from "types/api/decodedInput"
import type { ArrayElement } from "types/utils"
import TruncatedTextTail from "ui/shared/truncate/TruncatedTextTail"
import CopyToClipboardAsync from "../copyToClipboard/CopyToClipboardAsync"
import AddressEntityV2 from "../entities/address/AddressEntityV2"

interface Props {
  data: DecodedInput["parameters"]
  isLoading?: boolean
}

const HeaderItem = chakra(
  ({
    children,
    isLoading,
    className,
  }: {
    children: React.ReactNode
    isLoading?: boolean
    className?: string
  }) => {
    return (
      <Skeleton
        fontWeight={600}
        pb={1}
        display="inline-block"
        width="fit-content"
        height="fit-content"
        isLoaded={!isLoading}
        className={className}
      >
        <Text variant="light7" fontWeight={500}>
          {children}
        </Text>
      </Skeleton>
    )
  },
)

const Row = ({
  name,
  type,
  indexed,
  value,
  isLoading,
}: ArrayElement<DecodedInput["parameters"]> & { isLoading?: boolean }) => {
  const content = (() => {
    if (type === "address" && typeof value === "string") {
      return (
        <AddressEntityV2
          truncation="tail"
          address={{
            hash: value,
            name: "",
            implementations: null,
            is_contract: false,
            is_verified: false,
          }}
          isLoading={isLoading}
        />
      )
    }

    if (typeof value === "object") {
      const text = JSON.stringify(value, undefined, 4)
      return (
        <Flex
          alignItems="flex-start"
          whiteSpace="normal"
          wordBreak="break-all"
          justifyContent="flex-start"
          gap={1}
        >
          <TruncatedTextTail isLoading={isLoading}>{text}</TruncatedTextTail>
          <CopyToClipboardAsync setValue={() => text} isLoading={isLoading} />
        </Flex>
      )
    }

    return (
      <Flex
        alignItems="flex-start"
        whiteSpace="normal"
        wordBreak="break-all"
        justifyContent="flex-start"
        gap={1}
      >
        <TruncatedTextTail isLoading={isLoading}>{value}</TruncatedTextTail>
        <CopyToClipboardAsync setValue={() => value} isLoading={isLoading} />
      </Flex>
    )
  })()

  return (
    <>
      <TruncatedTextTail isLoading={isLoading}>{name}</TruncatedTextTail>
      <TruncatedTextTail isLoading={isLoading}>{type}</TruncatedTextTail>
      {indexed !== undefined && (
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {indexed ? "true" : "false"}
        </Skeleton>
      )}
      <Skeleton isLoaded={!isLoading} display="inline-block">
        {content}
      </Skeleton>
    </>
  )
}

const LogDecodedInputDataTable = ({ data, isLoading }: Props) => {
  const hasIndexed = data.some(({ indexed }) => indexed !== undefined)

  return (
    <Box
      width="full"
      padding={0}
      backgroundColor="neutral.light.2"
      borderColor="neutral.light.3"
      borderWidth="1px"
      borderRadius="0.5rem"
      overflowX="auto"
      mt={2}
    >
      <Grid
        gridTemplateColumns={
          hasIndexed ? "6.25rem 6.25rem 6.25rem 1fr" : "6.25rem 6.25rem 1fr"
        }
        fontSize="sm"
        lineHeight={5}
        paddingX={4}
        paddingY={3}
        columnGap={5}
        rowGap={5}
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        whiteSpace="nowrap"
      >
        <HeaderItem isLoading={isLoading}>
          {getLanguage(
            "transaction_details_page.evm_details.details_tab_content.name",
          )}
        </HeaderItem>
        <HeaderItem isLoading={isLoading}>
          {getLanguage(
            "transaction_details_page.evm_details.details_tab_content.type",
          )}
        </HeaderItem>
        {hasIndexed && (
          <HeaderItem isLoading={isLoading}>
            {getLanguage(
              "transaction_details_page.evm_details.details_tab_content.indexed",
            )}
            ?
          </HeaderItem>
        )}
        <HeaderItem isLoading={isLoading}>
          {getLanguage(
            "transaction_details_page.evm_details.details_tab_content.data",
          )}
        </HeaderItem>
        {data.map((item) => {
          return <Row key={item.name} {...item} isLoading={isLoading} />
        })}
      </Grid>
    </Box>
  )
}

export default LogDecodedInputDataTable
