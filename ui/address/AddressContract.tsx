import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { memo, useMemo } from "react"
import { ADDRESS_INFO } from "stubs/address"
import {
  CONTRACT_CODE_UNVERIFIED,
  CONTRACT_CODE_VERIFIED,
} from "stubs/contract"
import { divideAbiIntoMethodTypes } from "ui/address/contract/methods/utils"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import ContractCodeEVM from "./contract/ContractCodeEVM"
import ContractMethodsProxy from "./contract/methods/ContractMethodsProxy"
import ContractMethodsRegular from "./contract/methods/ContractMethodsRegular"
import type { MethodType } from "./contract/methods/types"

type Props = {
  hash: string
  isActive?: boolean
}

const AddressContract = ({ hash, isActive }: Props) => {
  const { data: address, isPlaceholderData: isPlaceholderDataAddress } =
    useApiQuery("address", {
      pathParams: { hash },
      queryOptions: {
        enabled: Boolean(hash && isActive),
        placeholderData: ADDRESS_INFO,
      },
    })

  const { data: contract, isPlaceholderData: isPlaceholderDataContract } =
    useApiQuery("contract", {
      pathParams: { hash: hash },
      queryOptions: {
        enabled: Boolean(hash && !isPlaceholderDataAddress && isActive),
        refetchOnMount: false,
        placeholderData: address?.is_verified
          ? CONTRACT_CODE_VERIFIED
          : CONTRACT_CODE_UNVERIFIED,
      },
    })

  const methods = useMemo(
    () => divideAbiIntoMethodTypes(contract?.abi ?? []),
    [contract?.abi],
  )

  const verifiedImplementations = useMemo(() => {
    return (
      address?.implementations?.filter(
        ({ name, address }) => name && address && address !== hash,
      ) || []
    )
  }, [address?.implementations, hash])

  const isLoading = isPlaceholderDataAddress || isPlaceholderDataContract

  return (
    <ScrollTabFloat
      id="contract"
      hideOnSingle
      cleanupOnTabChange={{ keepQueries: ["hash", "contract", "slug"] }}
      tabs={[
        {
          id: "contract_code",
          title: getLanguage("address.code"),
          component: ContractCodeEVM,
          props: {
            address: address,
            contract: contract,
            hash: hash,
            isLoading: isLoading,
          },
        },
        Boolean(methods.read.length) && {
          id: "read_contract",
          title: getLanguage("address.read_contract"),
          component: ContractMethodsRegular,
          props: {
            type: "read" as MethodType,
            abi: methods.read,
            isLoading: isLoading,
            addressHash: hash,
          },
        },

        Boolean(verifiedImplementations.length) && {
          id: "read_proxy",
          title: getLanguage("address.read_proxy"),
          component: ContractMethodsProxy,
          props: {
            type: "read" as MethodType,
            implementations: verifiedImplementations,
            isLoading: isLoading,
            addressHash: hash,
          },
        },
        Boolean(methods.write.length) && {
          id: "write_contract",
          title: getLanguage("address.write_contract"),
          component: ContractMethodsRegular,
          props: {
            type: "write" as MethodType,
            abi: methods.write,
            isLoading: isLoading,
            addressHash: hash,
          },
        },

        Boolean(verifiedImplementations.length) && {
          id: "write_proxy",
          title: getLanguage("address.write_proxy"),
          component: ContractMethodsProxy,
          props: {
            type: "write" as MethodType,
            implementations: verifiedImplementations,
            isLoading: isLoading,
            addressHash: hash,
          },
        },
      ]}
    />
  )
}

export default memo(AddressContract, (prev, next) => {
  return prev.hash === next.hash && prev.isActive === next.isActive
})
