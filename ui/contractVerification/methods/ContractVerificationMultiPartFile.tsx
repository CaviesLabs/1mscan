import React from "react"

import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFieldCompiler from "../fields/ContractVerificationFieldCompiler"
import ContractVerificationFieldEvmVersion from "../fields/ContractVerificationFieldEvmVersion"
import ContractVerificationFieldLibraries from "../fields/ContractVerificationFieldLibraries"
import ContractVerificationFieldOptimization from "../fields/ContractVerificationFieldOptimization"
import ContractVerificationFieldSources from "../fields/ContractVerificationFieldSources"

const FILE_TYPES = [".sol" as const, ".yul" as const]

const ContractVerificationMultiPartFile = () => {
  return (
    <ContractVerificationFormGroup title="Contract verification via Solidity (multi-part files)">
      <ContractVerificationFieldCompiler />
      <ContractVerificationFieldEvmVersion />
      <ContractVerificationFieldOptimization />
      <ContractVerificationFieldSources
        fileTypes={FILE_TYPES}
        multiple
        title="Sources *.sol or *.yul files"
        hint="Upload all Solidity or Yul contract source files."
      />
      <ContractVerificationFieldLibraries />
    </ContractVerificationFormGroup>
  )
}

export default React.memo(ContractVerificationMultiPartFile)
