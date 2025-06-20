import type { SmartContractVerificationMethod } from "types/api/contract"
import type { OSType } from "types/base"
import type { Hex } from "viem"

export interface ContractLibrary {
  id: string
  library_name: string
  address: string
}

export interface FormFieldsFlattenSourceCode {
  method: "flattened-code" extends SmartContractVerificationMethod
    ? "flattened-code"
    : never
  is_yul: boolean
  contract_name: string | undefined
  compiler: string | null | undefined
  evm_version: string | null | undefined
  is_optimization_enabled: boolean
  optimization_runs: string
  code: string
  autodetect_constructor_args: boolean
  constructor_args: string
  libraries: Array<ContractLibrary>
}

export interface FormFieldsStandardInput {
  method: "standard-input" extends SmartContractVerificationMethod
    ? "standard-input"
    : never
  contract_name: string
  compiler: string | null | undefined
  sources: Array<File>
  autodetect_constructor_args: boolean
  constructor_args: string
}

export interface FormFieldsSourcify {
  method: "sourcify" extends SmartContractVerificationMethod
    ? "sourcify"
    : never
  sources: Array<File>
  contract_index?: string
}

export interface FormFieldsMultiPartFile {
  method: "multi-part" extends SmartContractVerificationMethod
    ? "multi-part"
    : never
  compiler: string | null | undefined
  evm_version: string | null | undefined
  is_optimization_enabled: boolean
  optimization_runs: string
  sources: Array<File>
  libraries: Array<ContractLibrary>
}

export interface FormFieldsVyperContract {
  method: "vyper-code" extends SmartContractVerificationMethod
    ? "vyper-code"
    : never
  contract_name: string
  evm_version: string | null | undefined
  compiler: string | null | undefined
  code: string
  constructor_args: string | undefined
}

export interface FormFieldsVyperMultiPartFile {
  method: "vyper-multi-part" extends SmartContractVerificationMethod
    ? "vyper-multi-part"
    : never
  compiler: string | null | undefined
  evm_version: string | null | undefined
  sources: Array<File>
  interfaces: Array<File>
}

export interface FormFieldsVyperStandardInput {
  method: "vyper-standard-input" extends SmartContractVerificationMethod
    ? "vyper-standard-input"
    : never
  compiler: string | null | undefined
  sources: Array<File>
}
export type FormFieldsBase = {
  os: OSType | null | undefined
  address: Hex | string | null | undefined | undefined | ""
}

export type FormFieldsRaw<
  T extends SmartContractVerificationMethod = SmartContractVerificationMethod,
> = FormFieldsBase &
  (T extends "flattened-code"
    ? FormFieldsFlattenSourceCode
    : T extends "standard-input"
      ? FormFieldsStandardInput
      : T extends "sourcify"
        ? FormFieldsSourcify
        : T extends "multi-part"
          ? FormFieldsMultiPartFile
          : T extends "vyper-code"
            ? FormFieldsVyperContract
            : T extends "vyper-multi-part"
              ? FormFieldsVyperMultiPartFile
              : T extends "vyper-standard-input"
                ? FormFieldsVyperStandardInput
                : never)

export type FormFieldTemp = {
  isNightly: boolean
  isLibraries: boolean
  is_rust_verifier_microservice_enabled: boolean
}

export type FormFields<
  T extends SmartContractVerificationMethod = SmartContractVerificationMethod,
> = FormFieldsRaw<T> & FormFieldTemp
