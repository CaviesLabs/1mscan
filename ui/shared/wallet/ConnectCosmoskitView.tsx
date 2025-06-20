import { memo } from "react"
import { useGlobalWallet } from "../globalWallet/useGlobalWallet"
import WalletAlert from "./WalletAlert"

const ConnectCosmoskitView = () => {
  const { isNATIVEConnecting, connectNATIVE, isNATIVEConnected, nativeHash } =
    useGlobalWallet({
      tracking: "native",
    })

  return (
    <WalletAlert
      isConnecting={isNATIVEConnecting}
      onConnect={connectNATIVE}
      isConnected={isNATIVEConnected}
      hash={nativeHash}
    ></WalletAlert>
  )
}

export default memo(ConnectCosmoskitView, () => true)
