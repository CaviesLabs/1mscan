import { useMemoEffect } from "lib/hooks/useShallow"
import { useRouter } from "next/router"
import { memo } from "react"
import type { SideBarSectionItem } from "../LayoutSidebar/types"
import { getActiveTabByPathname } from "../LayoutSidebar/utils"
import type { IStore } from "./types"

type Props = {
  store: IStore
  navs: SideBarSectionItem[]
}

const LayoutTrigger = ({ store, navs }: Props) => {
  const router = useRouter()

  useMemoEffect(() => {
    const newTabId = getActiveTabByPathname(navs, router.pathname)?.id
    if (newTabId !== store.tab_id) {
      store.onChange({ tabId: newTabId, pathname: router.pathname })
    }
  }, [navs])

  useMemoEffect(() => {
    const newTabId = getActiveTabByPathname(navs, router.pathname)?.id
    if (newTabId !== store.tab_id) {
      store.onChange({
        tabId: newTabId,
        pathname: router.pathname,
        keepRouter: true,
      })
    }
  }, [router.pathname])

  return <></>
}

export default memo(LayoutTrigger, (prev, next) => {
  return prev.navs === next.navs
})
