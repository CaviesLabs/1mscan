import type { PointerResponse } from "types/api/tokens"
import { ADDRESS_HASH } from "./addressParams"

export const ASSET_POINTER: PointerResponse = {
  pointer: ADDRESS_HASH,
  version: 0,
  type: "ERC-20",
}
