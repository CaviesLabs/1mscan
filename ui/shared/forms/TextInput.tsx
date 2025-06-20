import {
  Button,
  FormControl,
  type FormControlProps,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  type InputLeftAddonProps,
  type InputProps,
  InputRightAddon,
  type InputRightAddonProps,
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
  isDisabled?: boolean
  isSubmitting?: boolean
  placeholder?: string | ReactNode
  formControlProps?: FormControlProps
  ref?: ForwardedRef<HTMLInputElement>
  rightElement?: ReactNode
  rightProps?: InputRightAddonProps
  leftElement?: ReactNode
  leftProps?: InputLeftAddonProps
  inputProps?: InputProps
}

const TextInput = ({
  isSubmitting,
  placeholder,
  error,
  value,
  isDisabled,
  onChange,
  type,
  name,
  ref: parentRef,
  formControlProps,
  rightElement,
  rightProps,
  leftElement,
  leftProps,
  inputProps,
  ...props
}: Props) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const [localType, setLocalType] = useWatchState<
    HTMLInputTypeAttribute | undefined
  >(type)

  return (
    <FormControl
      isInvalid={Boolean(error)}
      width="auto"
      isRequired={false}
      isDisabled={isSubmitting || isDisabled}
      overflow="hidden"
      {...formControlProps}
    >
      <InputGroup
        position="relative"
        paddingX={2}
        flexShrink={0}
        borderWidth="1px"
        borderColor="neutral.light.4"
        _hover={{ borderColor: "neutral.light.5" }}
        height="3.375rem"
        borderRadius={2}
        paddingY={1}
        textStyle="1"
        variant="unstyled"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        {...props}
      >
        {leftElement && (
          <InputLeftAddon
            _empty={{ display: "none" }}
            height="full"
            display="inline-block"
            isTruncated
            padding={0}
            margin={0}
            lineHeight="inherit"
            fontSize="inherit"
            fontWeight="inherit"
            borderRadius="unset"
            {...leftProps}
          >
            {leftElement}
          </InputLeftAddon>
        )}
        <Input
          ref={(el) => {
            return multipleRef(el, parentRef, ref)
          }}
          flex={1}
          name={name}
          required={true}
          autoComplete="off"
          variant="unstyled"
          value={value}
          lineHeight="inherit"
          fontSize="inherit"
          fontWeight="inherit"
          color="neutral.light.7"
          margin={0}
          width="unset"
          isTruncated
          borderRadius="unset"
          placeholder={String(placeholder || "")}
          onChange={onChange}
          height="full"
          padding={0}
          _placeholder={{
            color: "neutral.light.5",
            isTruncated: true,
          }}
          _disabled={{
            color: "neutral.light.6",
            borderColor: "neutral.light.3",
            backgroundColor: "neutral.light.3",
            pointerEvents: "none",
            _hover: { borderColor: "neutral.light.3" },
          }}
          type={localType}
          {...inputProps}
        ></Input>
        <InputRightAddon
          _empty={{ display: "none" }}
          height="full"
          maxWidth="2.5rem"
          display="inline-block"
          isTruncated
          padding={0}
          margin={0}
          lineHeight="inherit"
          fontSize="inherit"
          fontWeight="inherit"
          borderRadius="unset"
          {...rightProps}
        >
          {rightElement}
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
        </InputRightAddon>
      </InputGroup>
      <ErrorMessage as={FormErrorMessage}>{error?.message}</ErrorMessage>
    </FormControl>
  )
}

export default memo(TextInput)
