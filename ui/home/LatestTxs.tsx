import type { StackProps } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useWatchState } from "lib/hooks/useWatchState"
import { memo } from "react"
import TabFloat from "ui/shared/Tabs/TabFloat"
import TabOnlyPanels from "ui/shared/Tabs/TabOnlyPanels"
import HomeLayout from "./HomeLayout"
import LatestTxsContent from "./LatestTxsContent"

const LatestTxs = (props: StackProps) => {
  const [tab, setTab] = useWatchState<"evm" | "native">("evm", [], {
    throttle: 200,
  })

  return (
    <HomeLayout
      title={getLanguage(
        "main_homepage.latest_transactions_section.latest_transactions",
      )}
      href={tab === "evm" ? "/txs" : "/txs?tab=native"}
      gap={0}
      overflow="hidden"
      padding={0}
      titleBoxProps={{
        paddingTop: 4,
        paddingX: 4,
      }}
      subTitle={
        <TabFloat
          id="latest_transactions"
          value={tab}
          isSetOnRouter={false}
          onChange={(newId) => {
            setTab(newId)
          }}
          tabListProps={{
            gap: 2,
          }}
          tabs={[
            {
              id: "evm",
              title: getLanguage("utils.evm"),
              component: undefined,
              tabProps: {
                paddingX: 0,
                paddingY: 0,
                height: 6,
              },
            },
            {
              id: "native",
              title: getLanguage("utils.native_cosmos"),
              component: undefined,
              tabProps: {
                paddingX: 0,
                paddingY: 0,
                height: 6,
              },
            },
          ]}
        />
      }
      {...props}
    >
      <TabOnlyPanels
        activeId={tab as string}
        tabs={[
          {
            id: "evm",
            component: LatestTxsContent,
            props: {
              type: "evm" as "evm" | "native",
            },
          },
          {
            id: "native",
            component: LatestTxsContent,
            props: {
              type: "native" as "evm" | "native",
            },
          },
        ]}
      />
    </HomeLayout>
  )
}

export default memo(LatestTxs, () => true)
