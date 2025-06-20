import { Center, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import { default as PackItem } from "./components/PackItem"
import ToolButton from "./components/ToolButton"

type Props = {
  addressType: "native" | "evm" | undefined
  onConnect: any
}

const NeedConnectWalletContent = ({ addressType, onConnect }: Props) => {
  return (
    <PackItem
      spacing={5}
      childrenProps={{
        alignItems: "center",
        justifyContent: "center",
        paddingY: "5rem",
        paddingX: 5,
        spacing: 5,
      }}
    >
      <Center
        rounded="full"
        borderWidth="1px"
        boxSize="5rem"
        borderColor="neutral.light.4"
      >
        <IconSvg
          name="tools/addressbook"
          boxSize="2.25rem"
          color="neutral.light.7"
        />
      </Center>
      <chakra.span color="neutral.light.7" textStyle="1">
        {getLanguage(
          "wallet_profile_page.track_your_sei_wallet_s_assets_from_native_tokens_to_nfts_all_in_one_profile_view",
        )}
      </chakra.span>
      <ToolButton
        onClick={() => {
          onConnect({
            tracking: addressType,
          })
        }}
      >
        {getLanguage("wallet.connect_wallet")}
      </ToolButton>
    </PackItem>
  )
}

export default memo(NeedConnectWalletContent, (prev, next) => {
  return (
    prev.addressType === next.addressType && prev.onConnect === next.onConnect
  )
})
