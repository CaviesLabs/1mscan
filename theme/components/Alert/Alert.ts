import { alertAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "0.5rem",
  },
  title: {
    textStyle: "875",
  },
  description: {
    textStyle: "875",
  },
  icon: {
    flexShrink: 0,
  },
  spinner: {
    flexShrink: 0,
  },
})

const variantSubtle = definePartsStyle((props) => {
  const { colorScheme } = props
  return {
    container: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      paddingX: 3,
      paddingY: 2,
      borderRadius: "0.5rem",
      borderWidth: "1px",
      color:
        (colorScheme === "green" && "secondary.02.text") ||
        (colorScheme === "orange" && "secondary.01.text") ||
        (colorScheme === "red" && "secondary.05.text") ||
        "neutral.light.7",
      backgroundColor:
        (colorScheme === "green" && "secondary.02.bg") ||
        (colorScheme === "orange" && "secondary.01.bg") ||
        (colorScheme === "red" && "secondary.05.bg") ||
        "white",
      borderColor:
        (colorScheme === "green" && "secondary.02") ||
        (colorScheme === "orange" && "secondary.01") ||
        (colorScheme === "red" && "secondary.05") ||
        "none",
      title: {
        textStyle: "875",
        color: (colorScheme === "green" && "secondary.02.text") || "black",
      },
      description: {
        color:
          (colorScheme === "green" && "secondary.02.text") ||
          (colorScheme === "orange" && "secondary.01.text") ||
          (colorScheme === "red" && "secondary.05.text") ||
          "neutral.light.7",
      },
    },
  }
})

const variantSuccess = definePartsStyle(() => {
  return {
    container: {
      backgroundColor: "secondary.02.bg",
      background: "secondary.02.bg",
      border: 0,
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      color: "secondary.02.text",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      gap: 3,
      paddingX: 3,
      paddingY: 2,
    },
  }
})

const variantVerifyContract = definePartsStyle((props) => {
  const { colorScheme } = props
  return {
    container: {
      display: "flex",
      alignItems: "center",
      gap: 3,
      paddingX: 3,
      paddingY: 2,
      borderRadius: "0.5rem",
      backgroundColor:
        (colorScheme === "green" && "secondary.02.bg") ||
        (colorScheme === "orange" && "secondary.01.bg") ||
        (colorScheme === "red" && "secondary.05.bg") ||
        "white",

      title: {
        textStyle: "875",
        color: (colorScheme === "green" && "secondary.02.text") || "black",
      },
      description: {
        color:
          (colorScheme === "green" && "secondary.02.text") ||
          (colorScheme === "orange" && "secondary.01.text") ||
          (colorScheme === "red" && "secondary.05.text") ||
          "neutral.light.7",
      },
    },
  }
})

const variants = {
  subtle: variantSubtle,
  success: variantSuccess,
  verifyContract: variantVerifyContract,
}

const Alert = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "subtle",
    colorScheme: "blue",
  },
})

export default Alert
