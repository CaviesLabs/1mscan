import React from "react"

import { Controller, useFormContext } from "react-hook-form"
import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFieldAutodetectArgs from "../fields/ContractVerificationFieldAutodetectArgs"
import ContractVerificationFieldCompiler from "../fields/ContractVerificationFieldCompiler"
import ContractVerificationFieldName from "../fields/ContractVerificationFieldName"
import ContractVerificationFieldSources from "../fields/ContractVerificationFieldSources"
import type { FormFields } from "../types"

const FILE_TYPES = [".json" as const]

const ContractVerificationStandardInput = () => {
  const { control } = useFormContext<FormFields>()
  return (
    <ContractVerificationFormGroup title="Contract verification via Solidity (standard JSON input)">
      <Controller
        control={control}
        name="is_rust_verifier_microservice_enabled"
        render={({ field: { value: isRustVerifierMicroserviceEnabled } }) => (
          <>
            {!isRustVerifierMicroserviceEnabled && (
              <ContractVerificationFieldName />
            )}
          </>
        )}
      ></Controller>

      <ContractVerificationFieldCompiler />
      <ContractVerificationFieldSources
        fileTypes={FILE_TYPES}
        title="Standard Input JSON"
        hint="Upload the standard input JSON file created during contract compilation."
      />
      <Controller
        control={control}
        name="is_rust_verifier_microservice_enabled"
        render={({ field: { value: isRustVerifierMicroserviceEnabled } }) => (
          <>
            {!isRustVerifierMicroserviceEnabled && (
              <ContractVerificationFieldAutodetectArgs />
            )}
          </>
        )}
      ></Controller>
    </ContractVerificationFormGroup>
  )
}

export default React.memo(ContractVerificationStandardInput)
