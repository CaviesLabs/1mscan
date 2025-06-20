import { useShallowLayoutEffect } from "lib/hooks/useShallow"
import { useRouter } from "next/router"
import type { Route } from "nextjs-routes"

export const useQueryLayoutEffect = (
  effect: (values: Record<string, string>) => void,
  queryNames: (Route["query"] | string)[],
) => {
  const router = useRouter()
  useShallowLayoutEffect(
    () => {
      effect(
        Object.fromEntries(
          queryNames.map((queryName) => [
            queryName,
            router.query[queryName as string],
          ]),
        ),
      )
    },
    queryNames.map((queryName) => router.query[queryName as string]),
  )
}
