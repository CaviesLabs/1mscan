import React from "react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import TextInputFloating from "ui/shared/forms/TextInputFloating"
import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFormRow from "../ContractVerificationFormRow"

interface Props {
  isDisabled?: boolean
}

const ContractVerificationFieldAddress = ({ isDisabled }: Props) => {
  const { control, register } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormGroup title="Contract address to verify">
      <ContractVerificationFormRow
        firstChildren={
          <Controller
            name="address"
            control={control}
            render={({
              field: { value: address, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextInputFloating
                  {...register("address")}
                  name="address"
                  value={String(address || "")}
                  onChange={onChange}
                  error={error}
                  isDisabled={isDisabled}
                ></TextInputFloating>
              )
            }}
          />
        }
      ></ContractVerificationFormRow>
    </ContractVerificationFormGroup>
  )
}

export default ContractVerificationFieldAddress
