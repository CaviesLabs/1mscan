import type {
  ICodeIDStats,
  IContractCode,
  IContractCodeContract,
} from "types/api/codeID"
import { ADDRESS_HASH_SEI } from "./addressParams"
import { DEFAULT_DATE } from "./base"
import { TX_HASH_SEI } from "./tx"

export const CODE_ID_STATS: ICodeIDStats = {
  total_codes: "0",
  total_verified_codes: "0",
  total_verified_contracts: "0",
}

export const CONTRACT_CODE: IContractCode = {
  code_id: "0",
  creator: ADDRESS_HASH_SEI,
  store_hash: TX_HASH_SEI,
  store_height: "0",
  store_time: DEFAULT_DATE,
  type: "CW-20",
  is_verfified: true,
  verified_at: DEFAULT_DATE,
  smart_contracts_count: "0",
  cw2_info: "placeholder",
}

export const CONTRACT_CODE_CONTRACT: IContractCodeContract = {
  instantiate_hash: TX_HASH_SEI,
  instantiate_height: "0",
  instantiate_time: DEFAULT_DATE,
  name: "placeholder",
  creator: ADDRESS_HASH_SEI,
  code_id: "0",
  address: ADDRESS_HASH_SEI,
  verified_at: null,
}
