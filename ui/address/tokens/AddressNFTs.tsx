import { Stack } from "@chakra-ui/react"
import {
  CW_721_TYPES,
  ERC_721_TYPES,
  ERC_1155_TYPES,
  TOKEN_HYBRID_TYPES_EVM,
} from "lib/token/tokenTypes"
import _ from "lodash"
import { useRouter } from "next/router"
import { memo, useMemo } from "react"
import type { TokenType } from "types/api/token"
import Segmentation from "ui/shared/segmentation/Segmentation"
import AddressLists from "./AddressLists"

type Props = {
  evmHash: string | undefined
  nativeHash: string | undefined
  isLoading?: boolean
  isActive?: boolean
}

const erc_721_types = ERC_721_TYPES.map(({ id, title }) => ({
  id: id.toLowerCase(),
  title,
}))

const erc_1155_types = ERC_1155_TYPES.map(({ id, title }) => ({
  id: id.toLowerCase(),
  title,
}))

const cw_721_types = CW_721_TYPES.map(({ id, title }) => ({
  id: id.toLowerCase(),
  title,
}))

const token_hybrid_types_evm = TOKEN_HYBRID_TYPES_EVM.map(({ id, title }) => ({
  id: id.toLowerCase(),
  title,
}))

const ALLOWED_TYPES = [
  "erc-721",
  "cw-721",
  "erc-1155",
  "erc-404",
] satisfies Lowercase<TokenType>[]

const ALLOW_TYPES_SET = new Set(ALLOWED_TYPES)

const AddressNFTs = ({ evmHash, nativeHash, isLoading, isActive }: Props) => {
  const router = useRouter()

  const nftType = useMemo(() => {
    const nfts = router.query.nfts?.toString().toLowerCase()
    if (nfts && ALLOW_TYPES_SET.has(nfts as any)) {
      return nfts
    }
    if (evmHash) {
      return "erc-721"
    }
    if (nativeHash) {
      return "cw-721"
    }
    return "erc-721"
  }, [router.query.nfts, evmHash, nativeHash]) as (typeof ALLOWED_TYPES)[number]

  return (
    <Stack
      flexDirection="column"
      spacing={4}
      alignItems="stretch"
      overflow="hidden"
    >
      {/* <Stack
        flexDirection="row"
        flexWrap="wrap"
        alignItems="stretch"
        columnGap={6}
        rowGap={3}
        overflow="hidden"
      > */}
      <Segmentation
        id="nfts"
        itemProps={{
          minWidth: "5.23438rem",
          width: "auto",
        }}
        tabs={_.chain(
          [] as {
            id: string
            title: string
          }[],
        )
          .tap((tabs) => {
            if (evmHash) {
              tabs.push(...erc_721_types)
            }
            if (nativeHash) {
              tabs.push(...cw_721_types)
            }

            if (evmHash) {
              tabs.push(...erc_1155_types)
              tabs.push(...token_hybrid_types_evm)
            }
          })
          .value()}
        cleanupOnTabChange={{
          keepQueries: ["hash", "tab", "token_holdings"],
        }}
      ></Segmentation>
      {/* </Stack> */}

      {/* <TabOnlyPanels
        activeId="list"
        isActive={isActive}
        tabs={[
          {
            id: "list",
            component: AddressLists,
            props: {
              evmHash,
              nativeHash,
              tokenType: nftType,
              isLoading,
            },
          },
        ]}
      /> */}
      <AddressLists
        evmHash={evmHash}
        nativeHash={nativeHash}
        tokenType={nftType}
        isLoading={isLoading}
        isActive={isActive}
      />
    </Stack>
  )
}

export default memo(AddressNFTs, (prev, next) => {
  return (
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
