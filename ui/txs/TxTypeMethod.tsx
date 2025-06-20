import { HStack, VStack } from "@chakra-ui/react"
import _, { snakeCase } from "lodash"
import { memo, useMemo } from "react"
import type { TransactionType } from "types/api/transaction"
import PopoverShow from "ui/shared/PopoverModal/PopoverShow"
import Tag from "ui/shared/chakra/Tag"
import TxType from "./TxType"
import { extractTransactionType } from "./utils"

type Props = {
  tx_types?: TransactionType[] | TransactionType | null | undefined
  method?: string | null | undefined
  isLoading?: boolean
}

const TxTypeMethod = ({ tx_types, method, isLoading }: Props) => {
  const items = useMemo(
    () =>
      _.chain(tx_types)
        .castArray()
        .tap((items) => {
          if (method) {
            items.push(method)
          }
        })
        .map((value) =>
          _.chain(extractTransactionType(value as any))
            .thru(({ label, colorScheme }) => ({
              label,
              colorScheme,
              id: `${snakeCase(label)}-${colorScheme}`,
            }))
            .value(),
        )
        .unionBy("id")
        .thru((allItems) => {
          const first = allItems.shift()

          return {
            first: first,
            others: allItems,
          }
        })
        .value(),
    [tx_types, method],
  )

  return (
    <HStack spacing={1}>
      {items.first?.id ? (
        <TxType
          isLoading={isLoading}
          label={items.first?.label}
          colorScheme={items.first?.colorScheme}
        ></TxType>
      ) : (
        <>-</>
      )}

      {Boolean(items.others.length) && (
        <PopoverShow
          isDisabled={!items.others.length || isLoading}
          content={
            <VStack
              spacing={2}
              alignItems="stretch"
              paddingX={2}
              paddingY={1}
              borderRadius="0.5rem"
              maxHeight="10rem"
              overflowY="auto"
            >
              {items.others.map((item) => (
                <TxType
                  key={item.id}
                  isLoading={isLoading}
                  label={item.label}
                  width="full"
                  colorScheme={item.colorScheme}
                  variant="outline"
                ></TxType>
              ))}
            </VStack>
          }
        >
          <Tag
            isLoading={isLoading}
            sx={{
              _hover: {
                borderColor: "secondary.04",
                _groupHover: {
                  borderColor: "secondary.04",
                },
              },
              // _groupHover: {
              //   borderColor: "neutral.light.3",
              //   _hover: {
              //     borderColor: "secondary.04",
              //   },
              // },
            }}
          >
            +{items.others.length}
          </Tag>
        </PopoverShow>
      )}
    </HStack>
  )
}

export default memo(TxTypeMethod, (prev, next) => {
  return (
    prev.tx_types === next.tx_types &&
    prev.method === next.method &&
    prev.isLoading === next.isLoading
  )
})
