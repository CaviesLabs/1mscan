import type {
  InputGroupProps,
  InputLeftAddonProps,
  InputProps,
} from "@chakra-ui/react"
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react"
import type React from "react"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import { newOnChangeEvent } from "ui/utils/dom"

export type SearchInputProps = {
  leftProps?: Partial<InputLeftAddonProps>
  groupProps?: Partial<InputGroupProps>
  ref?: React.ForwardedRef<HTMLInputElement>
} & InputProps

const SearchInput = ({
  groupProps,
  value,
  onChange,
  ref,
  ...props
}: SearchInputProps) => {
  return (
    <InputGroup
      padding={2}
      height={9}
      borderWidth="1px"
      backgroundColor="neutral.light.1"
      borderColor="neutral.light.4"
      borderRadius="0.5rem"
      gap={3}
      transition="border-color 0.3s ease-in-out, color 0.3s ease-in-out"
      _hover={{
        borderColor: "neutral.light.5",
        color: "neutral.light.7",
      }}
      color="neutral.light.6"
      role="group"
      {...groupProps}
    >
      <InputLeftAddon
        padding={0}
        height="full"
        border="unset"
        backgroundColor="unset"
        display="flex"
        borderRadius={2}
        alignItems="center"
        justifyContent="center"
        color="inherit"
      >
        <IconSvg
          name="search"
          color="inherit"
          // _groupHover={{ color: "neutral.light.6" }}
          transition="all 0.3s ease-in-out"
          boxSize={4}
        />
      </InputLeftAddon>
      <Input
        variant="unstyled"
        height="full"
        padding={0}
        color="neutral.light.7"
        placeholder="Search here"
        fontSize="0.875rem"
        fontWeight={400}
        lineHeight="1.25rem"
        _placeholderShown={{
          color: "neutral.light.5",
          textOverflow: "ellipsis",
        }}
        _groupHover={{ color: "neutral.light.8" }}
        _placeholder={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          color: "neutral.light.5",
          textStyle: "875",
        }}
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
      />

      <InputRightAddon
        marginY="auto"
        alignSelf="center"
        hidden={!value}
        padding={0}
        height="full"
        border={0}
        backgroundColor="unset"
        as="button"
        onClick={() => {
          const event = newOnChangeEvent("")
          onChange?.(event)
        }}
        boxSize={5}
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IconSvg name="clear" color="inherit" boxSize={4} />
      </InputRightAddon>
    </InputGroup>
  )
}

export default memo(SearchInput)
