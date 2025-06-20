import type { ILang } from "languages/utils"
import getApiServer from "lib/api/getApiServer"
import { getIsNFT } from "lib/getOSType"
import isBrowser from "lib/isBrowser"
import { generate } from "lib/metadata"
import _ from "lodash"
import type { AppContext } from "next/app"
import type { VerifiedAsset } from "types/api/assetList"

export const serverGenerate = async (
  app: AppContext,
  lang: ILang,
  chain: string,
  assets: Record<string, VerifiedAsset>,
) => {
  if (isBrowser()) {
    return
  }

  const ctx = app.ctx
  const metadata = { ...ctx.query } as Record<string, any>

  if (ctx.pathname === "/token/[...slug]") {
    const slug = ctx.query.slug as string[]

    metadata.is_ibc = slug?.[0] === "ibc"
    metadata.is_factory = slug?.[0] === "factory"
    metadata.is_instance = slug?.[1] === "instance"
    metadata.token_id = String(slug?.[2] ?? "")
    metadata.token_hash =
      (metadata.is_ibc && slug?.[1]) ||
      (metadata.is_factory && slug?.[1]) ||
      slug?.[0] ||
      ""

    await _.chain(null)
      .thru(async () => {
        if (!metadata.token_hash) return
        if (metadata.is_ibc) return
        if (metadata.is_factory) return

        const token = await getApiServer(ctx, "token", {
          pathParams: {
            hash: metadata.token_hash,
          },
          noCache: true,
        }).catch(() => {
          return undefined
        })

        const asset = assets[token?.address?.toLowerCase() as any]

        metadata.token_name = asset?.name || token?.name || ""
        metadata.token_symbol = asset?.symbol || token?.symbol || ""
        metadata.is_nft =
          getIsNFT(token?.type) === "nft" || metadata.is_instance
      })
      .value()
  }

  const result = generate(ctx.pathname as any, metadata, lang, chain)

  return result
}
