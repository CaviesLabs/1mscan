import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { runIfFn } from "@chakra-ui/utils"

const variantSolid = defineStyle(() => {
  return {
    borderWidth: "0px",
    bg: "primary.light.4",
    color: "neutral.light.1",
    _hover: {
      color: "primary.light.1",
      bg: "primary.light.4",
    },
    _loading: {
      pointerEvents: "none",
      color: "primary.light.1",
      bg: "primary.light.4",
    },
    _disabled: {
      pointerEvents: "none",
      color: "primary.light.2",
      bg: "primary.light.1",
    },
    transition: "background 0.2s ease-in-out",
    _active: { bg: "primary.light.4" },
    _focus: { bg: "primary.light.4" },
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 5,
  }
})

const variantOutline = defineStyle((props) => {
  return {
    color: "primary.light.3",
    fontWeight: props.fontWeight || 400,
    borderWidth: props.borderWidth || "1px",
    borderStyle: "solid",
    borderColor: "primary.light.3",
    fontSize: "0.875rem",
    bg: "unset",
    lineHeight: "1.25rem",
    paddingX: 2,
    paddingY: "0.375rem",
    _hover: {
      color: "primary.light.3",
      borderColor: "primary.light.3",
      bg: "unset",

      _disabled: {
        color: "primary.light.3",
        borderColor: "primary.light.3",
      },
      p: {
        color: "primary.light.3",
      },
    },
    _disabled: {
      opacity: 0.2,
    },
    _active: {
      borderColor: "primary.light.3",
      color: "primary.light.3",
      bg: "unset",

      _disabled: {
        color: "primary.light.3",
        borderColor: "primary.light.3",
      },
      p: {
        color: "primary.light.3",
      },
    },
  }
})

const variantSimple = defineStyle((props) => {
  const outline = runIfFn(variantOutline, props)

  return {
    color: outline.color,
    _hover: {
      color: outline._hover.color,
    },
  }
})

const variantPrimary = defineStyle((props) => {
  const { colorScheme } = props
  const defaultStyles = {
    borderRadius: "0.5rem",
    paddingY: "0.375rem",
    paddingX: "0.625rem",
    borderWidth: "1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    height: 9,
    role: "group",
    borderColor: "neutral.light.4",
    backgroundColor: "neutral.light.1",
    color: "neutral.light.6",
    outline: "none",
    _active: {
      borderColor: "neutral.light.6",
      color: "neutral.light.8",
      _hover: {
        color: "neutral.light.6",
      },
      outline: "none",
    },
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    _hover: {
      borderColor: "neutral.light.7",
    },
    _focusWithin: {
      outline: "none",
    },
  }

  if (colorScheme === "green") {
    return {
      ...defaultStyles,
      borderColor: "secondary.02",
      color: "secondary.02.text",
      __active: {},
      _hover: {},
    }
  }
  return defaultStyles
})

const variantGhost = defineStyle(() => {
  return {
    flexShrink: 0,
    size: "md",
    backgroundColor: "neutral.light.3",

    color: "neutral.light.7",
    outline: 0,
    _hover: {
      color: "neutral.light.1",
      backgroundColor: "neutral.light.7",
    },
    _disabled: {
      color: "neutral.light.1",
      backgroundColor: "neutral.light.4",
      cursor: "default",
    },
    display: "flex",
    alignItems: "center",
    _active: {
      backgroundColor: "neutral.light.3",
    },
  }
})

const variantSubtle = defineStyle((props) => {
  return {
    color: "primary.light.4",
    fontWeight: props.fontWeight || 400,
    borderWidth: props.borderWidth || "1px",
    borderStyle: "solid",
    borderColor: "primary.light.4",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    paddingX: 2,
    paddingY: "0.375rem",
    _hover: {
      color: "primary.light.3",
      borderColor: "primary.light.3",

      _disabled: {
        color: "primary.light.2",
        borderColor: "primary.light.1",
        bg: "primary.light.1",
      },
    },
    _disabled: {
      color: "primary.light.2",
      borderColor: "primary.light.1",
      bg: "primary.light.1",
    },
    _active: {
      borderColor: "primary.light.4",
      color: "primary.light.4",

      _disabled: {
        color: "primary.light.2",
        borderColor: "primary.light.1",
        bg: "primary.light.1",
      },
    },
  }
})

const variantTertiary = defineStyle(() => {
  return {
    // onClick:{onClick},
    // isActive:{isActive},
    paddingY: 1,
    paddingX: "0.625rem",
    flexShrink: 0,
    borderRadius: "0.5rem",
    backgroundColor: "neutral.light.3",
    fontSize: "0.8125rem",
    fontWeight: 400,
    height: "unset",
    lineHeight: "1rem",
    color: "neutral.light.7",
    outline: 0,
    _hover: {
      color: "neutral.light.1",
      backgroundColor: "neutral.light.7",
    },
    _disabled: {
      color: "neutral.light.1",
      backgroundColor: "neutral.light.4",
      cursor: "default",
      _hover: {
        color: "neutral.light.1",
        backgroundColor: "neutral.light.4",
        background: "neutral.light.4 !important",
      },
    },
    display: "flex",
    alignItems: "center",
    _active: {
      backgroundColor: "neutral.light.3",
    },
    outlineOffset: 0,
    _groupHover: {
      outlineWidth: "1px",
      outlineColor: "neutral.light.5",
    },
  }
})

const variantSidebar = defineStyle(() => {
  return {
    paddingX: { base: 2, lg: 3 },
    paddingY: 2,
    columnGap: 3,
    color: "neutral.light.7",
    textStyle: "1",
    display: "flex",
    alignItems: "center",
    borderRadius: "0.5rem",
    backgroundColor: "neutral.light.1",
    _hover: { color: "neutral.light.8" },
    _active: { backgroundColor: "neutral.light.3" },
    _disabled: {
      color: "neutral.light.7",
      _hover: { color: "neutral.light.7" },
    },
  }
})

const variantRounded = defineStyle(() => {
  return {
    boxSize: "2.25rem",
    padding: "0.625rem",
    display: "flex",
    color: "neutral.light.5",
    textStyle: "1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    backgroundColor: "neutral.light.1",
    _hover: {
      color: "neutral.light.7",
      borderWidth: "1px",
      borderColor: "neutral.light.5",
    },

    transition: "all 0.3s ease-in-out",
  }
})

const variantLink = defineStyle(() => {
  return {
    color: "primaryLightButton",
  }
})

const variantSecondary = {
  backgroundColor: "neutral.light.3",
  color: "neutral.light.7",
  display: "inline-flex",
  gap: "0.25rem",
  flexShrink: 0,
  fontSize: "0.8125rem",
  fontWeight: 400,
  lineHeight: "1rem",
  borderRadius: "0.5rem",
  whiteSpace: "nowrap",
  paddingX: "0.75rem",
  paddingY: "0.5rem",
  _hover: {
    backgroundColor: "neutral.light.7",
    color: "neutral.light.1",
    _disabled: {
      backgroundColor: "neutral.light.4",
      color: "neutral.light.1",
    },
  },
  _disabled: {
    backgroundColor: "neutral.light.4",
    color: "neutral.light.1",
  },
}

const variantTool = {
  backgroundColor: "secondary.06.bg",
  color: "neutral.light.5",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",
  flexShrink: 0,
  fontSize: "0.8125rem",
  fontWeight: 400,
  lineHeight: "1rem",
  rounded: "full",
  whiteSpace: "nowrap",
  paddingX: "0.75rem",
  paddingY: "0.5rem",
  borderColor: "neutral.light.4",
  _hover: {
    backgroundColor: "secondary.06",
    color: "secondary.06.text",
    borderWidth: "1px",
  },
  _disabled: {
    backgroundColor: "neutral.light.4",
    color: "neutral.light.1",
  },
}

const variants = {
  solid: variantSolid,
  outline: variantOutline,
  simple: variantSimple,
  ghost: variantGhost,
  subtle: variantSubtle,
  primary: variantPrimary,
  tertiary: variantTertiary,
  sidebar: variantSidebar,
  rounded: variantRounded,
  link: variantLink,
  none: {},
  unstyled: {},
  secondary: variantSecondary,
  tool: variantTool,
}

const baseStyle = defineStyle({
  fontWeight: 400,
  fontSize: "0.8125rem",
  lineHeight: "1rem",
  borderRadius: "0.5rem",
  bg: "neutral.light.1",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
})

const sizes = {
  lg: defineStyle({
    h: 12,
    minW: "unset",
    fontSize: "lg",
    px: 6,
  }),
  md: defineStyle({
    h: 9,
    minW: "unset",
    paddingY: "0.5rem",
    paddingX: "0.625rem",
    borderRadius: "0.5rem",
    textStyle: "1",
  }),
  sm: defineStyle({
    h: 8,
    minW: "unset",
    paddingY: "0.375rem",
    paddingX: "1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
  }),
  xs: defineStyle({
    h: 6,
    minW: "unset",
    fontSize: "xs",
    px: 2,
  }),
}

const Button = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "blue",
  },
})

export default Button
