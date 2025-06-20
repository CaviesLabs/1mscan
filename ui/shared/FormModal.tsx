import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import type { JSX, ReactNode } from "react"

// import FormSubmitAlert from "ui/shared/FormSubmitAlert";

interface Props<TData> {
  isOpen: boolean
  onClose: () => void
  data?: TData
  title: string
  text?: string
  renderForm: (() => JSX.Element) | JSX.Element | ReactNode
  isAlertVisible?: boolean
  setAlertVisible?: (isAlertVisible: boolean) => void
}

export default function FormModal<TData>({
  isOpen,
  onClose,
  title,
  text,
  renderForm,
  isAlertVisible,
  setAlertVisible,
}: Props<TData>) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setAlertVisible?.(false)
        onClose?.()
      }}
      size={{ base: "md", lg: "md" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="neutral.light.8" textStyle="125">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {(isAlertVisible || text) && (
            <Box marginBottom={{ base: 6, lg: 8 }}>
              {text && (
                <Text lineHeight="30px" mb={3}>
                  {text}
                </Text>
              )}
              {/* {isAlertVisible && <FormSubmitAlert />} */}
            </Box>
          )}
          {typeof renderForm === "function" ? renderForm() : renderForm}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
