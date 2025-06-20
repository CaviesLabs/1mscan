import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import SkeletonText from "./text/SkeletonText"
import TooltipV2 from "./tootltip/TooltipV2"

type Props = {
  value: number
  isLoading?: boolean
}

const GasUsedToTargetRatio = ({ value, isLoading }: Props) => {
  return (
    <TooltipV2
      label={getLanguage(
        "block_details_page.details_tab_content.%_of_gas_target",
      )}
    >
      <SkeletonText color="neutral.light.5" textStyle="1" isLoading={isLoading}>
        {`${value > 0 ? "+" : ""}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}%`}
      </SkeletonText>
    </TooltipV2>
  )
}

export default memo(GasUsedToTargetRatio, (prev, next) => {
  return prev.value === next.value && prev.isLoading === next.isLoading
})
