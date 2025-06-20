import type {
  Address,
  AddressCollectionsResponse,
  AddressCounters,
  AddressInternalTxsResponse,
  AddressNFTsResponse,
  AddressTabsCounters,
  AddressTokenTransferResponse,
  AddressTokensCounter,
  AddressTokensResponse,
  AddressTransactionsResponse,
} from "types/api/address"
import type { AddressesResponse } from "types/api/addresses"
import type {
  Block,
  BlockTransactionsResponse,
  BlocksResponse,
} from "types/api/block"
import type {
  ChartMarketResponse,
  ChartTransactionResponse,
} from "types/api/charts"
import type {
  SmartContract,
  SmartContractVerificationConfig,
} from "types/api/contract"
import type {
  SmartContractSecurityAudits,
  VerifiedContractsCounters,
  VerifiedContractsResponse,
} from "types/api/contracts"
import type { InternalTransactionsResponse } from "types/api/internalTransaction"
import type {
  LogsCosmosResponseAddress,
  LogsResponseAddress,
  LogsResponseTx,
} from "types/api/log"
import type { ISearchItem } from "types/api/search"
import type {
  Checkpoints,
  Counters,
  HomeStats,
  IStatsCounters,
  StatsChart,
  StatsCharts,
} from "types/api/stats"
import type {
  IApprovalAssetsResponse,
  IApprovalStatsResponse,
  INativeTokenCounters,
  INativeTokenHoldersResponse,
  INativeTokenTransfersResponse,
  TokenCounters,
  TokenHolders,
  TokenICS20sResponse,
  TokenInfo,
  TokenInstance,
  TokenInstanceTransfersCount,
  TokenInventoryResponse,
  TokenNativesResponse,
} from "types/api/token"
import type { TokenTransferResponse } from "types/api/tokenTransfer"
import type {
  PointerResponse,
  TokenInstanceTransferResponse,
  TokensResponse,
} from "types/api/tokens"
import type {
  Association,
  Transaction,
  TransactionsResponseValidated,
} from "types/api/transaction"
import type { TxStateChanges } from "types/api/txStateChanges"

import type { ExchangeCodeResponse } from "types/api/auth"
import type {
  IABCI,
  IChainStatus,
  IDeposit,
  IDistribution,
  IGenesis,
  IInflation,
  IMint,
  IMinter,
  INodeInfo,
  ISlashing,
  IStaking,
  IStakingPool,
  ITallying,
  ITotalSupply,
  IVoting,
} from "types/api/chain"
import type {
  IContractCode,
  IContractCodeContractsResponse,
  IContractCodesResponse,
  IContractCodesStats,
} from "types/api/codeID"
import type {
  IBCChainConnectedResponse,
  IBCChainDetailsResponse,
  IIBCChannelTransactionsResponse,
  IIBCRelayerChannel,
  IIBCRelayerChannelTransferAssetsResponse,
  IIBCRelayersStat,
  IIBCTokenHoldersResponse,
  IIBCTokenTransfersResponse,
  IIBCTokensResponse,
} from "types/api/ibcRelayer"
import type { GlobalPublicTagsResponse } from "types/api/tags"
import type {
  ValidatorBondedChangeResponse,
  ValidatorCounterResponse,
  ValidatorDelegatorsResponse,
  ValidatorDetailResponse,
  ValidatorInfosResponse,
  ValidatorProposedBlocksResponse,
  ValidatorUptimeResponse,
  ValidatorVotesResponse,
  ValidatorsCountersResponse,
  ValidatorsDelegationsResponse,
  ValidatorsDelegatorsResponse,
  ValidatorsStatsResponse,
} from "types/api/validator"
import type { OSType } from "types/base"
import type { VerifiedAsset } from "../../types/api/assetList.ts"
import { type IResourceRootItem, _markResource } from "./types"
import type { WebacyResponse } from "./webpacy"

export const RESOURCES = {
  // COMMON
  checkpoints: _markResource({
    endpoint: "gateway",
    path: "/api/v1/checkpoints",
  })._set_response<Checkpoints>(),
  global_public_tags: _markResource({
    endpoint: "gateway",
    path: "/api/v1/public-tags",
  })._set_response<GlobalPublicTagsResponse>(),
  sei_coingecko_price: _markResource({
    endpoint: "https://api.coingecko.com",
    path: "/api/v3/simple/price",
    filterFields: ["ids", "vs_currencies"],
    defaultFilters: {
      ids: "sei-network",
      vs_currencies: "usd",
    },
  })._set_response<{
    "sei-network": {
      usd: number
    }
  }>(),

  risk_score: _markResource({
    endpoint: "gateway",
    path: "/api/v1/workspace/risk-score",
    filterFields: ["identifier"],
    needWorkspaceAuth: false,
  })._set_response<WebacyResponse>(),
  workspace_assets_list: _markResource({
    endpoint: "gateway",
    path: "/api/v1/workspace/assets",
  })._set_response<VerifiedAsset[], true>(),
  // submit_token_info: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/token-info-request-change",
  // })._set_response(),

  // SEARCH
  quick_search: _markResource({
    endpoint: "gateway",
    path: "/api/v1/search/quick",
    filterFields: ["q"],
  })._set_response<ISearchItem[]>(),

  // TOKEN
  tokens: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens",
    filterFields: ["q", "type"],
  })._set_response<TokensResponse, true>(), // Paginated
  // asset_info: _markResource({
  // endpoint: "gateway",
  // path: "/api/v1/workspace/asset-detail",
  //   filterFields: ["identifier"],
  // })._set_response<IAssetInfo>(),

  // POINTER
  pointers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/pointer",
    filterFields: ["original_address"],
  })._set_response<PointerResponse, true>(), // Paginated

  // VALIDATOR
  validators: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators",
    filterFields: ["status", "q"],
  })._set_response<ValidatorInfosResponse, true>(), // Paginated
  validators_delegations: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/delegations",
    filterFields: ["status", "q"],
  })._set_response<ValidatorsDelegationsResponse, true>(), // Paginated
  validators_delegators: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/delegators",
    filterFields: ["status", "q"],
  })._set_response<ValidatorsDelegatorsResponse, true>(), // Paginated
  validator: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address",
    pathParams: ["address"],
  })._set_response<ValidatorDetailResponse>(),
  validators_stats: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/stats",
  })._set_response<ValidatorsStatsResponse>(),
  validator_bonded_change: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address/token-changes",
    pathParams: ["address"],
  })._set_response<ValidatorBondedChangeResponse, true>(), // Paginated
  validator_votes: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address/votes",
    pathParams: ["address"],
  })._set_response<ValidatorVotesResponse, true>(), // Paginated
  validator_proposed_blocks: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address/proposer-blocks",
    pathParams: ["address"],
  })._set_response<ValidatorProposedBlocksResponse, true>(), // Paginated
  validator_delegators: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address/delegators",
    pathParams: ["address"],
  })._set_response<ValidatorDelegatorsResponse, true>(), // Paginated
  validators_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/tab-counters",
  })._set_response<ValidatorsCountersResponse>(),
  validator_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address/tab-counters",
    pathParams: ["address"],
  })._set_response<ValidatorCounterResponse>(),
  validator_uptime: _markResource({
    endpoint: "gateway",
    path: "/api/v1/validators/:address/uptime",
    pathParams: ["address"],
  })._set_response<ValidatorUptimeResponse>(),

  // NATIVE TOKENS
  native_token: _markResource({
    endpoint: "gateway",
    path: "/api/v1/native-tokens/detail",
  })._set_response<TokenInfo>(),
  native_token_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/native-tokens/transfers",
    filterFields: ["denom", "limit", "items_count"],
  })._set_response<INativeTokenTransfersResponse, true>(), // Paginated
  native_token_holders: _markResource({
    endpoint: "gateway",
    path: "/api/v1/native-tokens/holders",
    filterFields: ["denom", "limit", "items_count"],
  })._set_response<INativeTokenHoldersResponse, true>(), // Paginated
  native_token_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/native-tokens/counters",
    filterFields: ["denom"],
  })._set_response<INativeTokenCounters>(),

  // ICS_20
  ics20_tokens: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ics20-tokens",
    filterFields: ["limit", "items_count", "search"],
  })._set_response<TokenICS20sResponse, true>(), // Paginated
  ics20_token: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ics20-tokens/:hash",
    pathParams: ["hash"],
  })._set_response<TokenInfo>(),
  ics20_token_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ics20-tokens/:hash/transfers",
    pathParams: ["hash"],
    filterFields: ["limit", "items_count"],
  })._set_response<IIBCTokenTransfersResponse, true>(), // Paginated
  ics20_token_holders: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ics20-tokens/:hash/holders",
    pathParams: ["hash"],
    filterFields: ["limit", "items_count"],
  })._set_response<IIBCTokenHoldersResponse, true>(), // Paginated
  ics20_token_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ics20-tokens/:hash/counters",
    pathParams: ["hash"],
  })._set_response<TokenCounters>(),

  // params
  params_node_info: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/node-info",
  })._set_response<INodeInfo>(),
  params_staking_pool: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/staking-pool",
  })._set_response<IStakingPool>(),
  params_status: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/status",
  })._set_response<IChainStatus>(),
  params_genesis: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/genesis",
  })._set_response<IGenesis>(),
  params_abci_info: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/abci-info",
  })._set_response<IABCI>(),
  params_total_supply: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/total-supply",
  })._set_response<ITotalSupply>(),
  params_staking: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/staking",
  })._set_response<IStaking>(),
  params_slashing: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/slashing",
  })._set_response<ISlashing>(),
  params_distribution: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/distribution",
  })._set_response<IDistribution>(),
  params_tallying: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/governance/tallying",
  })._set_response<ITallying>(),
  params_inflation: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/inflation",
  })._set_response<IInflation>(),
  params_voting: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/governance/voting",
  })._set_response<IVoting>(),
  params_deposit: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/governance/deposit",
  })._set_response<IDeposit>(),
  params_minter: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/minter",
  })._set_response<IMinter>(),
  params_mint: _markResource({
    endpoint: "gateway",
    path: "/api/v1/chain-parameters/native/mint-params",
  })._set_response<IMint>(),

  // Code ID
  contract_codes: _markResource({
    endpoint: "gateway",
    path: "/api/v1/contract-codes",
  })._set_response<IContractCodesResponse, true>(), // Paginated
  contract_code: _markResource({
    endpoint: "gateway",
    path: "/api/v1/contract-codes/:codeId",
    pathParams: ["codeId"],
  })._set_response<IContractCode>(),
  contract_code_contracts: _markResource({
    endpoint: "gateway",
    path: "/api/v1/contract-codes/:codeId/contracts",
    pathParams: ["codeId"],
  })._set_response<IContractCodeContractsResponse>(),
  contract_codes_stats: _markResource({
    endpoint: "gateway",
    path: "/api/v1/contract-codes/statistics",
  })._set_response<IContractCodesStats>(),

  latest_txs_validated: _markResource({
    endpoint: "gateway",
    path: "/api/v1/transactions/latest",
    filterFields: ["filters", "type", "method", "limit"],
  })._set_response<TransactionsResponseValidated, true>(), // Paginated
  txs_validated: _markResource({
    endpoint: "gateway",
    path: "/api/v1/transactions",
    filterFields: ["filters", "type", "method", "limit"],
  })._set_response<TransactionsResponseValidated, true>(), // Paginated

  // STATS
  stats_counters: _markResource({
    endpoint: "stats",
    path: "/api/v1/counters",
  })._set_response<Counters>(),
  stats_lines: _markResource({
    endpoint: "stats",
    path: "/api/v1/lines",
  })._set_response<StatsCharts>(),
  stats_line: _markResource({
    endpoint: "stats",
    path: "/api/v1/lines/:id",
    pathParams: ["id"],
  })._set_response<StatsChart>(),
  gateway_stats_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/stats/counters",
  })._set_response<IStatsCounters>(),

  // AUTH
  request_challenge: _markResource({
    endpoint: "gateway",
    path: "/api/v1/auth/challenge/:target",
    pathParams: ["target"],
  })._set_response(),
  reset_password: _markResource({
    endpoint: "gateway",
    path: "/api/v1/auth/reset-password",
    filterFields: ["email", "password", "otp"],
  })._set_response(),
  register: _markResource({
    endpoint: "gateway",
    path: "/api/v1/auth/register",
    filterFields: ["email", "password"],
  })._set_response(),
  exchange_code: _markResource({
    endpoint: "gateway",
    path: "/api/v1/auth/exchange-code",
    filterFields: ["code", "email", "password"],
  })._set_response<ExchangeCodeResponse>(),

  // TRANSACTIONS
  tx: _markResource({
    endpoint: "gateway",
    path: "/api/v1/transactions/:hash",
    pathParams: ["hash"],
  })._set_response<Transaction>(),
  tx_internal_txs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/transactions/:hash/internal-transactions",
    pathParams: ["hash"],
    filterFields: [],
  })._set_response<InternalTransactionsResponse, true>(),
  tx_logs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/transactions/:hash/logs",
    pathParams: ["hash"],
    filterFields: [],
  })._set_response<LogsResponseTx, true>(),
  tx_token_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/transactions/:hash/token-transfers",
    pathParams: ["hash"],
    filterFields: ["type"],
  })._set_response<AddressTokenTransferResponse, true>(),
  tx_state_changes: _markResource({
    endpoint: "api",
    path: "/api/v2/transactions/:hash/state-changes",
    pathParams: ["hash"],
    filterFields: [],
  })._set_response<TxStateChanges, true>(),

  // ADDRESSES
  addresses: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses",
    filterFields: ["type" as OSType],
  })._set_response<AddressesResponse, true>(),

  // ADDRESS
  address: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash",
    pathParams: ["hash"],
  })._set_response<Address>(),
  address_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/counters",
    pathParams: ["hash"],
  })._set_response<AddressCounters>(),
  address_tabs_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/tabs-counters",
    pathParams: ["hash"],
  })._set_response<AddressTabsCounters>(),
  address_txs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/transactions",
    pathParams: ["hash"],
    filterFields: ["filter", "type" as OSType],
  })._set_response<AddressTransactionsResponse, true>(), // Paginated
  address_internal_txs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/internal-transactions",
    pathParams: ["hash"],
    filterFields: ["filter"],
  })._set_response<AddressInternalTxsResponse, true>(), // Paginated
  address_association: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/association",
    pathParams: ["hash"],
  })._set_response<Association>(),
  associations: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/associations",
    filterFields: ["hashes"],
  })._set_response<Array<Association>>(),
  address_token_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/token-transfers",
    pathParams: ["hash"],
    filterFields: ["filter", "type", "token"],
  })._set_response<AddressTokenTransferResponse, true>(), // Paginated

  address_logs: _markResource({
    endpoint: "api",
    path: "/api/v2/addresses/:hash/logs",
    pathParams: ["hash"],
    filterFields: [],
  })._set_response<LogsResponseAddress, true>(),
  address_logs_cosmos: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/logs",
    pathParams: ["hash"],
    filterFields: [],
  })._set_response<LogsCosmosResponseAddress, true>(),
  address_tokens: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/tokens",
    pathParams: ["hash"],
    filterFields: ["type", "q"],
  })._set_response<AddressTokensResponse, true>(), // Paginated
  address_nfts: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/nft",
    pathParams: ["hash"],
    filterFields: ["type"],
  })._set_response<AddressNFTsResponse, true>(), // Paginated
  address_collections: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/nft/collections",
    pathParams: ["hash"],
    filterFields: ["type"],
  })._set_response<AddressCollectionsResponse, true>(), // Paginated
  address_tokens_counter: _markResource({
    endpoint: "gateway",
    path: "/api/v1/addresses/:hash/tokens/counter",
    pathParams: ["hash"],
  })._set_response<AddressTokensCounter>(),

  // CONTRACT
  contract: _markResource({
    endpoint: "api",
    path: "/api/v2/smart-contracts/:hash",
    pathParams: ["hash"],
  })._set_response<SmartContract>(),

  contract_verification_config: _markResource({
    endpoint: "api",
    path: "/api/v2/smart-contracts/verification/config",
  })._set_response<SmartContractVerificationConfig>(),
  contract_verification_via: _markResource({
    endpoint: "api",
    path: "/api/v2/smart-contracts/:hash/verification/via/:method",
    pathParams: ["hash", "method"],
  })._set_response<any>(),

  // TOKEN
  token: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash",
    pathParams: ["hash"],
  })._set_response<TokenInfo>(),
  token_counters: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/counters",
    pathParams: ["hash"],
  })._set_response<TokenCounters>(),
  token_holders: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/holders",
    pathParams: ["hash"],
  })._set_response<TokenHolders, true>(), // Paginated
  token_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/transfers",
    pathParams: ["hash"],
  })._set_response<TokenTransferResponse, true>(), // Paginated
  token_inventory: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/instances",
    pathParams: ["hash"],
    filterFields: ["holder_address_hash"],
  })._set_response<TokenInventoryResponse, true>(), // Paginated
  native_tokens: _markResource({
    endpoint: "gateway",
    path: "/api/v1/native-tokens",
    filterFields: ["search", "limit", "items_count"],
  })._set_response<TokenNativesResponse, true>(), // Paginated
  approval_assets: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/approval-assets",
    pathParams: ["hash"],
    filterFields: [
      "token_type",
      "approval_type",
      "search",
      "limit",
      "items_count",
      "sort",
    ],
  })._set_response<IApprovalAssetsResponse, true>(), // Paginated

  approval_stats: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/approval-stats",
    pathParams: ["hash"],
  })._set_response<IApprovalStatsResponse>(),

  // TOKEN INSTANCE
  token_instance: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/instances/:id",
    pathParams: ["hash", "id"],
  })._set_response<TokenInstance>(),
  token_instance_transfers_count: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/instances/:id/transfers-count",
    pathParams: ["hash", "id"],
  })._set_response<TokenInstanceTransfersCount>(),
  token_instance_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/instances/:id/transfers",
    pathParams: ["hash", "id"],
  })._set_response<TokenInstanceTransferResponse, true>(), // Paginated
  token_instance_holders: _markResource({
    endpoint: "api",
    path: "/api/v2/tokens/:hash/instances/:id/holders",
    pathParams: ["hash", "id"],
  })._set_response<TokenHolders, true>(), // Paginated
  refresh_metadata: _markResource({
    endpoint: "gateway",
    path: "/api/v1/tokens/:hash/instances/:id/refetch-nft-info",
    pathParams: ["hash", "id"],
    filterFields: ["refresh_metadata_for_existed_nft"],
  })._set_response(),

  // IBC
  ibc_chain_connecteds: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/relayers/chain-connected",
    filterFields: ["search", "status", "limit"],
  })._set_response<IBCChainConnectedResponse, true>(), // Paginated
  ibc_chain_details: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/relayers/:chain_id",
    pathParams: ["chain_id"],
    filterFields: ["limit", "items_count"],
  })._set_response<IBCChainDetailsResponse, true>(),
  ibc_transfer_assets: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/channel/:channel_id/transfer-assets/:counterparty_channel_id",
    pathParams: ["channel_id", "counterparty_channel_id"],
    filterFields: ["limit", "items_count", "type", "search"],
  })._set_response<IIBCRelayerChannelTransferAssetsResponse, true>(), // Paginated
  ibc_channel_details: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/channel/:channel_id/counterparty/:counterparty_channel_id",
    pathParams: ["channel_id", "counterparty_channel_id"],
  })._set_response<IIBCRelayerChannel>(),
  ibc_relayers_stat: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/relayers/stat",
  })._set_response<IIBCRelayersStat>(),
  ibc_channel_transactions: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/relayers/:channel_id/transactions",
    pathParams: ["channel_id"],
    filterFields: ["limit", "items_count", "type"],
  })._set_response<IIBCChannelTransactionsResponse, true>(), // Paginated
  ibc_tokens: _markResource({
    endpoint: "gateway",
    path: "/api/v1/ibc/tokens",
    filterFields: ["limit", "items_count"],
  })._set_response<IIBCTokensResponse, true>(), // Paginated

  // BLOCKS, TXS
  blocks: _markResource({
    endpoint: "gateway",
    path: "/api/v1/blocks",
    filterFields: ["type", "limit"],
  })._set_response<BlocksResponse, true>(), // Paginated
  block: _markResource({
    endpoint: "gateway",
    path: "/api/v1/blocks/:height_or_hash",
    pathParams: ["height_or_hash"],
  })._set_response<Block>(),
  block_txs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/blocks/:height_or_hash/transactions",
    pathParams: ["height_or_hash"],
    filterFields: ["type" as OSType],
  })._set_response<BlockTransactionsResponse, true>(), // Paginated

  // VERIFIED CONTRACTS
  verified_contracts: _markResource({
    endpoint: "api",
    path: "/api/v2/smart-contracts",
    filterFields: ["q", "filter"],
  })._set_response<VerifiedContractsResponse, true>(), // Paginated
  verified_contracts_counters: _markResource({
    endpoint: "api",
    path: "/api/v2/smart-contracts/counters",
  })._set_response<VerifiedContractsCounters>(),
  contract_security_audits: _markResource({
    endpoint: "api",
    path: "/api/v2/smart-contracts/:hash/audit-reports",
    pathParams: ["hash"],
  })._set_response<SmartContractSecurityAudits>(),

  // HOMEPAGE
  homepage_stats: _markResource({
    endpoint: "gateway",
    path: "/api/v1/stats",
  })._set_response<HomeStats>(),
  homepage_chart_txs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/stats/charts/transactions",
  })._set_response<ChartTransactionResponse>(),
  homepage_chart_market: _markResource({
    endpoint: "gateway",
    path: "/api/v1/stats/charts/market",
  })._set_response<ChartMarketResponse>(),

  // API V1
  csv_export_txs: _markResource({
    endpoint: "gateway",
    path: "/api/v1/export/transactions-csv",
  })._set_response<any>(),
  csv_export_internal_txs: _markResource({
    endpoint: "api",
    path: "/v1/internal-transactions-csv",
  })._set_response<any>(),
  csv_export_token_transfers: _markResource({
    endpoint: "gateway",
    path: "/api/v1/export/token-transfers-csv",
  })._set_response<any>(),
  csv_export_logs: _markResource({
    endpoint: "api",
    path: "/v1/logs-csv",
  })._set_response<any>(),
  // CSV EXPORT
  csv_export_token_holders: _markResource({
    endpoint: "api",
    path: "/api/v2/tokens/:hash/holders/csv",
    pathParams: ["hash"],
  })._set_response<any>(),

  // APY
  // apy_tops: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/apy/top",
  //   filterFields: [
  //     "search_terms",
  //     "sort",
  //     "provider_type",
  //     "identifier",
  //     "limit",
  //     "offset",
  //     "is_new",
  //     "apr_from",
  //     "apr_to",
  //     "tvl_from",
  //     "tvl_to",
  //   ],
  // })._set_response<IAPYTopResponse, true>(), // Paginated
  // apy_pool: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/apy/pool",
  //   filterFields: ["pool_address", "has_provider"],
  // })._set_response<IAPY>(),
  // apy_providers: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/apy/providers",
  //   filterFields: ["search_terms", "provider_type"],
  // })._set_response<IAPYProviderResponse, true>(), // Paginated
  // apy_tokens: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/apy/tokens",
  //   filterFields: ["provider_type"],
  // })._set_response<IAPYDepositToken[], true>(), // Paginated

  token_chart_check: _markResource({
    endpoint: "self",
    path: "/api/chart/check",
    filterFields: ["hash"],
  })._set_response<{
    isExist: boolean
    provider: "dexscreener" | "geckoterminal"
  }>(),

  // FAUCET
  // faucet_eligibility: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/faucet/check-eligibility",
  //   needWorkspaceAuth: true,
  // })._set_response<IFaucetEligibilityResponse, false, IFaucetRequest>(),
  // faucet_request: _markResource({
  //   endpoint: "workspace",
  //   path: "/api/v1/faucet",
  //   needWorkspaceAuth: true,
  // })._set_response<IFaucetClaimResponse, false, IFaucetClaimRequest>(),
} satisfies {
  [K in string]: IResourceRootItem
}
