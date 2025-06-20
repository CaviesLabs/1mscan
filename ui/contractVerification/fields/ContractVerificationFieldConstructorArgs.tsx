import { Link, Text } from "@chakra-ui/react"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import TextareaFloating from "ui/shared/forms/TextareaFloating"
import ContractVerificationFormRow from "../ContractVerificationFormRow"
import { descriptionStyle } from "../styles"

const ContractVerificationFieldConstructorArgs = () => {
  const { control, register } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormRow
      firstChildren={
        <Controller
          name="constructor_args"
          control={control}
          render={({
            field: { value: constructorAgrs, onChange },
            fieldState: { error },
            formState: { isSubmitting },
          }) => {
            return (
              <TextareaFloating
                {...register("constructor_args")}
                name="constructorAgrs"
                error={error}
                maxLength={255}
                isDisabled={isSubmitting}
                value={constructorAgrs}
                onChange={onChange}
                placeholder="ABI-encoded Constructor Arguments"
              ></TextareaFloating>
            )
          }}
        />
      }
      secondChildren={
        <Text {...descriptionStyle}>
          <span>Add arguments in </span>
          <Link
            href="https://solidity.readthedocs.io/en/develop/abi-spec.html"
            target="_blank"
          >
            ABI hex encoded form
          </Link>
          <span>
            {" "}
            if required by the contract. Constructor arguments are written right
            to left, and will be found at the end of the input created bytecode.
          </span>
          <span> They may also be </span>
          <Link href="https://abi.hashex.org/" target="_blank">
            parsed here
          </Link>
          <span>.</span>
        </Text>
      }
    ></ContractVerificationFormRow>
  )
}

export default React.memo(ContractVerificationFieldConstructorArgs)
