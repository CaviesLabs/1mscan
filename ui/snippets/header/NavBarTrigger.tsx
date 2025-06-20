import useApiQuery from "lib/api/useApiQuery"
import { getIsNFT } from "lib/getOSType"
import { useRouter } from "next/router"
import { memo, useMemo } from "react"
import { type IStore, formatedPaths } from "./config"

type Props = {
  store: IStore
}

const NavBarTrigger = ({ store }: Props) => {
  const router = useRouter()
  const pathname = router.pathname

  const tokenHash = useMemo(() => {
    if (pathname !== "/token/[...slug]") return
    const slug = router.query.slug
    const slugs = String(slug || "").split(",")
    if (slugs?.[0] === "factory" || slugs?.[0] === "ibc") return undefined
    if (slugs?.[1] === "instance") return slugs?.[0]
    return slugs?.[0]
  }, [pathname, router.query.slug])

  const { data: token } = useApiQuery("token", {
    pathParams: { hash: tokenHash },
    queryOptions: {
      enabled: Boolean(tokenHash),
    },
  })

  const assetType = useMemo(() => {
    if (pathname !== "/token/[...slug]") return

    const slug = router.query.slug
    const slugs = String(slug || "").split(",")

    if (slugs?.[0] === "factory" || slugs?.[0] === "ibc")
      return "assets===tokens"
    if (!token) return

    const tokenType = getIsNFT(token?.type)
    if (tokenType === "nft") return "assets===nfts"
    else if (tokenType === "hybrid") return "assets===hybrids"
    else if (tokenType === "token") return "assets===tokens"
    return
  }, [pathname, router.query.slug, token?.type])

  useMemo(() => {
    /**
     * Special check token route /token/[...slug]
     */
    if (assetType) {
      store.active = assetType || ""
      return
    }

    const activePath = formatedPaths.get(pathname)

    store.active = activePath || ""
  }, [pathname, assetType])

  return <></>
}

export default memo(NavBarTrigger, () => true)
