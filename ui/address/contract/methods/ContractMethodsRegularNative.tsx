import React from "react"

import type { MethodType, SmartContractMethod } from "./types"

import { Flex } from "@chakra-ui/react"
import ConnectCosmoskitView from "ui/shared/wallet/ConnectCosmoskitView"

interface Props {
  abi: Array<SmartContractMethod>
  isLoading?: boolean
  type: MethodType

  addressHash: string | undefined
}

const ContractMethodsRegularNative = ({
  // abi,
  // isLoading,
  // type,
  // addressHash,
}: Props) => {
  return (
    <Flex flexDirection="column" width="full" gap={5}>
      <ConnectCosmoskitView />
      {/* <ContractMethods
        abi={abi}
        isLoading={isLoading}
        type={type}
        addressHash={addressHash}
        tab={tab}
      /> */}
    </Flex>
  )
}

export default React.memo(ContractMethodsRegularNative)
