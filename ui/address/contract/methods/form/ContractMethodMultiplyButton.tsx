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
import ArrowToggle from "ui/shared/ArrowToggle"
import IconSvg from "ui/shared/IconSvg"

interface Props {
  onClick: (power: number) => void
  isDisabled?: boolean
}

const ContractMethodMultiplyButton = ({ onClick, isDisabled }: Props) => {
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
          px={1}
          ml={1}
          variant="ghost"
          colorScheme="gray"
          display="inline"
          onClick={handleButtonClick}
          isDisabled={isDisabled}
          height="1.5rem"
          minWidth="2.6875rem"
          paddingX="0.375rem"
          paddingY="0"
          backgroundColor="secondary.06.bg"
          borderRadius="0.25rem"
          textStyle="875"
        >
          {times}
          <chakra.span>10</chakra.span>
          <chakra.span lineHeight={3} fontSize="0.75rem" verticalAlign="super">
            {value}
          </chakra.span>
        </Button>
      )}
      <Popover placement="bottom-end" isLazy isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button
            variant="tertiary"
            cursor="pointer"
            ml={1}
            p={0}
            onClick={onToggle}
            isActive={isOpen}
            isDisabled={isDisabled}
            backgroundColor="none"
            _hover={{
              backgroundColor: "none",
              borderColor: "none",
            }}
            _focusWithin={{
              backgroundColor: "none",
              borderColor: "none",
            }}
          >
            <ArrowToggle
              isOpen={isOpen}
              boxSize={5}
              color="inherit"
            ></ArrowToggle>
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
                    gap={1}
                  >
                    <span>10*{id}</span>
                    {selectedOption === id && (
                      <IconSvg
                        name="check"
                        boxSize={5}
                        color="neutral.light.6"
                      />
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

export default React.memo(ContractMethodMultiplyButton)
