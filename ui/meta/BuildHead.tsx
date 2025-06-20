import { chainKey } from "configs/frontend/chain/utils"
import { getLang } from "languages/useLanguage"
import useApiFetch from "lib/api/useApiFetch"
import useApiQuery from "lib/api/useApiQuery"
import { getIsNFT } from "lib/getOSType"
import { getAsset } from "lib/hooks/useAssets"
import { generate } from "lib/metadata"
import { useRouter } from "next/router"
import { memo, useMemo } from "react"
import BaseHead from "./BaseHead"

const BuildHead = () => {
  const router = useRouter()

  const fetch = useApiFetch()

  const origin = useMemo(() => {
    return window?.location?.origin
  }, [])

  const metadata = useMemo(() => {
    const metadata = {
      ...router.query,
    } as Record<string, any>

    const pathname = router.pathname

    if (pathname === "/token/[...slug]") {
      const slug = router.query.slug as string[]
      metadata.is_ibc = slug?.[0] === "ibc"
      metadata.is_factory = slug?.[0] === "factory"
      metadata.is_instance = slug?.[1] === "instance"
      metadata.token_id = String(slug?.[2] ?? "")
      metadata.token_hash =
        (!metadata.is_ibc && !metadata.is_factory && slug[0]) || ""
    }

    return metadata
  }, [router.query, router.pathname, fetch])

  const { data: token } = useApiQuery("token", {
    pathParams: {
      hash: metadata.token_hash,
    },
    queryOptions: {
      select: (data) => {
        const asset = getAsset(
          data.address?.toLowerCase() || data.token_denom?.toLowerCase(),
        )
        return {
          ...data,
          name: asset?.name || data.name,
          symbol: asset?.symbol || data.symbol,
        }
      },
      enabled: Boolean(metadata.token_hash),
    },
  })

  const seo = useMemo(() => {
    if (router.pathname === "/token/[...slug]" && metadata.token_hash) {
      if (!token?.address) return
      const tokenType = getIsNFT(token.type)
      metadata.token_name = token.name
      metadata.is_nft = tokenType === "nft" || metadata.is_instance

      metadata.token_symbol = token.symbol
    }

    const values = generate(router.pathname, metadata, getLang(), chainKey)
    return values
  }, [router.pathname, metadata, token])

  if (!seo) return null

  return (
    <BaseHead
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      origin={origin}
      pathname={router.pathname}
      query={router.query}
    />
  )
}

export default memo(BuildHead, () => true)
