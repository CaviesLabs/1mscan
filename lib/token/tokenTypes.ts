import { getLanguage } from "languages/useLanguage"
import type {
  HybridTokenTypeEVM,
  NFTTokenType,
  TokenTypeWithTransfer,
} from "types/api/token"

export type NftTypeInterface = {
  title: string
  id: NFTTokenType
}

export type TokenTypeInterface = {
  title: string
  id: TokenTypeWithTransfer
}

export type HybridTokenTypeInterface = {
  title: string
  id: HybridTokenTypeEVM
}

export const ERC_721_TYPES = [
  { title: "ERC-721", id: "ERC-721" },
] satisfies NftTypeInterface[]

export const ERC_1155_TYPES = [
  { title: "ERC-1155", id: "ERC-1155" },
] satisfies NftTypeInterface[]

export const CW_721_TYPES = [
  { title: "CW-721", id: "CW-721" },
] satisfies NftTypeInterface[]

export const NFT_TOKEN_TYPES_EVM = [
  { title: "ERC-721", id: "ERC-721" },
  { title: "ERC-1155", id: "ERC-1155" },
] satisfies NftTypeInterface[]

export const NFT_TOKEN_TYPES_COSMOS = [
  { title: "CW-721", id: "CW-721" },
] satisfies NftTypeInterface[]

export const NFT_IBC_TYPES_COSMOS = [
  { title: getLanguage("token.native_tokens"), id: "coin_transfer" },
] satisfies TokenTypeInterface[]

export const TOKEN_HYBRID_TYPES_EVM = [
  {
    title: "ERC-404",
    id: "ERC-404",
  },
] satisfies HybridTokenTypeInterface[]

export const NFT_TOKEN_TYPES = [
  ...NFT_TOKEN_TYPES_EVM,
  ...NFT_TOKEN_TYPES_COSMOS,
] satisfies NftTypeInterface[]

export const TOKEN_TYPES_EVM = [
  { title: "ERC-20", id: "ERC-20" },
] satisfies TokenTypeInterface[]

export const TOKEN_TYPES_COSMOS = [
  { title: "CW-20", id: "CW-20" },
] satisfies TokenTypeInterface[]

export const TOKEN_TYPES = [
  ...TOKEN_TYPES_EVM,
  ...TOKEN_TYPES_COSMOS,
  ...NFT_IBC_TYPES_COSMOS,
] satisfies TokenTypeInterface[]

const FT_ICS20_TYPES = [
  { title: getLanguage("token.ibc_token"), id: "ICS-20" },
] satisfies TokenTypeInterface[]

const FT_NATIVE_TYPES = [
  { title: "Factory Token", id: "NATIVE" },
] satisfies TokenTypeInterface[]

export const FT_TOKEN_TYPES = [
  ...TOKEN_TYPES_EVM,
  ...TOKEN_TYPES_COSMOS,
  ...FT_ICS20_TYPES,
  ...FT_NATIVE_TYPES,
] satisfies TokenTypeInterface[]

export const EVM_TOKEN_TYPES = [
  { title: "ERC-20", id: "ERC-20" },
  ...NFT_TOKEN_TYPES_EVM,
  ...TOKEN_HYBRID_TYPES_EVM,
] satisfies Array<
  TokenTypeInterface | NftTypeInterface | HybridTokenTypeInterface
>

export const TOKEN_HYBRID_TYPES_EVM_IDS = TOKEN_HYBRID_TYPES_EVM.map(
  (i) => i.id,
)

export const NATIVE_SEI_TOKEN_TYPES = [
  { title: "CW-20", id: "CW-20" },
  ...NFT_TOKEN_TYPES_COSMOS,
] satisfies TokenTypeInterface[]

export const ALL_SEI_TOKEN_TYPES = [
  ...NATIVE_SEI_TOKEN_TYPES,
  ...NFT_IBC_TYPES_COSMOS,
] satisfies TokenTypeInterface[]

export const NFT_TOKEN_TYPE_IDS = NFT_TOKEN_TYPES.map((i) => i.id)
export const FT_TOKEN_TYPE_IDS = FT_TOKEN_TYPES.map((i) => i.id)

export const ALL_FT_NFT_TOKEN_TYPES = [
  {
    id: "ERC-20",
    title: "ERC-20",
  },
  {
    id: "CW-20",
    title: "CW-20",
  },
  {
    id: "ICS-20",
    title: getLanguage("token.ibc_token"),
  },
  {
    id: "NATIVE",
    title: getLanguage("token.native_token"),
  },
  {
    id: "ERC-721",
    title: "ERC-721",
  },
  {
    id: "ERC-1155",
    title: "ERC-1155",
  },
  {
    id: "CW-721",
    title: "CW-721",
  },
  {
    id: "ERC-404",
    title: "ERC-404",
  },
] satisfies TokenTypeInterface[]

export const ALL_FT_TOKEN_TYPES = [
  {
    id: "ERC-20",
    title: "ERC-20",
  },
  {
    id: "CW-20",
    title: "CW-20",
  },
  {
    id: "ICS-20",
    title: getLanguage("token.ibc_token"),
  },
  {
    id: "NATIVE",
    title: getLanguage("token.native_token"),
  },
  {
    id: "ERC-404",
    title: "ERC-404",
  },
] satisfies TokenTypeInterface[]

// export const ALL_COIN_WITH_FT_TOKEN_TYPES = [
//   {
//     id:
//   }
// ]

export const ALL_TOKEN_TYPE_IDS = ALL_FT_NFT_TOKEN_TYPES.map((i) => i.id)

export const EVM_TOKEN_TYPE_IDS = EVM_TOKEN_TYPES.map((i) => i.id)

export const NATIVE_TOKEN_TYPES_IDS = NATIVE_SEI_TOKEN_TYPES.map((i) => i.id)

export const ALL_SEI_TOKEN_TYPES_IDS = ALL_SEI_TOKEN_TYPES.map((i) => i.id)
