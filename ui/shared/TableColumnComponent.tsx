import { Skeleton, Td, Text, chakra } from "@chakra-ui/react"
import type { Route } from "nextjs-routes"
import { route as directRoute } from "nextjs-routes"
import type { ReactNode } from "react"
import LinkInternal from "./LinkInternal"
import TruncatedTextTooltip from "./truncate/TruncatedTextTooltip"

type Props = {
  isLoading: boolean
}

export const TableColumnText = ({
  color,
  value,
  isLoading,
}: {
  value: ReactNode
  color?: string
} & Props) => {
  return (
    <Td>
      <Skeleton isLoaded={!isLoading}>
        <TruncatedTextTooltip label={value}>
          <Text color={color ?? "neutral.light.7"} isTruncated fontSize="14px">
            {value}
          </Text>
        </TruncatedTextTooltip>
      </Skeleton>
    </Td>
  )
}

export const TableColumnView = ({
  isLoading,
  route,
  onClick,
}: { route?: Route; onClick?: () => void } & Props) => {
  const props: any = {}

  if (route) {
    props["href"] = directRoute(route)
    return (
      <Td>
        <LinkInternal isLoading={isLoading} {...props}>
          View
        </LinkInternal>
      </Td>
    )
  }

  if (onClick) {
    return (
      <Td>
        <Skeleton isLoaded={!isLoading}>
          <chakra.button
            color="accent.blue"
            _hover={{
              textDecoration: "underline",
            }}
            onClick={onClick}
          >
            View
          </chakra.button>
        </Skeleton>
      </Td>
    )
  }

  return <Td></Td>
}
