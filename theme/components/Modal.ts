import { modalAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
import { runIfFn } from "@chakra-ui/utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyleDialog = defineStyle((props) => {
  return {
    padding: 8,
    borderRadius: "lg",
    bg: mode("white", "gray.900")(props),
    margin: "auto",
  }
})

const baseStyleDialogContainer = defineStyle({
  "::-webkit-scrollbar": { display: "none" },
  "scrollbar-width": "none",
  padding: 4,

  "& .chakra-modal__content": {
    display: "flex",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "neutral.light.3",
    boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.10)",
    color: "neutral.light.8",
    // maxWidth: "37.5rem",
    // width: "full",
    gap: 6,
    padding: 6,
  },
})

const baseStyleHeader = defineStyle(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  textStyle: "125",
  color: "neutral.light.8",
  marginY: 0,
  marginLeft: 0,
  marginRight: 8,
  padding: 0,
}))

const baseStyleBody = defineStyle({
  padding: 0,
  marginBottom: 8,
  flex: "initial",
})

const baseStyleFooter = defineStyle({
  padding: 0,
  justifyContent: "flex-end",
})

const baseStyleCloseButton = defineStyle(() => {
  return {
    top: "1.5rem",
    right: "1.5rem",
    boxSize: 6,
    color: "neutral.light.5",
    _hover: { color: "primary.light.3" },
    _active: { bg: "none" },
  }
})

const baseStyleOverlay = defineStyle({
  backgroundColor: "rgba(10, 10, 10, 0.20)",
})

const baseStyle = definePartsStyle((props) => ({
  dialog: runIfFn(baseStyleDialog, props),
  dialogContainer: baseStyleDialogContainer,

  header: runIfFn(baseStyleHeader),
  body: baseStyleBody,
  footer: baseStyleFooter,
  closeButton: runIfFn(baseStyleCloseButton),
  overlay: baseStyleOverlay,
}))

const sizes = {
  sm: definePartsStyle({
    dialogContainer: {
      height: "100%",
    },
    dialog: {
      maxW: "536px",
    },
  }),
  md: definePartsStyle({
    dialogContainer: {
      height: "100%",
    },
    dialog: {
      maxW: "760px",
    },
  }),
  full: definePartsStyle({
    dialogContainer: {
      height: "100%",
    },
    dialog: {
      maxW: "100vw",
      my: "0",
      borderRadius: "0",
      padding: "80px 16px 32px 16px",
      height: "100%",
      overflowY: "scroll",
    },
    closeButton: {
      top: 4,
      right: 6,
      width: 6,
      height: 6,
    },
    header: {
      mb: 6,
    },
  }),
}

const Modal = defineMultiStyleConfig({
  sizes,
  baseStyle,
})

export default Modal
