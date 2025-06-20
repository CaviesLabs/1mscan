import fs from "fs"
import { getQueryClient } from "@sei-js/cosmjs"
import type { IChainKey } from "configs/server/chain"
import { getCache } from "lib/memory"
import { get } from "lodash"

import type { NextApiRequest, NextApiResponse } from "next"
import { checkRateLimit } from "pages/api/utils/rate"

// Define types and constants
type IEndpointConfig = {
  rpc: string
  lcd: string
}

type INodeConfig = Record<IChainKey, IEndpointConfig>

const clientStore = await fs.promises
  .readFile("./configs/private/node.json", "utf8")
  .then((success) => {
    const config = JSON.parse(success) as INodeConfig
    return config
  })
  .then(async (config) => {
    return await Promise.all([
      getQueryClient(config["pacific-1"].lcd),
      getQueryClient(config["atlantic-2"].lcd),
      getQueryClient(config["arctic-1"].lcd),
    ]).then((clients) => {
      console.log("INIT lcd clients successfully")
      const store = {
        "pacific-1": clients[0],
        "atlantic-2": clients[1],
        "arctic-1": clients[2],
      } as Record<IChainKey, IClient>

      return store
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

type IClient = Awaited<ReturnType<typeof getQueryClient>>

const ALLOW_METHODS = [
  "cosmos.gov.v1beta1.proposal",
  "cosmos.gov.v1beta1.vote",
  "cosmos.gov.v1beta1.deposit",
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Rate limit check
  const clientIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown"
  if (checkRateLimit(clientIp as string)) {
    return res.status(429).json({ message: "Rate limit exceeded" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }
  if (!ALLOW_METHODS.includes(req.body.path))
    return res.status(403).json({ message: "Path is not allowed" })
  if (!clientStore) {
    return res.status(500).json({ message: "Error creating query clients" })
  }

  const key = req.url + JSON.stringify(req.body)

  return await getCache(
    key,
    () => {
      const chainId = req.query?.["chain-id"] as IChainKey
      const { path, params } = req.body as {
        path: string
      } & Record<string, string>

      const client = clientStore[chainId]
      const method = get(client, path) as AnyFunction<Promise<object>>

      return method(params)
    },
    30 * 1000, // 30s
  ).then((success) => {
    if (!success) {
      return res.status(500).json({ message: "Error calling method" })
    }
    return res.status(200).json(success)
  })
}
