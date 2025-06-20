import { Flex } from "@chakra-ui/react"
import { memo } from "react"
import ConnectAppkitView from "ui/shared/wallet/ConnectAppkitView"
import ContractMethods from "./ContractMethods"
import type { MethodType, SmartContractMethod } from "./types"

type Props = {
  abi: SmartContractMethod[]
  isLoading?: boolean
  type: MethodType
  addressHash: string
}

const ContractMethodsRegular = ({
  abi,
  isLoading,
  type,
  addressHash,
}: Props) => {
  return (
    <Flex flexDirection="column" width="full" gap={5}>
      <ConnectAppkitView />
      <ContractMethods
        abi={abi}
        isLoading={isLoading}
        type={type}
        addressHash={addressHash}
      />
    </Flex>
  )
}

export default memo(ContractMethodsRegular)
