"use client"

export { ChainKey } from "../../server/chain"

export const SEI_BASE_COSMOS_KIT_CHAIN = {
  bech32_config: {
    bech32PrefixAccAddr: "sei",
    bech32PrefixAccPub: "seipub",
    bech32PrefixValAddr: "seivaloper",
    bech32PrefixValPub: "seivaloperpub",
    bech32PrefixConsAddr: "seivalcons",
    bech32PrefixConsPub: "seivalconspub",
  },
  bech32_prefix: "sei",
  chain_name: "sei",
  daemon_name: "seid",
  description:
    "Sei is the fastest Layer 1 blockchain, designed to scale with the industry.",
  website: "https://www.sei.io/",
  fees: {
    fee_tokens: [
      {
        denom: "usei",
        fixed_min_gas_price: 0.02,
        low_gas_price: 0.02,
        average_gas_price: 0.02,
        high_gas_price: 0.04,
        gas_costs: {
          cosmos_send: 25000,
          ibc_transfer: 50000,
        },
      },
    ],
  },
  key_algos: ["secp256k1"],
  keywords: ["sei"],
  logo_URIs: {
    png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/sei/images/sei.png",
    svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/sei/images/sei.svg",
  },
  network_type: "mainnet",
  node_home: "$HOME/.sei",
  pretty_name: "Sei",
  slip44: 118,
  status: "live",
  alternative_slip44s: [60],
  staking: {
    staking_tokens: [{ denom: "usei" }],
  },
  images: [
    {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/sei/images/sei.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/sei/images/sei.svg",
    },
  ],
}
