import { Controller, useFormContext } from "react-hook-form"
import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFieldCode from "../fields/ContractVerificationFieldCode"
import ContractVerificationFieldCompiler from "../fields/ContractVerificationFieldCompiler"
import ContractVerificationFieldConstructorArgs from "../fields/ContractVerificationFieldConstructorArgs"
import ContractVerificationFieldEvmVersion from "../fields/ContractVerificationFieldEvmVersion"
import ContractVerificationFieldName from "../fields/ContractVerificationFieldName"
import type { FormFields } from "../types"

const ContractVerificationVyperContract = () => {
  const { control } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormGroup title="Contract verification via Vyper (contract)">
      <ContractVerificationFieldName hint="The contract name is the name assigned to the verified contract in 1Mscan." />
      <ContractVerificationFieldCompiler isVyper />

      <Controller
        control={control}
        name="is_rust_verifier_microservice_enabled"
        render={({ field: { value: isRustVerifierMicroserviceEnabled } }) => (
          <>
            {isRustVerifierMicroserviceEnabled && (
              <ContractVerificationFieldEvmVersion isVyper />
            )}
          </>
        )}
      ></Controller>

      <ContractVerificationFieldCode isVyper />

      <Controller
        control={control}
        name="is_rust_verifier_microservice_enabled"
        render={({ field: { value: isRustVerifierMicroserviceEnabled } }) => (
          <>
            {!isRustVerifierMicroserviceEnabled && (
              <ContractVerificationFieldConstructorArgs />
            )}
          </>
        )}
      ></Controller>
    </ContractVerificationFormGroup>
  )
}

export default ContractVerificationVyperContract
