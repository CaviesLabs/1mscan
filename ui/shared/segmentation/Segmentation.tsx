import { chakra } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import IconSvg, { type IconName } from "../IconSvg"
import {
  BasePanels,
  BaseTabs,
  type BaseTabsProps,
  type MatchTabItem,
  type None,
  type TabItem,
} from "../Tabs/components"

const MapItem = ({ icon, title }: { icon?: IconName; title: string }) => {
  return (
    <>
      {icon && <IconSvg name={icon} boxSize={4}></IconSvg>}
      <chakra.span textStyle="875">{title}</chakra.span>
    </>
  )
}

type Props<
  L extends (
    | (TabItem<object, any> & {
        icon?: IconName
      })
    | None
  )[],
> = {
  id: string
  tabs: {
    [N in keyof L]: MatchTabItem<L[N]>
  }
  middleSlot?: ReactNode
  isActive?: boolean
} & Pick<
  BaseTabsProps<L>,
  | "onChange"
  | "listProps"
  | "itemProps"
  | "indicatorProps"
  | "cleanupOnTabChange"
  | "hideOnSingle"
  | "isLoading"
  | "rightSlot"
>

const Segmentation = <
  L extends (
    | (TabItem<object, any> & {
        icon?: IconName
      })
    | None
  )[],
>({
  tabs,
  onChange,
  isLoading,
  id,
  listProps,
  itemProps,
  indicatorProps,
  cleanupOnTabChange,
  isActive,
  ...props
}: Props<L>) => {
  return (
    <BaseTabs
      id={id}
      isLoading={isLoading}
      tabs={tabs as never}
      onChange={onChange}
      flex={0}
      flexShrink={0}
      width="max-content"
      listProps={{
        padding: 1,
        borderRadius: "0.5rem",
        overflow: "hidden",
        backgroundColor: "neutral.light.3",
        gap: 0,
        width: "max-content",
        ...listProps,
      }}
      itemProps={{
        width: "8.75rem",
        height: "1.75rem",
        borderRadius: "0.25rem",
        gap: 2,
        alignItems: "center",
        zIndex: 1,
        whiteSpace: "nowrap",
        ...itemProps,
      }}
      indicatorProps={{
        backgroundColor: "neutral.light.2",
        borderRadius: "0.25rem",
        zIndex: 0,
        transitionProperty: "transform",
        height: "28px",
        ...indicatorProps,
      }}
      mapItem={MapItem}
      cleanupOnTabChange={cleanupOnTabChange}
      enabledIndicator
      {...props}
    >
      {tabs?.some((tab: any) => tab?.component) && (
        <BasePanels isActive={isActive} />
      )}
    </BaseTabs>
  )
}

export default memo(Segmentation) as <
  L extends (TabItem<object, any> | None)[],
>(
  props: Props<L>,
) => ReactNode
