import { MenuItem, type MenuItemProps } from "@chakra-ui/react"
import type { ChainConfig } from "configs/frontend/chain/types"
import { chainKey } from "configs/frontend/chain/utils"
import { memo } from "react"
import ChainTag from "./ChainTag"
import { switchChain } from "./utils"

type Props = {
  item: ChainConfig
} & MenuItemProps

const ChainItem = ({ item, ...props }: Props) => {
  return (
    <MenuItem
      aria-selected={chainKey === item.chainKey}
      display="flex"
      cursor="pointer"
      paddingY={2}
      paddingX={3}
      _hover={{
        backgroundColor: "primary.light.1",
      }}
      onClick={() => {
        switchChain(item.chainKey, {
          isReload: true,
        })
      }}
      textStyle="1"
      _selected={{
        color: "primary.light.4",
      }}
      color="neutral.light.6"
      gap={2}
      alignItems="center"
      {...props}
    >
      <span>{item.chainPrettyName.replace("(", "").replace(")", "")}</span>
      <ChainTag chainKey={item.chainKey} />
    </MenuItem>
  )
}

export default memo(ChainItem, (prev, next) => {
  return prev.item === next.item
})
