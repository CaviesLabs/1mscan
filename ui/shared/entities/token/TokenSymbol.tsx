import { useAsset } from "lib/hooks/useAssets"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import { TruncatedTextTail } from "ui/shared/truncate"
import TokenLink from "./TokenLink"
import type { BaseSymbolProps } from "./types"

const TokenSymbol = ({
  identifier,
  fallback,
  noSymbol,
  isLoading,
  noLink,
  linkProps,
  defaultSymbol,
  usdHasParenthesis,
  ...props
}: BaseSymbolProps) => {
  const asset = useAsset(identifier)
  const symbol = asset?.symbol || defaultSymbol || fallback

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
    () => Boolean(noLink || !identifier || identifier === "usei"),
    [noLink, identifier],
  )

  if (noSymbol || !symbol) {
    return <></>
  }

  return (
    <TokenLink
      display="inline-flex"
      href={defaultHref}
      isDisabled={isLinkDisabled}
      {...linkProps}
    >
      <TruncatedTextTail
        display="inline"
        tooltipProps={{
          display: "inline-flex",
        }}
        isLoading={isLoading}
        {...props}
      >
        {usdHasParenthesis && "("}
        {symbol}
        {usdHasParenthesis && ")"}
      </TruncatedTextTail>
    </TokenLink>
  )
}

export default memo(TokenSymbol)
