import type { ButtonProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import type { ForwardedRef } from "react"
import { forwardRef, useEffect, useState } from "react"
import IconSvg from "../IconSvg"

type Props = {
  isOpen: boolean
} & Partial<ButtonProps>

const HideShow = (
  { isOpen, onClick, ...props }: Props,
  ref?: ForwardedRef<HTMLButtonElement>,
) => {
  const [isShow, setIsShow] = useState(isOpen ?? false)
  useEffect(() => {
    if (isOpen !== isShow) {
      setIsShow(isOpen)
    }
  }, [isOpen])
  return (
    <Button
      display="flex"
      alignItems="center"
      justifyContent="center"
      variant="unstyled"
      onClick={onClick}
      boxSize={6}
      {...props}
      ref={ref}
    >
      <IconSvg
        name={isShow ? "eye-show" : "eye-hide"}
        boxSize="full"
        color="neutral.light.5"
      ></IconSvg>
    </Button>
  )
}

export default forwardRef(HideShow)
