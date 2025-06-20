import { getLanguage } from "languages/useLanguage"
import { getAddressType } from "lib/getOSType"
import { memo, useMemo, useState } from "react"
import { ProfileHeader } from "ui/profile"
import { useSeiprotocolQuery } from "ui/shared/wallet/useSeiprotocolQuery"
import WalletProfileDetails from "../WalletProfile/WalletProfileDetails"
import ProfileCheckerInput from "./ProfileCheckerInput"

const ProfileChecker = () => {
  const [hash, setHash] = useState("")

  const addressType = useMemo(
    () => (getAddressType(hash) === "Cosmos" ? "native" : "evm"),
    [hash],
  )

  const {
    data: nativeHashAssociation,
    isFetching: isFetchingNativeHashAssociation,
  } = useSeiprotocolQuery(
    "seichain.evm.seiAddressByEVMAddress",
    {
      evmAddress: hash!,
    },
    {
      enabled: Boolean(addressType === "evm" && hash),
    },
  )

  const { data: evmHashAssociation, isFetching: isFetchingEvmHashAssociation } =
    useSeiprotocolQuery(
      "seichain.evm.eVMAddressBySeiAddress",
      {
        seiAddress: hash!,
      },
      {
        enabled: Boolean(addressType === "native" && hash),
      },
    )

  const isLoading =
    isFetchingNativeHashAssociation || isFetchingEvmHashAssociation

  const { current, evmHash, nativeHash } = useMemo(() => {
    if (addressType === "native") {
      return {
        current: hash,
        evmHash:
          (evmHashAssociation?.associated && evmHashAssociation?.evm_address) ||
          undefined,
        nativeHash: hash,
        isAssociated: Boolean(evmHashAssociation?.associated),
      }
    }
    if (addressType === "evm") {
      return {
        current: hash,

        evmHash: hash,
        nativeHash:
          (nativeHashAssociation?.associated &&
            nativeHashAssociation?.sei_address) ||
          undefined,
        isAssociated: Boolean(nativeHashAssociation?.associated),
      }
    }
    return {
      current: undefined,
      evmHash: undefined,
      nativeHash: undefined,
      isAssociated: false,
    }
  }, [addressType, hash, hash, evmHashAssociation, nativeHashAssociation])

  return (
    <>
      <ProfileHeader
        noToggle
        descriptionSlot={getLanguage(
          "profile_checker_page.discover_any_wallet_s_assets_on_sei_blockchain_from_tokens_to_nft_collections",
        )}
      />
      <ProfileCheckerInput setHash={setHash} />
      {hash && (
        <WalletProfileDetails
          current={current!}
          isLoading={isLoading}
          evmHash={evmHash}
          nativeHash={nativeHash}
          addressType={addressType}
        />
      )}
    </>
  )
}

export default memo(ProfileChecker, () => true)
