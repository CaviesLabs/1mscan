import { getLanguage } from "languages/useLanguage"
import { useAsset } from "lib/hooks/useAssets"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import { TruncatedTextTail } from "ui/shared/truncate"
import TokenLink from "./TokenLink"
import type { TokenNameProps } from "./types"

export const BaseName = ({
  identifier,
  isLoading,
  noTooltip,
  tooltipProps,
  fallback,
  linkProps,
  noLink,
  showFullyInfo,
  asset,
  defaultName,
  postfix,
  ...props
}: TokenNameProps) => {
  const nameString = useMemo(
    () => asset?.name || defaultName || identifier,
    [asset?.name, defaultName, identifier],
  )

  const defaultHref = useMemo(
    () =>
      route({
        pathname: "/token/[...slug]",
        query: {
          slug: [identifier || ""],
        },
      }),
    [identifier],
  )
  const isLinkDisabled = useMemo(
    () => noLink || !identifier || identifier === "usei",
    [noLink, identifier],
  )

  return (
    <TokenLink
      href={defaultHref}
      isLoading={isLoading}
      isDisabled={isLinkDisabled}
      {...linkProps}
    >
      <TruncatedTextTail
        isDisabled={!nameString || noTooltip}
        isLoading={isLoading}
        fallback={fallback ?? getLanguage("token.unnamed_token")}
        textStyle="875"
        tooltipProps={{
          defaultIsTruncated: showFullyInfo,
          highPriorityIsTruncated: showFullyInfo,
          placement: "top",
          ...tooltipProps,
        }}
        label={
          showFullyInfo
            ? `${nameString || ""} ${asset?.symbol ? `(${asset.symbol})` : ""}`
            : undefined
        }
        {...props}
      >
        {nameString}
      </TruncatedTextTail>
      {postfix}
    </TokenLink>
  )
}

const TokenName = ({ identifier, ...props }: TokenNameProps) => {
  const asset = useAsset(identifier)
  return <BaseName asset={asset} identifier={identifier} {...props} />
}

export default memo(TokenName)
