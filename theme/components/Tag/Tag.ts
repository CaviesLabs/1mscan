import { tagAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

import Badge from "../Badge"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const variants = {
  subtle: definePartsStyle((props) => {
    let theme = {
      ...Badge.variants?.subtle(props),
      borderWidth: "1px",
      outlineWidth: "0px",
      outline: "0px",
      _disabled: {
        borderWidth: "0",
        _hover: {
          borderWidth: "0",
        },
      },
    }

    if (props.colorScheme === "green") {
      theme = Object.assign(theme, {
        _groupHover: {
          borderColor: "secondary.02",
        },
        _active: {
          borderColor: "secondary.02",
        },
        bgColor: "secondary.02.bg",
        color: "secondary.02.text",
      })
    } else if (props.colorScheme === "red") {
      theme = Object.assign(theme, {
        _groupHover: {
          borderColor: "secondary.05",
        },
        _active: {
          borderColor: "secondary.05",
        },
        bgColor: "secondary.05.bg",
        color: "secondary.05.text",
      })
    } else if (props.colorScheme === "orange") {
      theme = Object.assign(theme, {
        _groupHover: {
          borderColor: "secondary.01",
        },
        _active: {
          borderColor: "secondary.01",
        },
        bgColor: "secondary.01.bg",
        color: "secondary.01.text",
      })
    } else if (props.colorScheme === "purple") {
      theme = Object.assign(theme, {
        _groupHover: {
          borderColor: "secondary.03.text",
        },
        _active: {
          borderColor: "secondary.03.text",
        },
        bgColor: "secondary.03.bg",
        color: "secondary.03.text",
      })
    } else if (props.colorScheme === "gray") {
      theme = Object.assign(theme, {
        _groupHover: {
          borderColor: "secondary.06",
        },
        _active: {
          borderColor: "secondary.06",
        },
        bgColor: "secondary.06.bg",
        color: "secondary.06.text",
      })
    } else if (props.colorScheme === "blue" || props.colorScheme === "cyan") {
      theme = Object.assign(theme, {
        _groupHover: {
          borderColor: "secondary.04",
        },
        _active: {
          borderColor: "secondary.04",
        },
        bgColor: "secondary.04.bg",
        color: "secondary.04.text",
      })
    }

    return {
      container: theme,
    }
  }),
  outline: definePartsStyle((props) => {
    let theme = {
      borderWidth: "1px",
      outlineWidth: "0px",
      boxShadow: "unset",
    }

    if (props.colorScheme === "green") {
      theme = Object.assign(theme, {
        borderColor: "secondary.02",
        bgColor: "secondary.02.bg",
        color: "secondary.02.text",
      })
    } else if (props.colorScheme === "red") {
      theme = Object.assign(theme, {
        borderColor: "secondary.05",
        bgColor: "secondary.05.bg",
        color: "secondary.05.text",
      })
    } else if (props.colorScheme === "orange") {
      theme = Object.assign(theme, {
        borderColor: "secondary.01",
        bgColor: "secondary.01.bg",
        color: "secondary.01.text",
      })
    } else if (props.colorScheme === "purple") {
      theme = Object.assign(theme, {
        borderColor: "secondary.03.text",
        bgColor: "secondary.03.bg",
        color: "secondary.03.text",
      })
    } else if (props.colorScheme === "gray") {
      theme = Object.assign(theme, {
        borderColor: "secondary.06",
        bgColor: "secondary.06.bg",
        color: "secondary.06.text",
      })
    } else if (props.colorScheme === "cyan") {
      theme = Object.assign(theme, {
        borderColor: "secondary.04",
        bgColor: "secondary.04.bg",
        color: "secondary.04.text",
      })
    } else if (props.colorScheme === "red_primary") {
      theme = Object.assign(theme, {
        borderColor: "primary.light.2",
        bgColor: "primary.light.1",
        color: "primary.light.4",
      })
    }

    return {
      container: theme,
    }
  }),
  unborder: definePartsStyle((props) => {
    let theme = {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 6,
    }

    if (props.colorScheme === "green") {
      theme = Object.assign(theme, {
        bgColor: "secondary.02.bg",
        color: "secondary.02.text",
      })
    } else if (props.colorScheme === "red") {
      theme = Object.assign(theme, {
        bgColor: "secondary.05.bg",
        color: "secondary.05.text",
      })
    } else if (props.colorScheme === "orange") {
      theme = Object.assign(theme, {
        bgColor: "secondary.01.bg",
        color: "secondary.01.text",
      })
    } else if (props.colorScheme === "purple") {
      theme = Object.assign(theme, {
        bgColor: "secondary.03.bg",
        color: "secondary.03.text",
      })
    } else if (props.colorScheme === "gray") {
      theme = Object.assign(theme, {
        bgColor: "secondary.06.bg",
        color: "secondary.06.text",
      })
    }

    return {
      container: theme,
    }
  }),
  solid: definePartsStyle((props) => {
    let theme = {
      ...Badge.variants?.subtle(props),
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    }

    if (props.colorScheme === "green") {
      theme = Object.assign(theme, {
        bgColor: "secondary.02.text",
        color: "secondary.02.bg",
      })
    } else if (props.colorScheme === "red") {
      theme = Object.assign(theme, {
        bgColor: "secondary.05.text",
        color: "secondary.05.bg",
      })
    } else if (props.colorScheme === "orange") {
      theme = Object.assign(theme, {
        bgColor: "secondary.01.text",
        color: "secondary.01.bg",
      })
    } else if (props.colorScheme === "purple") {
      theme = Object.assign(theme, {
        bgColor: "secondary.03.text",
        color: "secondary.03.bg",
      })
    }

    return {
      container: theme,
    }
  }),
}

const baseStyleContainer = defineStyle({
  display: "inline-block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  paddingX: "0.375rem",
  paddingY: "0.125rem",
  borderRadius: "sm",
  borderColor: "transparent",
  cursor: "inherit",
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: 5,
  transitionProperty:
    "background-color, border-color, color, width, height, border-width, border",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
})

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
})

const Tag = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "gray",
  },
})

export default Tag
