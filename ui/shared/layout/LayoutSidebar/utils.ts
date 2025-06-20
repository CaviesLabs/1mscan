import type { OnChangeTabItemProps, SideBarSectionItem } from "./types"

export const getActiveTabByPathname = (
  navs: SideBarSectionItem[],
  pathname: string,
): OnChangeTabItemProps => {
  for (const nav of navs) {
    for (const item of nav.items) {
      if (item.route?.pathname === pathname) return item
      if (
        item.subItems?.some((subItem) => subItem.route?.pathname === pathname)
      )
        return item
    }
  }
  return navs[0].items[0]
}

export const getCurrentTabById = (
  navs: SideBarSectionItem[],
  id: string,
  pathname: string,
): OnChangeTabItemProps => {
  for (const nav of navs) {
    for (const item of nav.items) {
      for (const subItem of item.subItems || []) {
        if (subItem.route?.pathname === pathname) return subItem
      }
      if (item.id === id) return item
    }
  }
  return navs[0].items[0]
}
