import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useMemo } from "react"
import { ADDRESS_NFT_1155 } from "stubs/address"
import { generateListStub } from "stubs/utils"
import type { NFTTokenType } from "types/api/token"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import NFTListItem from "./NFTListItem"

type Props = {
  isLoading?: boolean
  evmHash: string | undefined
  nativeHash: string | undefined
  tokenType: string
  isActive?: boolean
}

const placeholderData = generateListStub<"address_nfts">(ADDRESS_NFT_1155, 10, {
  next_page_params: null,
})

const AddressLists = ({
  evmHash,
  nativeHash,
  isLoading: _isLoading,
  tokenType,
  isActive,
}: Props) => {
  const hash = useMemo(() => {
    if (tokenType.slice(0, 3).toLowerCase() === "erc") return evmHash
    if (tokenType.slice(0, 2).toLowerCase() === "cw") return nativeHash
  }, [evmHash, nativeHash, tokenType])

  const tokenTYPE = useMemo<NFTTokenType>(
    () => tokenType.toUpperCase() as NFTTokenType,
    [tokenType],
  )

  const [q, setQ] = useSetStateQuery("q", [], {
    cleanUp: {
      keepQueries: ["tab", "address_type", "hash", "nfts"],
    },
    decode: (value) => value || "",
    throttle: 300,
  })

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "address_nfts",
    pathParams: { hash },
    options: {
      enabled: Boolean(hash && !_isLoading && isActive),
      placeholderData: placeholderData,
    },
    filters: { type: tokenTYPE, q: q },
  })

  const isLoading = isPlaceholderData || _isLoading
  return (
    <NFTListItem
      items={data?.items}
      isLoading={isLoading}
      tokenType={tokenTYPE}
      pagination={pagination}
      q={q}
      setQ={setQ}
    />
  )
}

export default memo(AddressLists, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.tokenType === next.tokenType &&
    prev.isActive === next.isActive
  )
})
