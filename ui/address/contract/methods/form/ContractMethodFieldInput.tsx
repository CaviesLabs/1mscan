import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  chakra,
} from "@chakra-ui/react"
import React from "react"
import { useController, useFormContext } from "react-hook-form"
import { NumericFormat } from "react-number-format"

import type { ContractAbiItemInput } from "../types"

import ClearButton from "ui/shared/ClearButton"

import ContractMethodMultiplyButton from "./ContractMethodMultiplyButton"
import useFormatFieldValue from "./useFormatFieldValue"
import useValidateField from "./useValidateField"
import { getFieldLabel, matchInt } from "./utils"

interface Props {
  data: ContractAbiItemInput
  hideLabel?: boolean
  path: string
  className?: string
  isDisabled: boolean
  isOptional?: boolean
  level: number
}

const ContractMethodFieldInput = ({
  data,
  // hideLabel,
  path: name,
  className,
  isDisabled,
  isOptional: isOptionalProp,
  // level,
}: Props) => {
  const ref = React.useRef<HTMLInputElement>(null)

  const isNativeCoin = data.fieldType === "native_coin"
  const isOptional = isOptionalProp || isNativeCoin

  const argTypeMatchInt = React.useMemo(() => matchInt(data.type), [data.type])
  const validate = useValidateField({
    isOptional,
    argType: data.type,
    argTypeMatchInt,
  })
  const format = useFormatFieldValue({ argType: data.type, argTypeMatchInt })

  const { control, setValue, getValues } = useFormContext()
  const { field, fieldState } = useController({
    control,
    name,
    rules: { validate },
  })

  const hasMultiplyButton =
    argTypeMatchInt && Number(argTypeMatchInt.power) >= 64

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = format(event.target.value)
      field.onChange(formattedValue) // data send back to hook form
      setValue(name, formattedValue) // UI state
    },
    [field, name, setValue, format],
  )

  const handleClear = React.useCallback(() => {
    setValue(name, "")
    ref.current?.focus()
  }, [name, setValue])

  const handleMultiplyButtonClick = React.useCallback(
    (power: number) => {
      const zeroes = Array(power).fill("0").join("")
      const value = getValues(name)
      const newValue = format(value ? value + zeroes : "1" + zeroes)
      setValue(name, newValue)
    },
    [format, getValues, name, setValue],
  )

  const error = fieldState.error

  return (
    <FormControl isDisabled={isDisabled}>
      <InputGroup
        size="xs"
        position="relative"
        height="2.25rem"
        className={className}
      >
        <Input
          {...field}
          {...(argTypeMatchInt
            ? {
                as: NumericFormat,
                thousandSeparator: " ",
                decimalScale: 0,
                allowNegative: !argTypeMatchInt.isUnsigned,
              }
            : {})}
          ref={ref}
          onChange={handleChange}
          required={!isOptional}
          isInvalid={Boolean(error)}
          placeholder={`${getFieldLabel(data, !isOptional)}`}
          autoComplete="off"
          bgColor="neutral.light.1"
          paddingRight={hasMultiplyButton ? "120px" : "40px"}
          borderColor="neutral.light.4"
          borderWidth="1px"
          backgroundColor="neutral.light.1"
          textStyle="875"
          _hover={{
            boxShadow: "none",
          }}
          _groupFocusWithin={{
            boxShadow: "none",
          }}
          paddingX={3}
          height="full"
          width="full"
          paddingY={0}
        />
        <InputRightElement
          w="auto"
          right={3}
          position="absolute"
          top="50%"
          transform="translate(0%, -50%)"
        >
          {field.value !== undefined && field.value !== "" && (
            <ClearButton onClick={handleClear} isDisabled={isDisabled} />
          )}
          {hasMultiplyButton && (
            <ContractMethodMultiplyButton
              onClick={handleMultiplyButtonClick}
              isDisabled={isDisabled}
            />
          )}
        </InputRightElement>
      </InputGroup>
      {error && (
        <Box color="error" fontSize="sm" lineHeight={5} mt={1}>
          {error.message}
        </Box>
      )}
    </FormControl>
  )
}

export default React.memo(chakra(ContractMethodFieldInput))
