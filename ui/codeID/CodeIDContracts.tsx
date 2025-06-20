import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import { CONTRACT_CODE_CONTRACT } from "stubs/codeID"
import type { IContractCodeContract } from "types/api/codeID"
import DataListDisplay from "ui/shared/DataListDisplay"
import CodeIDContractsTable from "./CodeIDContractsTable"

type Props = {
  codeId: string
}

const placeholderData = {
  items: Array.from<IContractCodeContract>({ length: 20 }).fill(
    CONTRACT_CODE_CONTRACT,
  ),
  next_page_params: null,
  total_count: 20,
}

const CodeIDContracts = ({ codeId }: Props) => {
  const { data, isPlaceholderData } = useApiQuery("contract_code_contracts", {
    pathParams: {
      codeId: codeId,
    },
    queryOptions: {
      placeholderData: placeholderData,
    },
  })
  return (
    <DataListDisplay>
      <CodeIDContractsTable
        items={data?.items}
        isLoading={isPlaceholderData}
      ></CodeIDContractsTable>
    </DataListDisplay>
  )
}

export default memo(CodeIDContracts, (prev, next) => {
  return prev.codeId === next.codeId
})
