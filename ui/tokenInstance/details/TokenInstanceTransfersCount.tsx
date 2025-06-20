import useApiQuery from "lib/api/useApiQuery"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import LinkInternal from "ui/shared/LinkInternal"
import { smoothScroll } from "ui/utils/dom"

interface Props {
  hash: string | undefined
  id: string
  isLoading?: boolean
}

const TokenInstanceTransfersCount = ({
  hash,
  id,
  isLoading: _isLoading,
}: Props) => {
  const { data, isPlaceholderData } = useApiQuery(
    "token_instance_transfers_count",
    {
      pathParams: { hash, id },
      queryOptions: {
        enabled: Boolean(hash && id && !_isLoading),
        placeholderData: {
          transfers_count: 420,
        },
      },
    },
  )

  const isLoading = isPlaceholderData || _isLoading

  const { value, link } = useMemo(() => {
    if (!hash) return { value: "-", link: undefined }
    const value = Number(data?.transfers_count as any)

    if (value > 0) {
      const link = route({
        pathname: "/token/[...slug]",
        query: {
          slug: [hash, "instance", id],
          tab: "token_transfers",
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
  }, [hash, data?.transfers_count])

  return (
    <LinkInternal
      href={link}
      isLoading={isLoading}
      isDisabled={!link}
      onClick={() => {
        smoothScroll("routed-tabs")
      }}
    >
      {value}
    </LinkInternal>
  )
}

export default memo(TokenInstanceTransfersCount, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.id === next.id &&
    prev.isLoading === next.isLoading
  )
})
