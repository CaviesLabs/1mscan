import { Grid } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { ALL_SEI_TOKEN_TYPES, EVM_TOKEN_TYPES } from "lib/token/tokenTypes"
import { memo } from "react"
import type { AddressFromToFilter } from "types/api/address"
import type { TokenTypeWithTransfer } from "types/api/token"
import type { OSType } from "types/base"
import Filter from "ui/shared/filters/Filter"

interface Props {
  isLoading?: boolean
  transactionType: OSType | "" | undefined
  withAddressFilter?: boolean
  defaultAddressFilter?: AddressFromToFilter
  defaultTypeFilters: Array<TokenTypeWithTransfer> | undefined
  onAddressFilterChange?: (nextValue: string | undefined) => void
  onTypeFilterChange: (nextValue: Array<TokenTypeWithTransfer>) => void
}

const TxTransferFilter = ({
  isLoading,
  transactionType,
  defaultTypeFilters,
  onTypeFilterChange,
}: Props) => {
  return (
    <Grid
      templateColumns={{
        base: "max-content 1fr",
        lg: "repeat(4, max-content)",
      }}
      alignItems="center"
      gap={2}
    >
      <Filter
        type="radio"
        title={getLanguage(
          "transaction_details_page.evm_details.token_transfers_tab_content.asset_type",
        )}
        isLoading={isLoading}
        value={defaultTypeFilters?.[0]}
        hasIcon={false}
        hasArrow={true}
        onChange={(value) => onTypeFilterChange(value ? [value] : [])}
        items={
          (transactionType === "Cosmos"
            ? ALL_SEI_TOKEN_TYPES
            : EVM_TOKEN_TYPES) as unknown as {
            id: TokenTypeWithTransfer
            title: string
          }[]
        }
      ></Filter>
    </Grid>
  )
}

export default memo(TxTransferFilter)
