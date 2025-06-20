import type {
  IBCChainDetails,
  IIBCChain,
  IIBCChannelTransaction,
  IIBCRelayer,
  IIBCRelayerChannel,
  IIBCRelayersStat,
  IIBCToken,
} from "types/api/ibcRelayer"
import type { Transaction } from "types/api/transaction"
import { TX } from "./tx"

export const IBC_RELAYER: IIBCRelayer = {
  total: "1000",
  receive: "1000",
  send: "1000",
  status: "opened",
  channels: "1/1",
}

const IBC_TRANSACTION: Transaction<"Cosmos"> = {
  ...TX,
  signers: [],
  timestamp: "1900-11-11 13:49:48.031453Z",
  gas_limit: "000000",
  block: 1,
  gas_used: "00000",
  __transactionType: "Cosmos",
  hash: "000000000000000000000000000000000000000000000000000000000000000000",
  status: "ok",
  tx_burnt_fee: "0",
  max_fee_per_gas: "0",
  gas_price: "0.001",
  priority_fee: "0",
  base_fee_per_gas: "0",
  position: 7,
  exchange_rate: null,
  // tx_tag: null,
  result: "success",
  fee: {
    type: "actual",
    value: "1",
  },
  method: "MsgTransfer",
  // has_error_in_internal_txs: null,
  max_priority_fee_per_gas: "0",
  // actions: [],
  created_contract: null,
  nonce: -1,
  revert_reason: null,
  to: {
    hash: "N/A",
    implementations: null,
    is_contract: null,
    is_verified: null,
    name: null,
  },
  from: {
    hash: "sei000000000000000000000000000000000000000000000000",
    implementations: null,
    is_contract: false,
    is_verified: false,
    name: null,
  },
  raw_input: "",
  tx_types: ["MsgTransfer"],
  value: "0",
  confirmation_duration: [],
  confirmations: -1,
  type: -1,
  token_transfers: null,
  decoded_input: null,
  token_transfers_overflow: null,
  native_events: [],
  native_messages: [],
}

export const IBC_RELAYER_CHANNEL: IIBCRelayerChannel = {
  channel_id: "channel-0",
  counterparty_channel_id: "channel-0",
  ibc_connection: {
    ibc_client: {
      operating_since_1: "1900-01-01T00:00:00.000Z",
      operating_since_2: null,
      client_id: "00-tendermint-0",
      counterparty_chain_id: "chain-0",
    },
  },
  total_tx: {
    aggregate: {
      count: 0,
    },
  },
  sending_asset_denoms: {
    nodes: [],
  },
  receiving_asset_denoms: {
    nodes: [],
  },
  state: "OPEN",
  counterparty_chain_logo_URLs: null,
}

export const IBC_REPLAYERS_STAT: IIBCRelayersStat = {
  total_connected_chain: 0,
  total_opening_channels: 0,
  total_channels: 0,
  total_send: 0,
  total_receive: 0,
}

export const IBC_CHAIN: IIBCChain = {
  chain: "xxx-0",
  total_asset_transfer: 0,
  receive_asset_transfer: 0,
  send_asset_transfer: 0,
  open_channel: 0,
  total_channel: 0,
  created_at: "1900-01-01T00:00:00.000Z",
}

export const IBC_CHAIN_DETAILS: IBCChainDetails = {
  channel_id: "xxx-0",
  counterparty_channel_id: "xxx-1",
  state: "OPEN",
  ibc_connection: {
    ibc_client: {
      counterparty_chain_id: "yyy-0",
      operating_since_1: "1900-01-01T00:00:00.000Z",
      operating_since_2: null,
    },
  },
  total: {
    aggregate: {
      count: "0",
    },
  },
  receive: {
    aggregate: {
      count: "0",
    },
  },
  send: {
    aggregate: {
      count: "0",
    },
  },
}

export const IBC_CHANNEL_TRANSACTION: IIBCChannelTransaction = {
  denom: "transfer/channel-0/placeholder",
  token_info: {
    token_denom:
      "ibc/000000000000000000000000000000000000000000000000000000000000000000000",
    base_denom: "placeholder",
    ics20_denom_trace: "transfer/channel-0/uplaceholder",
    token_type: "ics20",
    name: "Placeholder",
    symbol: "PLACEHOLDER",
    display: "placeholder",
    description: "description sample",
    denom_units: {
      placeholder: {
        denom: "placeholder",
        exponent: 6,
      },
    },
    images: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    },
  },
  amount: "1195000000",
  type: "recv_packet",
  status: "ack_success",
  ibc_message: {
    transaction: IBC_TRANSACTION,
  },
}

export const IBC_TOKEN_INFO: IIBCToken = {
  id: 1,
  token_denom:
    "ibc/00000000000000000000000000000000000000000000000000000000000000000",
  base_denom: "placeholder",
  ics20_denom_trace: "transfer/channel-0/placeholder",
  denom_units: {
    placeholderx: {
      denom: "placeholderx",
      exponent: 6,
    },
    "ibc/00000000000000000000000000000000000000000000000000000000000000000": {
      denom:
        "ibc/00000000000000000000000000000000000000000000000000000000000000000",
      exponent: 0,
    },
  },
  description: "Lorem is Lorem ipsum dolor sit amet, consectetur adip",
  display: "placeholderx",
  images: {},
  name: "Placeholder",
  symbol: "PLACEHOLDER",
  token_type: "ics20",
  holders_count: {
    aggregate: {
      count: "1",
    },
  },
  transfers_count: {
    aggregate: {
      count: "1",
    },
  },
}
