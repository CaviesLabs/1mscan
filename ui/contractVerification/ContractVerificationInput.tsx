import type { InputProps } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import TextInputFloating from "ui/shared/forms/TextInputFloating"
import type { FormFields } from "./types"

type Props = {
  name: keyof FormFields
  placeholder?: string
} & Partial<InputProps>

const ContractVerificationInput = ({
  name,
  placeholder,
  isDisabled,
  ...props
}: Props) => {
  const { control } = useFormContext<FormFields>()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
      }) => {
        return (
          <TextInputFloating
            isSubmitting={isSubmitting}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            error={error}
            isDisabled={isDisabled}
            {...props}
          ></TextInputFloating>
        )
      }}
    ></Controller>
  )
}

export default ContractVerificationInput
