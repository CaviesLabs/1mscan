import type { FlexProps, FormLabelProps, InputProps } from "@chakra-ui/react"
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
  chakra,
  useOutsideClick,
} from "@chakra-ui/react"
import { debounce } from "lodash"
import type { ChangeEvent, ForwardedRef } from "react"
import { memo, useCallback, useEffect, useMemo, useRef } from "react"
import type { FieldError } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import { newOnChangeEvent } from "ui/utils/dom"
import IconSvg from "../IconSvg"
import ErrorMessage from "./ErrorMessage"
import { smartSearchInArray } from "./utils"

interface Props extends Partial<InputProps> {
  error?: FieldError
  isSubmitting?: boolean
  placeholder?: string
  items: { value: string; label: string }[]
  value: string
  isDisabledTyping?: boolean
  isRequired?: boolean
  labelProps?: FormLabelProps
  menuProps?: FlexProps
  ref?: ForwardedRef<HTMLInputElement>
}

const SelectInputFloating = ({
  items,
  placeholder,
  isSubmitting,
  onChange: parentOnChange,
  value,
  error,
  onBlur,
  isDisabled,
  isRequired,
  isDisabledTyping,
  ref: parentRef,
  labelProps,
  menuProps,
  ...inputProps
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const { control, setValue, getValues } = useForm({
    defaultValues: { text: value || "", options: items, isOpen: false },
  })

  useOutsideClick({
    ref: ref as any,
    handler: () => {
      if (getValues("isOpen") === true) setValue("isOpen", false)
    },
  })

  useEffect(() => {
    if (value !== getValues("text")) setValue("text", value || "")
  }, [value])

  useEffect(() => {
    setValue("options", items)
  }, [items])

  return (
    <FormControl
      ref={ref}
      position="relative"
      role="group"
      onClick={() => {
        if (isSubmitting || isDisabled) return
        setValue("isOpen", true)
      }}
      onBlur={onBlur}
      isInvalid={Boolean(error)}
      isDisabled={isSubmitting || isDisabled}
      _disabled={{ opacity: 1 }}
      sx={{
        "& .chakra-form__label": labelProps || {},
      }}
    >
      <Controller
        control={control}
        name="isOpen"
        render={({ field: { value: isOpen, onChange: onIsOpenChange } }) => {
          return (
            <>
              <InputGroup>
                <Controller
                  control={control}
                  name="text"
                  render={({ field: { value: text, onChange } }) => {
                    const displayText = useMemo(
                      () =>
                        items.find((item) => item.value === text)?.label ||
                        text ||
                        "",
                      [items, text],
                    )

                    const handleChange = useCallback(
                      (e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target?.value || ""

                        onChange(value)
                        if (!value) {
                          setValue("options", items)
                          const event = newOnChangeEvent(null)
                          parentOnChange?.(event)
                          return
                        }

                        debounce(() => {
                          const newItems = smartSearchInArray(
                            items.map((item) => `${item.value}-${item.label}`),
                            value,
                          ).map((index) => items[index])
                          setValue("options", newItems)
                        }, 100)()
                      },
                      [],
                    )
                    return (
                      <FormLabel
                        id={inputProps.name}
                        height="3.875rem"
                        width="full"
                        paddingX="0.75rem"
                        paddingY="0.375rem"
                        borderWidth="1px"
                        borderColor="neutral.light.4"
                        borderRadius="0.5rem"
                        backgroundColor="neutral.light.1"
                        _hover={{
                          borderColor:
                            (Boolean(error) && "accent.red") ||
                            "neutral.light.5",
                        }}
                        margin={0}
                        display="flex"
                        flexDirection="column"
                        gap={displayText || isOpen ? 1 : undefined}
                        alignItems="stretch"
                        justifyContent="center"
                        transition="all 0.15s ease-in-out"
                        cursor={isDisabledTyping ? "pointer" : "text"}
                        style={
                          isDisabledTyping ? { caretColor: "transparent" } : {}
                        }
                        position="relative"
                        _disabled={{
                          borderColor: "neutral.light.3",
                          backgroundColor: "neutral.light.3",
                          pointerEvents: "none",
                          _hover: { borderColor: "neutral.light.3" },
                        }}
                        _invalid={{ borderColor: "accent.red" }}
                      >
                        {typeof placeholder === "string" && (
                          <Text
                            cursor="text"
                            transition="all 0.15s ease-in-out"
                            padding={0}
                            color="neutral.light.5"
                            fontSize={
                              displayText || isOpen ? "0.8125rem" : "1rem"
                            }
                            fontWeight={400}
                            lineHeight={
                              displayText || isOpen ? "0.875rem" : "1.5rem"
                            }
                            margin={0}
                            _invalid={{ color: "accent.red" }}
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
                          name={inputProps.name}
                          transition="all 0.15s ease-in-out"
                          required
                          isDisabled={isSubmitting || isDisabled}
                          autoComplete="off"
                          variant="unstyled"
                          borderRadius={0}
                          padding={0}
                          flexShrink={0}
                          height={displayText || isOpen ? "1.5rem" : 0}
                          fontSize="1rem"
                          fontWeight={400}
                          lineHeight="1.5rem"
                          color="neutral.light.7"
                          value={displayText}
                          onChange={handleChange}
                          disabled={isDisabled}
                          ref={parentRef}
                          cursor={isDisabledTyping ? "pointer" : "text"}
                          onKeyDown={(e) => {
                            if (isDisabledTyping) {
                              e.preventDefault()
                              return false
                            }
                            return e
                          }}
                          {...inputProps}
                        />
                      </FormLabel>
                    )
                  }}
                ></Controller>
                <InputRightElement
                  top="50%"
                  right={3}
                  transform="translate(0, -50%)"
                  padding={0}
                  aria-disabled={isSubmitting || isDisabled}
                  _disabled={{
                    pointerEvents: "none",
                  }}
                  onClick={(e) => {
                    if (isSubmitting || isDisabled) {
                      e.stopPropagation()
                      return
                    }
                    onIsOpenChange(!isOpen)
                    e.stopPropagation()
                  }}
                >
                  <IconSvg
                    boxSize={6}
                    color="neutral.light.6"
                    name="arrows/east-mini"
                    transition="all 0.2s linear"
                    transform={isOpen ? "rotate(90deg)" : "rotate(-90deg)"}
                  ></IconSvg>
                </InputRightElement>
              </InputGroup>
              <Box
                position="absolute"
                top="calc(100% + 0.5rem)"
                left={0}
                right={0}
                visibility={isOpen ? "visible" : "hidden"}
                opacity={isOpen ? 1 : 0}
                zIndex={8}
                transition="all 0.2s ease-in-out"
                overflowX="hidden"
                borderRadius="0.5rem"
                borderWidth="1px"
                borderColor="neutral.light.3"
                backgroundColor="neutral.light.1"
                paddingY={1}
                paddingX={0}
                boxShadow="xl"
                maxHeight="16.5rem"
                overflowY="auto"
                {...menuProps}
              >
                <List>
                  <Controller
                    control={control}
                    name="options"
                    render={({ field: { value: options } }) => {
                      return (
                        <>
                          {options?.map((item) => {
                            const selected = (value as any) === item.value
                            return (
                              <ListItem
                                key={item.value}
                                value={item.value as any}
                                onClick={(e) => {
                                  const newValue = selected
                                    ? undefined
                                    : item.value

                                  const event = newOnChangeEvent(newValue)
                                  parentOnChange?.(event)
                                  setValue("isOpen", false)
                                  e.stopPropagation()
                                  setValue("text", newValue || "")
                                }}
                                color={
                                  selected ? "secondary.05.text" : undefined
                                }
                                cursor="pointer"
                                _hover={{
                                  backgroundColor: "primary.light.1",
                                }}
                                paddingX={2}
                                paddingY={1}
                                width="full"
                                height="2.75rem"
                                display="flex"
                                alignItems="center"
                              >
                                <span>{item.label}</span>
                              </ListItem>
                            )
                          })}
                          {!options?.length && (
                            <Flex
                              textAlign="center"
                              height="2.75rem"
                              width="full"
                              justifyContent="center"
                            >
                              <chakra.span
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                cursor="default"
                                textAlign="center"
                              >
                                Not found ...
                              </chakra.span>
                            </Flex>
                          )}
                        </>
                      )
                    }}
                  ></Controller>
                </List>
              </Box>
            </>
          )
        }}
      ></Controller>

      <ErrorMessage as={FormErrorMessage}>{error?.message}</ErrorMessage>
    </FormControl>
  )
}

export type SelectInputFloatingProps = Props

export default memo(SelectInputFloating)
