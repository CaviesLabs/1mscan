import { defineStyle, defineStyleConfig } from "@chakra-ui/react"
import { getColorVar } from "@chakra-ui/theme-tools"

const outline = defineStyle({
  borderRadius: "0.5rem",
  padding: { base: 4, lg: 5 },
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: "1.5rem",
  color: "neutral.light.7",
  borderWidth: "1px",
  borderColor: "neutral.light.3",
  boxShadow: "unset",
  maxHeight: "300px",
})

const error = defineStyle(({ theme }) => {
  const secondary05Bg = getColorVar(theme, "secondary.05.bg")
  const secondary05Text = getColorVar(theme, "secondary.05.text")
  return {
    borderRadius: "0.5rem",
    padding: 4,
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    color: "neutral.light.7",
    borderWidth: "1px",
    borderColor: secondary05Text,
    boxShadow: "unset",
    overflowY: "auto",
    width: "full",
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
    backgroundColor: secondary05Bg,
  }
})

const Code = defineStyleConfig({
  baseStyle: {
    fontFamily: "default",
    borderRadius: "0.5rem",
    padding: 1,
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    color: "neutral.light.7",
    // borderWidth: "1px",
    borderColor: "neutral.light.4",
    // borderColor: secondary05Text,
    boxShadow: "unset",
    overflowY: "auto",
    width: "full",
    wordBreak: "break-all",
    whiteSpace: "pre-wrap",
    // backgroundColor: secondary05Bg,
  },
  variants: { outline, error },
})

export default Code
