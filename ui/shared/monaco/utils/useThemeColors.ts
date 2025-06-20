import { useColorModeValue } from "@chakra-ui/react"

import * as themes from "./themes"

export default function useThemeColors() {
  const theme = useColorModeValue(themes.light, themes.dark)

  return theme.colors
}
