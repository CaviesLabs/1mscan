import { switchAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const sizes = {
  sm: definePartsStyle({
    container: {
      width: "2.75rem",
      height: "1.5rem",
    },
    track: {
      width: "2.75rem",
      height: "1.5rem",
      padding: "0px",
    },
    thumb: {
      boxSize: "1.25rem",
      marginY: "0.125rem",
      marginX: "0.125rem",
    },
  }),
}

const baseStyle = definePartsStyle((props) => {
  if (props.colorScheme === "blue") {
    return {
      container: {
        outline: "none",
        outlineWidth: "0px",
        ".chakra-switch__input": {
          display: "none",
        },
      },
      track: {
        outline: "none",
        outlineWidth: "0px",
        position: "relative",
        backgroundColor: "neutral.light.4",
        _checked: {
          backgroundColor: "accent.blue",
        },
      },
      thumb: {
        backgroundColor: "neutral.light.1",
        position: "absolute",
        _checked: {
          transform: "translateX(100%)",
        },
      },
    }
  }
  return {}
})

const Switch = defineMultiStyleConfig({
  baseStyle,
  sizes,
})

export default Switch
