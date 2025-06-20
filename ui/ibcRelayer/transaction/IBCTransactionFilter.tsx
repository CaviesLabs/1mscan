import { memo } from "react"
import type { AddressFromToFilter } from "types/api/address"
import Filter from "ui/shared/filters/Filter"
import type { FilterButtonProps } from "ui/shared/filters/FilterButton"

interface Props {
  value?: AddressFromToFilter
  onFilterChange: (nextValue: string | Array<string>) => void
  isLoading?: boolean
  buttonProps?: FilterButtonProps
}

const IBCTransactionFilter = ({
  onFilterChange,
  value,
  isLoading,
  buttonProps,
}: Props) => {
  return (
    <Filter
      type="radio"
      title="Asset transfer type"
      isLoading={isLoading}
      value={value}
      hasIcon={false}
      hasArrow={true}
      onChange={onFilterChange as any}
      items={[
        { id: "from", title: "Outgoing transactions" },
        { id: "to", title: "Incoming transactions" },
      ]}
      buttonProps={buttonProps}
    ></Filter>
  )
}

export default memo(IBCTransactionFilter, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.value === next.value &&
    prev.onFilterChange === next.onFilterChange
  )
})
