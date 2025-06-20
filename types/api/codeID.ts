import type { DefaultFilter, IGatewayResponse } from "./base"
import type { TokenTypeCosmos } from "./token"

export type ICodeIDStats = {
  total_codes: string
  total_verified_codes: string
  total_verified_contracts: string
}

export type IContractCode = {
  code_id: string
  creator: string
  store_hash: string
  store_height: string
  store_time: string
  type: null | TokenTypeCosmos
  is_verfified: boolean
  verified_at: string | null
  smart_contracts_count: string
  cw2_info: string | null
}

export type IContractCodeContract = {
  instantiate_hash: string
  instantiate_height: string
  instantiate_time: string
  name: string
  creator: string
  code_id: string
  address: string
  verified_at: string | null
}

export type IContractCodesResponse = IGatewayResponse<{
  items: IContractCode[]
}>
export type IContractCodeContractsResponse = IGatewayResponse<{
  items: IContractCodeContract[]
}>

export type IContractCodesQuery = DefaultFilter<{
  type?: TokenTypeCosmos | "" | undefined | null
  search?: string
}>

export interface IContractCodesStats {
  total_codes: number
  total_verified_codes: number
  total_verified_contracts: number
}
