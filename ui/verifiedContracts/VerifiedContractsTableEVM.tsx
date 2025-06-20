import { Flex, Th, Tr, chakra } from "@chakra-ui/react"

import type { VerifiedContract } from "types/api/contracts"

import { Thead } from "@chakra-ui/react"
import type { ICombinedSortType } from "ui/verifiedContracts/utils"

import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import SortIndicator from "ui/shared/table/SortIndicator"
import VerifiedContractsTableItem from "./VerifiedContractsTableItem"

interface Props {
  data: Array<VerifiedContract>
  sort: undefined | ICombinedSortType
  setSort: (
    nextValue:
      | undefined
      | ICombinedSortType
      | ((e: undefined | ICombinedSortType) => undefined | ICombinedSortType),
    defer?: boolean,
  ) => void
  isLoading?: boolean
}

const VerifiedContractsTableEVM = ({
  data,
  sort,
  setSort,
  isLoading,
}: Props) => {
  return (
    <ScrollTable variant="v2">
      <Thead>
        <Tr>
          <Th>{getLanguage("evm_verified_contracts_page.contract")}</Th>
          <Th>
            <Flex
              sx={{ padding: 0 }}
              display="flex"
              cursor="pointer"
              justifyContent="flex-start"
              alignItems="center"
              transition="all"
              gap={1}
            >
              <chakra.span whiteSpace="nowrap">
                {getLanguage("evm_verified_contracts_page.balance_sei")}
              </chakra.span>
              <SortIndicator
                sorting={sort}
                onChange={(e) => {
                  setSort(e.target?.value as any)
                }}
                value1="balance-asc"
                value2="balance-desc"
              ></SortIndicator>
            </Flex>
          </Th>
          <Th textAlign="right">
            {getLanguage("evm_verified_contracts_page.txs")}
          </Th>
          <Th>{getLanguage("evm_verified_contracts_page.compiler_version")}</Th>

          <Th textAlign="right">
            {getLanguage("evm_verified_contracts_page.verified")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {data?.map((item, index) => (
          <VerifiedContractsTableItem
            key={generateKey(index, isLoading, item.address.hash)}
            data={item}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(VerifiedContractsTableEVM, (prev, next) => {
  return (
    prev.data === next.data &&
    prev.isLoading === next.isLoading &&
    prev.sort === next.sort &&
    prev.setSort === next.setSort
  )
})
