import { Skeleton, Stack, Td, Tr } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo } from "react"
import type { IContractCodeContract } from "types/api/codeID"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import CodeIDVerified from "./CodeIDVerified"

type Props = {
  item: IContractCodeContract
  isLoading?: boolean
}

const CodeIDContractsTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = useTimeAgoIncrement(item.instantiate_time)
  return (
    <Tr>
      <Td>
        <AddressEntityV2
          alignItems="flex-start"
          isLoading={isLoading}
          address={{
            hash: item.address,
            name: item.name,
            is_contract: true,
            is_verified: Boolean(item.verified_at),
          }}
          showAddress
        ></AddressEntityV2>
      </Td>
      <Td>
        <Stack spacing={1} overflow="hidden" maxWidth="13rem">
          <TxEntityV2 hash={item.instantiate_hash} isLoading={isLoading} />
          {timeAgo && (
            <Skeleton
              color="neutral.light.5"
              textStyle="8125"
              isLoaded={!isLoading}
            >
              <span>{timeAgo}</span>
            </Skeleton>
          )}
        </Stack>
      </Td>
      <Td>
        <AddressEntityV2
          address={{ hash: item.creator }}
          truncation="constant"
          headLength={13}
          tailLength={13}
          isLoading={isLoading}
        ></AddressEntityV2>
      </Td>
      <Td>
        <CodeIDVerified
          verified_at={item.verified_at}
          isLoading={isLoading}
        ></CodeIDVerified>
      </Td>
    </Tr>
  )
}

export default memo(CodeIDContractsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
