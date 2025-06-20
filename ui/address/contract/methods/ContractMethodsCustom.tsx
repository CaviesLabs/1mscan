import { Flex } from "@chakra-ui/react"
import { memo } from "react"
import ConnectAppkitView from "ui/shared/wallet/ConnectAppkitView"
import ContractCustomAbiAlert from "./ContractCustomAbiAlert"
import ContractMethods from "./ContractMethods"
import type { MethodType, SmartContractMethod } from "./types"

interface Props {
  abi: Array<SmartContractMethod>
  isLoading?: boolean
  type: MethodType
  addressHash: string
}

const ContractMethodsCustom = ({
  abi,
  isLoading,
  type,
  addressHash,
}: Props) => {
  return (
    <Flex flexDirection="column" alignItems="stretch" gap={5}>
      <Flex flexDirection="column" gap={1} alignItems="stretch">
        <ConnectAppkitView />
        <ContractCustomAbiAlert isLoading={isLoading} />
      </Flex>
      <ContractMethods
        abi={abi}
        isLoading={isLoading}
        type={type}
        addressHash={addressHash}
      />
    </Flex>
  )
}

export default memo(ContractMethodsCustom)
