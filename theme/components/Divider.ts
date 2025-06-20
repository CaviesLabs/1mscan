import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const baseStyle = defineStyle({
  backgroundColor: "neutral.light.4",
})

const Divider = defineStyleConfig({
  baseStyle,
})

export default Divider
