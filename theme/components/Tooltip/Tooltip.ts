import { Tooltip as TooltipComponent } from "@chakra-ui/react"
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { cssVar, getColorVar, mode } from "@chakra-ui/theme-tools"

const $bg = cssVar("tooltip-bg")
const $fg = cssVar("tooltip-fg")
const $arrowBg = cssVar("popper-arrow-bg")

const variantNav = defineStyle((props) => {
  return {
    bg: mode("primary.light.3", "gray.800")(props),
    color: "blue.400",
    padding: "15px 12px",
    minWidth: "120px",
    borderRadius: "base",
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "center",
    boxShadow: "none",
    fontWeight: "500",
  }
})

const variants = {
  nav: variantNav,
}

const baseStyle = defineStyle((props) => {
  const bg = getColorVar(props.theme, "blackAlpha.900")
  const fg = getColorVar(props.theme, "neutral.light.1")

  return {
    bg: $bg.reference,
    color: $fg.reference,
    fontWeight: 400,
    [$bg.variable]: bg,
    [$fg.variable]: fg,
    [$arrowBg.variable]: $bg.reference,
    maxWidth: props.maxWidth || props.maxW || "unset",
    borderRadius: "base",
    zIndex: 1500,
  }
})

const Tooltip = defineStyleConfig({
  variants,
  baseStyle,
})

TooltipComponent.defaultProps = {
  ...TooltipComponent.defaultProps,
  hasArrow: true,
}

export default Tooltip
