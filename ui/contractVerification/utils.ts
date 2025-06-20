import type { ErrorOption, FieldPath } from "react-hook-form"

import type {
  SmartContractVerificationConfig,
  SmartContractVerificationError,
  SmartContractVerificationMethod,
} from "types/api/contract"
import type {
  ContractLibrary,
  FormFieldTemp,
  FormFields,
  FormFieldsFlattenSourceCode,
  FormFieldsMultiPartFile,
  FormFieldsRaw,
  FormFieldsSourcify,
  FormFieldsStandardInput,
  FormFieldsVyperContract,
  FormFieldsVyperMultiPartFile,
  FormFieldsVyperStandardInput,
} from "./types"

import type { Params as FetchParams } from "lib/hooks/useFetch"
import type { OSType } from "types/base"

import { ADDRESS_REGEXP } from "lib/validations/address"
import { z } from "zod"

export const SUPPORTED_VERIFICATION_METHODS: Array<SmartContractVerificationMethod> =
  [
    "flattened-code",
    "standard-input",
    "sourcify",
    "multi-part",
    "vyper-code",
    "vyper-multi-part",
    "vyper-standard-input",
  ]

export const METHOD_LABELS: Record<SmartContractVerificationMethod, string> = {
  "flattened-code": "Solidity (Flattened source code)",
  "standard-input": "Solidity (Standard JSON input)",
  sourcify: "Solidity (Sourcify)",
  "multi-part": "Solidity (Multi-part files)",
  "vyper-code": "Vyper (Contract)",
  "vyper-multi-part": "Vyper (Multi-part files)",
  "vyper-standard-input": "Vyper (Standard JSON input)",
}

export const DEFAULT_VALUES: Record<
  SmartContractVerificationMethod,
  FormFieldsRaw
> = {
  "flattened-code": {
    os: "EVM",
    address: undefined,
    method: "flattened-code",
    is_yul: false,
    contract_name: "",
    compiler: null,
    evm_version: null,
    is_optimization_enabled: true,
    optimization_runs: "200",
    code: "",
    autodetect_constructor_args: true,
    constructor_args: "",
    libraries: [],
  },
  "standard-input": {
    os: "EVM",
    address: undefined,
    method: "standard-input",
    contract_name: "",
    compiler: null,
    sources: [],
    autodetect_constructor_args: true,
    constructor_args: "",
  },
  sourcify: {
    os: "EVM",
    address: undefined,
    method: "sourcify",
    sources: [],
  },
  "multi-part": {
    os: "EVM",
    address: undefined,
    method: "multi-part",
    compiler: null,
    evm_version: null,
    is_optimization_enabled: true,
    optimization_runs: "200",
    sources: [],
    libraries: [],
  },
  "vyper-code": {
    os: "EVM",
    address: undefined,
    method: "vyper-code",
    contract_name: "",
    compiler: null,
    evm_version: null,
    code: "",
    constructor_args: "",
  },
  "vyper-multi-part": {
    os: "EVM",
    interfaces: [],
    address: undefined,
    method: "vyper-multi-part",
    compiler: null,
    evm_version: null,
    sources: [],
  },
  "vyper-standard-input": {
    os: "EVM",
    address: undefined,
    method: "vyper-standard-input",
    compiler: null,
    sources: [],
  },
}

export function getDefaultValues(
  method: SmartContractVerificationMethod | undefined,
  config: SmartContractVerificationConfig,
  hash?: string,
) {
  if (hash && !method && !config) return { address: hash }
  if (!hash && !method && !config) return undefined

  const DEFAULT_TEMP: FormFieldTemp = {
    isNightly: false,
    isLibraries: Boolean(
      method && (DEFAULT_VALUES[method] as any)?.libraries?.length,
    ),
    is_rust_verifier_microservice_enabled:
      config.is_rust_verifier_microservice_enabled,
  }
  const defaultValues = {
    ...DEFAULT_TEMP,
    ...(method ? DEFAULT_VALUES[method] : {}),
    address: hash,
    os: "EVM" as OSType,
  }

  if ("evm_version" in defaultValues) {
    if (method === "flattened-code" || method === "multi-part") {
      defaultValues.evm_version = config.solidity_evm_versions.find(
        (value) => value === "default",
      )
        ? "default"
        : null
    }

    if (method === "vyper-multi-part") {
      defaultValues.evm_version = config.vyper_evm_versions.find(
        (value) => value === "default",
      )
        ? "default"
        : null
    }
  }

  if (config.is_rust_verifier_microservice_enabled) {
    if (method === "flattened-code" || method === "standard-input") {
      if ("name" in defaultValues) {
        defaultValues.name = undefined
      }
      if ("autodetect_constructor_args" in defaultValues) {
        defaultValues.autodetect_constructor_args = false
      }
    }
  }

  return defaultValues
}

export function isValidVerificationMethod(
  method?: string,
): method is SmartContractVerificationMethod {
  return method && SUPPORTED_VERIFICATION_METHODS.includes(method as never)
    ? true
    : false
}

export function sortVerificationMethods(
  methodA: SmartContractVerificationMethod,
  methodB: SmartContractVerificationMethod,
) {
  const indexA = SUPPORTED_VERIFICATION_METHODS.indexOf(methodA)
  const indexB = SUPPORTED_VERIFICATION_METHODS.indexOf(methodB)

  if (indexA > indexB) {
    return 1
  }

  if (indexA < indexB) {
    return -1
  }

  return 0
}

export function prepareRequestBody(data: FormFields): FetchParams["body"] {
  switch (data.method) {
    case "flattened-code": {
      const _data = data as FormFieldsFlattenSourceCode
      return {
        compiler_version: _data.compiler,
        source_code: _data.code,
        is_optimization_enabled: _data.is_optimization_enabled,
        is_yul_contract: _data.is_yul,
        optimization_runs: _data.optimization_runs,
        contract_name: _data.contract_name || undefined,
        libraries: reduceLibrariesArray(_data.libraries),
        evm_version: _data.evm_version,
        autodetect_constructor_args: _data.autodetect_constructor_args,
        constructor_args: _data.constructor_args,
      }
    }

    case "standard-input": {
      const _data = data as FormFieldsStandardInput

      const body = new FormData()
      _data.compiler && body.set("compiler_version", _data.compiler)
      body.set("contract_name", _data.contract_name)
      body.set(
        "autodetect_constructor_args",
        String(Boolean(_data.autodetect_constructor_args)),
      )
      body.set("constructor_args", _data.constructor_args)
      addFilesToFormData(body, _data.sources, "files")

      return body
    }

    case "sourcify": {
      const _data = data as FormFieldsSourcify
      const body = new FormData()
      addFilesToFormData(body, _data.sources, "files")
      _data.contract_index &&
        body.set("chosen_contract_index", _data.contract_index)

      return body
    }

    case "multi-part": {
      const _data = data as FormFieldsMultiPartFile

      const body = new FormData()
      _data.compiler && body.set("compiler_version", _data.compiler)
      _data.evm_version && body.set("evm_version", _data.evm_version)
      body.set(
        "is_optimization_enabled",
        String(Boolean(_data.is_optimization_enabled)),
      )
      _data.is_optimization_enabled &&
        body.set("optimization_runs", _data.optimization_runs)

      const libraries = reduceLibrariesArray(_data.libraries)
      libraries && body.set("libraries", JSON.stringify(libraries))
      addFilesToFormData(body, _data.sources, "files")

      return body
    }

    case "vyper-code": {
      const _data = data as FormFieldsVyperContract

      return {
        compiler_version: _data.compiler,
        evm_version: _data.evm_version,
        source_code: _data.code,
        contract_name: _data.contract_name,
        constructor_args: _data.constructor_args,
      }
    }

    case "vyper-multi-part": {
      const _data = data as FormFieldsVyperMultiPartFile

      const body = new FormData()
      _data.compiler && body.set("compiler_version", _data.compiler)
      _data.evm_version && body.set("evm_version", _data.evm_version)
      addFilesToFormData(body, _data.sources, "files")
      addFilesToFormData(body, _data.interfaces, "interfaces")

      return body
    }

    case "vyper-standard-input": {
      const _data = data as FormFieldsVyperStandardInput

      const body = new FormData()
      _data.compiler && body.set("compiler_version", _data.compiler)
      addFilesToFormData(body, _data.sources, "files")

      return body
    }

    default: {
      return {}
    }
  }
}

function reduceLibrariesArray(libraries: Array<ContractLibrary> | undefined) {
  if (!libraries || libraries.length === 0) {
    return
  }

  return libraries.reduce<Record<string, string>>((result, item) => {
    result[item.library_name] = item.address
    return result
  }, {})
}

function addFilesToFormData(
  body: FormData,
  files: Array<File> | undefined,
  fieldName: "files" | "interfaces",
) {
  if (!files) {
    return
  }

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    body.set(`${fieldName}[${index}]`, file, file.name)
  }
}

const API_ERROR_TO_FORM_FIELD: Record<
  keyof SmartContractVerificationError,
  FieldPath<FormFields>
> = {
  contract_source_code: "code",
  files: "sources",
  interfaces: "interfaces",
  compiler_version: "compiler",
  constructor_arguments: "constructor_args",
  name: "contract_name",
}

export function formatSocketErrors(
  errors: SmartContractVerificationError,
): Array<[FieldPath<FormFields>, ErrorOption] | undefined> {
  return Object.entries(errors).map(([key, value]) => {
    const _key = key as keyof SmartContractVerificationError
    if (!API_ERROR_TO_FORM_FIELD[_key]) {
      return
    }

    return [API_ERROR_TO_FORM_FIELD[_key], { message: value.join(",") }]
  })
}

export const schema = z
  .object({
    os: z
      .enum(["EVM", "cosmos"])
      .describe("OS must be either 'EVM' or 'cosmos'"),
    address: z
      .string({ required_error: "Address is required" })
      .regex(ADDRESS_REGEXP, "Address is incorrect"),
    method: z.enum(
      [
        "vyper-standard-input",
        "vyper-multi-part",
        "vyper-code",
        "multi-part",
        "sourcify",
        "standard-input",
        "flattened-code",
      ],
      { required_error: "Method is required" },
    ),
    is_rust_verifier_microservice_enabled: z.boolean().optional(),
    compiler: z
      .string({
        invalid_type_error: "Compiler must be a non-empty string",
        required_error: "Compiler is required",
      })
      .refine((data) => Boolean(data), {
        message: "Compiler is required",
        path: [],
      }),
    evm_version: z
      .string({
        invalid_type_error: "EVM Version must be a non-empty string",
      })
      .optional(),
    contract_name: z.string().optional(),
    sources: z.array(z.any()).optional(),
    code: z.string().optional(),
    is_optimization_enabled: z.boolean().optional(),
    optimization_runs: z.string().optional(),
    isLibraries: z.boolean(),
    libraries: z
      .array(
        z.object({
          library_name: z
            .string({
              required_error: "Library name is required",
            })
            .refine(
              (data) => {
                return data
              },
              { message: "Library name is required", path: [] },
            ),
          address: z
            .string()
            .regex(ADDRESS_REGEXP, "Library address is incorrect")
            .refine(
              (data) => {
                return data
              },
              { message: "Library address is required", path: [] },
            ),
        }),
      )
      .optional(),
    interfaces: z.array(z.custom<File>()).optional(),
    autodetect_constructor_args: z.boolean().optional(),
    constructor_args: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.os === "EVM" &&
        (["flattened-code", "multi-part", "vyper-multi-part"].includes(
          data.method,
        ) ||
          (data.method === "vyper-code" &&
            data.is_rust_verifier_microservice_enabled))
      ) {
        return Boolean(data.evm_version)
      }
      return true
    },
    {
      message: "EVM version is required for specified conditions",
      path: ["evm_version"],
    },
  )
  .refine(
    (data) => {
      if (
        data.method === "vyper-code" ||
        (!data.is_rust_verifier_microservice_enabled &&
          ["flattened-code", "standard-input"].includes(data.method))
      ) {
        return Boolean(data.contract_name)
      }
      return true
    },
    {
      message: "Contract name is required for specified conditions",
      path: ["contract_name"],
    },
  )
  .refine(
    (data) => {
      if (
        [
          "multi-part",
          "standard-input",
          "vyper-standard-input",
          "vyper-multi-part",
        ].includes(data.method)
      ) {
        const isValidFiles = data.sources?.every(
          (file) => file.size <= 20 * 1024 * 1024,
        )
        return (data.sources?.length || 0) >= 1 && isValidFiles
      }
      return true
    },
    {
      message:
        "At least one source is required, each with a maximum size of 20Mb",
      path: ["sources"],
    },
  )
  .refine(
    (data) => {
      if (["flattened-code", "vyper-code"].includes(data.method)) {
        return Boolean(data.code)
      }
      return true
    },
    { message: "Code is required for specified methods", path: ["code"] },
  )
  .refine(
    (data) => {
      if (data.method === "flattened-code" && data.is_optimization_enabled) {
        return Boolean(data.optimization_runs?.length)
      }
      return true
    },
    {
      message: "Optimization runs are required when optimization is enabled",
      path: ["optimization_runs"],
    },
  )
  .refine(
    (data) => {
      if (
        data.isLibraries &&
        ["flattened-code", "sourcify"].includes(data.method)
      ) {
        return (data.libraries?.length || 0) >= 1
      }
      return true
    },
    {
      message: "Libraries are required when library inclusion is enabled",
      path: ["libraries"],
    },
  )
  .refine(
    (data) => {
      if (data.method === "vyper-multi-part") {
        const isValidInterfaces =
          data.interfaces?.every((inter) => inter.size <= 20 * 1024 * 1024) ??
          false
        return (data.interfaces?.length || 0) >= 1 && isValidInterfaces
      }
      return true
    },
    {
      message:
        "At least one interface is required for vyper-multi-part method, each with a maximum size of 20Mb",
      path: ["interfaces"],
    },
  )
  .refine(
    (data) => {
      if (
        !["standard-input", "flattened-code"].includes(data.method) ||
        data.is_rust_verifier_microservice_enabled
      ) {
        return !data.autodetect_constructor_args
      }
      return true
    },
    {
      message:
        "Autodetect constructor args are required when Rust verifier microservice is enabled and method is 'standard-input' or 'flattened-code'",
      path: ["autodetect_constructor_args"],
    },
  )
  .refine(
    (data) => {
      if (
        data.autodetect_constructor_args === true ||
        (data.method === "vyper-code" &&
          !data.is_rust_verifier_microservice_enabled)
      ) {
        return Boolean(data.constructor_args?.length)
      }
      return true
    },
    {
      message:
        "Constructor args are required when autodetect_constructor_args is true or method is 'vyper-code' and Rust verifier microservice is enabled",
      path: ["constructor_args"],
    },
  )
  .refine(
    (data) => {
      if (["flattened-code", "multi-part"].includes(data.method)) {
        return true // is_optimization_enabled can be present or not
      }
      return !data.is_optimization_enabled // is_optimization_enabled must not exist for other methods
    },
    {
      message:
        "is_optimization_enabled must not exist for the specified method",
      path: ["is_optimization_enabled"],
    },
  )
  .refine(
    (data) => {
      if (
        data.isLibraries &&
        ["flattened-code", "multi-part"].includes(data.method)
      ) {
        return Boolean(data.libraries?.length)
      }
      return !data.libraries?.length
    },
    {
      message: "Libraries must be included for the specified method",
      path: ["libraries"],
    },
  )
