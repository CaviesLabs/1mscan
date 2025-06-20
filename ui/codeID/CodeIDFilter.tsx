import Filter from "ui/shared/filters/Filter"
import type { FilterButtonProps } from "ui/shared/filters/FilterButton"

import { NATIVE_SEI_TOKEN_TYPES } from "lib/token/tokenTypes"
import { memo } from "react"
import type { TokenTypeCosmos } from "types/api/token"

interface Props {
  value?: TokenTypeCosmos | undefined
  onFilterChange: (nextValue: TokenTypeCosmos | undefined) => void
  isLoading?: boolean
  buttonProps?: FilterButtonProps
}

const CodeIDFilter = ({
  onFilterChange,
  value,
  isLoading,
  buttonProps,
}: Props) => {
  return (
    <Filter
      type="radio"
      title="Type"
      isLoading={isLoading}
      value={value}
      hasIcon={false}
      hasArrow={true}
      onChange={(val) => onFilterChange(val as any)}
      items={NATIVE_SEI_TOKEN_TYPES}
      buttonProps={buttonProps}
    ></Filter>
  )
}

export default memo(CodeIDFilter, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.value === next.value &&
    prev.buttonProps === next.buttonProps &&
    prev.onFilterChange === next.onFilterChange
  )
})
