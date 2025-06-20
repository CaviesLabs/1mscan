import { getLanguage } from "languages/useLanguage"
import _ from "lodash"
import TOOL_NAVS from "ui/shared/layout/constants/tool"
import type { INavActivePath, INavGroup, INavGroupExpandable } from "./types"

const TOOLS_ORDER = [
  "send_tokens",
  "multisender",
  "revoke",
  "divider",
  "wallet_profile",
  "profile_checker",
  "address_book",
  "divider",
  "associate",
  "faucet",
]

export const items = [
  {
    id: "home",
    title: getLanguage("header.home"),
    route: {
      pathname: "/",
    },
  },
  {
    id: "blockchain",
    title: "Blockchain",
    route: {
      alloweds: ["/address/[hash]", "/address/[hash]/contract-verification"],
    },
    items: [
      {
        id: "transactions",
        title: getLanguage("header.blockchain.transactions"),
        route: {
          pathname: "/txs",
          alloweds: ["/tx/[hash]"],
        },
      },
      {
        id: "blocks",
        title: getLanguage("header.blockchain.blocks"),
        route: {
          pathname: "/blocks",
          alloweds: ["/block/[height_or_hash]"],
        },
      },
      // {
      //   id: "ibc-relayers",
      //   title: "IBC Relayers",
      //   route: {
      //     pathname: "/ibc-relayers",
      //     alloweds: [
      //       "/ibc-relayer/[channel_id]/counterparty/[counterparty_channel_id]",
      //     ],
      //   },
      // },
      {
        id: "top-accounts",
        title: getLanguage("header.blockchain.top_accounts"),
        route: {
          pathname: "/accounts",
        },
      },
      "divider",
      {
        id: "validators",
        title: getLanguage("header.blockchain.validators"),
        route: {
          pathname: "/validators",
          alloweds: ["/validator/[hash]"],
        },
      },

      "divider",
      {
        id: "evm-verifed-contracts",
        title: getLanguage("header.blockchain.evm_verified_contracts"),
        route: {
          pathname: "/verified-contracts",
        },
      },
    ],
  },
  {
    id: "assets",
    title: getLanguage("header.assets.main_link"),
    route: {
      alloweds: ["/token/[...slug]"],
    },
    items: [
      {
        id: "tokens",
        title: getLanguage("header.assets.tokens"),
        route: {
          pathname: "/tokens",
        },
      },
      {
        id: "nfts",
        title: getLanguage("header.assets.nfts"),
        route: {
          pathname: "/nfts",
        },
      },
    ],
  },

  {
    ...TOOL_NAVS[0],
  },
] satisfies INavGroup[]

export const groups = items.filter(
  (item) => "items" in item,
) satisfies INavGroup[]

export type INavItems = typeof items

export type IStore = {
  open: boolean
  active: INavActivePath<INavItems>
} & Record<INavGroupExpandable<INavItems>, boolean>

export const formatedPaths = _.chain(new Map<string, string>())
  .tap((activePaths) => {
    for (const group of items as INavGroup[]) {
      if (group.route?.pathname) {
        activePaths.set(group.route.pathname, group.id)
      }
      if (group.route?.alloweds) {
        for (const allowed of group.route.alloweds) {
          activePaths.set(allowed, group.id)
        }
      }
      if (group.items) {
        for (const item of group.items) {
          if (item === "divider") continue
          if (item.route?.pathname) {
            activePaths.set(item.route.pathname, `${group.id}===${item.id}`)
          }
          if (item.route?.alloweds) {
            for (const allowed of item.route.alloweds) {
              activePaths.set(allowed, `${group.id}===${item.id}`)
            }
          }
        }
      }
    }
  })
  .value()
