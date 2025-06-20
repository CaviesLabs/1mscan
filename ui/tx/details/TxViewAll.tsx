import { Button } from "@chakra-ui/react"
import { route } from "nextjs-routes"
import { memo } from "react"
import LinkInternal from "ui/shared/LinkInternal"

type Props = {
  hash: string
  isLoading?: boolean
}

const TxViewAll = ({ isLoading, hash }: Props) => {
  if (isLoading) {
    return <></>
  }
  return (
    <Button
      alignSelf="flex-start"
      as={LinkInternal}
      href={route({
        pathname: "/tx/[hash]",
        query: { hash: hash, tab: "token_transfers" },
      })}
      variant="tertiary"
    >
      View all
    </Button>
  )
}

export default memo(TxViewAll, (prev, next) => {
  return prev.hash === next.hash && prev.isLoading === next.isLoading
})
