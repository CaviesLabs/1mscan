import { selectAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

import Input from "./Input"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const variantOutline = definePartsStyle((props) => {
  return {
    field: {
      ...Input.variants?.outline(props).field,
      color: "neutral.light.6",
      outline: "unset",
      outlineWidth: 0,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "neutral.light.4",
      _hover: {
        borderColor: "neutral.light.5",
        color: "neutral.light.8",
      },
      _active: {
        borderColor: "neutral.light.4",
        color: "neutral.light.8",
      },
      _focusVisible: {
        borderColor: "neutral.light.6",
        color: "neutral.light.7",
        boxShadow: "unset",
      },
      cursor: "pointer",
    },
  }
})

const baseStyle = defineStyle({
  field: {
    paddingX: "1rem",
    paddingY: "0.75rem",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.5rem",
  },
})

const iconSpacing = defineStyle({
  paddingInlineEnd: "8",
})

const sizes = {
  lg: {
    ...Input.sizes?.lg,
    field: {
      ...Input.sizes?.lg.field,
      ...iconSpacing,
    },
  },
  md: {
    ...Input.sizes?.md,
    field: {
      ...Input.sizes?.md.field,
      ...iconSpacing,
    },
  },
  sm: {
    ...Input.sizes?.sm,
    field: {
      ...Input.sizes?.sm.field,
      ...iconSpacing,
    },
  },
  xs: {
    ...Input.sizes?.xs,
    field: {
      ...Input.sizes?.xs.field,
      ...iconSpacing,
      fontSize: "sm",
      lineHeight: "20px",
    },
  },
}

const Select = defineMultiStyleConfig({
  baseStyle,
  variants: {
    ...Input.variants,
    outline: variantOutline,
  },
  sizes,
  defaultProps: {
    size: "xs",
  },
})

export default Select
