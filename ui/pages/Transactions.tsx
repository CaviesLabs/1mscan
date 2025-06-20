import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import NumberWidgetsList from "ui/transactions/NumberWidgetsList"
import TxsEVM from "ui/txs/TxsEVM"
import TxsNATIVE from "ui/txs/TxsNATIVE"

const Transactions = () => {
  return (
    <>
      <PageTitle title={getLanguage("transactions_page.transactions")} />

      <NumberWidgetsList mt={8} />

      <ScrollTab
        mt={8}
        cleanupOnTabChange={{
          keepQueries: ["tab"],
        }}
        tabs={[
          {
            id: "EVM",
            title: getLanguage("utils.evm"),
            component: TxsEVM,
            props: {},
          },
          {
            id: "native",
            title: getLanguage("utils.native_cosmos"),
            component: TxsNATIVE,
            props: {},
          },
        ]}
      />
    </>
  )
}

export default memo(Transactions, () => true)
