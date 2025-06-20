import type { TokenType } from "types/api/token"

export type ITokensTab = Lowercase<
  Extract<TokenType, "ERC-20" | "CW-20" | "ICS-20" | "NATIVE">
>
