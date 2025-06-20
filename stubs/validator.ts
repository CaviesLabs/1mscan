import type {
  IValidatorBondedChange,
  IValidatorDelegation,
  IValidatorDelegator,
  IValidatorProposedBlock,
  IValidatorUptime,
  IValidatorVote,
  IValidatorsDelegator,
  Validator,
  ValidatorDetail,
} from "types/api/validator"
import {
  DEFAULT_DATE,
  SEI_ADDRESS,
  SEI_TX_HASH,
  SEI_VALIDATOR_ADDRESS,
} from "./base"

export const VALIDATOR_INFO: Validator = {
  name: "sei-node-0",
  uptime: "99.99%",
  status: "BOND_STATUS_BONDED",
  commission: "10%",
  consensus_hex_address: "0x00000000000000000000000000000000000000000000",
  operator_address: "sei000000000000000000000000000000000000000000000000",
  voting_power_amount: "0",
  voting_power_percentage: "0%",
  participation_ratio: "0/11",
  participation_percentage: "0%",
  image_url: null,
}

export const VALIDATOR_DELEGATIONS: IValidatorDelegation = {
  validator_dst: {
    operator_address: SEI_VALIDATOR_ADDRESS,
    name: "placeholder",
    image_url: null,
  },
  validator_src: {
    operator_address: null,
    name: null,
    image_url: null,
  },
  delegator_address: SEI_ADDRESS,
  amount: "0",
  transaction_hash: SEI_TX_HASH,
  block_timestamp: DEFAULT_DATE,
  type: "delegate",
  id: 0,
}

export const VALIDATOR_DELEGATORS: IValidatorDelegator = {
  id: 0,
  validators: [],
  delegator_address: SEI_ADDRESS,
  stake_amount: "0",
  delegator_shares: "0",
  percentage: "0%",
  txs_count: "0",
}

export const VALIDATORS_DELEGATORS: IValidatorsDelegator = {
  id: 0,
  validators: [],
  delegator_address: SEI_ADDRESS,
  total_stake_amount: "0",
  total_delegator_shares: "0",
  percentage: "0%",
  txs_count: "0",
}

export const VALIDATOR_BONDED_CHANGE: IValidatorBondedChange = {
  validator_src: {
    operator_address: SEI_VALIDATOR_ADDRESS,
    name: "placeholder",
    image_url: null,
  },
  validator_dst: {
    operator_address: SEI_VALIDATOR_ADDRESS,
    name: "placeholder",
    image_url: null,
  },
  delegator_address: SEI_ADDRESS,
  type: "redelegate",
  amount: "0",
  transaction_hash: SEI_TX_HASH,
  block_timestamp: DEFAULT_DATE,
}

export const VALIDATOR_VOTE: IValidatorVote = {
  proposal_id: 0,
  initial_deposit: [],
  description: "placeholder",
  deposit_end_time: DEFAULT_DATE,
  count_vote: undefined,
  content: {
    "@type": "/cosmos.gov.v1beta1.TextProposal",
    title: "placeholder",
    description: "placeholder",
    is_expedited: false,
  },
  proposer_address: "sei1f089ksv0k9fm2xmlw4r0x8qh8dy5xxsyyly2ae",
  status: "PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT",
  submit_time: DEFAULT_DATE,
  tally: {
    no: "0",
    yes: "0",
    abstain: "0",
    no_with_veto: "0",
  },
  title: "placeholder",
  total_deposit: [],
  turnout: 0,
  type: "/cosmos.gov.v1beta1.TextProposal",
  vote_counted: false,
  voting_end_time: DEFAULT_DATE,
  voting_start_time: DEFAULT_DATE,
  is_initial_expedited: false,
  is_onchain_expedited: false,
  vote: "DID_NOT_VOTE",
}

export const VALIDATOR_PROPOSED_BLOCK: IValidatorProposedBlock = {
  height: 0,
  tx_count: 0,
  total_gas_used: 0,
  percent_voting_power: 0,
  time: DEFAULT_DATE,
  block_rewards: [],
  validator_block_rewards: "0",
}

export const VALIDATORS_STATS = [
  {
    label: "Total validators",
    value: 30,
  },
  {
    label: "Active validators",
    value: 29,
  },
  {
    label: "Inactive validators",
    value: 1,
  },
  {
    label: "Jailed validators",
    value: 1,
  },
]

export const VALIDATOR_DETAIL: ValidatorDetail = {
  id: 0,
  account_address: "sei000000000000000000000000000000000000000",
  consensus_address: "seivalcons000000000000000000000000000000000000000",
  consensus_hex_address: "0x0000000000000000000000000000000000000000",
  percent_voting_power: 0.0,
  operator_address: "seivaloper000000000000000000000000000000000000000",
  missed_blocks_counter: 0,
  min_self_delegation: 0,
  jailed_until: "",
  jailed: false,
  image_url: "",
  index_offset: 0,
  description: {
    details: "",
    moniker: "sei-node-0",
    website: "",
    identity: "",
    security_contact: "",
  },
  delegators_last_height: 0,
  delegators_count: 0,
  consensus_pubkey: {
    key: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    type: "/cosmos.crypto.ed25519.PubKey",
  },
  delegator_shares: 0,
  created_at: "",
  commission: {
    update_time: "",
    commission_rates: {
      rate: "0.000000000000000000",
      max_rate: "0.000000000000000000",
      max_change_rate: "0.000000000000000000",
    },
  },
  uptime: 0.0,
  updated_at: "",
  unbonding_time: "",
  unbonding_height: 0,
  tombstoned: false,
  tokens: 0,
  status: "BOND_STATUS_UNBONDED",
  start_height: 0,
  self_delegation_balance: 0,
}

export const VALIDATOR_UPTIME: IValidatorUptime = {
  height: "0",
  time: DEFAULT_DATE,
  signed: true,
  is_proposed: false,
}
