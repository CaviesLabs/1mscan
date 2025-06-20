import type { TagProps } from "@chakra-ui/react"
import { memo, useMemo } from "react"
import type { IconName } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"
import type { IIBCRelayersStatus } from "./types"

type Props = {
  status: IIBCRelayersStatus
  isLoading?: boolean
} & Partial<TagProps>

const IBCRelayersStatusTag = ({ status, isLoading, ...props }: Props) => {
  const { iconName, colorScheme, title } = useMemo<{
    iconName: IconName
    colorScheme: TagProps["colorScheme"]

    title: string
  }>(() => {
    return ((status === "opened" && {
      iconName: "status/success",
      colorScheme: "green",
      title: "Opened",
    }) ||
      (status === "closed" && {
        iconName: "status/error",
        colorScheme: "red",
        title: "Closed",
      })) as any
  }, [status])
  return (
    <Tag
      display="inline-flex"
      gap={1}
      isLoading={isLoading}
      colorScheme={colorScheme}
      {...props}
    >
      <IconSvg flexShrink={0} name={iconName} boxSize={4}></IconSvg>
      <span>{title}</span>
    </Tag>
  )
}

export default memo(IBCRelayersStatusTag, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.status === next.status
})
