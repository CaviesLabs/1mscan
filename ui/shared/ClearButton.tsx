import { IconButton, chakra } from "@chakra-ui/react"
import type React from "react"

import IconSvg from "ui/shared/IconSvg"

interface Props {
  onClick: (e: React.SyntheticEvent) => void
  isDisabled?: boolean
  className?: string
}

const ClearButton = ({ onClick, isDisabled, className }: Props) => {
  return (
    <IconButton
      isDisabled={isDisabled}
      className={className}
      colorScheme="none"
      aria-label="Clear input"
      title="Clear input"
      boxSize={6}
      variant="none"
      icon={<IconSvg name="status/error" boxSize={3} />}
      size="sm"
      onClick={onClick}
    />
  )
}

export default chakra(ClearButton)
