import { Divider, Flex } from "@chakra-ui/react"
import { memo } from "react"
import type { NativeMessageEvent } from "types/api/transaction"
import TxMessageEventItem from "./TxMessageEventItem"

type Props = {
  events: NativeMessageEvent[]
}

const TxMessageEvent = ({ events }: Props) => {
  return (
    <Flex
      flexDirection="column"
      width="full"
      gap={4}
      marginTop={6}
      padding={5}
      borderRadius="0.5rem"
      borderWidth="1px"
      borderColor="neutral.light.3"
      backgroundColor="neutral.light.2"
    >
      {events.map((event, index) => {
        return (
          <>
            {index !== 0 && <Divider variant="horizontal" />}
            <TxMessageEventItem event={event} />
          </>
        )
      })}
    </Flex>
  )
}

export default memo(TxMessageEvent, (prev, next) => {
  return prev.events === next.events
})
