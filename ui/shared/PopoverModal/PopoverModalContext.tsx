import { useSafeLayoutEffect } from "@chakra-ui/react"
import type React from "react"
import { createContext, useState } from "react"
type Props = {
  isOpen?: boolean
  children?: React.ReactNode
  isFullscreen?: boolean
  onClose?: () => void
}

type PopoverModalContextProps = {
  open: boolean
  isFullscreen?: boolean

  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
}
export const PopoverModalContext = createContext<
  Partial<PopoverModalContextProps>
>({})

const PopoverModalContextProvider = ({
  isOpen,
  children,
  onClose,
  isFullscreen,
}: Props) => {
  const [open, setOpen] = useState(Boolean(isOpen))
  const [fullscreen, setFullscreen] = useState(Boolean(isFullscreen))

  useSafeLayoutEffect(() => {
    if (typeof isOpen !== "boolean") return
    setOpen(isOpen)
  }, [isOpen])

  useSafeLayoutEffect(() => {
    if (typeof isFullscreen !== "boolean") return
    setFullscreen(isFullscreen)
  }, [isFullscreen])
  return (
    <PopoverModalContext.Provider
      value={{ open, setOpen, onClose, isFullscreen: fullscreen }}
    >
      {children}
    </PopoverModalContext.Provider>
  )
}

export default PopoverModalContextProvider
