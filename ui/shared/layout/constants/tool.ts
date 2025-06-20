import { getLanguage } from "languages/useLanguage"
import isBrowser from "lib/isBrowser"
import type { INavBase } from "ui/snippets/header/types"
import type { SideBarSectionItem } from "../LayoutSidebar/types"

console.log("isBrowser", isBrowser())

const TOOL_NAVS = [
  {
    id: "navs",
    title: getLanguage("header.tools.main_link"),
    items: [
      {
        id: "wallet_profile",
        icon: "tools/wallet",
        title: getLanguage("header.tools.wallet_profile"),
        route: { pathname: "/tool/wallet-profile" },
      },
      {
        id: "profile_checker",
        icon: "tools/user",
        title: getLanguage("header.tools.profile_checker"),
        route: { pathname: "/tool/profile-checker" },
      },
    ],
  },
] as (
  | SideBarSectionItem
  | (INavBase & {
      items: (INavBase | "divider")[]
    })
)[]

export default TOOL_NAVS
