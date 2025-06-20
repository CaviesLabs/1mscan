import type { AddressFromToFilter } from "types/api/address"
import type { TokenType } from "types/api/token"

import { getLanguage } from "languages/useLanguage"
import { ALL_SEI_TOKEN_TYPES, EVM_TOKEN_TYPES } from "lib/token/tokenTypes"
import { memo } from "react"
import type { OSType } from "types/base"
import Filter from "ui/shared/filters/Filter"

interface Props {
  isLoading?: boolean
  osType: OSType
  directionValue: AddressFromToFilter | ""
  typeValue: TokenType[]
  onDirectionChange?: (nextValue: string | undefined) => void
  onTypeChange: (nextValue: TokenType[]) => void
}

const TokenTransferFilter = ({
  isLoading,
  osType,
  directionValue,
  typeValue,
  onDirectionChange,
  onTypeChange,
}: Props) => {
  return (
    <>
      <Filter
        type="radio"
        title={getLanguage("address.transfer_type")}
        isLoading={isLoading}
        value={directionValue}
        hasIcon={false}
        hasArrow={true}
        onChange={onDirectionChange}
        items={[
          { id: "from", title: getLanguage("address.outgoing_transfers") },
          { id: "to", title: getLanguage("address.incoming_transfers") },
        ]}
      ></Filter>

      <Filter
        type="checkbox"
        title={getLanguage("address.asset_type")}
        isLoading={isLoading}
        value={typeValue || []}
        hasIcon={false}
        hasArrow={!typeValue.length}
        hasIndicator={Boolean(typeValue?.length)}
        onChange={(value) => onTypeChange(value || [])}
        titleProps={{ ml: { lg: 5 } }}
        items={
          (osType === "Cosmos"
            ? ALL_SEI_TOKEN_TYPES
            : EVM_TOKEN_TYPES) as unknown as {
            id: TokenType
            title: string
          }[]
        }
      ></Filter>
    </>
  )
}

export default memo(TokenTransferFilter)
