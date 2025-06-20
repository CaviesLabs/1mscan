import type { TextareaProps } from "@chakra-ui/react"
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
  chakra,
} from "@chakra-ui/react"
import type { ForwardedRef } from "react"
import { forwardRef } from "react"
import type { FieldError } from "react-hook-form"
import ErrorMessage from "./ErrorMessage"

type Props = Partial<TextareaProps> & {
  error?: FieldError
  isSubmitting?: boolean
  inputPlaceholder?: string
}

const TextareaFloating = (
  {
    isSubmitting,
    placeholder,
    error,
    value,
    onChange,
    isDisabled,
    isRequired,
    inputPlaceholder,
    ...inputProps
  }: Props,
  parentRef: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <FormControl
      isInvalid={Boolean(error)}
      isDisabled={isSubmitting || isDisabled}
    >
      <FormLabel
        id={inputProps.name}
        width="full"
        paddingX={4}
        paddingY={inputPlaceholder ? 0 : 3}
        borderWidth="1px"
        borderColor="neutral.light.4"
        borderRadius="0.5rem"
        backgroundColor="neutral.light.1"
        _hover={{
          borderColor: "neutral.light.5",
        }}
        role="group"
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="center"
        cursor="text"
        margin={0}
        transition="all 0.15s ease-in-out"
        gap={1}
        _disabled={{
          borderColor: "neutral.light.3",
          backgroundColor: "neutral.light.3",
          pointerEvents: "none",
          _hover: { borderColor: "neutral.light.3" },
        }}
        _invalid={{ borderColor: "accent.red" }}
      >
        <Box width="full" height="0.875rem">
          {typeof placeholder === "string" && (
            <Text
              transition="all 0.15s ease-in-out"
              _groupFocusWithin={
                value
                  ? undefined
                  : {
                      fontSize: "0.8125rem",
                      lineHeight: "0.875rem",
                    }
              }
              padding={0}
              color="neutral.light.5"
              fontSize={value ? "0.8125rem" : "1rem"}
              fontWeight={400}
              lineHeight={value ? "0.875rem" : "1.5rem"}
              margin={0}
            >
              {placeholder}
              {isRequired && (
                <chakra.span ml={1} color="accent.red">
                  *
                </chakra.span>
              )}
            </Text>
          )}
        </Box>
        <Textarea
          name={inputProps.name}
          ref={parentRef}
          required={isRequired}
          isDisabled={isSubmitting || isDisabled}
          autoComplete="off"
          variant="unstyled"
          // padding={0}
          _groupFocusWithin={{
            height: inputProps.height || inputProps.h || "1.5rem",
          }}
          value={value}
          borderRadius={0}
          padding={0}
          flexShrink={0}
          height={0}
          fontSize="1rem"
          fontWeight={400}
          lineHeight="1.5rem"
          onChange={onChange}
          color="neutral.light.7"
          _disabled={{ color: "neutral.light.3" }}
          {...inputProps}
          placeholder={inputPlaceholder}
        />
      </FormLabel>

      <ErrorMessage as={FormErrorMessage}>{error?.message}</ErrorMessage>
    </FormControl>
  )
}

export default forwardRef(TextareaFloating)
