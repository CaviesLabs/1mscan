import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import type React from "react"
import { memo } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const PhotoViewer = ({ isOpen, onClose, children }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        width="unset"
        maxWidth="calc(100vw - 2rem)"
        padding="0rem !important"
        overflow="hidden"
        background="none"
        boxShadow="none"
      >
        <ModalCloseButton
          position="fixed"
          top={{ base: 2.5, lg: 8 }}
          right={{ base: 2.5, lg: 8 }}
          color="neutral.light.7"
        />
        {children}
      </ModalContent>
    </Modal>
  )
}

export default memo(PhotoViewer, (prev, next) => {
  return (
    prev.isOpen === next.isOpen &&
    prev.children === next.children &&
    prev.onClose === next.onClose
  )
})
