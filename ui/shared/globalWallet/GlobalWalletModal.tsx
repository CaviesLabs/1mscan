import { memo, useEffect, useRef } from "react"
import ProfileModal, { type ProfileContentState } from "ui/profile/ProfileModal"
import GlobalWalletContent from "./GlobalWalletContent"
import { GlobalWalletEventEmitter, useGlobalWallet } from "./useGlobalWallet"

const GlobalWalletModal = () => {
  const ref = useRef<ProfileContentState>(null)

  const {
    evmHash,
    nativeHash,
    isEVMConnected,
    isNATIVEConnected,
    connectEVM,
    connectNATIVE,
    disconnectEVM,
    disconnectNATIVE,
  } = useGlobalWallet()

  useEffect(() => {
    const onConnectWallet = () => {
      ref.current?.onOpen()
    }
    GlobalWalletEventEmitter.on("connect", onConnectWallet)

    return () => {
      GlobalWalletEventEmitter.off("connect", onConnectWallet)
      GlobalWalletEventEmitter.removeAllListeners()
    }
  }, [])

  return (
    <ProfileModal
      headerProps={{ display: "none" }}
      hasCloseButton={false}
      footer={<></>}
      ref={ref}
      padding="0 !important"
      width="20rem"
    >
      <GlobalWalletContent
        evmHash={evmHash}
        isEVMConnected={isEVMConnected}
        connectEVM={connectEVM}
        disconnectEVM={disconnectEVM}
        nativeHash={nativeHash}
        isNATIVEConnected={isNATIVEConnected}
        connectNATIVE={connectNATIVE}
        disconnectNATIVE={disconnectNATIVE}
        onClose={() => ref.current?.onClose()}
      />
    </ProfileModal>
  )
}

export default memo(GlobalWalletModal, () => true)
