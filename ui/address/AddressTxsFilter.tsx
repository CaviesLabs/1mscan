import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import Filter from "ui/shared/filters/Filter"
import type { FilterButtonProps } from "ui/shared/filters/FilterButton"

interface Props {
  value?: "from" | "to" | undefined
  onFilterChange: (nextValue: "from" | "to" | undefined) => void
  isLoading?: boolean
  buttonProps?: FilterButtonProps
}

const AddressTxsFilter = ({
  onFilterChange,
  value,
  isLoading,
  buttonProps,
}: Props) => {
  return (
    <Filter
      type="radio"
      title={getLanguage("address.asset_transaction_type")}
      isLoading={isLoading}
      value={value}
      hasIcon={false}
      hasArrow={true}
      onChange={onFilterChange as any}
      items={[
        { id: "from", title: getLanguage("address.outgoing_transactions") },
        { id: "to", title: getLanguage("address.incoming_transactions") },
      ]}
      buttonProps={buttonProps}
    ></Filter>
  )
}

export default memo(AddressTxsFilter, (pre, next) => {
  return (
    pre.value === next.value &&
    pre.isLoading === next.isLoading &&
    pre.buttonProps === next.buttonProps &&
    pre.onFilterChange === next.onFilterChange
  )
})
