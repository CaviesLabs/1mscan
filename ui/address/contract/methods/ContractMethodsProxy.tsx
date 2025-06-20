import { Flex } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import React, { memo } from "react"
import type { AddressImplementation } from "types/api/addressParams"
import ConnectAppkitView from "ui/shared/wallet/ConnectAppkitView"
import ContractImplementationAddress from "./ContractImplementationAddress"
import ContractMethods from "./ContractMethods"
import type { MethodType } from "./types"
import { isReadMethod, isWriteMethod } from "./utils"

interface Props {
  type: MethodType
  implementations: Array<AddressImplementation>
  isLoading?: boolean
  addressHash: string
}

const ContractMethodsProxy = ({
  type,
  implementations,
  isLoading: isInitialLoading,
  addressHash,
}: Props) => {
  const [selectedItem, setSelectedItem] = React.useState(implementations[0])

  const contractQuery = useApiQuery("contract", {
    pathParams: { hash: selectedItem.address },
    queryOptions: {
      enabled: Boolean(selectedItem.address),
      refetchOnMount: false,
    },
  })

  const handleItemSelect = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextOption = implementations.find(
        ({ address }) => address === event.target.value,
      )
      if (nextOption) {
        setSelectedItem(nextOption)
      }
    },
    [implementations],
  )

  const abi =
    contractQuery.data?.abi?.filter(
      type === "read" ? isReadMethod : isWriteMethod,
    ) || []

  return (
    <Flex flexDirection="column" width="full" gap={3}>
      <ConnectAppkitView />
      <ContractImplementationAddress
        implementations={implementations}
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
        isLoading={isInitialLoading}
      />
      <ContractMethods
        key={selectedItem.address}
        abi={abi}
        isLoading={isInitialLoading || contractQuery.isPending}
        isError={contractQuery.isError}
        type={type}
        addressHash={addressHash}
      />
    </Flex>
  )
}

export default memo(ContractMethodsProxy, (prev, next) => {
  return (
    prev.implementations === next.implementations &&
    prev.isLoading === next.isLoading &&
    prev.addressHash === next.addressHash &&
    prev.type === next.type
  )
})
