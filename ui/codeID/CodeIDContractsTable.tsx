import { Th, Thead, Tr } from "@chakra-ui/react"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IContractCodeContract } from "types/api/codeID"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import CodeIDContractsTableItem from "./CodeIDContractsTableItem"

type Props = {
  isLoading?: boolean
  items?: IContractCodeContract[]
}

const CodeIDContractsTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[25, 25, 25, 25]}>
      <Thead>
        <Tr>
          <Th>Contract</Th>
          <Th>Trx hash</Th>
          <Th>Creator</Th>
          <Th>Verified</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => {
          return (
            <CodeIDContractsTableItem
              key={generateKey(
                index,
                isLoading,
                item.code_id,
                item.instantiate_hash,
                item.address,
              )}
              isLoading={isLoading}
              item={item}
            ></CodeIDContractsTableItem>
          )
        })}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(CodeIDContractsTable, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.items === next.items
})
