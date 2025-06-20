import type { IconName } from "ui/shared/IconSvg"
import type { INavBase } from "ui/snippets/header/types"

type BaseSidebarItem = {
  icon?: IconName
  isExternal?: boolean
  isDisabled?: boolean
  isComingSoon?: boolean
  isHidden?: boolean
} & INavBase

export type SidebarItem = BaseSidebarItem & {
  subItems?: BaseSidebarItem[]
}

export type SideBarSectionItem = {
  id: string
  title: string
  items: SidebarItem[]
  userRolesForShow?: string[]
  userRolesForHide?: string[]
}

export type OnChangeTabItemProps<T extends "item" | "default" = "item"> =
  T extends "default"
    ? Omit<SidebarItem, "id"> & {
        id: "default"
      }
    : SidebarItem
