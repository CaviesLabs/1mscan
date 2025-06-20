import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Cookies from "js-cookie"
import { getLang } from "languages/useLanguage"
import { LANG_OPTIONS } from "languages/utils"
import { memo } from "react"

type Props = {}

const LangSelect = ({}: Props) => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        boxSize={8}
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={0}
        as={Button}
        variant="primary"
        fontSize="1.25rem"
      >
        {LANG_OPTIONS.find((option) => option.value === getLang())?.icon}
      </MenuButton>
      <MenuList
        zIndex={1}
        borderWidth="1px"
        borderColor="neutral.light.3"
        borderRadius="0.5rem"
        minWidth="9rem"
        paddingY={1}
      >
        {LANG_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            aria-selected={getLang() === option.value}
            display="flex"
            cursor="pointer"
            paddingY={2}
            paddingX={3}
            _hover={{
              backgroundColor: "primary.light.1",
            }}
            onClick={() => {
              Cookies.set("lang", option.value)
              window.location.reload()
            }}
            textStyle="1"
            _selected={{
              color: "primary.light.4",
            }}
            color="neutral.light.6"
            gap={2}
            alignItems="center"
          >
            {option.icon} {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default memo(LangSelect, () => true)
