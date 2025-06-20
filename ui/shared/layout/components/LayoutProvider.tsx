import { setRouter } from "lib/router/setQuery"
import { default as Router } from "next/router"
import { type ReactNode, createContext, memo, useState } from "react"
import type { ProfileSideBarItem } from "ui/profile"
import { ref } from "valtio"
import type { SideBarSectionItem } from "../LayoutSidebar/types"
import {
  getActiveTabByPathname,
  getCurrentTabById,
} from "../LayoutSidebar/utils"
import LayoutTrigger from "./LayoutTrigger"
import type { IStore } from "./types"

type LayoutContextProps = {
  store: IStore
}

export const LayoutContext = createContext<LayoutContextProps>(
  {} satisfies Partial<LayoutContextProps> as any,
)

type Props = {
  children: ReactNode
  navs: SideBarSectionItem[]
}

function onChange(
  this: IStore,
  {
    tabId,
    pathname,
    keepRouter,
  }: { tabId: string; pathname: string; keepRouter?: boolean },
) {
  this.open = false
  this.tab_id = tabId
  if (keepRouter) return
  setRouter(pathname as any, {}, { isReplace: true, cleanQuery: true })
}

const LayoutProvider = ({ children, navs }: Props) => {
  const [initialTabId] = useState(
    getActiveTabByPathname(navs, Router.pathname)?.id,
  )

  const store = useStore<IStore>({
    open: false,
    tab_id: initialTabId,
    get item() {
      return ref(
        getCurrentTabById(navs, this.tab_id, Router.pathname),
      ) as ProfileSideBarItem
    },
    get onChange() {
      return onChange.bind(store)
    },
  })

  return (
    <LayoutContext.Provider value={{ store }}>
      <LayoutTrigger store={store} navs={navs} />
      {children}
    </LayoutContext.Provider>
  )
}

export default memo(LayoutProvider, (prev, next) => {
  return prev.children === next.children && prev.navs === next.navs
})
