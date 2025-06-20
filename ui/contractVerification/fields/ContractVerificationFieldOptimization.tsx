import { Flex } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import CheckboxForm from "ui/shared/forms/CheckboxForm"
import TextInput from "ui/shared/forms/TextInput"
import ContractVerificationFormRow from "../ContractVerificationFormRow"
import { DEFAULT_VALUES } from "../utils"

const ContractVerificationFieldOptimization = () => {
  const { control, setValue, getValues, register } =
    useFormContext<FormFields>()

  return (
    <ContractVerificationFormRow>
      <Controller
        name="is_optimization_enabled"
        control={control}
        render={({
          field: { value: isOptimizationEnabled, onChange },
          formState: { isSubmitting },
          fieldState: { error },
        }) => {
          return (
            <Flex gap={2} height="2rem" alignItems="center">
              <CheckboxForm
                {...register("is_optimization_enabled")}
                name="is_optimization_enabled"
                isChecked={isOptimizationEnabled}
                isDisabled={isSubmitting}
                error={error}
                onChange={(e) => {
                  onChange(e)

                  if (e.target?.checked) {
                    setValue(
                      "optimization_runs",
                      // @ts-ignore
                      DEFAULT_VALUES[getValues("method")]?.optimization_runs,
                    )
                  } else {
                    setValue("optimization_runs", "")
                  }
                }}
                width="max-content"
                flex={1}
                whiteSpace="nowrap"
                height="full"
              >
                Optimization enabled
              </CheckboxForm>

              <Controller
                name="optimization_runs"
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                  formState: { isSubmitting },
                }) => {
                  return (
                    <TextInput
                      {...register("optimization_runs")}
                      variant="form"
                      onBlur={onBlur}
                      display={isOptimizationEnabled ? undefined : "none"}
                      value={value}
                      onChange={onChange}
                      isRequired
                      isDisabled={isSubmitting}
                      autoComplete="off"
                      type="number"
                      backgroundColor="neutral.light.1"
                      error={error}
                      // size="xs"
                      height="full"
                    />
                  )
                }}
              ></Controller>
            </Flex>
          )
        }}
      ></Controller>
    </ContractVerificationFormRow>
  )
}

export default ContractVerificationFieldOptimization
