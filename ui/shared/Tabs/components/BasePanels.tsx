import { TabPanel, type TabPanelProps, TabPanels } from "@chakra-ui/react"
import { memo } from "react"
import { generateKey } from "stubs/utils"
import { useSnapshot } from "valtio"
import { useBaseContext } from "./BaseProvider"
import DistributeLazy from "./DistributeLazy"

type Props = TabPanelProps & {
  isActive?: boolean
}

const BasePanels = ({ isActive = true, ...props }: Props) => {
  const { store, tabs } = useBaseContext()
  const snap = useSnapshot(store)
  const activeId = snap.active_id
  return (
    <TabPanels
      mt={3}
      alignItems="stretch"
      transitionProperty="height"
      transitionDuration="0.4s"
      transitionTimingFunction="ease-in-out"
      _empty={{ display: "none" }}
      flex={1}
      {...props}
    >
      {tabs.map((tab, index) => {
        return (
          <TabPanel key={generateKey(index, true, tab.id)} flex={1} padding={0}>
            <DistributeLazy
              view={tab.component!}
              inputs={tab.props!}
              isActive={isActive && activeId === tab.id}
            />
          </TabPanel>
        )
      })}
    </TabPanels>
  )
}

export default memo(BasePanels, (prev, next) => {
  return prev.isActive === next.isActive
})
