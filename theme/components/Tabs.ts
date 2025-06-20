import { tabsAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

import Button from "./Button/Button"

const variantSoftRounded = definePartsStyle((props) => {
  return {
    tab: {
      borderRadius: "base",
      fontWeight: "400",
      color: mode("blue.700", "gray.400")(props),
      _selected: {
        color: mode("blue.700", "gray.50")(props),
        bg: mode("primary.light.3", "gray.800")(props),
        _hover: {
          color: mode("blue.700", "gray.50")(props),
        },
      },
      _hover: {
        color: "primary.light.3",
      },
      _focusVisible: {
        boxShadow: { base: "none", lg: "outline" },
      },
    },
  }
})

const variantOutline = definePartsStyle((props) => {
  return {
    tab: {
      ...Button.variants?.outline(props),
      ...Button.baseStyle,
      _selected: Button.variants?.outline(props)._active,
    },
  }
})

const sizes = {
  sm: definePartsStyle({
    tab: Button.sizes?.sm,
  }),
  md: definePartsStyle({
    tab: Button.sizes?.md,
  }),
}

const variantSolid = definePartsStyle(() => {
  return {
    tab: {
      borderRadius: "0.75rem",
      scrollSnapAlign: "start",
      border: "0px",
      flexShrink: 0,
      padding: 0,
      backgroundColor: "transparent",
      _loading: {
        backgroundColor: "transparent",
        _selected: {
          backgroundColor: "transparent",
        },
        _hover: {
          backgroundColor: "transparent",
        },
      },
      _selected: {
        backgroundColor: "neutral.light.7",
        color: "neutral.light.1",
        _hover: {
          backgroundColor: "neutral.light.7",
          color: "neutral.light.1",
        },
      },
      color: "neutral.light.7",
      outline: 0,
      outlineWidth: "0px",
      borderWidth: 0,
      _hover: {
        color: "neutral.light.8",
      },
      _disabled: {
        _hover: {
          color: "neutral.light.7",
        },
      },
      display: "flex",
      alignItems: "center",
      gap: 2,
      height: 10,
      textStyle: "1",
    },
  }
})

// // define the base component styles
// const baseStyle = definePartsStyle({
//   // define the part you're going to style
//   tab: {

//   },
// });

const variants = {
  "soft-rounded": variantSoftRounded,
  solid: variantSolid,
  outline: variantOutline,
}

const Tabs = defineMultiStyleConfig({
  sizes,
  variants,
})

export default Tabs
