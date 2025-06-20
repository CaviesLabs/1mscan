import type { Log } from "types/api/log"

import type { NativeEvent } from "types/api/transaction"
import { ADDRESS_PARAMS } from "./addressParams"
import { TX_HASH } from "./tx"

export const LOG: Log = {
  address: ADDRESS_PARAMS,
  data: "0x000000000000000000000000000000000000000000000000000000d75e4be200",
  decoded: {
    method_call: "CreditSpended(uint256 indexed _type, uint256 _quantity)",
    method_id: "58cdf94a",
    parameters: [
      {
        indexed: true,
        name: "_type",
        type: "uint256",
        value: "placeholder",
      },
      {
        indexed: false,
        name: "_quantity",
        type: "uint256",
        value: "placeholder",
      },
    ],
  },
  index: 42,
  topics: [
    "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
    "0x000000000000000000000000c52ea157a7fb3e25a069d47df0428ac70cd656b1",
    "0x000000000000000000000000302fd86163cb9ad5533b3952dafa3b633a82bc51",
    null,
  ],
  tx_hash: TX_HASH,
}

export const LOG_COSMOS: NativeEvent = {
  block_height: 14708622,
  id: 2016850392,
  source: "TX_EVENT",
  tx_msg_index: null,
  type: "wasm",
  tx_id: 281304319,
  attributes: [
    {
      block_height: 14708622,
      composite_key: "wasm._contract_address",
      event_id: 2016850392,
      index: 0,
      key: "_contract_address",
      value: "sei1fuyxwxlsgjkfjmxfthq8427dm2am3ya3cwcdr8gls29l7jadtazslenfur",
      tx_id: 281304319,
    },
    {
      block_height: 14708622,
      composite_key: "wasm.action",
      event_id: 2016850392,
      index: 1,
      key: "action",
      value: "increase_allowance",
      tx_id: 281304319,
    },
    {
      block_height: 14708622,
      composite_key: "wasm.owner",
      event_id: 2016850392,
      index: 2,
      key: "owner",
      value: "sei1c44uvd4l0z62j5rt24n54dgdkd4hjfyafschhf",
      tx_id: 281304319,
    },
    {
      block_height: 14708622,
      composite_key: "wasm.spender",
      event_id: 2016850392,
      index: 3,
      key: "spender",
      value: "sei1ydrd8fhmrrln4evsagcaneq7d2uvna0td0e5e5",
      tx_id: 281304319,
    },
    {
      block_height: 14708622,
      composite_key: "wasm.amount",
      event_id: 2016850392,
      index: 4,
      key: "amount",
      value: "246549",
      tx_id: 281304319,
    },
  ],
}
