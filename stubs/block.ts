import type { Block } from "types/api/block"

import { ADDRESS_PARAMS } from "./addressParams"

export const BLOCK_HASH =
  "0x8fa7b9e5e5e79deeb62d608db22ba9a5cb45388c7ebb9223ae77331c6080dc70"

export const BLOCK: Block = {
  evmTxCount: 0,
  nativeTxCount: 0,
  // __transactionType: "EVM",
  base_fee_per_gas: "1",
  burnt_fees: "100000",
  burnt_fees_percentage: 0,
  // difficulty: "10000000000000000",
  extra_data: "TODO",
  gas_limit: "100000",
  gas_target_percentage: 0,
  gas_used: "10000",
  gas_used_percentage: 0,
  hash: BLOCK_HASH,
  height: 10000,
  miner: ADDRESS_PARAMS,
  nonce: "0x0000000000000000",
  parent_hash: BLOCK_HASH,
  priority_fee: "100000",
  rewards: [
    {
      reward: "100000",
      type: "Validator Reward",
    },
  ],
  size: 46406,
  state_root: "TODO",
  timestamp: "",
  total_difficulty: "10837812015930321201107455268036056402048391639",
  tx_count: 142,
  tx_fees: "100000",
  type: "block",
  // uncles_hashes: [],
}
