import { useToast } from "@chakra-ui/react"
import { useSDK } from "@metamask/sdk-react"
import { useCallback } from "react"
import { toHex } from "viem"

import { currentChainConfig } from "../../../lib/hooks/useCurrentChain"

export const useAddEvmChainToWallet = () => {
  const { provider } = useSDK()

  const toast = useToast()

  const addOrSwitchChain = useCallback(async () => {
    // Check if the provider is available, if not, prompt the user to install it
    if (!provider) {
      console.warn("Ethereum object not found")
      window.open("https://metamask.io/download.html", "_blank")
      return
    }

    // Check if the user is already connected to the network
    const currentChainId = provider?.chainId
    const config = currentChainConfig.config
    const chainIdHex = toHex(config.id)

    // Toast, check if the user is already connected to the network
    if (currentChainId === chainIdHex) {
      toast({
        position: "top-right",
        title: "Already on the network",
        description: "You are already connected to this network",
        status: "info",
        variant: "subtle",
        isClosable: true,
      })
      return
    }

    // Define the parameters for the chain to be added
    const chainParams = {
      chainId: chainIdHex,
      chainName: currentChainConfig.chainPrettyName,
      iconUrls: [
        currentChainConfig.cosmosConfig.logo_URIs!.svg,
        currentChainConfig.cosmosConfig.logo_URIs!.png,
      ],
      nativeCurrency: {
        name: config.nativeCurrency.name,
        symbol: config.nativeCurrency.symbol,
        decimals: config.nativeCurrency.decimals,
      },
      rpcUrls: config.rpcUrls.default.http,
      blockExplorerUrls: [config.blockExplorers?.default.url],
    }

    // Request to add the chain to the wallet
    return await provider
      .request({
        method: "wallet_addEthereumChain",
        params: [chainParams],
      })
      .then(() => {
        toast({
          position: "top-right",
          title: "Success",
          description: "Successfully added network to your wallet",
          status: "success",
          variant: "subtle",
          isClosable: true,
        })
      })
  }, [provider])

  return {
    addOrSwitchChain: addOrSwitchChain,
  }
}
