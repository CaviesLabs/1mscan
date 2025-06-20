import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import NftEvms from "ui/tokens/NftEvms"
import NftNatives from "ui/tokens/NftNatives"

const Nfts = () => {
  return (
    <>
      <PageTitle title={getLanguage("token.nfts")} />

      <ScrollTab
        cleanupOnTabChange={{
          keepQueries: [],
        }}
        tabs={[
          {
            id: "evm",
            title: getLanguage("utils.evm"),
            component: NftEvms,
            props: {},
          },
          {
            id: "native",
            title: getLanguage("utils.native_cosmos"),
            component: NftNatives,
            props: {},
          },
        ]}
      />
    </>
  )
}

export default memo(Nfts, () => true)
