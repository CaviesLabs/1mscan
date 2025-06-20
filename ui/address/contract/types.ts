import type {
  SmartContractMethod,
  SmartContractQueryMethodRead,
} from "types/api/contract"

import type { ResourceError } from "lib/api/resources"
import type { Hex } from "viem"

export type MethodFormFields = Record<string, string>

export type ContractMethodReadResult =
  | SmartContractQueryMethodRead
  | ResourceError

export type ContractMethodWriteResult =
  | Error
  | { hash: Hex | undefined }
  | undefined

export type ContractMethodCallResult<T extends SmartContractMethod> =
  T extends { method_id: string }
    ? ContractMethodReadResult
    : ContractMethodWriteResult
