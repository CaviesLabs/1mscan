import { getEnvValueV2 } from "configs/frontend/chain/configs"
import * as regexp from "lib/regexp"

export default function ipfsUrlParser(maybeUrl: any): string | undefined {
  try {
    if (regexp.IPFS_PREFIX.test(maybeUrl)) {
      return new URL(
        maybeUrl.replace(
          regexp.IPFS_PREFIX,
          getEnvValueV2("common.IPFS_GATEWAY", ""),
        ),
      ).toString()
    }

    return regexp.URL_PREFIX.test(maybeUrl)
      ? new URL(maybeUrl).toString()
      : maybeUrl
  } catch (error) {
    console.log("Failed to parse URL", maybeUrl, error)
    return maybeUrl
  }
}
