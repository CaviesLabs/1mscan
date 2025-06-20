import { Th, Thead, Tr } from "@chakra-ui/react"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IContractCode } from "types/api/codeID"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import CodeIDsTableItem from "./CodeIDsTableItem"

type Props = {
  isLoading?: boolean
  items: IContractCode[]
}

const CodeIDsTable = ({ isLoading, items }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[10, 25, 15, 20, 15, 15]}>
      <Thead>
        <Tr>
          <Th>Code ID</Th>
          <Th>Trx hash</Th>
          <Th textAlign="center">Contracts</Th>
          <Th>Creator</Th>
          <Th textAlign="center">Type</Th>
          <Th>Verified</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => {
          return (
            <CodeIDsTableItem
              key={generateKey(
                index,
                isLoading,
                item.code_id,
                item.store_hash,
                item.store_height,
              )}
              item={item}
              isLoading={isLoading}
            ></CodeIDsTableItem>
          )
        })}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(CodeIDsTable, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.items === next.items
})
