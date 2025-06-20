import { useToast } from "@chakra-ui/react"
import { useSDK } from "@metamask/sdk-react"
import { useCallback } from "react"

export const useAddEVMTokenToWallet = () => {
  const { provider } = useSDK()

  const toast = useToast()

  const addToken = useCallback(
    async (data: {
      type: "ERC20" | "ERC721" | "ERC1155"
      options: {
        address: string
        symbol: string
        decimals: number
        image: string
      }
    }) => {
      if (!provider) {
        console.warn("Ethereum object not found")
        window.open("https://metamask.io/download.html", "_blank")
        return
      }

      return provider
        .request({
          method: "wallet_watchAsset",
          params: data,
        })
        .then(() => {
          toast({
            position: "top-right",
            title: "Success",
            description: "Successfully added token to your wallet",
            status: "success",
            variant: "subtle",
            isClosable: true,
          })
        })
        .catch((error: Error) => {
          console.log(error)
          toast({
            position: "top-right",
            title: "Error",
            description: (error as Error)?.message || "Something went wrong",
            status: "error",
            variant: "subtle",
            isClosable: true,
          })
        })
    },
    [provider],
  )

  return {
    addToken: addToken,
  }
}
