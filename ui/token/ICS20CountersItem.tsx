import useApiQuery from "lib/api/useApiQuery"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import LinkInternal from "ui/shared/LinkInternal"
import { smoothScroll } from "ui/utils/dom"

type Props = {
  item: "token_holders_count" | "transfers_count"
  hash: string
  isLoading?: boolean
}

const placeholderData = {
  token_holders_count: "1",
  transfers_count: "1",
}

const ICS20CountersItem = ({ item, hash, isLoading: _isLoading }: Props) => {
  const { data, isPlaceholderData } = useApiQuery("ics20_token_counters", {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash && !_isLoading),
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData

  const { value, link } = useMemo(() => {
    const value = Number(data?.[item] as any)

    if (value > 0) {
      const link = route({
        pathname: "/token/[...slug]",
        query: {
          slug: ["ibc", hash || ""],
          tab: item === "token_holders_count" ? "holders" : "token_transfers",
        },
      })

      return {
        value: value.toLocaleString(),
        link,
      }
    }
    return {
      value: "-",
      link: undefined,
    }
  }, [hash, data?.[item]])

  return (
    <LinkInternal
      href={link}
      isDisabled={!link}
      isLoading={isLoading}
      onClick={() => {
        smoothScroll("routed-tabs")
      }}
    >
      {value}
    </LinkInternal>
  )
}

export default memo(ICS20CountersItem, (prev, next) => {
  return prev.hash === next.hash && prev.isLoading === next.isLoading
})
