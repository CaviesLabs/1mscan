import type { ChakraProps, TextProps } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { route } from "nextjs-routes"
import { type ReactNode, memo, useCallback, useMemo } from "react"
import IconSvg, { type IconSvgProps } from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"
import CopyToClipboardAsync, {
  type CopyToClipboardAsyncProps,
} from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import {
  TruncatedTextConstant,
  TruncatedTextTail,
  type TruncatedTextTooltipProps,
} from "ui/shared/truncate"
import { TEXT_PROPS } from "../base/utils"

type LinkProps = {
  href: string
  isDisabled?: boolean
  isLoading?: boolean
  children: ReactNode
} & ChakraProps

const Link = ({
  isDisabled,
  isLoading,
  children,
  href,
  ...props
}: LinkProps) => {
  if (isDisabled || isLoading) return children

  return (
    <LinkInternal
      isScrollTop
      href={href}
      role="group"
      overflow="hidden"
      color="secondary.03.text"
      {...props}
    >
      {children}
    </LinkInternal>
  )
}

type HashProps = {
  hash: string | null | undefined
  isLoading?: boolean
  fallback?: string
  noLink?: boolean
  linkProps?: Partial<LinkProps>
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  noTooltip?: boolean
  truncation?: "tail" | "constant"
  headLength?: number
  tailLength?: number
} & TextProps

const Hash = ({
  isLoading,
  fallback,
  noLink,
  linkProps,
  tooltipProps,
  color,
  hash,
  noTooltip,
  truncation = "tail",
  headLength,
  tailLength,
  ...props
}: HashProps) => {
  const defaultHref = useMemo(
    () =>
      route({
        pathname: "/tx/[hash]",
        query: {
          hash: hash || "",
        },
      }),
    [hash],
  )
  const isLinkDisabled = useMemo(() => noLink || !hash, [noLink])

  return (
    <Link
      href={defaultHref}
      isDisabled={isLinkDisabled}
      color={color}
      isLoading={isLoading}
      {...linkProps}
    >
      {truncation === "constant" && (
        <TruncatedTextConstant
          textStyle="875"
          isLoading={isLoading}
          tooltipProps={tooltipProps}
          fallback={fallback}
          isDisabled={noTooltip || !hash}
          headLength={headLength}
          tailLength={tailLength}
          {...props}
        >
          {hash || ""}
        </TruncatedTextConstant>
      )}

      {truncation === "tail" && (
        <TruncatedTextTail
          textStyle="875"
          isLoading={isLoading}
          tooltipProps={tooltipProps}
          fallback={fallback}
          isDisabled={noTooltip || !hash}
          {...props}
        >
          {hash}
        </TruncatedTextTail>
      )}
    </Link>
  )
}

type CopyProps = {
  noCopy?: boolean
  hash: string | null | undefined
  isLoading?: boolean
} & CopyToClipboardAsyncProps

const Copy = ({ noCopy, hash, isLoading, ...props }: CopyProps) => {
  const setValue = useCallback(() => hash, [hash])

  if (noCopy || !hash) {
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

export type TxV2Props = {
  hash: string | null | undefined
  linkProps?: Partial<LinkProps>
  fallback?: string
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  noCopy?: boolean
  noLink?: boolean
  copyProps?: Partial<Omit<CopyProps, "hash">>
  iconProps?: Partial<IconSvgProps>
  hasIcon?: boolean
} & TextProps &
  (
    | {
        truncation?: "tail"
        headLength?: undefined | never
        tailLength?: undefined | never
      }
    | {
        truncation: "constant"
        headLength?: number
        tailLength?: number
      }
  )

const TxV2 = ({
  linkProps,
  hash,
  isLoading,
  noTooltip,
  tooltipProps,
  fallback = "-",
  noCopy,
  noLink,
  copyProps,
  iconProps,
  hasIcon,
  truncation = "tail",
  headLength = 4,
  tailLength = 4,
  ...props
}: TxV2Props) => {
  const [partProps, otherProps] = useSplitProps(props, TEXT_PROPS)

  return (
    <Flex
      maxWidth="max-content"
      gap={2}
      alignItems="center"
      overflow="hidden"
      {...otherProps}
    >
      {hasIcon && (
        <IconSvg
          isLoading={isLoading}
          name="exchange"
          color="secondary.02.text"
          alt="transaction"
          boxSize={4}
          {...iconProps}
        />
      )}

      <Hash
        hash={hash}
        isLoading={isLoading}
        fallback={fallback}
        noLink={noLink}
        tooltipProps={tooltipProps}
        linkProps={linkProps}
        noTooltip={noTooltip}
        truncation={truncation}
        headLength={headLength}
        tailLength={tailLength}
        {...partProps}
      />
      <Copy isLoading={isLoading} hash={hash} noCopy={noCopy} {...copyProps} />
    </Flex>
  )
}

export default memo(TxV2)
