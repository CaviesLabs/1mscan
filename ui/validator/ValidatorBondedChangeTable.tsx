import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type {
  IDelegationType,
  IValidatorBondedChange,
} from "types/api/validator"
import TableNotice from "ui/shared/TableNotice"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorBondedChangeTableItem from "./ValidatorBondedChangeTableItem"

interface Props {
  items: IValidatorBondedChange[] | undefined
  isLoading: boolean
  hash: string
  type: IDelegationType
}

const ValidatorBondedChangeTable = ({
  items,
  isLoading,
  hash,
  type,
}: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[35, 35, 30]}>
      <Thead>
        {type === "redelegate" && (
          <TableNotice>
            {getLanguage("validator_page.bonded_token_change.note")}
          </TableNotice>
        )}

        <Tr>
          <Th>{getLanguage("validator_page.bonded_token_change.trx_hash")}</Th>
          <Th>
            {getLanguage(
              "validator_page.bonded_token_change.delegator_address",
            )}
          </Th>
          <Th textAlign="right">
            {getLanguage("validator_page.bonded_token_change.amount_sei")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorBondedChangeTableItem
            hash={hash}
            item={item}
            type={type}
            isLoading={isLoading}
            key={generateKey(
              index,
              isLoading,
              item.transaction_hash,
              item.validator_src.operator_address,
              item.validator_dst.operator_address,
              item.delegator_address,
              item.type,
            )}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorBondedChangeTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash &&
    prev.type === next.type
  )
})
