import { memo } from "react"
import Filter from "ui/shared/filters/Filter"
import type { FilterButtonProps } from "ui/shared/filters/FilterButton"
import type { IIBCRelayersStatus } from "./types"

interface Props {
  value?: IIBCRelayersStatus | ""
  onFilterChange: (nextValue: IIBCRelayersStatus | null) => void
  isLoading?: boolean
  buttonProps?: FilterButtonProps
}

const IBCRelayersFilter = ({
  onFilterChange,
  value,
  isLoading,
  buttonProps,
}: Props) => {
  return (
    <Filter
      type="radio"
      title="Status"
      isLoading={isLoading}
      value={value}
      hasIcon={false}
      hasArrow={true}
      onChange={(val) => onFilterChange(val as any)}
      items={[
        { id: "opened", title: "Opened" },
        { id: "closed", title: "Closed" },
      ]}
      buttonProps={buttonProps}
    ></Filter>
  )
}

export default memo(IBCRelayersFilter, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.onFilterChange === next.onFilterChange &&
    prev.value === next.value
  )
})
