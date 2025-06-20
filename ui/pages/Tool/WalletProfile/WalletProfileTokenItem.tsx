import { Flex, HStack, Stack } from "@chakra-ui/react"
import { memo, useRef } from "react"
import type { AddressTokenBalance } from "types/api/address"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TokenV2, { TokenIcon } from "ui/shared/entities/token/TokenEntityV2"
import InfinityScrollTrigger from "ui/shared/pagination/InfinityScrollTrigger"

interface Props {
  item: AddressTokenBalance
  hasNextPage: boolean
  fetchNextPage?: () => void
}

const WalletProfileTokenItem = ({
  item,
  hasNextPage,
  fetchNextPage,
}: Props) => {
  const focusRef = useRef<HTMLDivElement>(null)

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
      ref={focusRef}
    >
      <InfinityScrollTrigger
        focusRef={focusRef}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
      <HStack
        spacing={3}
        overflow="hidden"
        maxWidth={{
          base: "70%",
          lg: "23rem",
        }}
      >
        <TokenIcon boxSize="2.25rem" token={item.token} />

        <Flex
          flexDirection="column"
          overflow="hidden"
          alignItems="stretch"
          flex={1}
        >
          <TokenV2
            noIcon
            token={item.token}
            noCopy
            textStyle="1700"
            gap={1}
            symbolProps={{
              textStyle: "1500",
              color: "neutral.light.7",
            }}
            confirmIconProps={{ boxSize: 5 }}
          />
          <AddressEntityV2
            noIcon
            address={{
              hash: item.token?.address || item.token?.token_denom || "",
            }}
            truncation="constant"
            headLength={4}
            tailLength={4}
          />
        </Flex>
      </HStack>

      <Stack alignItems="flex-end" overflow="hidden">
        <CurrencyValue
          color="neutral.light.7"
          textStyle="1"
          maxWidth="full"
          overflow="hidden"
          value={item.value}
          isTruncated
          decimals={item.token?.decimals}
          stickyCurrency
          flexDirection="column"
          alignItems="stretch"
          accuracyUsd={2}
          contentProps={{
            justifyContent: "flex-end",
            textAlign: "right",
          }}
          usdProps={{
            justifyContent: "flex-end",
            textAlign: "right",
          }}
        ></CurrencyValue>
      </Stack>
    </Flex>
  )
}

export default memo(WalletProfileTokenItem, (prev, next) => {
  return (
    prev.item.token?.address === next.item.token?.address &&
    prev.item.value === next.item.value &&
    prev.item.token_id === next.item.token_id
  )
})
