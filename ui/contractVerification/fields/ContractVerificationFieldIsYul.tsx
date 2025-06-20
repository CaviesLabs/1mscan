import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import CheckboxForm from "ui/shared/forms/CheckboxForm"
import ContractVerificationFormRow from "../ContractVerificationFormRow"

const ContractVerificationFieldIsYul = () => {
  const { control, register } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormRow
      firstChildren={
        <Controller
          name="is_yul"
          control={control}
          render={({
            field: { value: isYul, onChange, onBlur },
            formState: { isSubmitting },
          }) => {
            return (
              <CheckboxForm
                {...register("is_yul")}
                onBlur={onBlur}
                name="is_yul"
                isChecked={isYul}
                onChange={onChange}
                isDisabled={isSubmitting}
              >
                Is Yul contract
              </CheckboxForm>
            )
          }}
        />
      }
    ></ContractVerificationFormRow>
  )
}

export default ContractVerificationFieldIsYul
