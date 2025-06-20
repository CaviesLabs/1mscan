import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import React from "react"
import type {
  Control,
  ControllerRenderProps,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form"
import { Controller } from "react-hook-form"

import type { SmartContractMethodArgType } from "types/api/contract"
import type { MethodFormFields } from "./types"

import ClearButton from "ui/shared/ClearButton"

import ContractMethodFieldZeroes from "./ContractMethodFieldZeroes"
import { addZeroesAllowed } from "./utils"

interface Props {
  control: Control<MethodFormFields>
  setValue: UseFormSetValue<MethodFormFields>
  getValues: UseFormGetValues<MethodFormFields>
  placeholder: string
  name: string
  valueType: SmartContractMethodArgType
  isDisabled: boolean
  onChange: () => void
}

const ContractMethodField = ({
  control,
  name,
  valueType,
  placeholder,
  setValue,
  getValues,
  isDisabled,
  onChange,
}: Props) => {
  const ref = React.useRef<HTMLInputElement>(null)

  const handleClear = React.useCallback(() => {
    setValue(name, "")
    onChange()
    ref.current?.focus()
  }, [name, onChange, setValue])

  const handleAddZeroesClick = React.useCallback(
    (power: number) => {
      const value = getValues()[name]
      const zeroes = Array(power).fill("0").join("")
      const newValue = value ? value + zeroes : "1" + zeroes
      setValue(name, newValue)
      onChange()
    },
    [getValues, name, onChange, setValue],
  )

  const hasZerosControl = addZeroesAllowed(valueType)

  const renderInput = React.useCallback(
    ({ field }: { field: ControllerRenderProps<MethodFormFields> }) => {
      return (
        <FormControl
          id={name}
          // flexBasis={{ base: "100%", lg: "calc((100% - 24px) / 3 - 65px)" }}
          // w={{ base: "100%", lg: "auto" }}
          // flexGrow={1}
          width="full"
          isDisabled={isDisabled}
        >
          <InputGroup size="xs" width="full">
            <Input
              {...field}
              ref={ref}
              padding="0.375rem 0.5rem 0.375rem 0.75rem"
              height="2.25rem"
              borderRadius="0.5rem"
              backgroundColor="neutral.light.1"
              borderWidth="1px"
              color="neutral.light.7"
              fontSize="0.875rem"
              fontWeight={400}
              lineHeight="1.25rem"
              borderColor="neutral.light.4"
              placeholder={placeholder}
              paddingRight={hasZerosControl ? "120px" : "40px"}
            />
            <InputRightElement
              w="auto"
              right={1}
              top="50%"
              transform="translate(0, -50%)"
              display="flex"
              alignItems="center"
              gap={3}
            >
              {field.value && (
                <ClearButton onClick={handleClear} isDisabled={isDisabled} />
              )}
              {hasZerosControl && (
                <ContractMethodFieldZeroes
                  onClick={handleAddZeroesClick}
                  isDisabled={isDisabled}
                />
              )}
            </InputRightElement>
          </InputGroup>
        </FormControl>
      )
    },
    [
      name,
      isDisabled,
      placeholder,
      hasZerosControl,
      handleClear,
      handleAddZeroesClick,
    ],
  )

  return <Controller name={name} control={control} render={renderInput} />
}

export default React.memo(ContractMethodField)
