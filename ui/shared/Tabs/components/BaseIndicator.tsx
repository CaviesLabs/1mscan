import { TabIndicator, type TabIndicatorProps } from "@chakra-ui/react"
import { memo } from "react"

type Props = {
  isLoading?: boolean
} & TabIndicatorProps

const BaseIndicator = ({ isLoading, ...indicatorProps }: Props) => {
  return (
    <TabIndicator
      aria-busy={isLoading}
      _loading={{
        display: "none",
      }}
      {...indicatorProps}
    />
  )
}

export default memo(BaseIndicator, (prev, next) => {
  return prev.isLoading === next.isLoading
})
