import type { Route } from "nextjs-routes"

export const DEFAULT_TEMPLATE =
  "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, sei blockchain explorer"

export const KEYWORD_MAP: Partial<Record<Route["pathname"], string>> = {
  "/": DEFAULT_TEMPLATE,
  "/validators":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, validator, sei blockchain explorer",
  get "/validator/[hash]"() {
    return this["/validators"]
  },

  "/proposals":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, governance, proposals, sei blockchain explorer",
  get "/proposal/[id]"() {
    return this["/proposals"]
  },
  "/txs":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, transactions, sei blockchain explorer",
  "/tx/[hash]":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, transaction detail, txhash, {{hash}}, sei blockchain explorer",
  get "/blocks"() {
    return this["/txs"]
  },
  "/block/[height_or_hash]":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, transaction details, {{height_or_hash}}, sei blockchain explorer",
  "/ibc-relayers":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, ibc relayer, sei blockchain explorer",
  "/ibc-relayer/[channel_id]/counterparty/[counterparty_channel_id]":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, ibc relayer, channel, sei blockchain explorer",

  "/address/[hash]":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, top account, channel, {{hash}}, sei blockchain explorer",
  "/accounts":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, top account, channel, sei blockchain explorer",
  "/verified-contracts":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, verified contracts, sei blockchain explorer",
  get "/verified-contracts-native"() {
    return this["/verified-contracts"]
  },
  "/code-ids":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, contracts, code ids, sei blockchain explorer",
  get "/code-id/[id]"() {
    return this["/code-ids"]
  },

  "/tokens":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, tokens, sei blockchain explorer",
  "/nfts":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, nfts, sei blockchain explorer",
  "/hybrids":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, erc-404, currency, tokens, sei blockchain explorer",

  "/insights":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, apis, api, insights, sei blockchain explorer",
  get "/insights-docs"() {
    return this["/insights"]
  },
  "/stats":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, charts, statistics, sei blockchain explorer",
  "/contract-verification":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, verify contract, contract, sei blockchain explorer",
  "/parameters":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, parameters, sei blockchain explorer",
  "/claim-reward":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, rewards, airdrop, sei blockchain explorer",
  get "/claim-reward/[id]"() {
    return this["/claim-reward"]
  },
  "/token/[...slug]":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, tokens, nfts, token, nft, collection, {{token_name}}, {{token_symbol}}, sei blockchain explorer",

  "/sei-assets":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, currency, tokens, sei assets",

  "/tool/wallet-profile":
    "SEI wallet profile, wallet profile SEI blockchain, SEI wallet tracker, SEI address profile, view SEI wallet, crypto wallet profile SEI",
  "/tool/multisender":
    "SEI multisender, multisender on SEI, SEI batch token transfer, SEI token multisend, multisend token SEI, batch send SEI tokens",
  "/tool/send-token":
    "Send tokens on SEI, SEI blockchain transfer, SEI token transfer, send SEI tokens, transfer SEI tokens",
  "/tool/address-book":
    "SEI address book, address book SEI blockchain, SEI wallet address manager, SEI address organizer, manage SEI addresses",
  "/tool/revoke":
    "SEI revoke function, revoke SEI token approval, SEI blockchain revoke, SEI token revoke tool, revoke permissions SEI, crypto revoke SEI",
  "/tool/profile-checker":
    "SEI profile checker, SEI token holdings, SEI wallet token checker, SEI address tokens, check SEI token balance, SEI token checker",
  "/tool/associate":
    "SEI associate account, associate SEI wallet, SEI account linking, SEI wallet association, link SEI account, crypto account linker SEI",

  "/about":
    "sei, explorer, sei coin, seiscan, blockchain, crypto, about us, seitrace sei blockchain explorer",

  "/earning":
    "sei staking, stake sei, sei stake, staking sei, staking on seitrace, how to stake sei",
  get "/earning/[id]"() {
    return this["/earning"]
  },

  "/token/submit":
    "submit token, sei token submit, submit token information, sei explorer submit token, sei token, sei explorer, sei network, sei blockchain, blockchain explorer, sei scan, token update",
  "/airdrop":
    "sei airdrop, airdrop sei, sei airdrops, sei network airdrop, airdrop sei network",
  "/tool/faucet":
    "sei faucet, sei testnet faucet, sei faucets, faucet sei, faucet sei network, faucet sei testnet",
}
