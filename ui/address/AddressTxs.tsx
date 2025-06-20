import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import AddressEVMTxs from "./txs/AddressEVMTxs"
import AddressNativeTxs from "./txs/AddressNativeTxs"

type Props = {
  evmHash: string | undefined
  nativeHash: string | undefined
  isLoading: boolean | undefined

  evmCounter: number
  nativeCounter: number
  isActive?: boolean
}

const AddressTxs = ({
  evmHash,
  nativeHash,
  isLoading,
  evmCounter,
  nativeCounter,
  isActive,
}: Props) => {
  return (
    <ScrollTabFloat
      id="transactions"
      hideOnSingle
      cleanupOnTabChange={{
        keepQueries: ["hash", "tab"],
      }}
      isActive={isActive}
      isLoading={isLoading}
      tabs={[
        Boolean(evmHash) && {
          id: "evm",
          title: getLanguage("utils.evm"),
          count: Math.min(evmCounter, 50),
          isOverflow: evmCounter > 50,
          component: AddressEVMTxs,
          props: {
            hash: evmHash!,
            isLoading,
          },
        },
        Boolean(nativeHash) && {
          id: "native",
          title: getLanguage("utils.native_cosmos"),
          count: Math.min(nativeCounter, 50),
          isOverflow: nativeCounter > 50,
          component: AddressNativeTxs,
          props: {
            hash: nativeHash!,
            isLoading,
          },
        },
      ]}
    ></ScrollTabFloat>
  )
}

export default memo(AddressTxs, (prev, next) => {
  return (
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.evmCounter === next.evmCounter &&
    prev.nativeCounter === next.nativeCounter &&
    prev.isActive === next.isActive
  )
})
