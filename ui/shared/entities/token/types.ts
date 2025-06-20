import type { ImageProps, LinkProps, TextProps } from "@chakra-ui/react"
import type { ReactNode } from "react"
import type { VerifiedAsset } from "types/api/assetList"
import type { IIBCTokenType } from "types/api/ibcRelayer"
import type { TokenInfo } from "types/api/token"
import type { IconSVGV2Props } from "ui/shared/icon/IconSVGV2"
import type { TruncatedTextTooltipProps } from "ui/shared/truncate"

export type IToken =
  | (Partial<Omit<TokenInfo, "address" | "type" | "decimals">> & {
      type?: TokenInfo["type"] | IIBCTokenType | null
      address: string | undefined | null
      decimals?: string | number | null | undefined
    })
  | undefined
  | null

export type TokenLinkProps = {
  href: string
  isDisabled?: boolean
  isLoading?: boolean
  children: ReactNode
} & LinkProps

export type BaseSymbolProps = {
  fallback?: string | null | undefined
  noSymbol?: boolean
  isLoading?: boolean
  identifier: string | undefined | null
  noLink?: any
  linkProps?: Partial<TokenLinkProps>
  defaultSymbol?: string | null | undefined
  usdHasParenthesis?: boolean
} & TextProps

export type IconProps = {
  token: IToken
  isLoading?: boolean
  noIcon?: boolean
  confirmIconProps?: Partial<TokenConfirmProps>
  showConfirm?: boolean
} & Partial<ImageProps>

export type BaseIconProps = IconProps & {
  asset: VerifiedAsset | undefined | null
} & Partial<ImageProps>

export type TokenConfirmPosition = "icon" | "name" | "symbol"

export type TokenConfirmProps = {
  isLoading?: boolean
  asset?: VerifiedAsset | undefined | null
} & Partial<IconSVGV2Props>

export type TokenNameProps = {
  identifier: string | undefined | null
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  fallback?: string
  linkProps?: Partial<LinkProps>
  noLink?: boolean
  showFullyInfo?: boolean
  asset?: VerifiedAsset | undefined | null
  defaultName?: string | null | undefined
  postfix?: ReactNode
} & TextProps
