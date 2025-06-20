import {
  Button,
  Input,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  chakra,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"

import { times } from "lib/html-entities"
import IconSvg from "ui/shared/IconSvg"

interface Props {
  onClick: (power: number) => void
  isDisabled?: boolean
}

const ContractMethodFieldZeroes = ({ onClick, isDisabled }: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<
    number | undefined
  >(18)
  const [customValue, setCustomValue] = React.useState<number>()
  const { isOpen, onToggle, onClose } = useDisclosure()

  const handleOptionClick = React.useCallback(
    (event: React.MouseEvent) => {
      const id = Number(
        (event.currentTarget as HTMLDivElement).getAttribute("data-id"),
      )
      if (!Object.is(id, Number.NaN)) {
        setSelectedOption((prev) => (prev === id ? undefined : id))
        setCustomValue(undefined)
        onClose()
      }
    },
    [onClose],
  )

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomValue(Number(event.target.value))
      setSelectedOption(undefined)
    },
    [],
  )

  const value = selectedOption || customValue

  const handleButtonClick = React.useCallback(() => {
    value && onClick(value)
  }, [onClick, value])

  return (
    <>
      {Boolean(value) && (
        <Button
          padding="0.125rem 0.375rem"
          variant="unstyled"
          backgroundColor="secondary.06.bg"
          borderRadius="0.25rem"
          // lineHeight="1.25rem"
          fontWeight={400}
          fontSize="0.875rem"
          height={6}
          onClick={handleButtonClick}
          isDisabled={isDisabled}
        >
          {times}
          <chakra.span>10</chakra.span>
          <chakra.span fontSize="xs" lineHeight={4} verticalAlign="super">
            {value}
          </chakra.span>
        </Button>
      )}
      <Popover placement="bottom-end" isLazy isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button
            variant="subtle"
            colorScheme="gray"
            size="xs"
            cursor="pointer"
            p={0}
            onClick={onToggle}
            isDisabled={isDisabled}
          >
            <IconSvg
              name="arrows/east-mini"
              transform={isOpen ? "rotate(90deg)" : "rotate(-90deg)"}
              boxSize={6}
            />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="110px">
            <PopoverBody py={2}>
              <List>
                {[8, 12, 16, 18, 20].map((id) => (
                  <ListItem
                    key={id}
                    py={2}
                    data-id={id}
                    onClick={handleOptionClick}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <span>10*{id}</span>
                    {selectedOption === id && (
                      <IconSvg name="check" boxSize={6} color="primary.300" />
                    )}
                  </ListItem>
                ))}
                <ListItem
                  py={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <span>10*</span>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    ml={3}
                    size="xs"
                    onChange={handleInputChange}
                    value={customValue || ""}
                  />
                </ListItem>
              </List>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  )
}

export default React.memo(ContractMethodFieldZeroes)
