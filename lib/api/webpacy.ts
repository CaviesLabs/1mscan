export interface WebacyTag {
  name: string
  description: string
  type: string
  severity: number
  key: string
  score?: number
  riskScore?: string
}

export interface WebacyCategory {
  key: string
  name: string
  description: string
  tags: Record<string, boolean>
}

export interface WebacyIssue {
  score: number
  tags: WebacyTag[]
  categories: {
    [key: string]: WebacyCategory
  }
  riskScore: string
}

export interface WebacyFundFlowRisk {
  ofac: boolean
  hacker: boolean
  mixers: boolean
  drainer: boolean
  fbi_ic3: boolean
  tornado: boolean
}

export interface WebacyAddressInfo {
  balance: number
  expiresAt: number
  time_1st_tx: string
  time_verified: number
  has_no_balance: boolean
  automated_trading: boolean
  transaction_count: number
  has_no_transactions: boolean
}

export interface WebacyBuySellTaxes {
  has_buy_tax: boolean
  has_sell_tax: boolean
}

export interface WebacyFundFlows {
  risk: WebacyFundFlowRisk
  flows: any[] // Define specific type if needed
  label: string | null
  accounts: Record<string, any> // Define specific type if needed
  fund_flow_risk: WebacyFundFlowRisk
}

export interface WebacyDetails {
  fund_flows: WebacyFundFlows
  address_info: WebacyAddressInfo
  token_risk: Record<string, any> // Define specific type if needed
  token_metadata_risk: Record<string, any> // Define specific type if needed
  marketData: Record<string, any> // Define specific type if needed
  buy_sell_taxes: WebacyBuySellTaxes
}

export interface WebacyResponse {
  count: number
  medium: number
  high: number
  overallRisk: number
  issues: WebacyIssue[]
  details: WebacyDetails
  isContract: boolean
}
