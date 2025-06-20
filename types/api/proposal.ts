import type { ValidatorDetail } from "./validator"

export interface ProposalDetailStatsResponse {
  total_count_votes: number
  total_count_depositors: number
  total_count_validators: number
}

export enum ProposalVoteOption {
  VOTE_OPTION_YES = "VOTE_OPTION_YES",
  VOTE_OPTION_NO = "VOTE_OPTION_NO",
  VOTE_OPTION_VETO = "VOTE_OPTION_NO_WITH_VETO",
  // VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO",
  VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
  DID_NOT_VOTE = "DID_NOT_VOTE",
}

export type ProposalStats = {
  total_proposals: number
  active_proposals: number
  passed_proposals: number
  rejected_and_failed_proposals: number
}

export const PROPOSAL_STATS_COUNTER: ProposalStats = {
  total_proposals: 100,
  active_proposals: 20,
  passed_proposals: 50,
  rejected_and_failed_proposals: 10,
}

export type ProposalDetailFilters = {
  proposal_id: number
}

export type ProposalFilters = {
  limit?: number
  search?: string
  items_count?: number
  status?: ProposalStatus[]
}

export enum DepositorType {
  MsgDeposit = "MsgDeposit",
  MsgSubmitProposal = "MsgSubmitProposal",
}

export type ProposalDepositorFilters = {
  limit?: number
  items_count?: number
  message_type?: Array<DepositorType>
}

export type ProposalVoteFilters = {
  limit?: number
  items_count?: number
  proposal_id?: number
  search?: string
  vote_options?: ProposalVoteOption[]
}

export type ProposalValidatorVoteFilters = {
  limit?: number
  items_count?: number
  proposal_id?: number
  search?: string
  vote_options?: ProposalVoteOption[]
}

export enum ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
  PROPOSAL_STATUS_DEPOSIT_PERIOD = "PROPOSAL_STATUS_DEPOSIT_PERIOD",
  PROPOSAL_STATUS_VOTING_PERIOD = "PROPOSAL_STATUS_VOTING_PERIOD",
  PROPOSAL_STATUS_PASSED = "PROPOSAL_STATUS_PASSED",
  PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
  PROPOSAL_STATUS_FAILED = "PROPOSAL_STATUS_FAILED",
  PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT = "PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT",
}

export const proposalStatusLabel: Record<ProposalStatus, string> = {
  [ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED]: "Unspecified",
  [ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD]: "Deposit period",
  [ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD]: "Voting period",
  [ProposalStatus.PROPOSAL_STATUS_PASSED]: "Passed",
  [ProposalStatus.PROPOSAL_STATUS_REJECTED]: "Rejected",
  [ProposalStatus.PROPOSAL_STATUS_FAILED]: "Failed",
  [ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT]: "Deposit failed",
}

export type ProposalStatusFilterInterface = {
  title: string
  id: ProposalStatus
}

export const PROPOSAL_STATUS_FILTERS: Array<ProposalStatusFilterInterface> = [
  {
    title: "Deposit period",
    id: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD,
  },
  { title: "Voting period", id: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD },
  { title: "Passed", id: ProposalStatus.PROPOSAL_STATUS_PASSED },
  { title: "Rejected", id: ProposalStatus.PROPOSAL_STATUS_REJECTED },
  { title: "Failed", id: ProposalStatus.PROPOSAL_STATUS_FAILED },
  {
    title: "Not enough deposit",
    id: ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT,
  },
]

export type Proposal = {
  proposal_id: number
  initial_deposit: ProposalAlDeposit[]
  description: string
  deposit_end_time: Date
  created_at: Date
  count_vote: ProposalCountVote | null
  content: ProposalContent
  proposer_address: string
  status: string
  submit_time: Date
  tally: ProposalTally
  title: string
  total_deposit: ProposalAlDeposit[]
  turnout: number
  type: string
  updated_at: Date
  vote_counted: boolean
  voting_end_time: Date
  voting_start_time: Date
  quorum: number
  tx_hash_submit_proposal: string
  is_initial_expedited: boolean
  is_onchain_expedited: boolean
}

//{ "plan": { "info": "{upgradeType:major}", "name": "v5.5.5", "time": "0001-01-01T00:00:00Z", "height": "84006014", "upgraded_client_state": null }, "@type": "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal", "title": "v5.5.5", "description": "https://github.com/sei-protocol/sei-chain/blob/main/CHANGELOG.md\\#v5.5.5" }
export interface ProposalContent {
  ["@type"]: string
  title: string
  token: string
  description: string

  pointer?: string
  version?: number
  plan?: {
    info: string
    name: string
    time: string
    height: string
    upgraded_client_state: string | null
  }
}

export interface ProposalCountVote {
  no: number
  yes: number
  abstain: number
  unspecified: number
  no_with_veto: number
}

export interface ProposalAlDeposit {
  denom: string
  amount: string
}

export interface ProposalTally {
  no: string
  yes: string
  abstain: string
  no_with_veto: string
}
export interface ProposalResponse {
  items: Array<Proposal>
  next_page_params: {
    limit: number
    items_count: number
  } | null
}

export interface ProposalDetailsResponse {
  proposal_detail: Proposal
}
export interface ProposalVote {
  id: number
  proposal_id: number
  voter: string
  height: number
  created_at: Date
  tx_id: number
  txhash: string
  updated_at: Date
  vote_option: string
  voter_account: ProposalVoterAccount
  validator?: ValidatorDetail
}

export type IProposalVoteInfo = {
  voter: string
  proposal_id: number
  vote_option: ProposalVoteOption
  txhash: string
  height: number
}

export interface ProposalVoterAccount {
  address: string
  created_at: Date
  id: number
  account_number: number
}

export interface ProposalDepositor {
  depositor: string
  denom: string
  amount: string
  txHash: string
  timestamp: Date
}

export interface ProposalValidator {
  account_address: string
  consensus_hex_address: string
  consensus_address: string
  operator_address: string
  image_url: string
  description: {
    details: string
    moniker: string
    website: string
    identity: string
    security_contact: string
  }
}

export type ProposalValidatorVote = ProposalValidator & {
  vote: ProposalVote
}

export interface ProposalVoteResponse {
  items: Array<ProposalVote>
  total_count: number
  next_page_params: {
    limit: number
    items_count: number
  } | null
}

export interface ProposalValidatorVoteResponse {
  items: Array<ProposalValidatorVote>
  total_count: number
  next_page_params: {
    limit: number
    items_count: number
  } | null
}

export interface ProposalDepositorResponse {
  items: Array<ProposalDepositor>
  next_page_params: {
    limit: number
    items_count: number
  } | null
}

export const PROPOSAL_VOTE_OPTIONS_FILTERS: Array<{
  title: string
  id: ProposalVoteOption
}> = [
  { title: "Yes", id: ProposalVoteOption.VOTE_OPTION_YES },
  { title: "No", id: ProposalVoteOption.VOTE_OPTION_NO },
  { title: "Veto", id: ProposalVoteOption.VOTE_OPTION_VETO },
  { title: "Abstain", id: ProposalVoteOption.VOTE_OPTION_ABSTAIN },
  { title: "Did not vote", id: ProposalVoteOption.DID_NOT_VOTE },
]

export type ITallyParams = {
  quorum: string
  threshold: string
  veto_threshold: string
  expedited_quorum: string
  expedited_threshold: string
}

export type IVotingParams = {
  voting_period: string
  expedited_voting_period: string
}
export interface IProposalParams {
  voting_params?: IVotingParams
  deposit_params?: {
    min_deposit: any[]
    max_deposit_period: string
    min_expedited_deposit: any[]
  }
  tally_params?: ITallyParams
}

export type IProposalVoteInfoResponse = {
  data: IProposalVoteInfo
}
