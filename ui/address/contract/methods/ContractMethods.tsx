import React from "react"

import type { MethodType, SmartContractMethod } from "./types"

import ContentLoader from "ui/shared/ContentLoader"
import DataFetchAlert from "ui/shared/DataFetchAlert"

import ContractAbi from "./ContractAbi"

interface Props {
  abi: Array<SmartContractMethod>
  isLoading?: boolean
  isError?: boolean
  type: MethodType
  addressHash: string | undefined
}

const ContractMethods = ({
  abi,
  isLoading,
  isError,
  type,
  addressHash,
}: Props) => {
  if (isLoading) {
    return <ContentLoader />
  }

  if (isError) {
    return <DataFetchAlert />
  }

  if (abi.length === 0) {
    return <span>No public {type} functions were found for this contract.</span>
  }

  return (
    <ContractAbi abi={abi} addressHash={addressHash} isLoading={isLoading} />
  )
}

export default React.memo(ContractMethods)
