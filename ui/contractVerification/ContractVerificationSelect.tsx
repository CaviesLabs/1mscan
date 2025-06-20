import { Controller, useFormContext } from "react-hook-form"
import SelectInputFloating from "ui/shared/forms/SelectInputFloating"
import type { FormFields } from "./types"

type Props = {
  name: keyof FormFields
  placeholder?: string
  items: { value: string; label: string }[]
  isDisabled?: boolean
  handleChange?: (newValue: string | undefined) => void
  isRequired?: boolean
}

const ContractVerificationSelect = ({
  name,
  isDisabled,
  items,
  placeholder,
  handleChange,
  isRequired,
}: Props) => {
  const { control } = useFormContext<FormFields>()
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({
        field: { value, onChange, onBlur, ...fieldProps },
        fieldState: { error },
        formState: { isSubmitting },
      }) => {
        return (
          <SelectInputFloating
            {...fieldProps}
            isSubmitting={isSubmitting}
            value={value as any}
            onChange={(e) => {
              onChange(e)
              handleChange?.((e.target?.value as any) || undefined)
            }}
            isDisabled={isDisabled}
            onBlur={onBlur}
            placeholder={placeholder}
            items={items}
            error={error}
            isRequired={isRequired}
          ></SelectInputFloating>
        )
      }}
    ></Controller>
  )
}

export default ContractVerificationSelect
