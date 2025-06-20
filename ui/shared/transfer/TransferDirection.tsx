import { Flex, type FlexProps } from "@chakra-ui/react"
import _ from "lodash"
import { type ReactElement, type ReactNode, memo, useMemo } from "react"
import type { TransactionType } from "types/api/transaction"
import type { OSType } from "types/base"
import FromTo from "../FromTo"
import Tag from "../chakra/Tag"
import AddressV2 from "../entities/address/AddressEntityV2"

type Props<
  T extends {
    hash: string
  } = { hash: string },
> = {
  isLoading?: boolean
  from: T | undefined | null
  to: T | undefined | null
  current?: string
  tx_types?: TransactionType[] | TransactionType | null | undefined
  method?: string | null | undefined
  osType?: OSType
  direction?: "in" | "out" | "self" | "down" | undefined
  fallback?: ReactNode
} & Omit<FlexProps, "direction">

const TransferDirection = <T extends { hash: string } = { hash: string }>({
  isLoading,
  from,
  to,
  current,
  direction: _direction,
  osType,
  fallback = "-",
  ...props
}: Props<T>) => {
  const direction = useMemo(() => {
    if (_direction) return _direction
    if (!from?.hash || !to?.hash) return undefined
    const _from = from.hash.toLowerCase()
    const _to = to.hash.toLowerCase()
    const _current = current?.toLowerCase()
    if (_from === _current && _to === _current) return "self"
    if (_from === _current) return "out"
    if (_to === _current) return "in"
    return undefined
  }, [from?.hash, to?.hash, current])

  const isMint = useMemo(() => {
    return (
      props.tx_types === "mint" ||
      props.tx_types?.includes("mint") ||
      props.method === "mint"
    )
  }, [props.tx_types, props.method])
  return (
    <Flex alignItems="center" gap={2} isTruncated {...props}>
      {(direction === "in" && (
        <Tag
          isLoading={isLoading}
          textAlign="center"
          width="2.5rem"
          textStyle="875"
          paddingX={0}
          flexShrink={0}
          colorScheme="green"
        >
          IN
        </Tag>
      )) ||
        (direction === "out" && (
          <Tag
            isLoading={isLoading}
            textAlign="center"
            width="2.5rem"
            textStyle="875"
            paddingX={0}
            flexShrink={0}
            colorScheme="orange"
          >
            OUT
          </Tag>
        )) ||
        (direction === "self" && (
          <Tag
            isLoading={isLoading}
            textAlign="center"
            width="2.5rem"
            textStyle="875"
            paddingX={0}
            flexShrink={0}
            colorScheme="blue"
          >
            SELF
          </Tag>
        )) ||
        (direction === "down" && <FromTo isLoading={isLoading} />) || (
          <Tag
            isLoading={isLoading}
            textAlign="center"
            width="2.5rem"
            textStyle="875"
            paddingX={0}
            flexShrink={0}
            display="inline-block"
            overflow="hidden"
            colorScheme="whiteAlpha"
          >
            {"   "}
          </Tag>
        )}
      <Flex
        flexDirection="column"
        flex={1}
        gap={1}
        alignItems="stretch"
        isTruncated
        _empty={{
          display: "none",
        }}
      >
        {_.chain<ReactElement>([])
          .tap((childrens) => {
            if (from) {
              childrens.push(
                <AddressV2
                  key="from"
                  address={
                    isMint
                      ? {
                          name: "Minted",
                          hash: "",
                        }
                      : from
                  }
                  isLoading={isLoading}
                  textStyle="875"
                  noIcon={isMint}
                  noLink={direction === "out" || direction === "self" || isMint}
                />,
              )
            }
            if (to && osType !== "Cosmos") {
              childrens.push(
                <AddressV2
                  key="to"
                  address={to}
                  isLoading={isLoading}
                  textStyle="875"
                  showWarning="burn"
                  noLink={direction === "in" || direction === "self"}
                />,
              )
            }
          })
          .thru((childrens) => {
            if (!childrens.length) return <>{fallback}</>
            return <>{childrens}</>
          })
          .value()}
      </Flex>
    </Flex>
  )
}

export default memo(TransferDirection)
