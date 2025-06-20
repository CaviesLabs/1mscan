import { Box, Button, Flex, Text, chakra } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import useApiFetch from "lib/api/useApiFetch"
import getErrorObjStatusCode from "lib/errors/getErrorObjStatusCode"
import _ from "lodash"
import React, { memo, useCallback, useLayoutEffect } from "react"
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form"
import { Controller, FormProvider, useForm } from "react-hook-form"
import type { SmartContract } from "types/api/contract"
import type {
  SmartContractVerificationConfig,
  SmartContractVerificationMethod,
} from "types/api/contract"
import type { OSType } from "types/base"
import ContractVerificationFormGroup from "./ContractVerificationFormGroup"
import ContractVerificationFormRow from "./ContractVerificationFormRow"
import ContractVerificationInput from "./ContractVerificationInput"
import ContractVerificationSelect from "./ContractVerificationSelect"
import ContractVerificationTrigger from "./ContractVerificationTrigger"
import ContractVerificationFlattenSourceCode from "./methods/ContractVerificationFlattenSourceCode"
import ContractVerificationMultiPartFile from "./methods/ContractVerificationMultiPartFile"
import ContractVerificationStandardInput from "./methods/ContractVerificationStandardInput"
import ContractVerificationVyperContract from "./methods/ContractVerificationVyperContract"
import ContractVerificationVyperMultiPartFile from "./methods/ContractVerificationVyperMultiPartFile"
import ContractVerificationVyperStandardInput from "./methods/ContractVerificationVyperStandardInput"
import type { FormFields } from "./types"
import {
  METHOD_LABELS,
  getDefaultValues,
  prepareRequestBody,
  schema,
} from "./utils"

interface Props {
  method?: SmartContractVerificationMethod
  config: SmartContractVerificationConfig
  hash?: string
  os?: OSType
}

const ContractVerificationForm = ({
  method: methodFromQuery,
  config,
  hash,
}: Props) => {
  const formApi = useForm<FormFields>({
    defaultValues: getDefaultValues(methodFromQuery, config, hash),
    resolver: zodResolver(schema),
    shouldFocusError: true,
    reValidateMode: "onChange",
  })

  const { control, handleSubmit, setError, getValues, reset } = formApi

  const submitPromiseResolver = React.useRef<(value: unknown) => void>(() => {})

  const apiFetch = useApiFetch()

  useLayoutEffect(() => {
    const newDefaultsValue = getDefaultValues(methodFromQuery, config, hash)
    reset(newDefaultsValue)
  }, [config])

  const onFormSubmit: SubmitHandler<FormFields> = React.useCallback(
    async (data) => {
      const body = prepareRequestBody(data)

      try {
        const response = await apiFetch<"contract", SmartContract>("contract", {
          pathParams: { hash: data.address?.toLowerCase() },
        })

        const isVerifiedContract =
          "is_verified" in response && response?.is_verified

        // If the contract is already partially verified with flattened-code, we should not allow the user to verify it again
        if (data.method === "flattened-code" && isVerifiedContract) {
          setError("address", {
            message: "Contract has already been verified",
          })
          return Promise.resolve()
        }

        // If the contract is already verified, we should not allow the user to verify it again
        if (isVerifiedContract && !response.is_partially_verified) {
          setError("address", {
            message: "Contract has already been verified",
          })
          return Promise.resolve()
        }
      } catch (error) {
        const statusCode = getErrorObjStatusCode(error)
        const message =
          statusCode === 404
            ? "Address is not a smart contract"
            : "Something went wrong"
        setError("address", { message })
        return Promise.resolve()
      }

      try {
        await apiFetch("contract_verification_via", {
          pathParams: {
            method: data.method,
            hash: data.address?.toLowerCase(),
          },
          fetchParams: {
            method: "POST",
            body,
          },
        })
      } catch (error) {
        console.log(error)
        return
      }

      return new Promise((resolve) => {
        submitPromiseResolver.current = resolve
      })
    },
    [apiFetch, hash, setError],
  )

  const onInvalid: SubmitErrorHandler<FormFields> = useCallback(
    (errors) => {
      console.log(errors)
    },
    [hash],
  )

  return (
    <FormProvider {...formApi}>
      <chakra.form
        noValidate
        onSubmit={handleSubmit(onFormSubmit, onInvalid)}
        display="flex"
        width="full"
        gap={6}
        flexDirection="column"
        alignItems="flex-start"
      >
        <ContractVerificationTrigger
          submitPromiseResolver={submitPromiseResolver}
        ></ContractVerificationTrigger>
        <Flex
          width="full"
          flexDirection="column"
          gap={6}
          alignItems="stretch"
          flex={1}
        >
          <ContractVerificationFormGroup title="Contract address to verify">
            <ContractVerificationFormRow
              firstChildren={
                <ContractVerificationInput
                  name="address"
                  placeholder="Smart contract / Address (0x...)"
                  isRequired
                  isDisabled={Boolean(hash)}
                  isReadOnly={hash !== undefined && hash !== ""}
                ></ContractVerificationInput>
              }
            ></ContractVerificationFormRow>
          </ContractVerificationFormGroup>
          <ContractVerificationFormGroup title="Verification methods">
            <ContractVerificationFormRow
              firstChildren={
                <ContractVerificationSelect
                  placeholder="Verification method (complier type)"
                  isRequired
                  items={config.verification_options.map((value) => ({
                    value,
                    label: METHOD_LABELS[value],
                  }))}
                  handleChange={useCallback(
                    (newMethod: string | undefined) => {
                      const defaultValues = getDefaultValues(
                        newMethod as
                          | SmartContractVerificationMethod
                          | undefined,
                        config,
                        (getValues("address") || hash) as any,
                      )
                      const currentValues = getValues()

                      const resetValues = _.omit(defaultValues, [
                        "os",
                        "address",
                      ])

                      const newValues = {
                        os:
                          currentValues.os ||
                          (defaultValues &&
                            "os" in defaultValues &&
                            defaultValues.os) ||
                          null,
                        address:
                          currentValues.address || defaultValues?.address,
                        ...resetValues,
                        method: newMethod,
                      } as FormFields

                      reset(newValues)
                    },
                    [config, hash],
                  )}
                  name="method"
                ></ContractVerificationSelect>
              }
            ></ContractVerificationFormRow>
          </ContractVerificationFormGroup>

          <Controller
            control={control}
            name="method"
            render={({ field: { value: method } }) => {
              return (
                <>
                  {method && (
                    <Box
                      w="full"
                      background="neutral.light.3"
                      height="1px"
                    ></Box>
                  )}
                  {/* switch case using chain */}
                  {_.chain(method)
                    .thru((method) => {
                      switch (method) {
                        case "flattened-code":
                          return <ContractVerificationFlattenSourceCode />
                        case "standard-input":
                          return <ContractVerificationStandardInput />
                        case "multi-part":
                          return <ContractVerificationMultiPartFile />
                        case "vyper-code":
                          return <ContractVerificationVyperContract />
                        case "vyper-standard-input":
                          return <ContractVerificationVyperStandardInput />
                        case "vyper-multi-part":
                          return <ContractVerificationVyperMultiPartFile />
                        default:
                          return <></>
                      }
                    })
                    .value()}
                  {method && (
                    <Box
                      w="full"
                      background="neutral.light.3"
                      height="1px"
                    ></Box>
                  )}
                </>
              )
            }}
          ></Controller>
        </Flex>

        <Controller
          control={control}
          name="method"
          render={({
            field: { value: method },
            formState: { isSubmitting },
          }) => {
            return method ? (
              <Button
                variant="solid"
                size="lg"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Verify & publish"
              >
                <Text variant="light1">Verify & publish</Text>
              </Button>
            ) : (
              <></>
            )
          }}
        ></Controller>
      </chakra.form>
    </FormProvider>
  )
}

export default memo(ContractVerificationForm, (prev, next) => {
  return (
    prev.method === next.method &&
    prev.config === next.config &&
    prev.hash === next.hash
  )
})
