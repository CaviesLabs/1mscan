import type { ChakraProps } from "@chakra-ui/react"
import {
  IconButton,
  Skeleton,
  Tooltip,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import type React from "react"
import { memo, useEffect, useState } from "react"

import type { IconSvgProps } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"

export type Props = {
  text: string | null
  isLoading?: boolean
  iconSvgProps?: IconSvgProps
  size?: "sm"
  onClick?: (event: React.MouseEvent) => void
} & Partial<ChakraProps>

const CopyToClipboard = ({
  text,
  isLoading,
  color,
  iconSvgProps,
  size,
  onClick,
  ...props
}: Props) => {
  const { hasCopied, onCopy } = useClipboard(text || "", 1000)
  const [copied, setCopied] = useState(false)
  // have to implement controlled tooltip because of the issue - https://github.com/chakra-ui/chakra-ui/issues/7107
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (hasCopied) {
      setCopied(true)
    } else {
      setCopied(false)
    }
  }, [hasCopied])

  const boxSize = (size === "sm" && 3) || 5

  if (isLoading) {
    return (
      <Skeleton
        boxSize={boxSize}
        borderRadius="sm"
        flexShrink={0}
        ml={2}
        {...props}
      />
    )
  }

  return (
    <Tooltip
      label={
        copied
          ? getLanguage("utils.copied")
          : getLanguage("utils.copy_to_clipboard")
      }
      isOpen={isOpen || copied}
    >
      <IconButton
        aria-label="copy"
        icon={(() => (
          <IconSvg
            name="copy"
            backgroundColor="transparent"
            color={color ?? "neutral.light.5"}
            boxSize={boxSize}
            {...iconSvgProps}
          />
        ))()}
        backgroundColor="transparent"
        boxSize={boxSize}
        color="gray.400"
        variant="simple"
        display="inline-block"
        flexShrink={0}
        onClick={(e) => {
          onCopy()
          onClick?.(e)
        }}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        // ml={2}
        borderRadius={0}
        {...props}
      />
    </Tooltip>
  )
}

export default memo(CopyToClipboard)
