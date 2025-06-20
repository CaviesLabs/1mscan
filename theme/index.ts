import { extendTheme } from "@chakra-ui/react"
import components from "./components/index"
import config from "./config"
import borders from "./foundations/borders"
import breakpoints from "./foundations/breakpoints"
import colors from "./foundations/colors"
import semanticTokens from "./foundations/semanticTokens"
import transition from "./foundations/transition"
import typography from "./foundations/typography"
import zIndices from "./foundations/zIndices"
import global from "./global"

const overrides = {
  ...typography,
  ...borders,
  colors,
  components,
  config,
  styles: {
    global,
  },
  breakpoints,
  transition,
  zIndices,
  semanticTokens,
  fonts: {
    default: "var(--font-inter)",
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
    kode: "var(--font-kode-mono)",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
}

export default extendTheme(overrides)
