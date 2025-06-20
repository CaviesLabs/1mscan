export type IFaucetRequest = {
  wallet_address: string
  chain_id: string
}

export type IFaucetEligibilityResponse = {
  isEligible: boolean
  nextFaucetTime: string
}

export type IFaucetClaimRequest = {
  wallet_address: string
  captcha_token: string
  chain_id: string
}

export type IFaucetClaimResponse = {
  message: string
}
