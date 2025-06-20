import type {
  BoxProps,
  ModalCloseButtonProps,
  ModalHeaderProps,
  ModalProps,
  StackProps,
  TextProps,
} from "@chakra-ui/react"
import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import type { ForwardedRef, JSX, ReactNode } from "react"
import { memo, useImperativeHandle, useRef } from "react"
import type { UseFormReturn } from "react-hook-form"
import { useOverlay } from "ui/overlay/utils"
import ActionToggle from "ui/shared/button/ActionToggle"
import type { ProfileActionButtonProps } from "./ProfileActionButton"
import ProfileActionButton from "./ProfileActionButton"

export type ProfileContentState = {
  onOpen: () => Promise<void>
  onClose: () => void
}

type Props = {
  children?: ReactNode
  title?: ReactNode | JSX.Element
  footer?: ReactNode
  ref?: ForwardedRef<ProfileContentState>
  cancelTitle?: string
  actionTitle?: string
  onCancel?: () => void
  onHide?: () => void
  onSubmit?: (e?: any) => void
  onSuccess?: () => void
  submitButtonProps?: Partial<ProfileActionButtonProps>
  formApi?: UseFormReturn<any, any, any>
  disableSubmitWhenDirty?: boolean
  footerMoreInfo?: ReactNode
  modalProps?: Partial<ModalProps>
  titleProps?: Partial<TextProps>
  actionsProps?: Partial<StackProps>
  cancelProps?: Partial<ProfileActionButtonProps>
  footerMoreInfoProps?: Partial<BoxProps>
  hasCloseButton?: boolean
  headerProps?: ModalHeaderProps
  preTitle?: ReactNode
} & Partial<
  Omit<ModalCloseButtonProps, "ref" | "onSubmit" | "onOpen" | "title">
>

export type ProfileModalProps = Partial<Props>

const ProfileModal = ({
  title,
  children,
  footer,
  actionTitle,
  onCancel,
  onHide,
  onSubmit,
  onSuccess,
  cancelTitle,
  cancelProps,
  submitButtonProps,
  disableSubmitWhenDirty,
  footerMoreInfo,
  modalProps,
  titleProps,
  actionsProps,
  footerMoreInfoProps,
  hasCloseButton = true,
  headerProps,
  preTitle,
  ref,
  ...props
}: Props) => {
  const { onOpen, onClose, isOpen } = useOverlay()

  const waitPromiseRef = useRef<{
    resolve: AnyFunction
    reject: AnyFunction
  } | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      onOpen: () => {
        return new Promise<void>((resolve, reject) => {
          waitPromiseRef.current = {
            resolve: () => {
              resolve()
              onClose()
            },
            reject: () => {
              reject(false)
              onClose()
            },
          }
          onOpen()
        })
      },
      onClose: () => {
        onHide?.()
        waitPromiseRef.current?.reject()
      },
    }),
    [ref, onOpen, onClose],
  )

  return (
    <Modal
      isOpen={isOpen}
      autoFocus={false}
      onClose={() => {
        onHide?.()
        waitPromiseRef.current?.reject()
      }}
      {...modalProps}
    >
      <ModalOverlay backgroundColor="rgba(10, 10, 10, 0.20)" />
      <ModalContent
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
        }}
        padding={6}
        display="flex"
        borderRadius="0.5rem"
        borderWidth="1px"
        borderColor="neutral.light.3"
        boxShadow="0px 16px 32px 0px rgba(0, 0, 0, 0.10)"
        color="neutral.light.8"
        maxWidth="37.5rem"
        width="full"
        gap={6}
        css={{
          ".chakra-modal__content": {
            transitionProperty: "height, width, opacity",
            transitionDuration: "normal",
            transitionTimingFunction: "ease-in-out",
          },
        }}
        {...props}
      >
        <ModalHeader
          position="relative"
          display="flex"
          justifyContent="space-between"
          textStyle="125"
          color="neutral.light.8"
          margin="0 !important"
          {...headerProps}
        >
          {preTitle}
          {title && (
            <Text textStyle="125" as="h2" maxWidth="full" {...titleProps}>
              {title}
            </Text>
          )}

          {hasCloseButton && (
            <ActionToggle
              boxSize={6}
              color="neutral.light.5"
              isOpen={true}
              onClick={() => {
                onHide?.()
                waitPromiseRef.current?.reject()
              }}
            ></ActionToggle>
          )}
        </ModalHeader>

        {children && (
          <ModalBody
            margin="0 !important"
            gap={6}
            display="flex"
            flexDirection="column"
            flex={1}
          >
            {children}
          </ModalBody>
        )}

        <ModalFooter
          width="full"
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          flexWrap="wrap"
          alignItems={{ base: "stretch", lg: "center" }}
          justifyContent="space-between"
          gap={4}
          _empty={{ display: "none" }}
        >
          {footer}
          {!footer && (
            <>
              <Box flex={1} {...footerMoreInfoProps}>
                {footerMoreInfo}
              </Box>
              <HStack spacing={3} {...actionsProps}>
                <ProfileActionButton
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    return {
                      handler: () => {
                        onCancel?.()
                        waitPromiseRef.current?.reject()
                      },
                    }
                  }}
                  {...cancelProps}
                >
                  {cancelTitle || "Close"}
                </ProfileActionButton>
                {onSubmit && (
                  <ProfileActionButton
                    onClick={
                      (() => {
                        return {
                          handler: () => {
                            onSubmit()
                          },
                          onSuccess: () => {
                            onSuccess?.()
                            waitPromiseRef.current?.resolve()
                          },
                        }
                      }) as any
                    }
                    flex={1}
                    disableSubmitWhenDirty={disableSubmitWhenDirty}
                    // isDirty={
                    //   submitButtonProps?.isDisabled === false
                    //     ? true
                    //     : formApi?.formState?.isDirty
                    // }
                    // isSubmitting={formApi?.formState?.isSubmitting}
                    isDirty={true}
                    isSubmitting={false}
                    isDisabled={false}
                    type="submit"
                    variant="solid"
                    {...submitButtonProps}
                  >
                    {actionTitle || "Oke"}
                  </ProfileActionButton>
                )}
              </HStack>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default memo(ProfileModal)
