import type { Route } from "nextjs-routes"
import type { IconName } from "ui/shared/IconSvg"

type BaseProfileSideBarItem = {
  id: string
  icon?: IconName
  title: string
  route: Omit<Route, "query"> & Partial<Pick<Route, "query">>
  isDisabled?: boolean
  isComingSoon?: boolean
  isHidden?: boolean
}
export type ProfileSideBarItem = BaseProfileSideBarItem & {
  subItems?: BaseProfileSideBarItem[]
}

export type ProfileSideBarSectionItem = {
  id: string
  title: string
  items: ProfileSideBarItem[]
  userRolesForShow?: string[]
  userRolesForHide?: string[]
}

export type OnChangeTabItemProps<T extends "item" | "default" = "item"> =
  T extends "default"
    ? Omit<ProfileSideBarItem, "id"> & {
        id: "default"
      }
    : ProfileSideBarItem
