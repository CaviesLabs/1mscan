import type { TextProps } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

const Title = ({ children, as, ...props }: TextProps) => {
  return (
    <Text
      as={as || "h2"}
      textStyle={(as === "h3" && "125") || (as === "h4" && "1125500") || "175"}
      color={(as === "h4" && "neutral.light.7") || "neutral.light.8"}
      letterSpacing={
        (as === "h3" && "-0.0125rem") || (as === "h4" && "0rem") || "-0.035rem"
      }
      {...props}
    >
      {children}
    </Text>
  )
}

export default Title
