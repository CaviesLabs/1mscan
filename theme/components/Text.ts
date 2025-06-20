import type { SystemStyleInterpolation } from "@chakra-ui/styled-system"
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"

const variantPrimary = defineStyle((props) => {
  const { colorScheme } = props

  const renderColor = () => {
    if (!colorScheme) {
      return mode("neutral.light.7", "neutral.light.7")(props)
    }

    switch (colorScheme) {
      case "neutral1":
        return mode("neutral.light.1", "neutral.light.1")(props)
      case "neutral2":
        return mode("neutral.light.2", "neutral.light.2")(props)
      case "neutral3":
        return mode("neutral.light.3", "neutral.light.3")(props)
      case "neutral4":
        return mode("neutral.light.4", "neutral.light.4")(props)
      case "neutral5":
        return mode("#8F8F8F", "#8F8F8F")(props)
      case "neutral6":
        return mode("neutral.light.6", "neutral.light.6")(props)
      case "neutral7":
        return mode("neutral.light.7", "neutral.light.7")(props)
      case "neutral8":
        return mode("neutral.light.8", "neutral.light.8")(props)
      case "primary4":
        return mode("primary.light.4", "primary.light.4")(props)
      case "secondary5":
        return mode("secondary.05.text", "secondary.05.text")(props)
      case "accentBlue":
        return mode("accent.blue", "accent.blue")(props)
      case "accentRed":
        return mode("accent.red", "accent.red")(props)
      case "orange":
        return mode(
          "secondary.light.text.orange",
          "secondary.light.text.orange",
        )(props)
      default:
        return mode("neutral.light.7", "neutral.light.7")(props)
    }
  }

  return {
    color: renderColor(),
  }
})

const variantSecondary = defineStyle((props) => ({
  color: mode("gray.500", "gray.400")(props),
}))

const variantLight7 = defineStyle(() => ({
  _disabled: { color: "neutral.light.5" },
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.25rem",
  fontStyle: "normal",
  color: "neutral.light.7",
}))

const variantLight6 = defineStyle(() => ({
  fontSize: "0.8125rem",
  fontWeight: 400,
  lineHeight: "1rem",
  fontStyle: "normal",
  color: "neutral.light.6",
}))

const variantLight5 = defineStyle(() => ({
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.25rem",
  fontStyle: "normal",
  color: "neutral.light.5",
}))

const variantLight8 = defineStyle(() => ({
  fontSize: "1.125rem",
  fontWeight: 500,
  lineHeight: "1.75rem",
  fontStyle: "normal",
  color: "neutral.light.8",
}))
const variantLight1 = defineStyle(() => ({
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.5rem",
  fontSize: "1rem",
  color: "neutral.light.1",
}))

const sizes = {
  8125: defineStyle({
    fontSize: "0.8125rem",
    fontWeight: 400,
    lineHeight: "1rem",
  }),
  875: defineStyle({
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
  }),
  1: defineStyle({
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: "1.5rem",
  }),
  125: defineStyle({
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: "1.75rem",
  }),

  xsm: defineStyle({
    fontSize: "12px",
    fontWeight: 400,
  }),
  xxsm: defineStyle({
    fontSize: "13px",
    fontWeight: 400,
  }),
  sm: defineStyle({
    fontSize: "14px",
    fontWeight: 400,
  }),
  md: defineStyle({
    fontSize: "16px",
    fontWeight: 400,
  }),
  lg: defineStyle({
    fontSize: "18px",
    fontWeight: 400,
  }),
  xl: defineStyle({
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: 500,
  }),
  "2xl": defineStyle({
    fontSize: "24px",
    fontWeight: 500,
  }),
  "2xxl": defineStyle({
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: 600,
  }),
  "3xl": defineStyle({
    fontSize: "32px",
    fontWeight: 700,
  }),
  "4xl": defineStyle({
    fontSize: "36px",
    fontWeight: 500,
    lineHeight: "44px",
  }),
  "4xxl": defineStyle({
    fontSize: "40px",
    fontWeight: 700,
  }),
  "5xl": defineStyle({
    fontSize: "52px",
    lineHeight: "52px",
    fontWeight: 700,
  }),
  "6xl": defineStyle({
    fontWeight: 700,
  }),
  "7xl": defineStyle({
    fontSize: "80px",
    fontWeight: 700,
  }),
  "7xxl": defineStyle({
    fontSize: "81px",
    fontWeight: 700,
  }),
}

const variantInherit = {
  color: "inherit",
}

const variants: Record<string, SystemStyleInterpolation> = {
  primary: variantPrimary,
  secondary: variantSecondary,
  inherit: variantInherit,
  light7: variantLight7,
  light6: variantLight6,
  light5: variantLight5,
  light8: variantLight8,
  light1: variantLight1,
}

const defaultProps = {
  alignItems: "center",
  variant: "unstyled",
  fontWeight: 400,
}

const Text = defineStyleConfig({
  variants,
  sizes,
  defaultProps,
})

export default Text
