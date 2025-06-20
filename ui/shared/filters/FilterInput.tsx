import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react"
import type { ChangeEvent } from "react"
import React, { useCallback, useState } from "react"

import ClearButton from "ui/shared/ClearButton"
import IconSvg from "ui/shared/IconSvg"

type Props = {
  onChange: (searchTerm: string) => void
  className?: string
  size?: "xs" | "sm" | "md" | "lg"
  placeholder: string
  initialValue?: string
  isLoading?: boolean
}

const FilterInput = ({
  onChange,
  className,
  size = "sm",
  placeholder,
  initialValue,
  isLoading,
}: Props) => {
  const [filterQuery, setFilterQuery] = useState(initialValue || "")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const iconColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600")

  const handleFilterQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setFilterQuery(value)
      onChange(value)
    },
    [onChange],
  )

  const handleFilterQueryClear = useCallback(() => {
    setFilterQuery("")
    onChange("")
    inputRef?.current?.focus()
  }, [onChange])

  return (
    <Skeleton isLoaded={!isLoading} className={className} minW="250px">
      <InputGroup size={size}>
        <InputLeftElement
          pointerEvents="none"
          top="50%"
          left={1}
          transform="translate(0, -50%)"
        >
          <IconSvg name="search" color={iconColor} boxSize={4} />
        </InputLeftElement>

        <Input
          ref={inputRef}
          size={size}
          value={filterQuery}
          onChange={handleFilterQueryChange}
          placeholder={placeholder}
          borderWidth="2px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          borderColor="neutral.light.4"
        />

        {filterQuery ? (
          <InputRightElement>
            <ClearButton onClick={handleFilterQueryClear} />
          </InputRightElement>
        ) : null}
      </InputGroup>
    </Skeleton>
  )
}

export default chakra(FilterInput)
