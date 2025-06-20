import { Flex, IconButton, Text } from "@chakra-ui/react"
import { useCallback, useEffect } from "react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import IconSvg from "ui/shared/IconSvg"
import CheckboxForm from "ui/shared/forms/CheckboxForm"
import TextInputFloating from "ui/shared/forms/TextInputFloating"
import ContractVerificationFormRow from "../ContractVerificationFormRow"
import { descriptionStyle } from "../styles"

const ContractVerificationFieldLibraries = () => {
  const { control, setValue, getValues, resetField } =
    useFormContext<FormFields>()

  return (
    <Flex flexDirection="column" gap={4}>
      <ContractVerificationFormRow>
        <Controller
          control={control}
          name="isLibraries"
          render={({
            field: { value: isLibraries, onChange, ...field },
            formState: { isSubmitting },
          }) => {
            return (
              <CheckboxForm
                {...field}
                name="isLibraries"
                isChecked={isLibraries}
                onChange={(e) => {
                  onChange(e)
                  if (e.target.checked) {
                    setValue("libraries", [
                      {
                        id: Math.random().toString(),
                        library_name: "",
                        address: "",
                      },
                    ])
                  } else {
                    resetField("libraries", { defaultValue: [] })
                    // setValue("libraries", []);
                  }
                }}
                isDisabled={isSubmitting}
              >
                Add contract libraries
              </CheckboxForm>
            )
          }}
        ></Controller>
      </ContractVerificationFormRow>

      <Controller
        control={control}
        name="libraries"
        render={() => {
          const { fields, remove, insert } = useFieldArray({
            name: "libraries",
            control,
          })

          const handleAddField = useCallback((index: number) => {
            insert(index + 1, {
              id: Math.random().toString(),
              library_name: "",
              address: "",
            })
          }, [])

          const handleRemoveField = useCallback((index: number) => {
            remove(index)
          }, [])
          useEffect(() => {
            if (getValues("isLibraries") !== Boolean(fields?.length))
              setValue("isLibraries", Boolean(fields?.length))
          }, [fields])
          return (
            <>
              {fields.map((library, index) => {
                return (
                  <Controller
                    key={library.id}
                    control={control}
                    name={`libraries.${index}` as any}
                    render={() => {
                      return (
                        <>
                          <Flex flexDirection="row" gap={5}>
                            <Text
                              flex={0.5}
                              color="neutral.light.6"
                              fontSize="1rem"
                              fontWeight={500}
                              lineHeight="1.5rem"
                            >
                              Contract library {index + 1}
                            </Text>
                            <Flex
                              columnGap={5}
                              flex={0.5}
                              justifyContent={{
                                base: "flex-end",
                                lg: "flex-start",
                              }}
                            >
                              {fields.length > 1 && (
                                <IconButton
                                  aria-label="delete"
                                  variant="unstyled"
                                  boxSize={6}
                                  icon={
                                    <IconSvg
                                      name="minus"
                                      color="neutral.light.5"
                                      boxSize={6}
                                    />
                                  }
                                  onClick={() => handleRemoveField(index)}
                                />
                              )}
                              {fields.length < 10 && (
                                <IconButton
                                  aria-label="add"
                                  variant="unstyled"
                                  boxSize={6}
                                  icon={
                                    <IconSvg
                                      name="library"
                                      color="neutral.light.5"
                                      boxSize={6}
                                    />
                                  }
                                  onClick={() => handleAddField(index)}
                                />
                              )}
                            </Flex>
                          </Flex>
                          <ContractVerificationFormRow
                            firstChildren={
                              <Controller
                                name={`libraries.${index}.library_name`}
                                control={control}
                                render={({
                                  field: {
                                    value: libraryName,
                                    onChange,
                                    onBlur,
                                    ...field
                                  },
                                  fieldState: { error },
                                  formState: { isSubmitting },
                                }) => {
                                  return (
                                    <TextInputFloating
                                      {...field}
                                      name={`libraries.${index}.library_name`}
                                      value={libraryName}
                                      onChange={onChange}
                                      isRequired
                                      placeholder="Library name (.sol file)"
                                      error={error}
                                      onBlur={onBlur}
                                      isDisabled={isSubmitting}
                                    ></TextInputFloating>
                                  )
                                }}
                              />
                            }
                            secondChildren={
                              index === 0 && (
                                <Text {...descriptionStyle}>
                                  A library name called in the .sol file.
                                  Multiple libraries (up to 10) may be added for
                                  each contract.
                                </Text>
                              )
                            }
                          ></ContractVerificationFormRow>
                          <ContractVerificationFormRow
                            firstChildren={
                              <Controller
                                name={`libraries.${index}.address`}
                                control={control}
                                render={({
                                  field: {
                                    value: libraryAddress,
                                    onChange,
                                    onBlur,
                                    ...field
                                  },
                                  fieldState: { error },
                                  formState: { isSubmitting },
                                }) => {
                                  return (
                                    <TextInputFloating
                                      {...field}
                                      value={libraryAddress}
                                      onChange={onChange}
                                      placeholder="Library address (0x...)"
                                      error={error}
                                      isRequired
                                      onBlur={onBlur}
                                      isDisabled={isSubmitting}
                                    ></TextInputFloating>
                                  )
                                }}
                              />
                            }
                            secondChildren={
                              index === 0 && (
                                <Text {...descriptionStyle}>
                                  The 0x library address. This can be found in
                                  the generated json file or Truffle output (if
                                  using truffle).
                                </Text>
                              )
                            }
                          ></ContractVerificationFormRow>
                        </>
                      )
                    }}
                  ></Controller>
                )
              })}
            </>
          )
        }}
      ></Controller>
    </Flex>
  )
}

export default ContractVerificationFieldLibraries
