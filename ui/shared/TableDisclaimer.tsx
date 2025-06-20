import { Text, type TextProps, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"

type Props = {} & TextProps

const TableDisclaimer = (props: Props) => {
  return (
    <Text
      textStyle="8125"
      color="neutral.light.7"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      {...props}
    >
      {getLanguage(
        "transactions_page.native_cosmos_tab_note.notes_as_part_of_data_retention_policies",
      )}
      :{" "}
      <chakra.strong fontWeight={500}>
        /seiprotocol.seichain.oracle.MsgAggregateExchangeRateVote
      </chakra.strong>{" "}
      {getLanguage(
        "transactions_page.native_cosmos_tab_note.transactions_are_pruned_once_they_exceed_a_three_month_threshold",
      )}
      .
    </Text>
  )
}

export default memo(TableDisclaimer)
