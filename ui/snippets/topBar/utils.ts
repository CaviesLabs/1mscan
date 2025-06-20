import { setQuery } from "lib/router/setQuery"
import Router from "next/router"

export const switchChain = (
  chain: string,
  options?: {
    isReload?: boolean
  },
) => {
  setQuery("chain", chain).then(() => {
    if (options?.isReload) {
      Router.reload()
    }
  })
}
