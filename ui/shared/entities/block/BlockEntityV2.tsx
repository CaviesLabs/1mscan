import type { ChakraProps, TextProps } from "@chakra-ui/react"
import { Flex, Skeleton } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import _ from "lodash"
import { route } from "nextjs-routes"
import { type ReactNode, memo, useCallback, useMemo, useRef } from "react"
import IconSvg, { type IconSvgProps } from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"
import CopyToClipboardAsync from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import {
  TruncatedTextTail,
  type TruncatedTextTooltipProps,
} from "ui/shared/truncate"
import { TEXT_PROPS } from "../base/utils"

type IBlockNumber = number | string | Falsy

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
      color="secondary.03.text"
      overflow="hidden"
      {...props}
    >
      {children}
    </LinkInternal>
  )
}

type IconProps = {
  isLoading?: boolean
  noIcon?: boolean
  /**
   * Only support rem and level.
   * @default 1rem
   * eg. 1rem, 2rem, 1, 2, 3, ...
   */
  boxSize?: `${number}rem` | number
} & Partial<IconSvgProps>

const Icon = ({ noIcon, isLoading, ...props }: IconProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  if (noIcon) return null
  if (isLoading)
    return (
      <Skeleton boxSize={4} borderRadius="full" flexShrink={0} {...props} />
    )

  return (
    <IconSvg
      name="block"
      color="secondary.03"
      boxSize={4}
      flexShrink={0}
      {...props}
      alt="block"
      ref={ref}
    />
  )
}

type HashProps = {
  number: IBlockNumber
  isLoading?: boolean
  fallback?: string
  noLink?: boolean
  linkProps?: Partial<LinkProps>
  tooltipProps?: Partial<TruncatedTextTooltipProps>
} & TextProps

const Hash = ({
  number,
  isLoading,
  fallback,
  noLink,
  linkProps,
  tooltipProps,
  color,
  ...props
}: HashProps) => {
  const defaultHref = useMemo(
    () =>
      route({
        pathname: "/block/[height_or_hash]",
        query: {
          height_or_hash: `${number}`,
        },
      }),
    [number],
  )
  const isLinkDisabled = useMemo(
    () => noLink || (Number(number) === 0 ? false : !number),
    [number, noLink],
  )

  return (
    <Link
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
        {...props}
      >
        {_.chain(BigNumber(number as any))
          .thru((value) => {
            if (value.isNaN()) return fallback ?? "-"
            return value.toFormat(0)
          })
          .value()}
      </TruncatedTextTail>
    </Link>
  )
}

type CopyProps = {
  noCopy?: boolean
  number: IBlockNumber
  isLoading?: boolean
}

const Copy = ({ noCopy, number, isLoading }: CopyProps) => {
  const setValue = useCallback(() => String(number ?? ""), [number])

  if (noCopy) {
    return null
  }

  return (
    <CopyToClipboardAsync
      isLoading={isLoading}
      setValue={setValue}
    ></CopyToClipboardAsync>
  )
}

export type BlockV2Props = {
  iconProps?: Omit<IconProps, "number">
  linkProps?: Partial<LinkProps>
  fallback?: string
  isLoading?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  noIcon?: boolean
  noCopy?: boolean
  noLink?: boolean
  numberProps?: Omit<
    HashProps,
    "address" | "tooltipProps" | "truncation" | "headLength" | "tailLength"
  >
  number: IBlockNumber | Falsy
} & TextProps

const BlockV2 = ({
  iconProps,
  linkProps,
  noIcon,
  number,
  isLoading,
  tooltipProps,
  fallback,
  noCopy,
  noLink,
  numberProps,
  ...props
}: BlockV2Props) => {
  const [textProps, otherProps] = useSplitProps(props, TEXT_PROPS)

  const isFalsy = useMemo(() => !/^\d+$/g.test(String(number)), [number])

  return (
    <Flex
      display="inline-flex"
      gap={1}
      alignItems="center"
      overflow="hidden"
      maxWidth="max-content"
      {...otherProps}
    >
      <Icon isLoading={isLoading} noIcon={noIcon || isFalsy} {...iconProps} />

      <Hash
        number={number}
        isLoading={isLoading}
        fallback={fallback}
        noLink={noLink || isFalsy}
        tooltipProps={tooltipProps}
        linkProps={linkProps}
        {...textProps}
        {...numberProps}
      />

      <Copy isLoading={isLoading} number={number} noCopy={noCopy || isFalsy} />
    </Flex>
  )
}

export const BlockIconV2 = Icon

export default memo(BlockV2, (prev, next) => {
  return prev.number === next.number && prev.isLoading === next.isLoading
})
