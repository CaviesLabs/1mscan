import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import { Input as InputComponent } from "@chakra-ui/react"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

import getDefaultTransitionProps from "../utils/getDefaultTransitionProps"
import getOutlinedFieldStyles from "../utils/getOutlinedFieldStyles"

const size = {
  xs: defineStyle({
    fontSize: "md",
    lineHeight: "24px",
    px: "8px",
    py: "4px",
    h: "32px",
    borderRadius: "base",
  }),
  sm: defineStyle({
    fontSize: "md",
    lineHeight: "24px",
    px: "8px",
    py: "12px",
    h: "40px",
    borderRadius: "base",
  }),
  md: defineStyle({
    fontSize: "md",
    lineHeight: "20px",
    px: "20px",
    py: "20px",
    h: "60px",
    borderRadius: "base",
  }),
  lg: defineStyle({
    fontSize: "md",
    lineHeight: "20px",
    px: "24px",
    py: "28px",
    h: "80px",
    borderRadius: "base",
  }),
}

const variantOutline = definePartsStyle((props) => {
  const transitionProps = getDefaultTransitionProps()

  return {
    field: {
      ...getOutlinedFieldStyles(props),
      borderColor: "neutral.light.4",
      _focus: {
        borderColor: "neutral.light.6",
      },
    },
    addon: {
      border: "2px solid",
      bg: mode("blackAlpha.100", "whiteAlpha.200")(props),
      color: mode("blackAlpha.800", "whiteAlpha.800")(props),
      ...transitionProps,
    },
  }
})

const variantForm = definePartsStyle(() => {
  return {
    field: {
      color: "neutral.light.7",
      borderColor: "neutral.light.4",
      borderWidth: "1px",
      _focus: {
        borderColor: "neutral.light.5",
      },
    },
  }
})

const sizes = {
  xs: definePartsStyle({
    field: size.xs,
    addon: size.xs,
  }),
  sm: definePartsStyle({
    field: size.sm,
    addon: size.sm,
  }),
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
  lg: definePartsStyle({
    field: size.lg,
    addon: size.lg,
  }),
}

const variants = {
  outline: variantOutline,
  form: variantForm,
}

const Input = defineMultiStyleConfig({
  sizes,
  variants,
  defaultProps: {
    size: "md",
  },
})

InputComponent.defaultProps = {
  ...InputComponent.defaultProps,
  placeholder: " ",
}

export default Input
