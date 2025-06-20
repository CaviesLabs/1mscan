import { Link } from "@chakra-ui/react"

import ContractVerificationFormGroup from "../ContractVerificationFormGroup"
import ContractVerificationFieldCompiler from "../fields/ContractVerificationFieldCompiler"
import ContractVerificationFieldEvmVersion from "../fields/ContractVerificationFieldEvmVersion"
import ContractVerificationFieldSources from "../fields/ContractVerificationFieldSources"

const MAIN_SOURCES_TYPES = [".vy" as const]
const INTERFACE_TYPES = [".vy" as const, ".json" as const]

const ContractVerificationVyperMultiPartFile = () => {
  return (
    <ContractVerificationFormGroup title="Contract verification via Vyper (multi-part files)">
      <ContractVerificationFieldCompiler isVyper />
      <ContractVerificationFieldEvmVersion isVyper />
      <ContractVerificationFieldSources
        name="sources"
        fileTypes={MAIN_SOURCES_TYPES}
        title="Upload main *.vy source"
        hint="Primary compiled Vyper contract. Only add the main contract here whose bytecode has been deployed, all other files can be uploaded to the interfaces box below."
      />
      <ContractVerificationFieldSources
        name="interfaces"
        fileTypes={INTERFACE_TYPES}
        multiple
        title="Interfaces (.vy or .json)"
        hint={
          <>
            <span>Add any </span>
            <Link
              href="https://docs.vyperlang.org/en/stable/interfaces.html"
              target="_blank"
            >
              required interfaces
            </Link>
            <span> for the main compiled contract.</span>
          </>
        }
      />
    </ContractVerificationFormGroup>
  )
}

export default ContractVerificationVyperMultiPartFile
