import { useQueryClient } from "@tanstack/react-query"
// import { useTabFreezeContext } from "../Tabs/TabFreezeContextProvider";
import type { UseQueryOptions } from "@tanstack/react-query"
import type { AxiosRequestConfig } from "axios"
import { getResourceKey } from "lib/api/getResourceKey"
import type { IPageableResourceName } from "lib/api/resources"
import type {
  IResourceError,
  IResourceFilter,
  IResourcePathParam,
  IResponse,
} from "lib/api/resources"
import useApiQuery from "lib/api/useApiQuery"
import { setQuery } from "lib/router/setQuery"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo } from "react"
import { ref } from "valtio"
import { useSnapshot } from "valtio/react"
import type { INextPageParams, QueryWithPagesResult } from "./types"

export interface Params<
  R extends IPageableResourceName,
  I extends IResponse<R>,
  O = I,
> {
  resourceName: R
  filters?: IResourceFilter<R>
  options?: Omit<
    UseQueryOptions<I, IResourceError, O, [string, ...string[]]>,
    "queryKey" | "queryFn"
  >
  pathParams?: IResourcePathParam<R>
  configs?: AxiosRequestConfig
  isActive?: boolean
}

const pushToRouter = (data: INextPageParams) => {
  // const ziped = zipObjectToUrl(data);
  setQuery("metadata", JSON.stringify(data))
}

export default function useQueryWithPages<
  R extends IPageableResourceName,
  I extends IResponse<R> = IResponse<R>,
  O = I,
>({
  filters,
  options,
  pathParams,
  resourceName,
  configs,
  isActive = true,
}: Params<R, I, O>): QueryWithPagesResult<R, I, O> {
  const router = useRouter()
  const queryClient = useQueryClient()

  // const freezeTabContext = useTabFreezeContext();

  // const isFreezeRef = useShallowMemoRef(
  //   () => freezeTabContext?.isFreeze,
  //   [freezeTabContext?.isFreeze],
  // );

  const clearCache = useCallback(() => {
    const prekeys = getResourceKey(resourceName, {
      pathParams,
      queryParams: filters,
    })
    queryClient.removeQueries({
      predicate: (query) =>
        prekeys.every((key, i) => key === query.queryKey?.[i]),
    })
  }, [pathParams, resourceName, filters, queryClient])

  const store = useStore({
    _histories: {} as Record<number, INextPageParams["_next"] | null>,
    _page: 1,
    set push(value: INextPageParams["_next"] | null) {
      this._histories[this._page + 1] = value ? ref(value) : null
    },
    set decode(value: string) {
      try {
        if (!value) throw new Error("No next_page_params found")
        const data = JSON.parse(value ?? "") as Partial<INextPageParams>

        /**
         * Migrate from page=...&next_page_params=... to current_page_params=...zip... have to reset page to 1
         */
        if (!(Number(data?._page) > 0)) throw new Error("No page found")

        this._histories[data._page!] = data._next ? ref(data._next) : {}
        this._page = data._page!
      } catch {
        // console.log("Error parsing next_page_params", error);
        this._histories[this._page] = {}
        this._page = 1
      }

      if (this._page === 1) {
        if (
          Object.keys(this._histories).filter((key) => key && key !== "1")
            .length
        ) {
          clearCache()
          this._histories = {
            1: this._histories[1],
          }
        }
      }
    },
    set next(_: true) {
      try {
        const to = this._page + 1
        const data = {
          _next: this._histories[to],
          _page: to,
        }

        this._page = to
        pushToRouter(data)
      } catch (error) {
        console.log("Error zip next_page_params", error)
      }
    },
    get metadata() {
      return this._histories[this._page]
    },

    get can_next() {
      return Boolean(this._histories[this._page + 1])
    },

    get can_back() {
      const prev = this._page - 1
      if (prev === 1) return true
      if (prev < 1) return false
      return Boolean(this._histories[this._page - 1])
    },

    set back(_to: number | -1 | 0) {
      try {
        const to = _to === -1 ? this._page - 1 : _to
        if (to === 1 || to === 0) {
          clearCache()
          this._histories = {}
        }
        const data = {
          _next: this._histories[to],
          _page: to,
        }

        this._page = to
        pushToRouter(data)
      } catch {
        // console.log("Error zip next_page_params", error);
        this._histories[1] = null
        this._page = 1
      }
    },
    get page() {
      return this._page
    },
  })

  // const metadataRef = useShallowMemoRef<any>(
  //   ({ pre }) => {
  //     // if (isFreezeRef.current) return pre;
  //     return router.query.metadata;
  //   },
  //   [router.query.metadata, isFreezeRef.current],
  // );

  useEffect(() => {
    if (!isActive) return
    // const handleRouteChange = () => {
    const metastring = router.query.metadata

    store.decode = (metastring || null) as string
    // };

    // handleRouteChange();

    // Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      // Router.events.off("routeChangeComplete", handleRouteChange);
    }
  }, [router.query.metadata, isActive])

  const snap = useSnapshot(store)

  const result = useApiQuery(resourceName, {
    pathParams,
    queryParams: {
      ...(snap.metadata || {}),
      ...Object.fromEntries(
        Object.entries(filters || {}).map(([key, value]) => [
          key,
          value === undefined || value === null || value === ""
            ? undefined
            : value,
        ]),
      ),
    },
    page: snap.page,
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...options,
    },
    configs,
  })

  useMemo(() => {
    // @ts-ignore
    store.push = result?.data?.next_page_params
    // @ts-ignore
  }, [result?.data?.next_page_params])

  const next = useCallback(() => {
    store.next = true
  }, [])

  const back = useCallback((to: number | -1 | 0) => {
    store.back = to
  }, [])

  useMemo(() => {
    // Reflect.set(snap, "loading", result.isFetching);
    // Reflect.set(
    //   snap,
    //   "total",
    //   // @ts-ignore
    //   result.data?.total_count ?? result.data?.count ?? undefined,
    // );

    Reflect.set(result, "pagination", {
      loading: result.isFetching || result.isPlaceholderData,
      // @ts-ignore
      total: result.data?.total_count ?? result.data?.count ?? undefined,
      snap,
      next,
      back,
    })
    // @ts-ignore
  }, [result, snap])

  return result as never
}
