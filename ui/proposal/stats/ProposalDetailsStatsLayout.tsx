import { Flex, Skeleton, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"

type Props = {
  isLoading: boolean
  title: string
  children: ReactNode
}

const ProposalDetailsStatsLayout = ({ isLoading, title, children }: Props) => {
  return (
    <Flex
      gap={2}
      flexDirection="column"
      maxWidth="full"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Skeleton isLoaded={!isLoading}>
        <Text>{title}</Text>
      </Skeleton>
      {children ?? "-"}
    </Flex>
  )
}

export default ProposalDetailsStatsLayout
