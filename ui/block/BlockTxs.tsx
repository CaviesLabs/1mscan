import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { Block } from "types/api/block"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import BlockEVMTxs from "./BlockEVMTxs"
import BlockNATIVETxs from "./BlockNATIVETxs"

type Props = {
  block: Block | undefined
  isLoading?: boolean
  heightOrHash: string
  isActive?: boolean
}

const BlockTxs = ({
  block,
  isLoading: _isLoading,
  heightOrHash,
  isActive,
}: Props) => {
  const isLoading = _isLoading
  return (
    <ScrollTabFloat
      id="transactions"
      cleanupOnTabChange={{
        keepQueries: ["height_or_hash", "tab"],
      }}
      isLoading={isLoading}
      isActive={isActive}
      tabs={[
        {
          id: "evm",
          title: getLanguage(
            "block_details_page.transactions_tab_content.sub_tabs.evm_tab",
          ),
          count: block?.evmTxCount,
          component: BlockEVMTxs,
          props: {
            heightOrHash,
            isLoading,
          },
        },
        {
          id: "native",
          title: getLanguage(
            "block_details_page.transactions_tab_content.sub_tabs.native_cosmos_tab",
          ),
          count: block?.nativeTxCount,
          component: BlockNATIVETxs,
          props: {
            heightOrHash,
            isLoading,
          },
        },
      ]}
    ></ScrollTabFloat>
  )
}

export default memo(BlockTxs, (prev, next) => {
  return (
    prev.block === next.block &&
    prev.isLoading === next.isLoading &&
    prev.heightOrHash === next.heightOrHash &&
    prev.isActive === next.isActive
  )
})
