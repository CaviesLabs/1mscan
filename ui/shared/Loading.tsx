import { memo } from "react"
import type { IconSvgProps } from "./IconSvg"
import IconSvg from "./IconSvg"

type Props = {
  //
} & Partial<IconSvgProps>

const Loading = (props: Props) => {
  return (
    <IconSvg
      name="loading"
      color="primary.light.4"
      animation="spin 2s linear infinite"
      boxSize={6}
      {...props}
    />
  )
}

export default memo(Loading)
