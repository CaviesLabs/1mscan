import type {
  AlertStatus,
  ChakraProps,
  UseToastOptions,
} from "@chakra-ui/react"
import { CloseButton, HStack, Stack, chakra } from "@chakra-ui/react"
import { useMemo } from "react"
import type { IconName } from "./IconSvg"
import IconSvg from "./IconSvg"

const COLORS = {
  success: {
    backgroundColor: "secondary.02.bg",
    borderColor: "secondary.02",
    color: "secondary.02.text",
    icon: "status/success",
  },
  error: {
    backgroundColor: "secondary.05.bg",
    borderColor: "secondary.05",
    color: "secondary.05.text",
    icon: "status/error",
  },
  warning: {
    backgroundColor: "secondary.01.bg",
    borderColor: "secondary.01",
    color: "secondary.01.text",
    icon: "status/warning",
  },
  info: {
    backgroundColor: "secondary.04.bg",
    borderColor: "secondary.04",
    color: "secondary.04.text",
    icon: "status/info",
  },
  default: {
    backgroundColor: "secondary.06.bg",
    borderColor: "secondary.06",
    color: "secondary.06.text",
    icon: "status/info",
  },
  loading: {
    backgroundColor: "secondary.03.bg",
    borderColor: "secondary.03",
    color: "secondary.03.text",
    icon: "status/pending",
  },
} satisfies Record<
  AlertStatus | "default",
  {
    backgroundColor: ChakraProps["backgroundColor"]
    borderColor: ChakraProps["borderColor"]
    color: ChakraProps["color"]
    icon: IconName
  }
>

const Toast = ({
  onClose,
  title,
  description,
  id,
  isClosable,
  status,
}: UseToastOptions & {
  onClose: () => void
}) => {
  const { rootId, titleId, descriptionId } = useMemo(() => {
    return {
      rootId: `toast-${id}`,
      titleId: `toast-${id}-title`,
      descriptionId: `toast-${id}-description`,
    }
  }, [id])

  const { backgroundColor, borderColor, color, icon } = useMemo(() => {
    return COLORS[status as any] || COLORS.default
  }, [status])

  return (
    <Stack
      id={rootId}
      flexDirection="row"
      alignItems="flex-start"
      borderRadius={2}
      boxShadow="lg"
      paddingY={3}
      paddingLeft={4}
      paddingRight={3}
      display="flex"
      backgroundColor={backgroundColor}
      width="full"
      gap={3}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Stack flex={1} spacing={1}>
        <HStack
          alignItems="flex-end"
          color={color}
          id={titleId}
          textStyle="12500"
          display="inline-flex"
          flexWrap="wrap"
          flexDirection="row"
        >
          <IconSvg name={icon} marginY="auto" boxSize={5} color="inherit" />
          <chakra.span whiteSpace="pre-line" wordBreak="break-word">
            {title || status?.capitalizeFirstLetter()}
          </chakra.span>
        </HStack>

        {description && (
          <chakra.span
            color="neutral.light.7"
            id={descriptionId}
            textStyle="875"
            whiteSpace="pre-wrap"
            wordBreak="break-word"
          >
            {description}
          </chakra.span>
        )}
      </Stack>
      {isClosable && (
        <CloseButton
          borderRadius="full"
          color="neutral.light.6"
          onClick={onClose}
          boxSize={5}
          alignSelf="flex-start"
        />
      )}
    </Stack>
  )
}

export default Toast
