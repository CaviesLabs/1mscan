import { checkboxAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
import { runIfFn } from "@chakra-ui/utils"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $size = cssVar("checkbox-size")

const baseStyleControl = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    borderWidth: "1px",
    borderRadius: "0.375rem",
    borderColor: "neutral.light.4",
    _groupHover: {
      borderColor: "neutral.light.5",
    },
    _checked: {
      bg: mode("primary.300", "primary.light.2")(props),
      borderColor: mode("primary.300", "primary.light.2")(props),
      _hover: {
        bg: mode("primary.300", "primary.light.2")(props),
        borderColor: mode("primary.300", "primary.light.2")(props),
      },
    },
    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.300`)(props),
      borderColor: mode(`${c}.500`, `${c}.300`)(props),
    },
  }
})

const sizes = {
  sm: definePartsStyle({
    control: { [$size.variable]: "sizes.3" },
    label: { fontSize: "sm" },
    icon: { fontSize: "3xs" },
  }),
  md: definePartsStyle({
    control: { [$size.variable]: "sizes.4" },
    label: { fontSize: "md" },
    icon: { fontSize: "2xs" },
  }),
  lg: definePartsStyle({
    control: { [$size.variable]: "sizes.5" },
    label: { fontSize: "md" },
    icon: { fontSize: "2xs" },
  }),
}

const baseStyleLabel = defineStyle({
  _disabled: { opacity: 0.2 },
})

const baseStyle = definePartsStyle((props) => ({
  label: baseStyleLabel,
  control: runIfFn(baseStyleControl, props),
}))

const Checkbox = defineMultiStyleConfig({
  baseStyle,
  sizes,
})

export default Checkbox
