import { Stack, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import Divider from "../Divider"
import GlobalWalletItem from "./GlobalWalletItem"

type Props = {
  evmHash: string | undefined
  isEVMConnected: boolean
  connectEVM: AnyFunction
  disconnectEVM: AnyFunction
  nativeHash: string | undefined
  isNATIVEConnected: boolean
  connectNATIVE: AnyFunction
  disconnectNATIVE: AnyFunction
  onClose?: AnyFunction
}

const GlobalWalletContent = ({
  evmHash,
  isEVMConnected,
  connectEVM,
  disconnectEVM,
  nativeHash,
  isNATIVEConnected,
  connectNATIVE,
  disconnectNATIVE,
  onClose,
}: Props) => {
  return (
    <Stack
      alignItems="stretch"
      spacing={0}
      paddingY={1}
      width="full"
      onClick={onClose}
    >
      <chakra.span
        textStyle="8125"
        color="neutral.light.6"
        paddingX={3}
        paddingY={1}
      >
        {getLanguage("wallet.connected_to")}
      </chakra.span>
      <Divider orientation="horizontal" flexShrink={0} width="unset" />
      <GlobalWalletItem
        category="evm"
        address={evmHash}
        isConnected={isEVMConnected}
        onConnect={connectEVM}
        onDisconnect={disconnectEVM}
      />
      <Divider
        paddingX={3}
        orientation="horizontal"
        flexShrink={0}
        width="unset"
      />
      <GlobalWalletItem
        category="native"
        address={nativeHash}
        isConnected={isNATIVEConnected}
        onConnect={connectNATIVE}
        onDisconnect={disconnectNATIVE}
      />
    </Stack>
  )
}

export default memo(GlobalWalletContent, (prev, next) => {
  return (
    prev.evmHash === next.evmHash &&
    prev.nativeHash === next.nativeHash &&
    prev.isEVMConnected === next.isEVMConnected &&
    prev.isNATIVEConnected === next.isNATIVEConnected &&
    prev.connectEVM === next.connectEVM &&
    prev.connectNATIVE === next.connectNATIVE &&
    prev.disconnectEVM === next.disconnectEVM &&
    prev.disconnectNATIVE === next.disconnectNATIVE &&
    prev.onClose === next.onClose
  )
})
