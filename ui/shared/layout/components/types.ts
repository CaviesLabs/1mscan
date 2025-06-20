import type { Route } from "nextjs-routes"
import type { OnChangeTabItemProps } from "ui/profile"

export type IStore = {
  open: boolean
  tab_id: string
  item: OnChangeTabItemProps
  onChange: ({
    tabId,
    pathname,
    keepRouter,
  }: {
    tabId: string
    pathname: Truthy<Route["pathname"]>
    keepRouter?: boolean
  }) => void
}
