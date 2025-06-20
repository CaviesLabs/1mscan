import { Flex, HStack, Stack, chakra } from "@chakra-ui/react"
import { memo } from "react"
import type { AddressTokenBalance } from "types/api/address"
import type { TokenType } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import TokenSymbol from "ui/shared/entities/token/TokenSymbol"

type Props = {
  data: AddressTokenBalance
  tokenType: TokenType
}

const TokenSelectItem = ({ data, tokenType }: Props) => {
  return (
    <Flex
      padding={3}
      display="flex"
      _hover={{
        backgroundColor: "primary.light.1",
      }}
      cursor="pointer"
      color="initial"
      justifyContent="space-between"
      overflow="hidden"
      gap={4}
    >
      <Flex flexDirection="column" overflow="hidden" flex={1}>
        <TokenV2
          token={data.token}
          noCopy
          textStyle="1"
          gap={3}
          confirmIconProps={{
            boxSize: 5,
          }}
        />

        <HStack spacing={2} overflow="hidden" ml={7}>
          {tokenType === "ERC-1155" && (
            <chakra.span isTruncated textStyle="875" color="neutral.light.6">
              #{data.token_id ?? 0}
            </chakra.span>
          )}
          <CurrencyValue
            maxWidth="full"
            value={data.value}
            isTruncated
            textStyle="875"
            color="neutral.light.6"
            decimals={data.token?.decimals}
            currency={
              <TokenSymbol
                identifier={data.token?.address || data.token?.token_denom}
                noLink
                defaultSymbol={data.token?.symbol}
              />
            }
          ></CurrencyValue>
        </HStack>
      </Flex>
      <Stack spacing={0} alignItems="flex-end">
        <CurrencyValue
          whiteSpace="nowrap"
          hideValue
          value={data.value}
          decimals={data.token?.decimals}
          autoPrice={data.token?.address || data.token?.token_denom}
          usdProps={{
            textStyle: "1",
            color: "neutral.light.8",
          }}
        ></CurrencyValue>
        <CurrencyValue
          textStyle="875"
          value={1}
          decimals={0}
          hideValue
          autoPrice={data.token?.address || data.token?.token_denom}
          usdCurrency="@"
          usdProps={{
            textStyle: "875",
            color: "neutral.light.6",
          }}
        ></CurrencyValue>
      </Stack>
    </Flex>
  )
}

export default memo(TokenSelectItem, (prev, next) => {
  return prev.data === next.data && prev.tokenType === next.tokenType
})
