import { getLanguage } from "languages/useLanguage"
import { useMemoEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useMemo } from "react"
import { ProfileHeader } from "ui/profile"
import { useGlobalWallet } from "ui/shared/globalWallet/useGlobalWallet"
import { useSeiprotocolQuery } from "ui/shared/wallet/useSeiprotocolQuery"
import { default as NeedConnectWalletContent } from "../NeedConnectWalletContent"
import WalletProfileAssociation from "./WalletProfileAssociation"
import WalletProfileDetails from "./WalletProfileDetails"

const WalletProfile = () => {
  const {
    evmHash: _evmHash,
    nativeHash: _nativeHash,
    isEVMConnected,
    isNATIVEConnected,
    onConnect,
    count,
  } = useGlobalWallet()

  const [addressType, setAddressType] = useSetStateQuery("address_type", [], {
    cleanUp: {
      keepQueries: [],
    },
    throttle: 500,
    decode: (value) => {
      if (value === "native") return "native"
      if (value === "evm") return "evm"
      return undefined
    },
  })

  const {
    data: nativeHashAssociation,
    isFetching: isFetchingNativeHashAssociation,
  } = useSeiprotocolQuery(
    "seichain.evm.seiAddressByEVMAddress",
    {
      evmAddress: _evmHash,
    },
    {
      enabled: Boolean(addressType === "evm" && _evmHash),
    },
  )

  const { data: evmHashAssociation, isFetching: isFetchingEvmHashAssociation } =
    useSeiprotocolQuery(
      "seichain.evm.eVMAddressBySeiAddress",
      {
        seiAddress: _nativeHash,
      },
      {
        enabled: Boolean(addressType === "native" && _nativeHash),
      },
    )

  const isLoading =
    isFetchingNativeHashAssociation || isFetchingEvmHashAssociation

  const { current, evmHash, nativeHash, associationHash, oppositeType } =
    useMemo(() => {
      if (addressType === "native") {
        return {
          current: _nativeHash,
          evmHash:
            (evmHashAssociation?.associated &&
              evmHashAssociation?.evm_address) ||
            undefined,
          nativeHash: _nativeHash,
          oppositeType: "evm" as const,
          isAssociated: Boolean(evmHashAssociation?.associated),
          get associationHash() {
            return this.evmHash
          },
        }
      }
      if (addressType === "evm") {
        return {
          current: _evmHash,

          evmHash: _evmHash,
          nativeHash:
            (nativeHashAssociation?.associated &&
              nativeHashAssociation?.sei_address) ||
            undefined,
          oppositeType: "native" as const,
          isAssociated: Boolean(nativeHashAssociation?.associated),
          get associationHash() {
            return this.nativeHash
          },
        }
      }
      return {
        current: undefined,
        evmHash: undefined,
        nativeHash: undefined,
        oppositeType: undefined,
        isAssociated: false,
        associationHash: undefined,
      }
    }, [
      addressType,
      _evmHash,
      _nativeHash,
      evmHashAssociation,
      nativeHashAssociation,
    ])

  const isConnected = useMemo(() => {
    if (addressType === "native") return isNATIVEConnected
    if (addressType === "evm") return isEVMConnected
    return false
  }, [isEVMConnected, isNATIVEConnected, addressType])

  useMemoEffect(() => {
    if (addressType === "evm") {
      if (!isEVMConnected && isNATIVEConnected) {
        setAddressType("native")
      }

      return
    }
    if (addressType === "native") {
      if (!isNATIVEConnected && isEVMConnected) {
        setAddressType("evm")
      }

      return
    }

    if (isEVMConnected) {
      setAddressType("evm")
      return
    }
    if (isNATIVEConnected) {
      setAddressType("native")
      return
    }

    setAddressType("")
  }, [addressType, isNATIVEConnected, isEVMConnected])

  return (
    <>
      <ProfileHeader
        noToggle
        descriptionSlot={getLanguage(
          "wallet_profile_page.track_your_sei_wallet_s_assets_from_native_tokens_to_nfts_all_in_one_profile_view",
        )}
      />
      {!isConnected && (
        <NeedConnectWalletContent
          addressType={addressType}
          onConnect={onConnect}
        />
      )}
      {isConnected && addressType && (
        <>
          <WalletProfileAssociation
            current={current!}
            associationHash={associationHash}
            addressType={addressType!}
            oppositeType={oppositeType!}
            isLoading={isLoading}
            count={count}
          />
          <WalletProfileDetails
            current={current!}
            isLoading={isLoading}
            evmHash={evmHash}
            nativeHash={nativeHash}
            addressType={addressType}
          />
        </>
      )}
    </>
  )
}

export default memo(WalletProfile, () => true)
