/* eslint-disable prettier/prettier */
import type { FlexProps, StackProps, TextProps } from "@chakra-ui/react"
import { Flex, HStack, Stack } from "@chakra-ui/react"
import { type IAssetOptions, useAsset } from "lib/hooks/useAssets"
import _ from "lodash"
import { route } from "nextjs-routes"
import { Fragment, type ReactNode, memo, useCallback, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import type { TokenTotalPayload } from "types/api/tokenTransfer"
import type { TagProps } from "ui/shared/chakra/Tag"
import CopyToClipboardAsync, {
  type CopyToClipboardAsyncProps,
} from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import { AssociationTag } from "ui/shared/entities/base/components"
import {
  TruncatedTextConstant,
  TruncatedTextTail,
  type TruncatedTextTooltipProps,
} from "ui/shared/truncate"
import { TEXT_PROPS } from "../base/utils"
import TokenConfirm from "./TokenConfirm"
import { BaseIcon } from "./TokenIcon"
import TokenLink from "./TokenLink"
import { BaseName } from "./TokenName"
import TokenSymbol from "./TokenSymbol"
import type {
  BaseSymbolProps,
  IToken,
  IconProps,
  TokenConfirmPosition,
  TokenConfirmProps,
  TokenLinkProps,
  TokenNameProps,
} from "./types"

type HashProps = ({
  identifier: string | undefined | null
  isLoading?: boolean
  fallback?: ReactNode
  noLink?: boolean
  linkProps?: Partial<TokenLinkProps>
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  noTooltip?: boolean
} & TextProps) &
  (
    | {
        truncation: "tail"
        headLength?: undefined | never
        tailLength?: undefined | never
      }
    | {
        truncation: "constant"
        headLength?: number
        tailLength?: number
      }
  )

const Hash = ({
  identifier,
  truncation = "constant",
  headLength = 10,
  tailLength = 9,
  isLoading,
  fallback,
  noLink,
  linkProps,
  tooltipProps,
  color,
  noTooltip,
  ...props
}: HashProps) => {
  const defaultHref = useMemo(
    () =>
      route({
        pathname: "/address/[hash]",
        query: {
          hash: identifier?.replace?.("factory/", "") || "",
        },
      }),
    [identifier],
  )
  const isLinkDisabled = useMemo(
    () =>
      noLink ||
      !identifier ||
      identifier === "N/A" ||
      identifier === "usei" ||
      identifier.startsWith("factory/") ||
      identifier.startsWith("ibc/"),
    [identifier, noLink],
  )

  if (!identifier) {
    return null
  }

  if (truncation === "tail") {
    return (
      <TokenLink
        href={defaultHref}
        isDisabled={isLinkDisabled}
        color={color}
        isLoading={isLoading}
        {...linkProps}
      >
        <TruncatedTextTail
          textStyle="875"
          isLoading={isLoading}
          tooltipProps={tooltipProps}
          fallback={fallback}
          isDisabled={noTooltip}
          {...props}
        >
          {identifier?.replace?.("N/A", "")?.replace?.("usei", "")}
        </TruncatedTextTail>
      </TokenLink>
    )
  }

  return (
    <TokenLink
      href={defaultHref}
      isDisabled={isLinkDisabled}
      isLoading={isLoading}
      {...linkProps}
    >
      <TruncatedTextConstant
        headLength={headLength}
        tailLength={tailLength}
        textStyle="875"
        tooltipProps={tooltipProps}
        isLoading={isLoading}
        fallback={fallback}
        color={color}
        isDisabled={noTooltip}
        {...props}
      >
        {identifier?.replace?.("N/A", "")?.replace?.("usei", "") || ""}
      </TruncatedTextConstant>
    </TokenLink>
  )
}

type CopyProps = {
  noCopy?: boolean
  token: IToken
  isLoading?: boolean
} & CopyToClipboardAsyncProps

const Copy = ({ noCopy, token, isLoading, ...props }: CopyProps) => {
  const setValue = useCallback(() => token?.address, [token?.address])

  if (noCopy || !token?.address) {
    return <></>
  }

  return (
    <CopyToClipboardAsync
      isLoading={isLoading}
      setValue={setValue}
      {...props}
    ></CopyToClipboardAsync>
  )
}

export type TokenV2Props = {
  token: IToken
  noSymbol?: boolean
  iconProps?: Omit<
    Partial<IconProps>,
    "confirmIconProps" | "token" | "confirmIconPosition"
  >
  linkProps?: Partial<TokenLinkProps>
  symbolProps?: Partial<BaseSymbolProps>
  confirmIconProps?: Partial<TokenConfirmProps>
  /**
   * Position of the confirm icon
   * @default "symbol"
   */
  confirmIconPosition?: TokenConfirmPosition | "none"
  nameProps?: Partial<Omit<TokenNameProps, "token">>
  fallback?: string
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  showAssociation?: boolean
  noIcon?: boolean
  noCopy?: boolean
  noLink?: boolean
  copyProps?: Partial<Omit<CopyProps, "token">>
  total?: TokenTotalPayload
  showFullyInfo?: boolean
  associationProps?: TagProps
  noName?: boolean
  showHash?: boolean
  hashProps?: Partial<HashProps>
  contentProps?: StackProps
} & FlexProps &
  IAssetOptions

const TokenV2 = ({
  iconProps,
  linkProps,
  symbolProps,
  noIcon,
  confirmIconProps,
  confirmIconPosition = "symbol",
  showAssociation,
  token: _token,
  isLoading,
  noTooltip,
  tooltipProps,
  fallback,
  nameProps,
  noCopy,
  noLink,
  copyProps,
  total,
  noSymbol,
  showFullyInfo,
  associationProps,
  noName,
  showHash,
  hashProps,
  contentProps,
  specialSource,
  ...props
}: TokenV2Props) => {
  const [partProps, otherProps] = useSplitProps(props, TEXT_PROPS)

  const { token, identifier } = useMemo(() => {
    const token = _.chain({ ...(_token || {}) } as IToken)
      .tap((token) => {
        if (token?.address === "usei" || total?.denom === "usei") {
          token["name"] = "Sei"
          token["symbol"] = "SEI"
          token["token_denom"] = "usei"
          return
        }
        if (
          String(total?.denom || token?.address || "")?.startsWith("ibc/") ||
          String(total?.denom || token?.address || "")?.startsWith("factory/")
        ) {
          token["token_denom"] = token.token_denom || token.address
          token["name"] = token.name || total?.denom || token.address
          return
        }
      })
      .value() as TokenInfo

    const identifier = token?.address || token?.token_denom || undefined

    return { token, identifier }
  }, [_token, total])

  const asset = useAsset(identifier, { specialSource })

  const Content = showHash ? Stack : Fragment

  return (
    <Flex gap={2} alignItems="center" overflow="hidden" {...otherProps}>
      <BaseIcon
        token={token}
        isLoading={isLoading}
        asset={asset}
        noIcon={noIcon}
        confirmIconProps={confirmIconProps}
        showConfirm={confirmIconPosition === "icon"}
        {...iconProps}
      />

      <Content
        {...(showHash
          ? {
              overflow: "hidden",
              flexShrink: 0,
              gap: "2px",
              ...contentProps,
            }
          : {})}
      >
        <HStack
          gap={2}
          display={showHash ? "flex" : "contents"}
          alignItems="center"
          _empty={{
            display: "none",
          }}
        >
          {!noName && token?.name && (
            <BaseName
              identifier={identifier}
              defaultName={token?.name}
              isLoading={isLoading}
              noTooltip={noTooltip}
              tooltipProps={tooltipProps}
              fallback={fallback}
              linkProps={linkProps}
              noLink={noLink}
              showFullyInfo={showFullyInfo}
              asset={asset}
              {...partProps}
              {...nameProps}
            />
          )}
          {confirmIconPosition === "name" && (
            <TokenConfirm
              isLoading={isLoading}
              asset={asset}
              {...confirmIconProps}
            />
          )}
          <TokenSymbol
            isLoading={isLoading}
            noSymbol={noSymbol}
            identifier={identifier}
            noLink={
              noLink ||
              (!noName && (asset?.symbol || asset?.name || token?.name))
            }
            defaultSymbol={token?.symbol}
            {...symbolProps}
          />
          {confirmIconPosition === "symbol" && (
            <TokenConfirm
              asset={asset}
              isLoading={isLoading}
              {...confirmIconProps}
            />
          )}

          <AssociationTag
            token={token}
            isLoading={isLoading}
            address={token?.address}
            association={token?.association}
            showAssociation={showAssociation}
            {...associationProps}
          ></AssociationTag>
        </HStack>

        {showHash && (
          <Hash
            identifier={identifier}
            isLoading={isLoading}
            noLink={
              noLink ||
              ((noName || (!asset?.name && !token?.name)) &&
                (noSymbol || (!asset?.symbol && !token?.symbol)))
            }
            {...(hashProps as any)}
          />
        )}
      </Content>

      <Copy
        isLoading={isLoading}
        token={token}
        noCopy={noCopy}
        {...copyProps}
      />
    </Flex>
  )
}

export type TokenIconProps = IconProps

export { TokenIcon } from "./TokenIcon"

export default memo(TokenV2, (prev, next) => {
  return (
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.total?.denom === next.total?.denom &&
    prev.nameProps?.postfix === next.nameProps?.postfix
  )
})
