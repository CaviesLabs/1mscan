import { HStack, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { isNil } from "lodash"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import InfoItem from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = Pick<Transaction, "nonce" | "type" | "position"> & {
  isLoading?: boolean
}

const TxDetailsOther = ({ nonce, type, position, isLoading }: Props) => {
  return (
    <InfoItem
      title={getLanguage(
        "transaction_details_page.evm_details.details_tab_content.other",
      )}
      hint={getLanguage(
        "transaction_details_page.evm_details.details_tab_content.other_data_related_to_transaction",
      )}
      isLoading={isLoading}
      hasSkeleton
      textStyle="1"
      flexDirection={{ base: "column", lg: "row" }}
      alignItems={{ base: "flex-start", lg: "center" }}
      displayDivider="block"
    >
      <HStack rowGap={1} columnGap={3} flexWrap="wrap">
        {typeof type === "number" && (
          <HStack>
            <chakra.span color="neutral.light.6">
              {getLanguage(
                "transaction_details_page.evm_details.details_tab_content.txn_type",
              )}
              :{" "}
            </chakra.span>
            <HStack display="inline-flex" gap={1}>
              <span>{type}</span>
              {type === 2 && (
                <chakra.span color="neutral.light.7">(EIP-1559)</chakra.span>
              )}
            </HStack>
          </HStack>
        )}

        <HStack>
          <SkeletonText
            color="neutral.light.6"
            borderLeftWidth={{
              base: "0px",
              lg: "1px",
            }}
            paddingLeft={{
              base: 0,
              lg: 3,
            }}
          >
            {getLanguage(
              "transaction_details_page.evm_details.details_tab_content.nonce",
            )}
            :{" "}
          </SkeletonText>
          <chakra.span color="neutral.light.7">{nonce}</chakra.span>
        </HStack>

        {!isNil(position) && (
          <HStack>
            <SkeletonText
              borderLeftWidth={{
                base: "0px",
                lg: "1px",
              }}
              paddingLeft={{
                base: 0,
                lg: 3,
              }}
              color="neutral.light.6"
            >
              {getLanguage(
                "transaction_details_page.evm_details.details_tab_content.position",
              )}
              :{" "}
            </SkeletonText>
            <chakra.span color="neutral.light.7">{position}</chakra.span>
          </HStack>
        )}
      </HStack>
    </InfoItem>
  )
}

export default memo(TxDetailsOther, (prev, next) => {
  return (
    prev.nonce === next.nonce &&
    prev.type === next.type &&
    prev.position === next.position &&
    prev.isLoading === next.isLoading
  )
})
