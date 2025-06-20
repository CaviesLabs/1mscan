import { Flex, Td, Text, Tr } from "@chakra-ui/react"
import { route } from "nextjs-routes"
import { useContext } from "react"
import type { Transaction } from "types/api/transaction"
import Collapse from "ui/shared/Collapse"
import LinkInternal from "ui/shared/LinkInternal"
import * as EntityBase from "ui/shared/entities/base/components"
import { TrxAssociationContext } from "./TrxAssociationProvider"

type Props = {
  tx: Pick<Transaction, "hash" | "association"> & Partial<Transaction>
  subKey?: any
}

const TrxAssociation = ({ tx, subKey }: Props) => {
  const { openingHash, isLoading } = useContext(TrxAssociationContext)
  if (!tx.hash || !tx.association) return <></>
  const isOpen = openingHash === `${tx.hash}${subKey ? "_" + subKey : ""}`

  const hash =
    (tx.association.sei_hash === tx.hash && tx.association?.evm_hash) ||
    (tx.association.evm_hash === tx.hash && tx.association?.sei_hash) ||
    ""

  return (
    <Tr borderWidth="0px">
      <Td
        colSpan={"100%" as any}
        borderTopWidth="0px"
        paddingY={!isOpen ? "0px !important" : undefined}
        transition="padding 0.2s ease-in-out"
      >
        <Collapse open={isOpen} duration={0.3}>
          <Flex alignItems="center" columnGap={1} paddingLeft="1.75rem">
            <Text color="neutral.light.5" textStyle="8125">
              Associated trx hash:
            </Text>
            {!isLoading && (
              <>
                {tx.association && (
                  <Flex alignItems="center" gap={2}>
                    <LinkInternal
                      textStyle="875"
                      href={route({
                        pathname: "/tx/[hash]",
                        query: {
                          hash,
                        },
                      })}
                    >
                      {hash}
                    </LinkInternal>
                    <EntityBase.Copy text={hash} />
                  </Flex>
                )}
                {!tx.association && (
                  <Text textStyle="875">No Associated trx hash</Text>
                )}
              </>
            )}
          </Flex>
        </Collapse>
      </Td>
    </Tr>
  )
}

export default TrxAssociation
