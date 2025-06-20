import { Th, Thead, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import type { IValidatorVote } from "types/api/validator"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import ValidatorVotesTableItem from "./ValidatorVotesTableItem"

interface Props {
  items: IValidatorVote[] | undefined
  isLoading: boolean
}

const ValidatorVotesTable = ({ items, isLoading }: Props) => {
  return (
    <ScrollTable variant="v2" sizes={[5, 35, 20, 10, 20]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("validator_page.votes.proposal_id")}</Th>
          <Th>{getLanguage("validator_page.votes.proposal_title_types")}</Th>
          <Th>{getLanguage("validator_page.votes.trx_hash")}</Th>
          <Th>{getLanguage("validator_page.votes.vote_answer")}</Th>
          <Th textAlign="right">
            {getLanguage("validator_page.votes.status")}
          </Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {items?.map((item, index) => (
          <ValidatorVotesTableItem
            item={item}
            isLoading={isLoading}
            key={generateKey(
              index,
              isLoading,
              item.proposal_id,
              item.submit_time,
            )}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorVotesTable, (prev, next) => {
  return prev.items === next.items && prev.isLoading === next.isLoading
})
