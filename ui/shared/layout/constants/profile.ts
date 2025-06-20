import { getEnvValueV2 } from "configs/frontend/chain/configs"
import _ from "lodash"
import type { SideBarSectionItem } from "ui/shared/layout/LayoutSidebar/types"

export enum WORKSPACE_PROFILE_ROLE {
  USER = "user",
  ADMIN = "admin",
}

export const USER_DASHBOARD_NAVS: SideBarSectionItem[] = [
  {
    id: "others",
    title: "Others",
    userRolesForShow: [WORKSPACE_PROFILE_ROLE.USER],
    // userRolesForHide: ["admin"],
    items: [
      {
        id: "api_keys",
        icon: "api-keys",
        title: "API Keys",
        route: { pathname: "/auth/profile/api-keys" },
      },
      {
        id: "api_key_stats",
        title: "API Key stats",
        route: { pathname: "/auth/profile/api-key-stats" },
        isHidden: true,
      },
      {
        id: "custom_abi",
        icon: "ABI",
        title: "Custom ABI",
        route: { pathname: "/auth/profile/custom-abi" },
      },
    ],
  },
]

export const ADMIN_DASHBOARD_NAVS: SideBarSectionItem[] = [
  {
    id: "apis",
    title: "APIs",
    userRolesForShow: [WORKSPACE_PROFILE_ROLE.ADMIN],
    items: [
      {
        id: "customers",
        icon: "api-keys",
        title: "Customers",
        route: { pathname: "/auth/profile/admin/api-dashboard/customers" },
        subItems: [
          {
            id: "customer_details",
            icon: "api-keys",
            title: "Customer details",
            route: {
              pathname: "/auth/profile/admin/api-dashboard/customer/[id]",
            },
          },
        ],
      },
      {
        id: "packages",
        icon: "package",
        title: "Packages",
        route: { pathname: "/auth/profile/admin/api-dashboard/packages" },
        subItems: [
          {
            id: "api_package",
            icon: "package",
            title: "API Packages",
            route: {
              pathname: "/auth/profile/admin/api-dashboard/packages/[id]",
            },
          },
        ],
      },
      {
        id: "credit_definition",
        icon: "owner",
        title: "Credit definition",
        route: {
          pathname: "/auth/profile/admin/api-dashboard/credit-definition",
        },
      },
      {
        id: "payment_list",
        icon: "description",
        title: "Payment list",
        route: { pathname: "/auth/profile/admin/api-dashboard/payment-list" },
      },
      {
        id: "token-submitted",
        icon: "description",
        title: "Token submitted",
        route: {
          pathname: "/auth/profile/admin/api-dashboard/token-submitted",
        },
      },
    ],
  },
]

const devFeatureUrls = new Set(getEnvValueV2(`common."DEV_FEATURES_URL`))

const profile = [
  {
    id: "account",
    title: "Account",
    items: [
      {
        id: "default",
        icon: "user",
        title: "Account settings",
        route: { pathname: "/auth/profile/account" },
      },
    ],
  },
  {
    id: "lists",
    title: "Lists",
    items: [
      {
        id: "watch_list",
        icon: "star_outline",
        title: "Watch list",
        route: { pathname: "/auth/profile/watchlist" },
      },
      {
        id: "private_tags",
        icon: "privattags",
        title: "Private tags",
        route: { pathname: "/auth/profile/private-tags" },
        // isDisabled: true,
        // isComingSoon: true,
      },
    ],
  },
  ...ADMIN_DASHBOARD_NAVS,
  ...USER_DASHBOARD_NAVS,
] satisfies SideBarSectionItem[]

export const navsWithDevFeatures = _.chain(profile)
  .thru((navs) => {
    const res = [] as SideBarSectionItem[]
    navs.forEach((section) => {
      const items = _.chain(section.items)
        .filter((item) => !devFeatureUrls.has(item.route!.pathname!))
        .value()

      if (items.length) {
        res.push({ ...section, items })
      }
    })
    return res
  })
  .value()
