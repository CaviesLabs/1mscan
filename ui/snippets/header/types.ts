import type { FlexProps, LinkProps, TagProps } from "@chakra-ui/react"
import type { Route } from "nextjs-routes"
import type { IconName, IconSvgProps } from "ui/shared/IconSvg"

export type INavItemMakeActivate = <T extends Omit<INavBase, "makeActivate">>(
  this: INavBase,
  props: {
    config: T
    state: {
      pathname: Route["pathname"]
      query: Route["query"]
    }
  },
) => boolean

export type INavBase = {
  id: string
  title: string
  // preIcon?: IconName;
  // postIcon?: IconName;
  navProps?: FlexProps
  preProps?: TagProps & {
    iconProps?: IconSvgProps & {
      name: IconName
    }
  }
  postProps?: TagProps & {
    iconProps?: IconSvgProps & {
      name: IconName
    }
  }
} & Omit<LinkProps, "href"> &
  (
    | {
        href: string
        route?: undefined
      }
    | {
        href?: undefined
        route: Partial<Route> & {
          fallback?: Route["pathname"]
          alloweds?: Route["pathname"][]
        }
      }
    | {
        href?: undefined
        route?: undefined
      }
  )

export type INavItem = INavBase & {}

export type INavGroup = INavBase & {
  items?: (INavBase | "divider")[]
}

// export type INavActive<L extends INavGroup[]> =
//   | L[number]["id"]
//   | {
//       [N1 in keyof L]: L[N1] extends {
//         items: (INavBase | "divider")[];
//       }
//         ? L[N1]["items"] extends Array<infer S>
//           ? S extends INavBase
//             ? `${L[N1]["id"]}.${S["id"]}`
//             : never
//           : never
//         : never;
//     };

export type INavActivePath<L extends INavGroup[]> =
  | L[number]["id"]
  | ExtractNestedIds<L>

type ExtractNestedIds<L extends INavGroup[]> = {
  [N1 in keyof L]: L[N1] extends { items: (INavBase | "divider")[] }
    ? L[N1]["items"] extends Array<infer S>
      ? S extends INavBase
        ? `${L[N1]["id"]}===${S["id"]}`
        : never
      : never
    : never
}[number]

export type INavGroupExpandable<L extends INavGroup[]> = {
  [N1 in keyof L]: L[N1] extends { items: (INavBase | "divider")[] }
    ? L[N1]["id"]
    : never
}[number]
