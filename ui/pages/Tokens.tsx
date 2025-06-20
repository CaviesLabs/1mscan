import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import TokenCW20s from "ui/tokens/TokenCW20s"
import TokenERC20s from "ui/tokens/TokenERC20s"
import TokenICS20s from "ui/tokens/TokenICS20s"
import TokenNatives from "ui/tokens/TokenNatives"

const Tokens = () => {
  return (
    <>
      <PageTitle hasDefaultBackLink title={getLanguage("token.tokens")} />

      <ScrollTab
        cleanupOnTabChange={{ keepQueries: [] }}
        tabs={[
          {
            id: "erc-20",
            title: getLanguage("token.erc_20"),
            component: TokenERC20s,
            props: {},
          },
          {
            id: "cw-20",
            title: getLanguage("token.cw_20"),
            component: TokenCW20s,
            props: {},
          },
          {
            id: "ics-20",
            title: getLanguage("token.ibc_tokens"),
            component: TokenICS20s,
            props: {},
          },
          {
            id: "native",
            title: getLanguage("token.native_tokens"),
            component: TokenNatives,
            props: {},
          },
        ]}
      />
    </>
  )
}

export default memo(Tokens, () => true)
