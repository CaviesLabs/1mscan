import { Flex, Stack, Text, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { TransactionRevertReason } from "types/api/transaction"
import CopyToClipboardAsync from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import LogDecodedInputData from "ui/shared/logs/LogDecodedInputData"
import { type Hex, hexToString } from "viem"

type Props = {
  reason: TransactionRevertReason
  isLoading?: boolean
}

const TxRevertReason = ({ reason, isLoading }: Props) => {
  if (isLoading) {
    return <></>
  }

  if (reason.raw) {
    if (reason.raw.startsWith("0x")) {
      const decoded = hexToString(reason.raw as Hex)

      return (
        <Stack alignItems="stretch" spacing={1} overflow="hidden">
          <Flex columnGap={3} rowGap={1} overflow="hidden">
            <chakra.span flexShrink={0} whiteSpace="nowrap">
              {getLanguage(
                "transaction_details_page.evm_details.details_tab_content.raw",
              )}
            </chakra.span>
            <Flex flex={1} overflow="hidden" alignItems="flex-end">
              <Text isTruncated>{reason.raw}</Text>
              <CopyToClipboardAsync setValue={() => reason.raw} />
            </Flex>
          </Flex>
          {decoded.replace(/\s|\0/g, "") && (
            <Flex columnGap={3} rowGap={1} maxWidth="full">
              <chakra.span>
                {getLanguage(
                  "transaction_details_page.evm_details.details_tab_content.decoded",
                )}
              </chakra.span>
              <Flex flex={1} alignItems="flex-end">
                <chakra.p whiteSpace="pre-line">{decoded}</chakra.p>
                <CopyToClipboardAsync setValue={() => decoded} />
              </Flex>
            </Flex>
          )}
        </Stack>
      )
    } else {
      return <chakra.p whiteSpace="pre-line">{reason.raw}</chakra.p>
    }
  }

  if (reason.method_call || reason.method_id || reason.parameters?.length) {
    return <LogDecodedInputData data={reason} />
  }

  return "-"
}

export default memo(TxRevertReason, (prev, next) => {
  return prev.reason === next.reason && prev.isLoading === next.isLoading
})
