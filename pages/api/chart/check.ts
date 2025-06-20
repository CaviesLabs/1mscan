import { isEvmAddressTest } from "lib/getOSType"
import type { NextApiRequest, NextApiResponse } from "next"

const dexScreenerCheck = async (hash: string) => {
  const src = `https://io.dexscreener.com/dex/pair-details/v3/seiv2/${hash}`

  return await fetch(src)
    .then((res) => res.json())
    .catch((error) => {
      if (error.status === 404) {
        return false
      }

      return Promise.reject(error)
    })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const hash = req.query.hash as string

  if (!isEvmAddressTest(hash as any)) {
    return res.status(200).json({
      isExist: false,
      provider: undefined,
    })
  }

  return await dexScreenerCheck(hash)
    .then((data) => {
      return res.status(200).json({
        isExist: Boolean(data),
        provider: "dexscreener",
      })
    })
    .catch(async (error) => {
      console.log(error)
      return res.status(200).json({
        isExist: false,
        provider: "dexscreener",
        error: error?.message,
      })
    })
}
