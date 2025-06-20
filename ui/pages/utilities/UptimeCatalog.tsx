import { HStack, Skeleton, Text } from "@chakra-ui/react"
import { memo } from "react"
import UptimeBlock from "./UptimeBlock"
import type { IBlockUptimeStatus } from "./types"

type Props = {
  isLoading?: boolean
}

const Item = ({
  status,
  isLoading,
}: {
  status: IBlockUptimeStatus
  isLoading?: boolean
}) => {
  return (
    <HStack spacing={2}>
      <UptimeBlock
        noTooltip
        blockHeight="0"
        status={status}
        isLoading={isLoading}
        _last={{ animation: "none" }}
      />
      <Skeleton isLoaded={!isLoading}>
        <Text>{status.capitalizeFirstLetter()}</Text>
      </Skeleton>
    </HStack>
  )
}

const UptimeCatalog = ({ isLoading }: Props) => {
  return (
    <HStack spacing={8}>
      <Item status="signed" isLoading={isLoading}></Item>
      <Item status="proposed" isLoading={isLoading}></Item>
      <Item status="missed" isLoading={isLoading}></Item>
    </HStack>
  )
}

export default memo(UptimeCatalog, (prev, next) => {
  return prev.isLoading === next.isLoading
})
