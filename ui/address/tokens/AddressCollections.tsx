import { memo, useMemo } from "react"
import { ADDRESS_COLLECTION } from "stubs/address"
import { generateListStub } from "stubs/utils"
import type { NFTTokenType } from "types/api/token"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import NFTCollection from "./NFTCollection"

type Props = {
  isLoading?: boolean
  evmHash: string | undefined
  nativeHash: string | undefined
  tokenType: string
}

const placeholderData = generateListStub<"address_collections">(
  ADDRESS_COLLECTION,
  10,
  { next_page_params: null },
)

const AddressCollections = ({
  evmHash,
  nativeHash,
  isLoading: _isLoading,
  tokenType,
}: Props) => {
  const hash = useMemo(() => {
    if (tokenType.slice(0, 3) === "erc") return evmHash
    if (tokenType.slice(0, 2) === "cw") return nativeHash
  }, [evmHash, nativeHash, tokenType])

  const tokenTYPE = useMemo<NFTTokenType>(
    () => tokenType.toUpperCase() as NFTTokenType,
    [tokenType],
  )

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "address_collections",
    pathParams: { hash },
    filters: {
      type: tokenTYPE,
    },
    options: {
      enabled: Boolean(hash && !_isLoading),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData || _isLoading

  return (
    <NFTCollection
      pagination={pagination}
      items={data?.items}
      hash={hash}
      isLoading={isLoading}
      tokenType={tokenTYPE}
    />
  )
}

export default memo(AddressCollections, (prev, next) => {
  return (
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.tokenType === next.tokenType
  )
})
