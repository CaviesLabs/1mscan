import { Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"

import { TX_STATE_CHANGES } from "stubs/txStateChanges"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import TxStateTable from "ui/tx/state/TxStateTable"

type Props = {
  hash: string
  isActive?: boolean
}

const placeholderData = {
  items: TX_STATE_CHANGES,
  next_page_params: {
    items_count: 1,
    state_changes: null,
  },
}

const TxState = ({ hash, isActive }: Props) => {
  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "tx_state_changes",
    pathParams: { hash: hash },
    options: {
      enabled: Boolean(hash && isActive),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData

  return (
    <>
      <Text textStyle="875" color="neutral.light.7" mb={6}>
        {getLanguage(
          "transaction_details_page.evm_details.state_tab_content.a_set_of_information_represents_the_current_state_is_updated_when_a_transaction_takes_place_on_the_network_the_below_is_a_summary_of_those_changes",
        )}
      </Text>
      <DataListDisplay
        actionBar={
          <ActionBar
            paginationChildren={<Pagination pagination={pagination} />}
          ></ActionBar>
        }
      >
        <TxStateTable items={data?.items} isLoading={isLoading} />
      </DataListDisplay>
    </>
  )
}

export default memo(TxState, (prev, next) => {
  return prev.hash === next.hash && prev.isActive === next.isActive
})
