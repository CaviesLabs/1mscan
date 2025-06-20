import { type ReactNode, memo } from "react"
import type { SideBarSectionItem } from "../LayoutSidebar/types"
import LayoutProvider from "../components/LayoutProvider"
import LayoutDrop from "./LayoutDrop"

type Props = {
  navs: SideBarSectionItem[]
  children?: ReactNode
}

const LayoutDropChecked = ({ navs, children }: Props) => {
  return (
    <LayoutProvider navs={navs}>
      <LayoutDrop items={navs[0].items}></LayoutDrop>
      {children}
    </LayoutProvider>
  )
}

export default memo(LayoutDropChecked, (prev, next) => {
  return prev.navs === next.navs && prev.children === next.children
})
