import type BigNumber from "bignumber.js"
import type { ReactNode } from "react"

export interface TabItem<T extends string = string, N = any> {
  id: T
  title: string | ((props: { isActive?: boolean }) => ReactNode) | ReactNode
  count?: BigNumber.Value | Falsy
  isCounterLoading?: boolean
  isLoading?: boolean
  rightLabel?: string
  component: ReactNode | undefined | null
  comingSoon?: boolean
  next_page_params?: N
  isChecked?: any
}

export type RoutedTab<T extends string = string, N = any> = TabItem<T, N> & {
  subTabs?: Array<string>
}

export type RoutedSubTab = Omit<TabItem, "subTabs">

export interface MenuButton {
  id: null
  title: string
  count?: never
  component: null
}
