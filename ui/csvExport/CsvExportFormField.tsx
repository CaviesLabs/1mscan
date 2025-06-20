import React from "react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "./types"

import moment from "lib/date/moment"
import { capitalize } from "lodash"
import TextInputFloating from "ui/shared/forms/TextInputFloating"

interface Props {
  name: "from" | "to"
}

const CsvExportFormField = ({ name }: Props) => {
  const { control, register } = useFormContext<FormFields>()

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, name },
        fieldState: { error },
        formState,
      }) => {
        return (
          <TextInputFloating
            {...register(name)}
            error={error}
            type="date"
            value={value}
            onChange={onChange}
            isDisabled={formState.isSubmitting}
            autoComplete="off"
            max={moment().format("YYYY-MM-DD")}
            placeholder={capitalize(name)}
            formControlProps={{ width: { base: "full", lg: "18.875rem" } }}
          />
        )
      }}
    />
  )
}

export default React.memo(CsvExportFormField)
