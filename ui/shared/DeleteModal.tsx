import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import type { ReactNode } from "react"
import type React from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: ReactNode
  renderContent?: ReactNode
  mutationFn: () => Promise<unknown>
  onSuccess: () => Promise<void>
  onError?: (errors: any) => Promise<void>
}

const DeleteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  children,
  mutationFn,
  onSuccess,
  onError,
  renderContent,
}) => {
  const mutation = useMutation({
    mutationFn,
    onSuccess: async () => {
      onSuccess()
      onClose()
    },
    onError: onError,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={{ base: "full", lg: "23.75rem" }} width="full">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderContent || children}</ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              mutation.mutate()
            }}
            isLoading={mutation.isPending}
            isDisabled={false}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
