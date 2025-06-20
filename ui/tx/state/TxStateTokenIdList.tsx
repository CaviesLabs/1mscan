import { Flex, Link, useBoolean } from "@chakra-ui/react"
import React from "react"
import type { TxStateChangeTokenErc721 } from "types/api/txStateChanges"

import NFTEntityV2 from "ui/shared/entities/nft/NFTEntityV2"

interface Props {
  items: TxStateChangeTokenErc721["change"]
  tokenAddress: string
  isLoading?: boolean
}

const TxStateTokenIdList = ({ items, tokenAddress, isLoading }: Props) => {
  const [isCut, setIsCut] = useBoolean(true)

  return (
    <Flex flexDir="column" rowGap={2}>
      {items.slice(0, isCut ? 3 : items.length).map((item, index) => (
        <NFTEntityV2
          key={index}
          hash={tokenAddress}
          id={item.total.token_id}
          isLoading={isLoading}
          src={item.total.instance?.metadata?.image}
        />
      ))}
      {items.length > 3 && (
        <Link
          fontWeight={400}
          textDecoration="underline dashed"
          _hover={{
            textDecoration: "underline dashed",
            color: "primary.light.3",
          }}
          onClick={setIsCut.toggle}
          pb={{ base: "5px", md: 0 }}
        >
          View {isCut ? "more" : "less"}
        </Link>
      )}
    </Flex>
  )
}

export default React.memo(TxStateTokenIdList)
