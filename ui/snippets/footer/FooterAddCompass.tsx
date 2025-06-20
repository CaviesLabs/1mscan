import { useToast } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import WalletItem from "./WalletItem"
type Props = {
  //
}

const FooterAddCompass = ({}: Props) => {
  const toast = useToast()
  return (
    <WalletItem
      name="wallets/compass"
      onClick={() => {
        if (window.compass) {
          toast({
            position: "top-right",
            title: getLanguage("status.success"),
            description: getLanguage("footer.compass_is_already_installed"),
            status: "success",
            variant: "subtle",
            isClosable: true,
          })
          return
        }
        window.open("https://compasswallet.io/", "_blank")
      }}
      iconSvgProps={{
        borderRadius: "full",
        backgroundColor: "white",
        padding: "2px",
      }}
    ></WalletItem>
  )
}

export default memo(FooterAddCompass, () => true)
