import colors from "./foundations/colors"
import scrollbar from "./foundations/scrollbar"

const global = {
  html: {
    WebkitTapHighlightColor: "transparent",
    fontVariantLigatures: "no-contextual",
    background: colors.neutral["light.2"],
  },
  body: {
    background: colors.neutral["light.2"],
    color: colors.neutral["light.7"],
  },
  "svg *::selection": {
    color: "none",
    background: "none",
  },
  ...scrollbar,
}

export default global
