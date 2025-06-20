import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { getAddressType } from "lib/getOSType"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { Address } from "types/api/address"
import Tag from "ui/shared/chakra/Tag"

type Props = {
  isLoading?: boolean
  hash: string | undefined
  address: Address | undefined
}

const AddressCategoryTags = ({ isLoading, address, hash }: Props) => {
  const addressType = useMemo(() => getAddressType(hash), [hash])
  const tags = useMemo(() => {
    const cur = [] as string[]
    if (!address?.is_contract) {
      cur.push("EOA")
    }

    if (address?.implementations?.length) {
      cur.push("Proxy")
    }

    if (address?.token) {
      cur.push("Token")
    }
    return cur
  }, [address?.is_contract, address?.implementations, address?.token])

  return (
    <Flex gap={2} flexWrap="wrap" alignItems="center" flexGrow={1}>
      {tags.map((tag, index) => (
        <Tag
          key={generateKey(index, isLoading, tag)}
          colorScheme="gray"
          isLoading={isLoading}
          variant="outline"
        >
          {tag}
        </Tag>
      ))}

      <Tag
        variant="outline"
        isLoading={isLoading}
        colorScheme={
          (addressType === "EVM" && "orange") ||
          (addressType === "Cosmos" && "purple") ||
          undefined
        }
      >
        {(addressType === "EVM" && getLanguage("utils.evm")) ||
          (addressType === "Cosmos" && getLanguage("utils.native_cosmos")) ||
          ""}
      </Tag>
    </Flex>
  )
}

export default memo(AddressCategoryTags, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash &&
    prev.address === next.address
  )
})
