import { Code, chakra } from "@chakra-ui/react"
import { useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import useApiQuery from "lib/api/useApiQuery"

import CheckboxForm from "ui/shared/forms/CheckboxForm"
import SelectInputFloating from "ui/shared/forms/SelectInputFloating"
import ContractVerificationFormRow from "../ContractVerificationFormRow"

interface Props {
  isVyper?: Readonly<boolean>
}

const ContractVerificationFieldCompiler = ({ isVyper }: Props) => {
  const { control, getValues, resetField } = useFormContext<FormFields>()

  const { data: config } = useApiQuery("contract_verification_config")

  return (
    <>
      {!isVyper && (
        <ContractVerificationFormRow>
          <Controller
            name="isNightly"
            control={control}
            render={({
              field: { value: isNightly, onChange, onBlur, ...fieldProps },
              formState: { isSubmitting },
            }) => {
              return (
                <CheckboxForm
                  {...fieldProps}
                  onBlur={onBlur}
                  name="isNightly"
                  isChecked={isNightly}
                  onChange={(e) => {
                    const compiler = getValues("compiler")
                    if (compiler?.includes("nightly"))
                      resetField("compiler", { defaultValue: null })

                    onChange(e)
                  }}
                  isDisabled={isSubmitting}
                >
                  Include nightly builds
                </CheckboxForm>
              )
            }}
          ></Controller>
        </ContractVerificationFormRow>
      )}
      <ContractVerificationFormRow
        firstChildren={
          <Controller
            control={control}
            name="isNightly"
            render={({ field: { value: isNightly } }) => {
              return (
                <Controller
                  name="compiler"
                  control={control}
                  render={({
                    field: { value: compiler, onChange, ...fieldProps },
                    formState: { isSubmitting },
                    fieldState: { error },
                  }) => {
                    const items = useMemo(() => {
                      return (
                        (isVyper
                          ? config?.vyper_compiler_versions
                          : config?.solidity_compiler_versions) || []
                      )
                        .filter((version) => Boolean(version))
                        .filter((version) =>
                          isNightly
                            ? true
                            : !version.toLowerCase().includes("nightly"),
                        )
                        .map((version) => ({
                          value: version,
                          label: version,
                        }))
                    }, [config, isNightly])
                    return (
                      <SelectInputFloating
                        {...fieldProps}
                        isSubmitting={isSubmitting}
                        value={compiler as string}
                        onChange={onChange}
                        placeholder="Compiler (enter version or use the dropdown)"
                        isRequired
                        items={items}
                        error={error}
                      ></SelectInputFloating>
                    )
                  }}
                />
              )
            }}
          ></Controller>
        }
        secondChildren={
          !isVyper && (
            <chakra.div
              color="neutral.light.6"
              fontSize="0.875rem"
              fontWeight={400}
              lineHeight="1.25rem"
            >
              <span>The compiler version is specified in </span>
              <Code fontFamily="kode" color="secondary.03.text">
                pragma solidity X.X.X
              </Code>
              <span>
                . Use the compiler version rather than the nightly build. If
                using the Solidity compiler, run{" "}
              </span>
              <Code fontFamily="kode" color="secondary.03.text">
                solc —version
              </Code>
              <span> to check.</span>
            </chakra.div>
          )
        }
      ></ContractVerificationFormRow>
    </>
  )
}

export default ContractVerificationFieldCompiler
