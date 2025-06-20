import type { AddressParam } from "types/api/addressParams"
import { VALIDATOR_DETAIL } from "./validator"

export const ADDRESS_HASH = "0x0000000000000000000000000000000000000000"
export const ADDRESS_HASH_SEI = "sei1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq703fpu"

export const ADDRESS_PARAMS: AddressParam = {
  hash: ADDRESS_HASH,
  implementations: null,
  is_contract: false,
  is_verified: null,
  name: null,
  validator_data: VALIDATOR_DETAIL,
}
