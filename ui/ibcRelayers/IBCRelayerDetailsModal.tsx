import { VStack } from "@chakra-ui/react"
import useIsMobile from "lib/hooks/useIsMobile"
import type { ForwardedRef } from "react"
import { memo, useState } from "react"
import { IBC_CHAIN_DETAILS } from "stubs/ibcRelayer"
import { generateKey } from "stubs/utils"
import type { IIBCChain } from "types/api/ibcRelayer"
import ProfileModal from "ui/profile/ProfileModal"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import { multipleRef } from "ui/utils/dom"
import { IBCRelayerChainConnector } from "./IBCRelayerConnectorEntity"
import IBCRelayerDetailsMobileItem from "./IBCRelayerDetailsMobileItem"
import IBCRelayerDetailsModalTable from "./IBCRelayerDetailsTable"

type Props = {
  ref?: ForwardedRef<IIBCRelayerDetailsModalState>
}

export type IIBCRelayerDetailsModalState = {
  onOpen: (item: IIBCChain) => void
}

const IBCRelayerDetailsModal = ({ ref }: Props) => {
  const [counterparty, setCounterParty] = useState<IIBCChain>()
  const isMobile = useIsMobile()

  const { data, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: "ibc_chain_details",
    pathParams: { chain_id: counterparty?.chain },
    options: {
      placeholderData: {
        items: [IBC_CHAIN_DETAILS],
        next_page_params: null,
        total_count: 1,
      },
      enabled: Boolean(counterparty?.chain),
    },
  })

  const isLoading = isPlaceholderData

  return (
    <ProfileModal
      ref={(el) => {
        multipleRef(
          {
            ...el,
            onOpen: (item: IIBCChain) => {
              setCounterParty(item)
              el?.onOpen()
            },
          },
          ref,
        )
      }}
      footer={<></>}
      title="Relayer Details"
      modalProps={{ scrollBehavior: "outside" }}
      maxWidth={{ base: "100vw", "2lg": "61.5rem" }}
      sx={{ padding: { base: "1rem !important", lg: "1.5rem !important" } }}
    >
      <IBCRelayerChainConnector
        counterparty={counterparty}
        isLoading={isLoading}
      ></IBCRelayerChainConnector>
      <DataListDisplay
        actionBar={
          <ActionBar
            paginationChildren={
              <Pagination pagination={pagination}></Pagination>
            }
          ></ActionBar>
        }
      >
        {isMobile && (
          <VStack alignItems="stretch" spacing={3}>
            {data?.items.map((item, index) => {
              return (
                <IBCRelayerDetailsMobileItem
                  key={generateKey(
                    index,
                    isLoading,
                    item.channel_id,
                    item.counterparty_channel_id,
                  )}
                  isLoading={isLoading}
                  item={item}
                ></IBCRelayerDetailsMobileItem>
              )
            })}
          </VStack>
        )}
        {!isMobile && (
          <IBCRelayerDetailsModalTable
            isLoading={isLoading}
            items={data?.items}
            counterparty={counterparty}
          ></IBCRelayerDetailsModalTable>
        )}
      </DataListDisplay>
    </ProfileModal>
  )
}

export default memo(IBCRelayerDetailsModal, (prev, next) => {
  return prev.ref === next.ref
})
