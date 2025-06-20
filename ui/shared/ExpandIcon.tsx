import type { HTMLChakraProps } from "@chakra-ui/react"
import { memo } from "react"
import IconSvg from "./IconSvg"

type Props = {
  isExpanded: boolean
  duration?: number
} & Partial<HTMLChakraProps<"div">>

const ExpandIcon = ({ isExpanded, duration, ...props }: Props) => {
  return (
    <IconSvg
      name="arrows/east-mini"
      transition={`transform ${duration || 0.1}s linear`}
      transform={isExpanded ? "rotate(90deg)" : "rotate(-90deg)"}
      transitionDuration="faster"
      boxSize={5}
      {...props}
    />
  )
}

export default memo(ExpandIcon, (prev, next) => {
  return prev.isExpanded === next.isExpanded
})
