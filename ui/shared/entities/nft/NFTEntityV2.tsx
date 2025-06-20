import type { ChakraProps, ImageProps, TextProps } from "@chakra-ui/react"
import { Flex, Image, Skeleton } from "@chakra-ui/react"
import ipfsUrlParser from "lib/token/metadata/ipfsUrlParser"
import { isNil } from "lodash"
import { route } from "nextjs-routes"
import { type ReactNode, memo, useMemo } from "react"
import LinkInternal from "ui/shared/LinkInternal"
import type { TruncatedTextTooltipProps } from "ui/shared/truncate"
import TruncatedTextLines from "ui/shared/truncate/TruncatedTextLines"
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
      display="inline-block"
      href={href}
      overflow="hidden"
      color="accent.blue"
      {...props}
    >
      {children}
    </LinkInternal>
  )
}

type IconProps = {
  id: string | number | undefined | null
  hash: string | undefined | null
  src: string | undefined | null
  isLoading?: boolean
  noIcon?: boolean
} & Partial<Omit<ImageProps, "src" | "id">>

const Icon = ({
  noIcon,
  id,
  hash,
  src: _src,
  isLoading,
  ...props
}: IconProps) => {
  const src = useMemo(
    () => ipfsUrlParser(_src) || "/icons/nft-placeholder.svg",
    [_src],
  )

  // const store = useStore({
  //   src: "",
  // });

  // const snap = useSnapshot(store);

  // useMemo(() => {
  //   if (_isLoading) return;
  //   _.chain(src)
  //     .thru(async (src) => {
  //       if (!src) return;

  //       return await checkImage(src)
  //         .then(() => src)
  //         .catch(() => {
  //           return undefined;
  //         });
  //     })

  //     .thru(async (pm) => {
  //       const src = await pm;
  //       store.src = src || "_blank_";
  //     })
  //     .value();
  // }, [src, _isLoading]);

  if (noIcon || !hash || isNil(id) || id === "") {
    return <></>
  }

  if (isLoading)
    return (
      <Skeleton boxSize={8} borderRadius="0.25rem" flexShrink={0}></Skeleton>
    )

  return (
    <Image
      boxSize={8}
      flexShrink={0}
      loading="lazy"
      borderRadius="0.25rem"
      objectFit="cover"
      aria-invalid={src === "/icons/nft-placeholder.svg"}
      src={src}
      alt={`${hash}-${id} logo`}
      borderStyle="solid"
      backgroundColor="neutral.light.2"
      _invalid={{
        borderWidth: "0.5px",
        borderColor: "neutral.light.4",
      }}
      onError={(e) => {
        const currentSrc = e.currentTarget.src
        if (currentSrc === "/icons/nft-placeholder.svg") {
          return
        }

        e.currentTarget.src = "/icons/nft-placeholder.svg"
        e.currentTarget.setAttribute("aria-invalid", "true")
      }}
      {...props}
    />
  )
}

type IDProps = {
  id: string | number | undefined | null
  hash: string | undefined | null
  noID?: boolean
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  fallback?: string
  linkProps?: Partial<LinkProps>
  noLink?: boolean
} & Omit<TextProps, "id">

const ID = ({
  id,
  hash,
  noID,
  isLoading,
  noTooltip,
  tooltipProps,
  fallback,
  linkProps,
  noLink,
  ...props
}: IDProps) => {
  const defaultHref = useMemo(
    () =>
      route({
        pathname: "/token/[...slug]",
        query: {
          slug: [String(hash ?? ""), "instance", String(id ?? "")],
        },
      }),
    [hash, id],
  )
  const isLinkDisabled = useMemo(
    () => noLink || !hash || isNil(id) || id === "",
    [noLink, hash, id],
  )

  if (noID) {
    return <></>
  }

  return (
    <Link
      href={defaultHref}
      isLoading={isLoading}
      isDisabled={isLinkDisabled}
      maxWidth="full"
      width="max-content"
      {...linkProps}
    >
      <TruncatedTextLines
        isDisabled={isNil(id) || !hash || noTooltip}
        isLoading={isLoading}
        tooltipProps={tooltipProps}
        fallback={fallback ?? ""}
        textStyle="875"
        noOfLines={2}
        contentIsDisabled={isLinkDisabled}
        {...props}
      >
        {id}
      </TruncatedTextLines>
    </Link>
  )
}

export type NFTV2Props = {
  noSymbol?: boolean
  iconProps?: Omit<Partial<IconProps>, "src">
  linkProps?: Partial<LinkProps>
  id: string | number | undefined | null
  hash: string | undefined | null
  src: string | undefined | null
  fallback?: string
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  noIcon?: boolean
  noLink?: boolean
  noID?: boolean
  idProps?: Partial<IDProps>
} & Omit<TextProps, "id">

const NFTV2 = ({
  iconProps,
  linkProps,
  noIcon,
  isLoading,
  noTooltip,
  tooltipProps,
  fallback,
  idProps,
  noLink,
  id,
  hash,
  src,
  noID,
  ...props
}: NFTV2Props) => {
  const [partProps, otherProps] = useSplitProps(props, TEXT_PROPS)

  return (
    <Flex gap={2} alignItems="center" overflow="hidden" {...otherProps}>
      <Icon
        id={id}
        hash={hash}
        src={src}
        isLoading={isLoading}
        noIcon={noIcon}
        {...iconProps}
      />

      <ID
        id={id}
        hash={hash}
        noID={noID}
        isLoading={isLoading}
        noTooltip={noTooltip}
        tooltipProps={tooltipProps}
        fallback={fallback}
        linkProps={linkProps}
        noLink={noLink}
        {...partProps}
        {...idProps}
      />
    </Flex>
  )
}

export const NFTIDV2 = ID

export default memo(NFTV2, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.id === next.id &&
    prev.src === next.src &&
    prev.isLoading === next.isLoading
  )
})
