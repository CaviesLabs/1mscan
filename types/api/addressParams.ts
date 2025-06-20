import type { Association } from "./transaction"
import type { ValidatorDetail } from "./validator"

export interface AddressParam {
  hash: string
  name: string | null
  is_contract: boolean | null
  is_verified: boolean | null | undefined
  validator_data?: ValidatorDetail
  implementations: Array<AddressImplementation> | null
  association?: Association | null
}

export interface AddressImplementation {
  address: string
  name: string | null
}
