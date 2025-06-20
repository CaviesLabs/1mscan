import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import AddressEVMTransfer from "./transfer/AddressEVMTransfer"
import AddressNATIVETransfer from "./transfer/AddressNATIVETransfer"

type Props = {
  evmHash: string | undefined
  nativeHash: string | undefined
  isLoading: boolean | undefined
  evmCounter: number
  nativeCounter: number
  isActive?: boolean
}

const AddressTokenTransfers = ({
  evmHash,
  nativeHash,
  isLoading,
  evmCounter,
  nativeCounter,
  isActive,
}: Props) => {
  return (
    <ScrollTabFloat
      id="token_transfers"
      hideOnSingle
      cleanupOnTabChange={{
        keepQueries: ["hash", "tab", "token"],
      }}
      isActive={isActive}
      isLoading={isLoading}
      tabs={[
        Boolean(evmHash) && {
          id: "evm",
          title: getLanguage("utils.evm"),
          count: evmCounter,
          isOverflow: evmCounter > 50,
          component: AddressEVMTransfer,
          props: {
            hash: evmHash!,
            isLoading,
          },
        },
        Boolean(nativeHash) && {
          id: "native",
          title: getLanguage("utils.native_cosmos"),
          count: nativeCounter,
          isOverflow: nativeCounter > 50,
          component: AddressNATIVETransfer,
          props: {
            hash: nativeHash!,
            isLoading,
          },
        },
      ]}
    />
  )
}

export default memo(AddressTokenTransfers, (prev, next) => {
  return (
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isLoading === next.isLoading &&
    prev.evmCounter === next.evmCounter &&
    prev.nativeCounter === next.nativeCounter &&
    prev.isActive === next.isActive
  )
})
