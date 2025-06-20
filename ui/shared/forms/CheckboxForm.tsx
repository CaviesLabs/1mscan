import type {
  ChakraProps,
  CheckboxProps,
  FormControlProps,
} from "@chakra-ui/react"
import { Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react"
import type { ForwardedRef } from "react"
import type React from "react"
import { forwardRef } from "react"
import type { FieldError } from "react-hook-form"
import IconSvg from "../IconSvg"
import ErrorMessage from "./ErrorMessage"

type Props = Partial<CheckboxProps> & {
  isChecked: boolean
  children?: React.ReactNode
  error?: FieldError
  isDisabled?: boolean
  isSubmitting?: boolean
  controlProps?: Partial<FormControlProps>
  inputProps?: ChakraProps
  checkboxControlProps?: ChakraProps
}

const CheckboxForm = (
  {
    onChange,
    children,
    error,
    isChecked,
    isDisabled,
    isSubmitting,
    controlProps,
    inputProps,
    checkboxControlProps,
    ...props
  }: Props,
  parentRef: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <FormControl
      isInvalid={Boolean(error)}
      isDisabled={isSubmitting || isDisabled}
      _disabled={{ cursor: "default" }}
      {...controlProps}
    >
      <Checkbox
        isDisabled={isSubmitting || isDisabled}
        ref={parentRef}
        name={props.name}
        isChecked={isChecked}
        onChange={onChange}
        colorScheme="blue"
        size="lg"
        role="group"
        variant="unstyled"
        sx={{
          "& .chakra-checkbox__control": {
            backgroundColor: "neutral.light.1",
            transition: "all 0.15s ease-in-out",
            ...checkboxControlProps,
          },
          "& .chakra-checkbox__input": { display: "none", ...inputProps },
        }}
        _checked={{
          "& .chakra-checkbox__control": { backgroundColor: "primary.light.4" },
        }}
        _disabled={{
          cursor: "default",
          "& .chakra-checkbox__control": {
            backgroundColor: "neutral.light.3",
            borderWidth: 0,
          },
        }}
        icon={(() =>
          !isDisabled ? (
            <IconSvg name="check" color="white" boxSize={4}></IconSvg>
          ) : undefined)()}
        {...props}
      >
        {children}
      </Checkbox>

      <ErrorMessage as={FormErrorMessage}>{error?.message}</ErrorMessage>
    </FormControl>
  )
}

export default forwardRef(CheckboxForm)
