import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFieldCompiler from "../fields/ContractVerificationFieldCompiler"
import ContractVerificationFieldSources from "../fields/ContractVerificationFieldSources"

const FILE_TYPES = [".json" as const]

const ContractVerificationVyperStandardInput = () => {
  return (
    <ContractVerificationFormGroup title="Contract verification via Vyper (standard JSON input) ">
      <ContractVerificationFieldCompiler isVyper />
      <ContractVerificationFieldSources
        fileTypes={FILE_TYPES}
        title="Standard Input JSON"
        hint="Upload the standard input JSON file created during contract compilation."
      />
    </ContractVerificationFormGroup>
  )
}

export default ContractVerificationVyperStandardInput
