import type { ProposalVote } from "./proposal"

export type ValidatorStatus =
  | "BOND_STATUS_BONDED"
  | "BOND_STATUS_UNBONDING"
  | "BOND_STATUS_UNBONDED"
  | "Bonded"

export type IDelegationType = "delegate" | "unbond" | "redelegate"

export type Validator = {
  consensus_hex_address: string
  operator_address: string // sei native address
  image_url: string | null | undefined
  status: ValidatorStatus
  uptime: `${number}%`
  commission: `${number}%`
  voting_power_amount: string // number-string
  voting_power_percentage: `${number}%`
  name: string // name of the validator
  participation_ratio: `${number}/${number}` // ex: "14/17"
  participation_percentage: `${string}%`
}

export type ValidatorWithAdditionalInfo = Validator & {
  apr: number
}

export type ValidatorFilterStatus = "active" | "inactive" | "jailed"

export type ValidatorsFilter = {
  q?: string
  status?: ValidatorFilterStatus
}

export interface ValidatorInfosResponse {
  items: Array<Validator>
  next_page_params: {
    block_number: number
    items_count: number
  } | null
}

export type ValidatorsStatsResponse = {
  value: string | number | "null" | null
  label:
    | "Bonded tokens"
    | "Bonded token ratio"
    | "Total rewards"
    | "Last block reward"
    | "Avg APR"
    | "Highest APR"
    | "Total validators"
    | "Total delegators"
    | "Active validators"
    | "Inactive validators"
    | "Jailed validators"
  unit: string | null
}[]

export type ValidatorDetail = {
  id: number
  account_address: string
  consensus_address: string
  consensus_hex_address: string
  percent_voting_power: number
  operator_address: string
  missed_blocks_counter: number
  min_self_delegation: number
  jailed_until: string
  jailed: boolean
  image_url: string
  index_offset: number
  description: {
    details: string
    moniker: string
    website: string
    identity: string
    security_contact: string
  }
  delegators_last_height: number
  delegators_count: number
  consensus_pubkey: {
    key: string
    type: string
  }
  delegator_shares: number
  created_at: string
  commission: {
    update_time: string
    commission_rates: {
      rate: string
      max_rate: string
      max_change_rate: string
    }
  }
  uptime: number
  updated_at: string
  unbonding_time: string
  unbonding_height: number
  tombstoned: boolean
  tokens: number
  status: string
  start_height: number
  self_delegation_balance: number
}

export type ValidatorDetailFilter = {
  address: string
}

export type ValidatorDetailResponse = ValidatorDetail

export type IValidatorDelegation = {
  id: any
  validator_src: {
    image_url: string | "validator-default.svg" | null
    operator_address: string | null
    name: string | null
  }
  validator_dst: {
    image_url: string | "validator-default.svg" | null
    operator_address: string | null
    name: string | null
  }
  delegator_address: string
  type: IDelegationType
  amount: string
  transaction_hash: string
  block_timestamp: string
}

export type ValidatorsDelegationsResponse = {
  items: Array<IValidatorDelegation>
  next_page_params: {
    block_number: number
    items_count: number
  } | null
}

export type IValidatorsDelegator = {
  id: number
  validators: (Pick<
    ValidatorDetail,
    "operator_address" | "image_url" | "delegator_shares"
  > & {
    name: string
  })[]
  delegator_address: string
  total_stake_amount: string
  total_delegator_shares: string
  percentage: string
  txs_count: string
}

export type ValidatorsDelegatorsResponse = {
  items: IValidatorsDelegator[]
  next_page_params: {
    block_number: number
    items_count: number
  } | null
}

export type IValidatorDelegator = {
  id: number
  validators: (Pick<
    ValidatorDetail,
    "operator_address" | "image_url" | "delegator_shares"
  > & {
    name: string
  })[]
  delegator_address: string
  stake_amount: string
  delegator_shares: string
  percentage: string
  txs_count: string
}

export type ValidatorDelegatorsResponse = {
  items: IValidatorDelegator[]
  next_page_params: {
    block_number: number
    items_count: number
  } | null
}

export type IValidatorBondedChange = {
  validator_src: {
    operator_address: string | null
    name: string | null
    image_url: string | null
  }
  validator_dst: {
    operator_address: string | null
    name: string | null
    image_url: string | null
  }
  delegator_address: string
  type: IDelegationType
  amount: string
  transaction_hash: string
  block_timestamp: string
}

export type ValidatorBondedChangeResponse = {
  items: IValidatorBondedChange[]
  next_page_params?: any
}

export type IValidatorVote = {
  proposal_id: number
  initial_deposit: Array<{
    denom: string
    amount: string
  }>
  description: string
  deposit_end_time: string
  count_vote?: {
    no: number
    yes: number
    abstain: number
    unspecified: number
    no_with_veto: number
  }
  content: {
    "@type": string
    title: string
    description: string
    is_expedited?: boolean
    changes?: Array<{
      key: string
      value: string
      subspace: string
    }>
    plan?: {
      info: string
      name: string
      time: string
      height: string
      upgraded_client_state: any
    }
  }
  proposer_address: string
  status: string
  submit_time: string
  tally: {
    no: string
    yes: string
    abstain: string
    no_with_veto: string
  }
  title: string
  total_deposit: Array<{
    denom: string
    amount: string
  }>
  turnout: number
  type: string
  vote_counted: boolean
  voting_end_time: string
  voting_start_time: string
  is_initial_expedited?: boolean
  is_onchain_expedited: boolean
  vote: ProposalVote | "DID_NOT_VOTE" | null
}

export type ValidatorVotesResponse = {
  total_count: number
  vote_option_counter: {
    VOTE_OPTION_YES: number
    VOTE_OPTION_NO: number
    VOTE_OPTION_NO_WITH_VETO: number
    VOTE_OPTION_ABSTAIN: number
    DID_NOT_VOTE: number
  }
  next_page_params: any
  items: IValidatorVote[]
}

export type IValidatorProposedBlock = {
  height: number
  time: string
  tx_count: number
  total_gas_used: number
  percent_voting_power: number
  block_rewards: Array<{
    reward: string
    type: string
  }>
  validator_block_rewards: string
}

export type ValidatorProposedBlocksResponse = {
  items: IValidatorProposedBlock[]
}

export type ValidatorsCountersResponse = {
  total_validators: number
  total_delegators: number
  total_delegations: number
  total_redelegations: number
  total_undelegations: number
}

export type ValidatorCounterResponse = {
  total_delegators: number
  total_delegations: number
  total_redelegations: number
  total_undelegations: number
  total_votes: number
  total_proposed_blocks: number
}

export type IValidatorUptime = {
  height: string
  time: string
  signed: boolean
  is_proposed: boolean
}

export type ValidatorUptimeResponse = {
  data: IValidatorUptime[]
}
