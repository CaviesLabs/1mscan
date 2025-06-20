import type { ComponentType, ReactNode } from "react"

export type TabItem<P extends object, E> = {
  id: string
  title: string
  count?: number | Falsy
  isOverflow?: boolean
  isLoading?: boolean
  comingSoon?: boolean
  isCounterLoading?: boolean
  rightLabel?: ReactNode
  isChecked?: boolean | Falsy
  component?: ComponentType<E>
  props?: P
  isDisabled?: boolean
}

export type IStore = {
  readonly active_id: string
  set_active_id: string
}

export type None = undefined | string | number | null | boolean

export type BaseItemState<T extends TabItem<object, any>> = {
  isActive: boolean
  isCount: boolean
  index: number
} & (T extends object ? Omit<T, "component" | "props"> : T)

export type MatchTabItem<I, F = Omit<I, "props" | "component">> = Exclude<
  I,
  None
> extends {
  props: infer H
  component: React.ComponentType<infer P>
}
  ? P extends {}
    ? H extends P
      ? I
      :
          | {
              component: Exclude<I, None>["component"]
              props: P
            }
          | Exclude<I, object>
    : F
  : F
