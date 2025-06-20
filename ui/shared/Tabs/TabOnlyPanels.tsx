import { Box, Stack, type StackProps } from "@chakra-ui/react"
import type React from "react"
import { useMemo } from "react"
import DistributeLazy from "./components/DistributeLazy"
import type { None } from "./components/types"

type ILazyItem<P extends object, E> = {
  id: string
  component: React.ComponentType<E>
  props: P
}

type Props<L extends (ILazyItem<object, any> | None)[]> = {
  activeId: Exclude<L[number], None>["id"] | None
  tabs: {
    [N in keyof L]: L[N] extends
      | {
          component: React.ComponentType<infer P>
          props: infer H
        }
      | None
      ? P extends {}
        ? H extends P
          ? L[N]
          : {
              component: Exclude<L[N], None>["component"]
              props: P
            }
        : {
            component: Exclude<L[N], None>["component"]
            props: P
          }
      :
          | {
              component: Exclude<L[N], None>["component"]
              props: object
            }
          | None
  }
} & StackProps

const TabOnlyPanels = <L extends (ILazyItem<object, any> | None)[]>({
  activeId: _activeId,
  tabs: _tabs,
  ...props
}: Props<L>) => {
  const tabs = useMemo(() => {
    return _tabs.filter(Boolean) as ILazyItem<object, any>[]
  }, [_tabs])

  const activeId = useMemo(() => {
    return tabs.find((tab: any) => tab?.id === _activeId)?.id || tabs[0]?.id
  }, [tabs, _activeId])

  return (
    <Stack {...props} alignItems="stretch">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId

        return (
          <Box hidden={!isActive} key={tab.id} flex={1}>
            <DistributeLazy
              isActive={isActive}
              inputs={tab.props}
              view={tab.component}
            />
          </Box>
        )
      })}
    </Stack>
  )
}

export default TabOnlyPanels
