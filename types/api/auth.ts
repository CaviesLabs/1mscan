export type ResetPasswordFilters = {
  email: string
  password: string
  otp: string
}

export type RegisterFilters = {
  email: string
  password: string
}

export type RegisterResponse = {
  name: string
  _id: string
  email: string
  email_verified: boolean
}

export type ExchangeCodeFilters = {
  code?: string
  email?: string
  password?: string
}

export type ExchangeCodeResponse = {
  access_token: string
  expires_in: number
  id_token: string
  scope: string
  token_type: string
}
