import type { BoxProps } from "@chakra-ui/react"
import { Skeleton, Stack, Tab, Tabs } from "@chakra-ui/react"
import { useCurrentChain } from "lib/hooks/useCurrentChain"
import { useSetQuery } from "lib/router/useSetQuery"
import { QRCodeSVG } from "qrcode.react"
import type { ForwardedRef } from "react"
import { memo } from "react"
import type { OSType } from "types/base"

type Props = {
  evmHash: string | undefined
  nativeHash: string | undefined
  hash: string
  addressType: OSType | undefined
  isLoading?: boolean
  ref?: ForwardedRef<HTMLDivElement>
} & BoxProps

const AddressQrCode = ({
  evmHash,
  nativeHash,
  hash,
  isLoading,
  addressType,
  ref,
  ...props
}: Props) => {
  const currentChainConfig = useCurrentChain()

  const setHash = useSetQuery("hash", {
    throttle: 300,
    cleanUp: {
      keepQueries: [],
    },
    prefetchDebounce: 200,
  })

  return (
    <Stack alignItems="stretch" spacing={5} maxWidth="20rem">
      <Skeleton
        width={{ base: "full", lg: "14.5rem" }}
        height={{ base: "full", lg: "14.5rem" }}
        aspectRatio={1}
        flexShrink={0}
        borderRadius="base"
        isLoaded={!isLoading}
        ref={ref}
        {...props}
      >
        <QRCodeSVG
          width="100%"
          height="100%"
          value={`${window.location.origin}/address/${hash}?chain=${currentChainConfig.chainKey}`}
        />
      </Skeleton>

      {evmHash && nativeHash && (
        <Tabs
          index={addressType === "EVM" ? 0 : addressType === "Cosmos" ? 1 : 0}
          flexDirection="row"
          gap={1}
          display="flex"
          justifyContent="stretch"
          alignItems="stretch"
          variant="solid"
          flexShrink={0}
          onChange={() => {
            setHash(
              (addressType === "EVM" && nativeHash) ||
                (addressType === "Cosmos" && evmHash) ||
                "",
            )
          }}
        >
          <Tab
            flexShrink={0}
            flex={1}
            onMouseOver={() => setHash.prefetch(nativeHash)}
          >
            EVM
          </Tab>
          <Tab
            flexShrink={0}
            flex={1}
            onMouseOver={() => setHash.prefetch(evmHash)}
          >
            Cosmos
          </Tab>
        </Tabs>
      )}
    </Stack>
  )
}

export default memo(AddressQrCode, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.nativeHash === next.nativeHash &&
    prev.evmHash === next.evmHash &&
    prev.addressType === next.addressType
  )
})
