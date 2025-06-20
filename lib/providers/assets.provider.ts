import { ChainKey, type IChainKey } from "configs/server/chain"
import getApiServer from "lib/api/getApiServer"
import isBrowser from "lib/isBrowser"
import { MemoryCache } from "lib/memory"

const assetsMemoryCache = MemoryCache.initCache("assets", {
  max: 5,
  ttl: 1000 * 60 * 2, // 2 minutes
})

const hookGetAssets = async (chain: IChainKey, metadata: { host: string }) => {
  if (isBrowser()) {
    return globalThis.assets
  }
  if (!metadata.host) return Promise.reject(new Error("Host is required"))

  return await getApiServer(
    {
      query: {
        chain: chain,
      },
      req: {
        headers: {
          host: metadata.host,
        },
      },
    },
    "workspace_assets_list",
    {
      noCache: true,
    },
  ).then((assets) => {
    return Object.fromEntries(
      (assets || []).map((asset) => [asset?.identifier?.toLowerCase(), asset]),
    )
  })
}

assetsMemoryCache.prepareHook(
  `assets:${ChainKey.PACIFIC_1}`,
  hookGetAssets.bind(null, ChainKey.PACIFIC_1),
)

assetsMemoryCache.prepareHook(
  `assets:${ChainKey.ARCTIC_1}`,
  hookGetAssets.bind(null, ChainKey.ARCTIC_1),
)

assetsMemoryCache.prepareHook(
  `assets:${ChainKey.ATLANTIC_2}`,
  hookGetAssets.bind(null, ChainKey.ATLANTIC_2),
)

export default assetsMemoryCache
