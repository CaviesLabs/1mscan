import {
  Button,
  HStack,
  Link,
  Stack,
  type StackProps,
  chakra,
} from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import AddressEntityV2 from "../entities/address/AddressEntityV2"

type Props = {
  category: "evm" | "native"
  address: string | undefined
  isConnected: boolean
  onConnect: AnyFunction
  onDisconnect: AnyFunction
} & StackProps

const CONFIG = {
  evm: {
    title: getLanguage("wallet.evm_wallet"),
  },
  native: {
    title: getLanguage("wallet.native_wallet"),
  },
}

const GlobalWalletItem = ({
  category,
  address,
  isConnected,
  onConnect,
  onDisconnect,
  ...props
}: Props) => {
  const { title } = useMemo(() => CONFIG[category], [category])
  const Component = address ? Link : Button

  return (
    <HStack
      alignItems="flex-end"
      justifyContent="space-between"
      spacing={2}
      paddingX={3}
      paddingY={2}
      overflow="hidden"
      {...props}
    >
      <Stack alignItems="flex-start" flex={1} spacing={1} overflow="hidden">
        <chakra.span textStyle="1500" lineHeight="1rem" color="neutral.light.7">
          {title}
        </chakra.span>
        {isConnected ? (
          <AddressEntityV2
            address={{
              hash: address,
            }}
            noLink={!address}
            truncation="dynamic"
            headLength={7}
            tailLength={9}
            textStyle="875"
            noTooltip
          />
        ) : (
          <chakra.span textStyle="875" color="neutral.light.5">
            {getLanguage("wallet.not_connected")}
          </chakra.span>
        )}
      </Stack>
      <Component
        as={address ? Link : undefined}
        variant={address ? "unstyled" : "solid"}
        textStyle="875"
        paddingX={address ? 0 : 2}
        paddingY={address ? 0 : "0.375rem"}
        maxHeight="2rem"
        width="unset"
        flexShrink={0}
        transitionProperty="outline-offset, outline-color, color, background-color, border-color, width, height"
        transitionDuration="0.3s"
        sx={{
          outlineWidth: "0px",
          outlineOffset: "0px",
          outlineColor: "primary.light.3",
        }}
        alignSelf="flex-end"
        color={address ? "primary.light.4" : undefined}
        onClick={() => {
          if (isConnected) {
            onDisconnect()
          } else {
            onConnect()
          }
        }}
      >
        {isConnected
          ? getLanguage("wallet.disconnect")
          : getLanguage("wallet.connect_wallet")}
      </Component>
    </HStack>
  )
}

export default memo(GlobalWalletItem, (prev, next) => {
  return (
    prev.category === next.category &&
    prev.address === next.address &&
    prev.isConnected === next.isConnected &&
    prev.onConnect === next.onConnect &&
    prev.onDisconnect === next.onDisconnect
  )
})
