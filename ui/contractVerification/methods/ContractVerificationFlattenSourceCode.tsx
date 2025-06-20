import { Controller, useFormContext } from "react-hook-form"
import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFieldAutodetectArgs from "../fields/ContractVerificationFieldAutodetectArgs"
import ContractVerificationFieldCode from "../fields/ContractVerificationFieldCode"
import ContractVerificationFieldCompiler from "../fields/ContractVerificationFieldCompiler"
import ContractVerificationFieldEvmVersion from "../fields/ContractVerificationFieldEvmVersion"
import ContractVerificationFieldIsYul from "../fields/ContractVerificationFieldIsYul"
import ContractVerificationFieldLibraries from "../fields/ContractVerificationFieldLibraries"
import ContractVerificationFieldName from "../fields/ContractVerificationFieldName"
import ContractVerificationFieldOptimization from "../fields/ContractVerificationFieldOptimization"
import type { FormFields } from "../types"

const ContractVerificationFlattenSourceCode = () => {
  const { control } = useFormContext<FormFields>()
  return (
    <ContractVerificationFormGroup title="Contract verification via Solidity (Flattened source code)">
      <Controller
        control={control}
        name="is_rust_verifier_microservice_enabled"
        render={({ field: { value: isRustVerifierMicroserviceEnabled } }) => (
          <>
            {!isRustVerifierMicroserviceEnabled && (
              <ContractVerificationFieldName />
            )}
            {isRustVerifierMicroserviceEnabled && (
              <ContractVerificationFieldIsYul />
            )}
          </>
        )}
      ></Controller>

      <ContractVerificationFieldCompiler />
      <ContractVerificationFieldEvmVersion />
      <ContractVerificationFieldOptimization />

      <ContractVerificationFieldCode />

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

      <ContractVerificationFieldLibraries />
    </ContractVerificationFormGroup>
  )
}

export default ContractVerificationFlattenSourceCode
