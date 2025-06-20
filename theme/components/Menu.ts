import { menuAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar("menu-bg")
const $shadow = cssVar("menu-shadow")

const baseStyleList = defineStyle({
  [$bg.variable]: "#fff",
  [$shadow.variable]: "shadows.2xl",
  _dark: {
    [$bg.variable]: "colors.gray.900",
    [$shadow.variable]: "shadows.dark-lg",
  },
  borderWidth: "0",
  bg: $bg.reference,
  boxShadow: $shadow.reference,
})

const baseStyleItem = defineStyle({
  _focus: {
    [$bg.variable]: "colors.secondary.light.bg.red",
    _dark: {
      [$bg.variable]: "colors.secondary.light.bg.red",
    },
  },
  _hover: {
    [$bg.variable]: "colors.secondary.light.bg.red",
    p: {
      color: "primary.light.3 !important",
    },
    _dark: {
      [$bg.variable]: "colors.secondary.light.bg.red",
    },
  },
  bg: $bg.reference,
})

const baseStyle = definePartsStyle({
  list: baseStyleList,
  item: baseStyleItem,
})

const Menu = defineMultiStyleConfig({
  baseStyle,
})

export default Menu
