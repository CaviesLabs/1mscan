import { Box, Skeleton, Td, Tr } from "@chakra-ui/react"
import { memo } from "react"

import type { TxStateChange } from "types/api/txStateChanges"

import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import { getStateElements } from "./utils"

interface Props {
  data: TxStateChange
  isLoading?: boolean
}

const TxStateTableItem = ({ data, isLoading }: Props) => {
  const { before, after, change, tag, tokenId } = getStateElements(
    data,
    isLoading,
  )

  return (
    <Tr role="group">
      <Td>
        <Box py="3px">{tag}</Box>
      </Td>
      <Td>
        <AddressEntityV2
          address={data.address}
          isLoading={isLoading}
          headLength={8}
          truncation="constant"
          tailLength={4}
        />
      </Td>
      <Td textAlign="right">{before}</Td>
      <Td textAlign="right">{after}</Td>
      <Td textAlign="right">{change}</Td>
      <Td>
        <Skeleton isLoaded={!isLoading} float="right">
          {tokenId}
        </Skeleton>
      </Td>
    </Tr>
  )
}

export default memo(TxStateTableItem, (prev, next) => {
  return prev.data === next.data && prev.isLoading === next.isLoading
})
