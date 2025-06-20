import React from "react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import CheckboxForm from "ui/shared/forms/CheckboxForm"
import ContractVerificationFormRow from "../ContractVerificationFormRow"
import ContractVerificationFieldConstructorArgs from "./ContractVerificationFieldConstructorArgs"

const ContractVerificationFieldAutodetectArgs = () => {
  const { control, resetField, register } = useFormContext<FormFields>()

  return (
    <Controller
      name="autodetect_constructor_args"
      control={control}
      render={({
        field: { value: autodetectConstructorArgs, onChange },
        formState: { isSubmitting },
        fieldState: { error },
      }) => {
        return (
          <>
            <ContractVerificationFormRow
              firstChildren={
                <CheckboxForm
                  {...register("autodetect_constructor_args")}
                  name="autodetect_constructor"
                  isDisabled={isSubmitting}
                  error={error}
                  isChecked={autodetectConstructorArgs}
                  onChange={(e) => {
                    if (!e.target?.checked) resetField("constructor_args")
                    onChange(e)
                  }}
                >
                  Try to fetch constructor arguments automatically
                </CheckboxForm>
              }
            ></ContractVerificationFormRow>

            {autodetectConstructorArgs && (
              <ContractVerificationFieldConstructorArgs />
            )}
          </>
        )
      }}
    ></Controller>
  )
}

export default React.memo(ContractVerificationFieldAutodetectArgs)
