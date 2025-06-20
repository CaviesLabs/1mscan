import type { AlertProps } from "@chakra-ui/react"
import { memo } from "react"
import { useGlobalWallet } from "../globalWallet/useGlobalWallet"
import WalletAlert from "./WalletAlert"

type Props = AlertProps
const ConnectAppkitView = (props: Props) => {
  const { isEVMConnecting, connectEVM, isEVMConnected, evmHash } =
    useGlobalWallet({
      tracking: "evm",
    })

  return (
    <WalletAlert
      isConnecting={isEVMConnecting}
      onConnect={connectEVM}
      isConnected={isEVMConnected}
      hash={evmHash}
      {...props}
    ></WalletAlert>
  )
}

export default memo(ConnectAppkitView, () => true)
