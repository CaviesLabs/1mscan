import { memo } from "react"
import type { IconName, IconSvgProps } from "./IconSvg"
import IconSvg from "./IconSvg"

type Props = {
  isOpen: any
  name?: IconName
  from?: number
  to?: number
} & Partial<IconSvgProps>

const ArrowToggle = ({ isOpen, from = -90, to = 90, ...props }: Props) => {
  return (
    <IconSvg
      data-state={isOpen ? "open" : "closed"}
      boxSize={4}
      transition="transform 0.3s linear"
      _open={{
        transform: `rotate(${to}deg)`,
      }}
      _closed={{
        transform: `rotate(${from}deg)`,
      }}
      name="arrows/east-mini"
      {...props}
    ></IconSvg>
  )
}

export default memo(ArrowToggle)
