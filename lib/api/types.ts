import type { AxiosResponse } from "axios"
import type { DefaultFilter } from "types/api/base"
import type { RESOURCES } from "./mapping"

export type IResourceEndpoint =
  | "api"
  | "gateway"
  // | "workspace"
  | "stats"
  | "self"
  | "auth"
  | "self-api"

export type IResourceRootItem = {
  readonly path: string
  readonly endpoint: IResourceEndpoint | `${"http://" | "https://"}${string}`
  readonly pathParams?: string[]
  readonly filterFields?: string[]
  readonly needCredentials?: boolean
  readonly needWorkspaceAuth?: boolean
  readonly needCsrf?: boolean
  readonly defaultFilters?:
    | Record<string, Primitive | Primitive[] | undefined | null>
    | undefined
}

type IMarkResource = <
  P extends Readonly<string>,
  Et extends
    | IResourceEndpoint
    | `${"http://" | "https://"}${string}` = `${"http://" | "https://"}${string}`,
  Ps extends string[] | undefined = undefined,
  Fs extends string[] | undefined = undefined,
  Nc extends boolean | undefined = undefined,
  Nwa extends boolean | undefined = undefined,
  Ncs extends boolean | undefined = undefined,
  Df extends
    | Record<string, Primitive | Primitive[] | undefined | null>
    | undefined = undefined,
  F extends object = RemoveUndefined<{
    readonly path: P
    readonly pathParams: Ps
    readonly filterFields: Fs extends string[]
      ? (Fs[number] | keyof DefaultFilter)[]
      : undefined
    readonly endpoint: Et
    readonly needCredentials: Nc
    readonly needWorkspaceAuth: Nwa
    readonly defaultFilters: Df
    readonly needCsrf: Ncs
  }>,
  R = F & {
    readonly _response: any
    readonly _pageable: false
    _set_response: <
      R = any,
      P extends boolean = false,
      Bd extends Record<string, any> | FormData | undefined = undefined,
    >() => {
      _response: R
      _pageable: P
      _body: Bd
    } & F
  },
>(_format: {
  readonly path: P
  readonly endpoint: Et
  readonly pathParams?: Ps
  readonly filterFields?: Fs
  readonly needCredentials?: boolean
  readonly needWorkspaceAuth?: Nwa
  readonly needCsrf?: boolean
  readonly defaultFilters?: Df
}) => R

export const _markResource: IMarkResource = (_format) => {
  // @ts-ignore
  _format._set_response = () => _format

  return _format as any
}

export type IResource = typeof RESOURCES

export type IResourceName = keyof IResource

export type IResourceItem<R extends IResourceName> = IResource[R]

export type IResourcePath<R extends IResourceName> = IResourceItem<R>["path"]

export type IResourceFilterKey<R extends IResourceName> =
  IResourceItem<R> extends { filterFields: Array<string> }
    ? Extract<IResourceItem<R>["filterFields"][number], string>
    : never

export type IResourceFilter<R extends IResourceName> = {
  [K in IResourceFilterKey<R>]?: any
}

export type IResourcePathParamKey<R extends IResourceName> =
  IResourceItem<R> extends {
    pathParams: Array<unknown>
  }
    ? Extract<IResourceItem<R>["pathParams"][number], string>
    : never

export type IResourcePathParam<R extends IResourceName> = {
  [K in IResourcePathParamKey<R>]: string | undefined
}

export const resourceKey = <R extends IResourceName>(x: R): string => x

export type IResourceError<T = any, D = any> = Omit<
  AxiosResponse<T, D>,
  "data"
> & {
  payload: T | undefined
}

export type ResourceError<T = unknown, D = any> = IResourceError<T, D>

export type ResourceErrorAccount<T> = ResourceError<{ errors: T }>

export type IResponse<R extends IResourceName> = IResourceItem<R>["_response"]

export type IPageableResourceName = {
  [K in IResourceName]: IResource[K] extends { _pageable: true } ? K : never
}[IResourceName]

export type IResourceBody<R extends IResourceName> = IResourceItem<R> extends {
  _body: any
}
  ? IResourceItem<R>["_body"]
  : never

export type IBodyResourceName = {
  [K in IResourceName]: IResource[K] extends {
    _body: Record<string, any> | FormData
  }
    ? K
    : never
}[IResourceName]
