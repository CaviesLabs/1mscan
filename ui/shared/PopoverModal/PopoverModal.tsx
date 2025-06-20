import type { FlexProps } from "@chakra-ui/react"
import { Flex, useOutsideClick } from "@chakra-ui/react"
import type React from "react"
import { useRef } from "react"
import PopoverModalContextProvider from "./PopoverModalContext"

type Props = {
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
  isFullscreen?: boolean
  openDirection?: "right" | "zoom"
} & Partial<FlexProps>

const PopoverModal = ({
  isOpen,
  children,
  onClose,
  isFullscreen,
  openDirection = "right",
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  useOutsideClick({
    ref: ref as any,
    handler: () => {
      onClose?.()
    },
  })

  return (
    <PopoverModalContextProvider isOpen={isOpen} isFullscreen={isFullscreen}>
      <Flex
        boxShadow={
          isOpen
            ? { base: "-3px 0px 25px 10px rgba(0, 0, 0, 0.1)", lg: "none" }
            : undefined
        }
        backgroundColor="transparent"
        flexDirection="column"
        ref={ref}
        position={{
          base: isFullscreen === false ? "relative" : "fixed",
          lg: "relative",
        }}
        top={{ base: 0, lg: "unset" }}
        bottom={{ base: 0, lg: "unset" }}
        maxHeight="100dvh"
        width={{
          base: isFullscreen === false ? undefined : "100vw",
          lg: "unset",
        }}
        zIndex={isFullscreen === false ? 2 : 997}
        right={
          openDirection === "right"
            ? isFullscreen === false
              ? "unset"
              : { base: isOpen ? "0px" : "-100%", lg: "unset" }
            : 0
        }
        transition="right 0.5s ease-in-out"
        {...props}
      >
        {children}
      </Flex>
    </PopoverModalContextProvider>
  )
}

export default PopoverModal
