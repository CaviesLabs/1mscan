import { Flex, HStack, Stack, chakra } from "@chakra-ui/react"
import { memo } from "react"
import type { AddressTokenBalance } from "types/api/address"
import CurrencyValue from "ui/shared/CurrencyValue"
import { TokenIcon } from "ui/shared/entities/token/TokenEntityV2"
import type { IConnectType } from "ui/shared/globalWallet/useGlobalWallet"

interface Props {
  item: AddressTokenBalance
  addressType: Extract<IConnectType, "evm" | "native">
}

const WalletProfileCoinItem = ({ item, addressType }: Props) => {
  return (
    <Flex
      padding={3}
      display="flex"
      _hover={{
        backgroundColor: "primary.light.1",
      }}
      cursor="pointer"
      color="initial"
      alignItems="center"
      justifyContent="space-between"
      overflow="hidden"
      gap={3}
      transitionDuration="normal"
      transitionTimingFunction="ease-in-out"
      transitionProperty="background-color, color, border-color, width, height"
    >
      <HStack
        spacing={3}
        overflow="hidden"
        maxWidth={{
          base: "70%",
          lg: "23rem",
        }}
      >
        <TokenIcon
          boxSize="2.25rem"
          token={{
            address: "usei",
            type: "NATIVE",
          }}
        />

        <HStack spacing={2} overflow="hidden">
          <chakra.span textStyle="1700">SEI</chakra.span>
          <chakra.span textStyle="1">(Sei)</chakra.span>
        </HStack>
      </HStack>

      <Stack alignItems="flex-end" overflow="hidden">
        <CurrencyValue
          color="neutral.light.7"
          textStyle="1"
          maxWidth="full"
          value={item.value}
          isTruncated
          osType={
            (addressType === "evm" && "EVM") ||
            (addressType === "native" && "Cosmos") ||
            undefined
          }
          stickyCurrency
          flexDirection="column"
          alignItems="stretch"
          currency="SEI"
          accuracyUsd={2}
          contentProps={{
            alignSelf: "flex-end",
          }}
          autoPrice
          usdProps={{
            alignSelf: "flex-end",
            textStyle: "875",
            color: "neutral.light.6",
          }}
        ></CurrencyValue>
      </Stack>
    </Flex>
  )
}

export default memo(WalletProfileCoinItem, (prev, next) => {
  return (
    prev.item.value === next.item.value && prev.addressType === next.addressType
  )
})
