import type {
  FlexProps,
  IconProps,
  TagProps,
  TextProps,
} from "@chakra-ui/react"
import { Flex, Skeleton, chakra, forwardRef } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { getAssociationTokenData } from "lib/association"
import type React from "react"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import type { Association } from "types/api/transaction"
import type { Props as CopyToClipboardProps } from "ui/shared/CopyToClipboard"
import CopyToClipboard from "ui/shared/CopyToClipboard"
import type { IconName, IconSvgProps } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"
import LinkExternal from "ui/shared/LinkExternal"
import LinkInternal from "ui/shared/LinkInternal"
import Tag from "ui/shared/chakra/Tag"
import TruncatedTextConstant from "ui/shared/truncate/TruncatedTextConstant"
import TruncatedTextDynamic from "ui/shared/truncate/TruncatedTextDynamic"
import { default as TruncatedTextTail } from "ui/shared/truncate/TruncatedTextTail"
import type { TruncatedTextTooltipProps } from "ui/shared/truncate/TruncatedTextTooltip"
import type { IconSize } from "./utils"

export type Truncation = "constant" | "dynamic" | "tail" | "none"

export interface EntityBaseProps {
  className?: string
  href?: string
  iconSize?: IconSize | string
  isExternal?: boolean
  isLoading?: boolean
  isValidator?: boolean
  noCopy?: boolean
  isNa?: boolean
  noIcon?: boolean
  linkColor?: string
  noLink?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  query?: Record<string, string>
  length?: number
  tailLength?: number
  headLength?: number
  isFullAddress?: boolean
  target?: React.HTMLAttributeAnchorTarget
  truncation?: Truncation
  justify?: "center" | "between"
  showAssociation?: boolean
  hasFallback?: boolean
}

export interface ContainerBaseProps
  extends Pick<EntityBaseProps, "className">,
    FlexProps {
  children: React.ReactNode
}

const Container = forwardRef<ContainerBaseProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Flex
      ref={ref}
      className={className}
      alignItems="center"
      minWidth={0}
      {...props}
    >
      {children}
    </Flex>
  ),
)

export interface LinkBaseProps
  extends Pick<
    EntityBaseProps,
    | "className"
    | "onClick"
    | "isLoading"
    | "isExternal"
    | "href"
    | "noLink"
    | "query"
    | "isValidator"
  > {
  isNa?: boolean
  children: React.ReactNode
  target?: React.HTMLAttributeAnchorTarget
  parentLink?: string
  isDisabled?: boolean
}

const Link = chakra(
  forwardRef<LinkBaseProps, "a">(
    (
      {
        className,
        isLoading,
        children,
        isExternal,
        href,
        noLink,
        isNa,
        target = "_self",
        onClick,
      },
      ref,
    ) => {
      const styles = {
        display: "block",
        alignItems: "center",
        minWidth: 0,
      }

      if (noLink || isNa) {
        return (
          <Skeleton
            isLoaded={!isLoading}
            {...styles}
            className={className}
            ref={ref}
          >
            {children}
          </Skeleton>
        )
      }

      const Component = isExternal ? LinkExternal : LinkInternal

      return (
        <Component
          ref={ref}
          {...styles}
          href={href!}
          isLoading={isLoading}
          onClick={onClick}
          className={className}
          target={target}
          color="accent.blue"
        >
          {children}
        </Component>
      )
    },
  ),
)

export type IconBaseProps = {
  name: IconName
  color?: IconProps["color"]
  borderRadius?: IconProps["borderRadius"]
} & Pick<EntityBaseProps, "isLoading" | "iconSize" | "noIcon"> &
  Partial<IconSvgProps>

const Icon = ({
  isLoading,
  iconSize,
  noIcon,
  name,
  color,
  borderRadius,
  ...props
}: IconBaseProps) => {
  if (noIcon) {
    return null
  }

  return (
    <IconSvg
      name={name}
      boxSize={iconSize ?? 5}
      isLoading={isLoading}
      minW={0}
      flexShrink={0}
      borderRadius={borderRadius ?? "sm"}
      color={color ?? "neutral.light.7"}
      {...props}
    />
  )
}

export type ContentBaseProps = Pick<
  EntityBaseProps,
  | "isLoading"
  | "truncation"
  | "tailLength"
  | "headLength"
  | "linkColor"
  | "hasFallback"
> & {
  text: string
  noTooltip?: boolean
  tooltipProps?: TruncatedTextTooltipProps
  entityRef?: React.MutableRefObject<HTMLElement | null>
  contentBoxRef?: React.MutableRefObject<HTMLElement | null>
  label?: string
} & TextProps

const Content = chakra(
  ({
    text,
    isLoading,
    linkColor,
    entityRef,
    noTooltip,
    tailLength,
    headLength,
    tooltipProps,
    contentBoxRef,
    truncation = "dynamic",
    hasFallback,
    ...props
  }: ContentBaseProps) => {
    if (truncation === "constant") {
      return (
        <TruncatedTextConstant
          tailLength={tailLength}
          headLength={headLength}
          fallback={hasFallback ? "-" : ""}
          color={linkColor ?? undefined}
          isDisabled={Boolean(noTooltip)}
          isLoading={isLoading}
          tooltipProps={tooltipProps}
          {...props}
        >
          {text}
        </TruncatedTextConstant>
      )
    }

    if (truncation === "dynamic") {
      return (
        <TruncatedTextDynamic
          tailLength={tailLength}
          headLength={headLength}
          fallback={hasFallback ? "-" : ""}
          color={linkColor ?? undefined}
          entityRef={entityRef}
          contentBoxRef={contentBoxRef}
          isDisabled={Boolean(noTooltip)}
          isLoading={isLoading}
          tooltipProps={tooltipProps}
          {...props}
        >
          {text}
        </TruncatedTextDynamic>
      )
    }

    return (
      <TruncatedTextTail
        isDisabled={Boolean(noTooltip)}
        color={linkColor ?? undefined}
        fallback={hasFallback ? "-" : ""}
        isLoading={isLoading}
        tooltipProps={tooltipProps}
        {...props}
      >
        {text}
      </TruncatedTextTail>
    )
  },
)

export type CopyBaseProps = CopyToClipboardProps &
  Pick<EntityBaseProps, "noCopy" | "isNa">

const Copy = (props: CopyBaseProps) => {
  if (props.noCopy || props.isNa) {
    return null
  }

  return <CopyToClipboard {...props} />
}

export type AssociationProps = {
  token: Partial<TokenInfo>
  address: string | undefined | null
  association: Association | undefined | null
} & Pick<EntityBaseProps, "isLoading" | "showAssociation"> &
  TagProps

const AssociationTag = memo(
  ({
    address,
    association,
    showAssociation,
    token,
    ...props
  }: AssociationProps) => {
    if (!showAssociation || !association || !address) return <></>
    const associationData = useMemo(
      () => getAssociationTokenData(token as any),
      [token],
    )
    if (!associationData) return <></>
    return (
      <Tag colorScheme="orange" display="flex" {...props}>
        {getLanguage(`token.${associationData.self.toLowerCase()}` as any)}
      </Tag>
    )
  },
)

export { AssociationTag, Container, Content, Copy, Icon, Link }
