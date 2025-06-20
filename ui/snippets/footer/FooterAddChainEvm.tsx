import { MetaMaskProvider } from "lib/web3/MetamaskProvider"
import { noSSR } from "next/dynamic"
import type React from "react"
import { useAddEvmChainToWallet } from "../../shared/wallet/useAddEvmChainToWallet"
import WalletItem from "./WalletItem"

// FooterAddToMetamask component
const FooterAddToMetamask = () => {
  const { addOrSwitchChain } = useAddEvmChainToWallet()

  return (
    <WalletItem
      name="wallets/metamask"
      onClick={() => {
        addOrSwitchChain().catch((error) => {
          console.error("Failed to add or switch chain:", error)
        })
      }}
    />
  )
}

// FooterAddChainEvm component
const FooterAddChainEvm: React.FC = () => {
  return (
    <MetaMaskProvider>
      <FooterAddToMetamask />
    </MetaMaskProvider>
  )
}

// Export FooterAddChainEvm dynamically with no SSR
export default noSSR(() => FooterAddChainEvm, {})
