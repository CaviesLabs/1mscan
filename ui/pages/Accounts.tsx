import { Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import TopAccountsEVM from "ui/addresses/TopAccountsEVM"
import TopAccountsNATIVE from "ui/addresses/TopAccountsNATIVE"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"

const Accounts = () => {
  return (
    <>
      <PageTitle
        title={getLanguage("top_accounts_page.title")}
        afterTitle={
          <Text ml={1} as="span" color="neutral.light.6" textStyle="125">
            ({getLanguage("top_accounts_page.by_sei_balance")})
          </Text>
        }
        hasDefaultBackLink
      />

      <ScrollTab
        mt={8}
        cleanupOnTabChange={{ keepQueries: [] }}
        tabs={[
          {
            id: "EVM",
            title: getLanguage("top_accounts_page.tabs.evm"),
            component: TopAccountsEVM,
            props: {},
          },
          {
            id: "native",
            title: getLanguage("top_accounts_page.tabs.native_cosmos"),
            component: TopAccountsNATIVE,
            props: {},
          },
        ]}
      ></ScrollTab>
    </>
  )
}

export default memo(Accounts, () => true)
