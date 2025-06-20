import type {
  FlexProps,
  FormControlProps,
  FormLabelProps,
  InputProps,
  TextProps,
} from "@chakra-ui/react"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  chakra,
} from "@chakra-ui/react"
import { useWatchState } from "lib/hooks/useWatchState"
import type { ForwardedRef, HTMLInputTypeAttribute, ReactNode } from "react"
import { memo, useRef } from "react"
import type { FieldError } from "react-hook-form"
import { multipleRef } from "ui/utils/dom"
import IconSvg from "../IconSvg"
import ErrorMessage from "./ErrorMessage"
import HideShow from "./HideShow"

type Props = Partial<Omit<InputProps, "placeholder">> & {
  error?: FieldError
  isRequired?: boolean
  isDisabled?: boolean
  isSubmitting?: boolean
  labelProps?: FormLabelProps
  placeholder?: string | React.ReactNode
  formControlProps?: FormControlProps
  rightElement?: ReactNode
  ref?: ForwardedRef<HTMLInputElement>
  leftElement?: ReactNode
  titleLabel?: string
  titleLabelProps?: TextProps
  placeholderInput?: string
  description?: string
  descriptionProps?: TextProps
  warning?: string
  parentContentProps?: FlexProps
}

const TextInputFloating = ({
  type,
  isSubmitting,
  placeholder,
  error,
  value,
  isDisabled,
  onChange,
  labelProps,
  formControlProps,
  isRequired,
  rightElement,
  ref: parentRef,
  name,
  leftElement,
  titleLabel,
  titleLabelProps,
  placeholderInput,
  description,
  descriptionProps,
  warning,
  parentContentProps,
  ...inputProps
}: Props) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [localType, setLocalType] = useWatchState<
    HTMLInputTypeAttribute | undefined
  >(type)

  return (
    <Flex flexDir="column" gap="8px" {...parentContentProps}>
      {titleLabel && (
        <Text fontSize="16px" color="neutral.light.8" {...titleLabelProps}>
          {titleLabel}
          {isRequired && (
            <chakra.span ml={1} color="accent.red">
              {" *"}
            </chakra.span>
          )}
        </Text>
      )}
      <FormControl
        isInvalid={Boolean(error)}
        isDisabled={isSubmitting || isDisabled}
        sx={{
          "& .chakra-form__label": labelProps || {},
        }}
        {...formControlProps}
      >
        <FormLabel
          id={name}
          data-active={value || undefined}
          height="3.875rem"
          width="full"
          overflow="hidden"
          paddingX="0.75rem"
          paddingY="0.375rem"
          borderWidth="1px"
          borderColor="neutral.light.4"
          borderRadius="0.5rem"
          backgroundColor="neutral.light.1"
          _hover={{
            borderColor: "neutral.light.5",
          }}
          _disabled={{
            borderColor: "neutral.light.3",
            backgroundColor: "neutral.light.3",
            pointerEvents: "none",
            _hover: { borderColor: "neutral.light.3" },
          }}
          role="group"
          display="flex"
          alignItems="center"
          cursor="text"
          margin={0}
          _active={{
            gap: 1,
          }}
          gap={0}
          transition="all 0.15s ease-in-out"
          _focusWithin={{
            gap: 1,
          }}
          _invalid={{ borderColor: "accent.red" }}
        >
          {leftElement}
          <Flex
            flexDirection="column"
            alignItems="stretch"
            justifyContent="center"
            overflow="hidden"
            flex={1}
          >
            {typeof placeholder === "string" && (
              <Text
                aria-disabled={isSubmitting || isDisabled}
                _disabled={{
                  fontSize: "1rem !important",
                  lineHeight: "1.5rem !important",
                }}
                _groupActive={{
                  fontSize: "0.8125rem",
                  lineHeight: "0.875rem",
                }}
                _groupFocus={{
                  fontSize: "0.8125rem",
                  lineHeight: "0.875rem",
                }}
                _groupFocusWithin={{
                  fontSize: "0.8125rem",
                  lineHeight: "0.875rem",
                }}
                isTruncated
                transition="all 0.15s ease-in-out"
                padding={0}
                color="neutral.light.5"
                fontSize="1rem"
                fontWeight={400}
                lineHeight="1.5rem"
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
            <Input
              transition="all 0.15s ease-in-out"
              isDisabled={isSubmitting || isDisabled}
              autoComplete="off"
              variant="unstyled"
              _groupFocusWithin={{
                height: "1.5rem",
              }}
              _groupActive={{
                height: "1.5rem",
              }}
              _groupFocus={{
                height: "1.5rem",
              }}
              value={value || ""}
              borderRadius={0}
              padding={0}
              flexShrink={0}
              height={!placeholderInput ? 0 : "1.5rem"}
              fontSize="1rem"
              fontWeight={400}
              lineHeight="1.5rem"
              onChange={onChange}
              color="neutral.light.7"
              type={localType}
              {...inputProps}
              ref={(el) => {
                multipleRef(el, parentRef, ref)
              }}
              name={name}
              placeholder={placeholderInput}
              css={{
                "::-webkit-calendar-picker-indicator": {
                  display: "none",
                  "-webkit-appearance": "none",
                },
              }}
            />
          </Flex>
          {type === "password" && (
            <HideShow
              isOpen={localType === "password"}
              onClick={() => {
                setLocalType(localType === "password" ? "text" : "password")
              }}
            ></HideShow>
          )}
          {type === "date" && (
            <Button
              display="flex"
              alignItems="center"
              justifyContent="center"
              variant="unstyled"
              onClick={() => {
                ref?.current?.showPicker()
              }}
              boxSize={6}
              role="group"
            >
              <IconSvg
                name="calendar"
                boxSize="full"
                color="neutral.light.5"
                _hover={{ color: "neutral.light.7" }}
                transition="color 0.15s ease-in-out"
              ></IconSvg>
            </Button>
          )}
          {rightElement}
        </FormLabel>
        <ErrorMessage as={FormErrorMessage}>{error?.message}</ErrorMessage>
        {warning && <ErrorMessage>{warning}</ErrorMessage>}
        {description && (
          <Text fontSize="14px" color="neutral.light.5" {...descriptionProps}>
            {description}
          </Text>
        )}
      </FormControl>
    </Flex>
  )
}

export type TextInputFloatingProps = Props

export default memo(TextInputFloating)
