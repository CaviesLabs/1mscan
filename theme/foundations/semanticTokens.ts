import colors from "./colors"

const semanticTokens = {
  colors: {
    divider: {
      default: "neutral.light.3",
    },
    text: {
      default: colors.neutral["light.7"],
    },
    text_secondary: {
      default: "gray.500",
      _dark: "gray.400",
    },
    link: {
      default: "accent.blue",
    },
    // link_hovered: {
    //   default: "blue.400",
    // },
    error: {
      default: colors.accent.red,
    },
  },
  shadows: {
    action_bar:
      "0 4px 4px -4px rgb(0 0 0 / 10%), 0 2px 4px -4px rgb(0 0 0 / 6%)",
    primary: " 1px 2px 8px 0px rgba(0, 0, 0, 0.10)",
    mini: "0px 12px 36px -4px rgba(0, 0, 0, 0.04)",
  },
}

export default semanticTokens
