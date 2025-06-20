import { Controller, useFormContext } from "react-hook-form"
import type { SelectInputFloatingProps } from "ui/shared/forms/SelectInputFloating"
import SelectInputFloating from "ui/shared/forms/SelectInputFloating"
import type { IForm } from "./utils"

type Props = {
  name: keyof IForm
  placeholder?: string
  items: { value: string; label: string }[]
  isDisabled?: boolean
  handleChange?: (newValue: string | undefined) => void
} & Partial<SelectInputFloatingProps>

const CodeIDVerificationSelect = ({
  name,
  isDisabled,
  items,
  placeholder,
  handleChange,
  ...props
}: Props) => {
  const { control } = useFormContext<IForm>()
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
      }) => {
        return (
          <SelectInputFloating
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
            {...props}
          ></SelectInputFloating>
        )
      }}
    ></Controller>
  )
}

export default CodeIDVerificationSelect
