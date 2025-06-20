import { useToast } from "@chakra-ui/react"
import delay from "lib/delay"
import { setRouter } from "lib/router/setQuery"
import type { SocketMessage } from "lib/socket/types"
import useSocketChannel from "lib/socket/useSocketChannel"
import useSocketMessage from "lib/socket/useSocketMessage"
import React, { memo } from "react"
import type { ErrorOption, FieldPath } from "react-hook-form"
import { Controller, useFormContext } from "react-hook-form"
import type { FormFields } from "./types"
import { formatSocketErrors } from "./utils"

type Props = {
  submitPromiseResolver: React.MutableRefObject<
    ((value: unknown) => void) | undefined
  >
}
const ContractVerificationTrigger = ({ submitPromiseResolver }: Props) => {
  const { control, setError } = useFormContext<FormFields>()
  const toast = useToast()

  return (
    <Controller
      control={control}
      name="address"
      render={({
        field: { value: address },
        fieldState: { error },
        formState: { isSubmitting },
      }) => {
        const handleNewSocketMessage: SocketMessage.ContractVerification["handler"] =
          React.useCallback(
            async (payload) => {
              if (!address) return
              if (payload.status === "error") {
                const errors = formatSocketErrors(payload.errors)
                ;(
                  errors.filter(Boolean) as [
                    FieldPath<FormFields>,
                    ErrorOption,
                  ][]
                ).forEach(([field, error]) => setError(field, error))
                await delay(100) // have to wait a little bit, otherwise isSubmitting status will not be updated
                submitPromiseResolver.current?.(null)
                return
              }

              toast({
                position: "top-right",
                title: "Success",
                description: "Contract is successfully verified.",
                status: "success",
                variant: "subtle",
                isClosable: true,
              })

              setRouter(
                "/address/[hash]",
                { hash: address, tab: "contract" },
                { cleanQuery: true },
              )
            },
            [setError, toast, address],
          )

        const handleSocketError = React.useCallback(() => {
          if (!isSubmitting) {
            return
          }

          submitPromiseResolver.current?.(null)

          const toastId = "socket-error"
          !toast.isActive(toastId) &&
            toast({
              id: toastId,
              position: "top-right",
              title: "Error",
              description:
                "There was an error with socket connection. Try again later.",
              status: "error",
              variant: "subtle",
              isClosable: true,
            })
          // callback should not change when form is submitted
          // otherwise it will resubscribe to channel, but we don't want that since in that case we might miss verification result message
        }, [toast, isSubmitting])

        const channel = useSocketChannel({
          topic: `addresses:${address?.toLowerCase()}`,
          onSocketClose: handleSocketError,
          onSocketError: handleSocketError,
          isDisabled: Boolean(address && error),
        })
        useSocketMessage({
          channel,
          event: "verification_result",
          handler: handleNewSocketMessage,
        })
        return <></>
      }}
    ></Controller>
  )
}

export default memo(ContractVerificationTrigger)
