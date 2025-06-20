import { Flex, HStack, chakra } from "@chakra-ui/react"
import { memo, useMemo } from "react"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import {
  type IConnectType,
  useGlobalWallet,
} from "ui/shared/globalWallet/useGlobalWallet"

type Props = {
  tracking: Extract<IConnectType, "evm" | "native">
}

const WalletInfo = ({ tracking }: Props) => {
  const { evmHash, nativeHash } = useGlobalWallet({
    tracking: tracking,
  })

  const hash = useMemo(() => {
    if (tracking === "evm") return evmHash
    if (tracking === "native") return nativeHash
  }, [evmHash, nativeHash])

  return (
    <Flex
      flex={1}
      paddingX={3}
      paddingY={4}
      borderWidth="1px"
      borderRadius={2}
      borderColor="neutral.light.4"
      backgroundColor="neutral.light.2"
      textStyle="1"
      color="neutral.light.6"
      alignItems="center"
      flexWrap="wrap"
      justifyContent={hash ? "flex-start" : "center"}
      gap={2}
    >
      {!hash && (
        <>
          <chakra.span wordBreak="break-word">
            You have not connected wallet yet.
          </chakra.span>
        </>
      )}
      {hash && (
        <HStack spacing={2} flex={1} flexWrap="wrap">
          <chakra.span textStyle="1">Your wallet:</chakra.span>
          <AddressEntityV2
            address={{
              hash: hash,
            }}
            textStyle="1"
            color="secondary.01.text"
            truncation="dynamic"
            headLength={6}
            tailLength={6}
            noIcon
          />
        </HStack>
      )}
    </Flex>
  )
}

export default memo(WalletInfo, (prev, next) => prev.tracking === next.tracking)
