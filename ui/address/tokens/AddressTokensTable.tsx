import { Th, Tr } from "@chakra-ui/react"

import type { AddressTokenBalance } from "types/api/address"

import { Thead } from "@chakra-ui/react"

import { getLanguage } from "languages/useLanguage"
import { generateKey } from "stubs/utils"
import type { TokenType } from "types/api/token"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import AddressTokensTableItem from "./AddressTokensTableItem"

interface Props {
  items: AddressTokenBalance[] | undefined
  isLoading?: boolean
  tokenType: Extract<
    TokenType,
    "ERC-20" | "CW-20" | "ICS-20" | "NATIVE" | "ERC-404"
  >
}

const AddressTokensTable = ({ items, tokenType, isLoading }: Props) => {
  return (
    <ScrollTable
      variant="v2"
      sizes={[40, 30, 30]}
      mins={["10rem"]}
      maxs={["15rem"]}
    >
      <Thead>
        <Tr>
          <Th>{getLanguage("address.asset")}</Th>
          <Th>
            {tokenType === "ICS-20" || tokenType === "NATIVE"
              ? getLanguage("address.denom")
              : getLanguage("address.contract_address")}
          </Th>
          <Th textAlign="right">{getLanguage("address.price")}</Th>

          <Th textAlign="right">{getLanguage("address.quantity")}</Th>
          <Th textAlign="right">{getLanguage("address.value")}</Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <AddressTokensTableItem
            key={generateKey(
              index,
              isLoading,
              item.token?.address,
              item.value,
              index,
            )}
            item={item}
            isLoading={isLoading}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default AddressTokensTable
