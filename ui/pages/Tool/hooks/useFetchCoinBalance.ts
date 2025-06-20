import useApiQuery from "lib/api/useApiQuery"
import { useMemo } from "react"
import type { IInfinateResponse } from "ui/shared/pagination/useQueryWithInfinity"

export const useFetchCoinBalance = ({
  hash,
  enabled = true,
}: {
  hash: string
  enabled?: boolean
}) => {
  const response = useApiQuery("address", {
    pathParams: { hash: hash },
    queryOptions: {
      enabled: Boolean(hash && enabled),
    },
    configs: {
      timeout: 15000,
    },
  })
  const pages = useMemo(() => {
    return [
      {
        items: [
          {
            token: null as any,
            token_id: null,
            value: response.data?.coin_balance || "",
          },
        ],
        next_page_params: null,
        page: 1,
      },
    ] as IInfinateResponse<"address_tokens">[]
  }, [response.data])
  Reflect.set(response, "pages", pages)
  return response as typeof response & {
    pages: IInfinateResponse<"address_tokens">[]
  }
}
