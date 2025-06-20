import { isValidSeiCosmosAddress } from "@sei-js/cosmjs"
import type { AddressParam } from "types/api/addressParams"
import type { TokenType, TokenTypeWithTransfer } from "types/api/token"
import type { OSType } from "types/base"
import {
  FT_TOKEN_TYPE_IDS,
  NFT_IBC_TYPES_COSMOS,
  NFT_TOKEN_TYPE_IDS,
  TOKEN_HYBRID_TYPES_EVM_IDS,
} from "./token/tokenTypes"

export const getOSType = (value: string): OSType => {
  if (
    String(value).toLocaleLowerCase() === "cosmos" ||
    String(value).toLocaleLowerCase() === "native_sei" ||
    String(value).toLocaleLowerCase() === "native"
  )
    return "Cosmos"
  return "EVM"
}

export const getTransactionType = (
  value: string | undefined | null,
): OSType | undefined => {
  if (!value) return undefined
  if (value?.toString()?.startsWith("0x")) return "EVM"
  return "Cosmos"
}

export const getAddressType = (value: string | Falsy): OSType | undefined => {
  if (!value) return undefined
  if (isEvmAddressTest(String(value))) return "EVM"
  if (isValidSeiCosmosAddress(String(value))) return "Cosmos"
  return undefined
}

export const revertAddressType = (
  addressType: OSType | undefined,
): OSType | undefined => {
  if (!addressType) return undefined
  if (addressType === "Cosmos") return "EVM"
  if (addressType === "EVM") return "Cosmos"
  return undefined
}

export const isSeiAddress = (value: any) =>
  Boolean(isValidSeiCosmosAddress(String(value)))

export const getIsNilEVMAddress = (hash: string | undefined | null) => {
  if (!hash) return false
  return hash === "0x0000000000000000000000000000000000000000"
}

export const getIsContract = (address: AddressParam | undefined) => {
  if (!address) return false
  return address.hash === "0x0000000000000000000000000000000000000000"
    ? false
    : address.is_contract
}

// const pointerRegex = new RegExp(
//   `(${ALL_TOKEN_TYPE_IDS.map((x) => x.replace("-", "")).join("|")})`,
// );

export type ContractType = false | "original" | "pointer"
export type PointerTypeData = {
  contractType: ContractType
  associationType: ContractType
  tokenType: TokenType
  originHash: string
  pointerHash: string
}
export type PointerType = false | PointerTypeData

// export const getPointerType = (
//   parentHash: string | undefined | null,
//   association: Association | undefined | null,
// ): PointerType => {
//   if (!parentHash || !association) return false;
//   const associationTokenType = association.type
//     .replace("CREATE_", "")
//     .replace("_POINTER", "");
//   const associationTokenNumber = Number(
//     associationTokenType.replace("ERC", "").replace("CW", ""),
//   );

//   if (Number.isNaN(associationTokenNumber)) return false;
//   const isEVMPointer = EVM_TOKEN_TYPES.find(
//     (token) => token.id.replace("-", "") === associationTokenType,
//   );

//   const isNativeSeiPointer = NATIVE_SEI_TOKEN_TYPES.find(
//     (token) => token.id.replace("-", "") === associationTokenType,
//   );

//   if (!isEVMPointer && !isNativeSeiPointer) return false;

//   if (isEVMPointer) {
//     if (parentHash === association.sei_hash) {
//       return {
//         contractType: "original",
//         associationType: "pointer",
//         tokenType: ("ERC-" + associationTokenNumber) as TokenType,
//         originHash: association.sei_hash,
//         pointerHash: association.evm_hash,
//       };
//     }

//     return {
//       contractType: "pointer",
//       associationType: "original",
//       tokenType: ("CW-" + associationTokenNumber) as TokenType,
//       originHash: association.sei_hash,
//       pointerHash: association.evm_hash,
//     };
//   }
//   if (isNativeSeiPointer) {
//     if (parentHash === association.evm_hash)
//       return {
//         contractType: "original",
//         associationType: "pointer",
//         tokenType: ("CW-" + associationTokenNumber) as TokenType,
//         originHash: association.evm_hash,
//         pointerHash: association.sei_hash,
//       };
//     return {
//       contractType: "pointer",
//       associationType: "original",
//       tokenType: ("ERC-" + associationTokenNumber) as TokenType,
//       originHash: association.evm_hash,
//       pointerHash: association.sei_hash,
//     };
//   }
//   return false;
// };

const NF_TYPE_IDS = [
  ...FT_TOKEN_TYPE_IDS,
  ...NFT_IBC_TYPES_COSMOS.map((x) => x.id),
]

export const getIsNFT = (type: any) => {
  if (NFT_TOKEN_TYPE_IDS.includes(type)) return "nft"
  if (NF_TYPE_IDS.includes(type)) return "token"
  if (TOKEN_HYBRID_TYPES_EVM_IDS.includes(type)) return "hybrid"
  return false
}

const evmPattern = /^0x[a-fA-F0-9]{40}$/

export function isEvmAddressTest(address: string): boolean {
  // EVM addresses start with '0x' and have a length of 42 characters
  return evmPattern.test(address)
  // return isAddress(address);
}

export function isNativeAddressTest(address: string): boolean {
  // Native addresses start with 'sei' and have a length of 42 or 62 characters
  // const seiPattern = /^sei1[0-9a-z]{38}$|^sei1[0-9a-z]{58}$/;
  return Boolean(isValidSeiCosmosAddress(String(address)))
}

export function isEvmTransactionTest(transaction: string): boolean {
  // EVM transactiones start with '0x' and have a length of 42 characters
  const evmPattern = /^0x[a-fA-F0-9]{64}$/
  return evmPattern.test(transaction)
}

export function isNativeTransactionTest(transaction: string): boolean {
  // Native transactiones start with 'sei' and have a length of 42 or 62 characters
  const seiPattern = /^(?!0x)[a-fA-F0-9]{64}$/
  return seiPattern.test(transaction)
}

export const isAddressTest = (address: string): boolean => {
  return isEvmAddressTest(address) || isNativeAddressTest(address)
}

export const getIsTokenHasContract = (
  tokenType: TokenTypeWithTransfer | undefined | null,
) => {
  if (tokenType?.slice(0, 3).toLowerCase() === "erc") return true
  if (tokenType?.slice(0, 2).toLowerCase() === "cw") return true
  return false
}

export const getTokenOSType = (
  tokenType: TokenTypeWithTransfer | undefined | null,
) => {
  const tokenTypeLowerCaseClut2 = tokenType?.toLowerCase().slice(0, 2)
  if (tokenTypeLowerCaseClut2 === "er") return "evm"
  if (
    tokenTypeLowerCaseClut2 === "cw" ||
    tokenTypeLowerCaseClut2 === "ic" ||
    tokenTypeLowerCaseClut2 === "na"
  )
    return "native"
  return undefined
}
