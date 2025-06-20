import { memo, useCallback, useContext } from "react"
import ProfileNavButton from "ui/profile/components/ProfileNavButton"
import { useSnapshot } from "valtio"
import type { SidebarItem } from "../LayoutSidebar/types"
import { LayoutContext } from "../components/LayoutProvider"

type Props = {
  item: SidebarItem
}

const LayoutDropItem = ({ item }: Props) => {
  const { store } = useContext(LayoutContext)
  const snap = useSnapshot(store)

  const onClick = useCallback((item: SidebarItem) => {
    if (!item.route?.pathname) return
    store.onChange({ tabId: item.id, pathname: item.route.pathname })
  }, [])

  return (
    <ProfileNavButton
      paddingX={3}
      paddingY={2}
      columnGap={3}
      height="2.5rem"
      overflow="hidden"
      isSelected={snap.tab_id === "default" ? true : snap.tab_id === item.id}
      onClick={(e) => {
        if (item.isDisabled) {
          e.preventDefault()
          return
        }
        onClick(item)
      }}
      isDisabled={item.isDisabled}
      title={item.title}
      icon={item.icon}
      isComingSoon={item.isComingSoon}
    />
  )
}

export default memo(LayoutDropItem, (prev, next) => {
  return prev.item === next.item
})
