import type { ButtonProps } from "@chakra-ui/react"
import { Button, Center } from "@chakra-ui/react"
import type { ForwardedRef } from "react"
import { forwardRef, memo } from "react"
import type { IconSvgProps } from "../IconSvg"
import IconSvg from "../IconSvg"

type Props = {
  isOpen: boolean | undefined
  iconProps?: IconSvgProps
} & Partial<ButtonProps>

const ActionToggle = (
  { isOpen, onClick, iconProps, ...props }: Props,
  ref?: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <Button
      order={4}
      as={Center}
      borderRadius="100%"
      variant="unstyled"
      backgroundColor="neutral.light.2"
      onClick={onClick}
      display="flex"
      height="2.25rem"
      width="2.25rem"
      cursor="pointer"
      {...props}
      ref={ref}
    >
      <IconSvg
        name={isOpen ? "close" : "burger"}
        boxSize={4}
        color="neutral.light.7"
        {...iconProps}
      ></IconSvg>
    </Button>
  )
}

export default memo(forwardRef(ActionToggle))
