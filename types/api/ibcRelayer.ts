import type { DefaultFilter, IGatewayResponse } from "./base"
import type { TokenHolder } from "./token"
import type { TokenTransfer } from "./tokenTransfer"
import type { Transaction } from "./transaction"

export type IIBCRelayerStatus = "opened" | "closed"

export type IIBCRelayer = {
  total: string
  receive: string
  send: string
  status: IIBCRelayerStatus
  channels: string
}

export type IIBCRelayerChannel = {
  channel_id: string
  counterparty_channel_id: string
  ibc_connection: IIBCConnection
  total_tx: ITotalTx
  sending_asset_denoms: IAssetDenoms
  receiving_asset_denoms: IAssetDenoms
  state: "OPEN" | "CLOSED"
  counterparty_chain_pretty_name?: string | null
  counterparty_chain_logo_URLs: IIBCImages | null
}

export type IIBCConnection = {
  ibc_client: IIBCClient
}

export type IIBCClient = {
  operating_since_1: string
  operating_since_2: string | null
  client_id: string
  counterparty_chain_id: string
}

export type IAssetDenoms = {
  nodes: any[]
}

export type ITotalTx = {
  aggregate: IAggregate
}

export type IAggregate = {
  count: number
}

export type IIBCRelayersStat = {
  total_connected_chain: number
  total_opening_channels: number
  total_channels: number
  total_send: number
  total_receive: number
}

export type IIBCRelayerChannelTransferAssets = {
  denom: string
  total_messages: number
  type: string
  amount: string
  channel_id: string
  counterparty_channel_id: string
  token_info: IIBCTokenInfo | null
}

export type IIBCRelayerChannelTransferAssetsResponse = IGatewayResponse<{
  items: IIBCRelayerChannelTransferAssets[]
}>

export type IIBCRelayerTransferType = "recv_packet" | "send_packet"

export type IIBCRelayerChannelTransferAssetsFilters = {
  limit?: number
  items_count?: number
  type?: IIBCRelayerTransferType
  search?: string
}

export type IIBCChain = {
  chain: string
  total_asset_transfer: number
  receive_asset_transfer: number
  send_asset_transfer: number
  open_channel: number
  total_channel: number
  created_at: string
  chain_name?: string // Optional field
  chain_id?: string // Optional field
  pretty_name?: string // Optional field
  logo_URLs?: IIBCImages
}

export type IBCChainConnectedResponse = IGatewayResponse<{
  result: IIBCChain[]
}>

export type IBCChainDetails = {
  channel_id: string
  counterparty_channel_id: string
  state: string
  ibc_connection: {
    ibc_client: {
      counterparty_chain_id: string
      operating_since_1: string | null
      operating_since_2: string | null
    }
  }
  total: IIBCCount
  receive: IIBCCount
  send: IIBCCount
}

export type IBCChainDetailsResponse = {
  total_count: number
  next_page_params?: null
  items: IBCChainDetails[]
}

export type IIBCTokenType = "native" | "ics20"

export type IIBCTokenInfo = {
  token_denom: string
  base_denom: string
  ics20_denom_trace: string | null
  token_type: IIBCTokenType
  name: null | string
  symbol: null | string
  display: null | string
  description: null | string
  denom_units: { [key: string]: IIBCDenomUnit } | null
  images: IIBCImages | null
}

export type IIBCImages = {
  png?: string
  svg?: string
}

export type IIBCChannelTransactionsResponse = IGatewayResponse<{
  items: IIBCChannelTransaction[]
}>

export type IIBCChannelTransaction = {
  denom: string
  token_info: IIBCTokenInfo
  amount: string
  type: IIBCRelayerTransferType
  status: IIBCTransactionStatus
  ibc_message: IIBCTransactionMessage
}

export type IIBCTransactionMessage = {
  transaction: Transaction<"Cosmos">
}

export type IIBCTransactionStatus =
  | "ack_success"
  | "ack_error"
  | "ongoing"
  | "timeout"

export type IIBCDenomUnit = {
  denom: string
  exponent: number
}

export type IIBCTokensResponse = IGatewayResponse<{
  items: IIBCToken[]
}>

export type IIBCToken = {
  id: number
  token_denom: string
  base_denom: string
  ics20_denom_trace: string
  denom_units: { [key: string]: IIBCDenomUnit } | null
  description: null | string
  display: null | string
  images: IIBCImages | null
  name: null | string
  symbol: null | string
  token_type: IIBCTokenType
  holders_count: IIBCCount
  transfers_count: IIBCCount
}

export type IIBCCount = {
  aggregate: {
    count: string
  }
}

export type IIBCTokenTransfersResponse = IGatewayResponse<{
  items: TokenTransfer<"ICS-20">[]
}>

export type IIBCTokenHoldersResponse = IGatewayResponse<{
  items: TokenHolder[]
}>

export type IIBCTokenHolder = {
  account: {
    address: string
  }
  amount: string
  last_updated_height: string
}

export type IIBCChainConnectedsFilters = {
  status?: Uppercase<IIBCRelayerStatus>
} & DefaultFilter
