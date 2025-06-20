import { Stack, Td, Tr } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { memo, useMemo } from "react"
import type {
  IDelegationType,
  IValidatorBondedChange,
} from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  item: IValidatorBondedChange
  isLoading?: boolean
  hash: string
  type: IDelegationType
}

const ValidatorBondedChangeTableItem = ({
  item,
  isLoading,
  hash,
  type,
}: Props) => {
  const timeAgo = useTimeAgoIncrement(item.block_timestamp)

  const direction = useMemo(() => {
    if (isLoading) {
      return
    }

    const direction =
      (type === "delegate" && "delegate") ||
      (type === "unbond" && "unbond") ||
      (type === "redelegate" &&
        ((item.validator_dst.operator_address?.toLowerCase() ===
          hash.toLowerCase() &&
          "delegate") ||
          (item.validator_src.operator_address?.toLowerCase() ===
            hash.toLowerCase() &&
            "unbond"))) ||
      undefined

    return direction
  }, [isLoading, type, hash])

  return (
    <Tr role="group">
      <Td>
        <Stack gap={1} overflow="hidden" maxWidth="8rem">
          <TxEntityV2
            hash={item.transaction_hash}
            isLoading={isLoading}
            maxWidth="100%"
          />
          {item.block_timestamp && (
            <SkeletonText
              color="neutral.light.5"
              textStyle="8125"
              isLoading={isLoading}
            >
              {timeAgo}
            </SkeletonText>
          )}
        </Stack>
      </Td>

      <Td>
        <AddressEntityV2
          address={{
            hash: item.delegator_address,
          }}
          isLoading={isLoading}
          noName
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          color={
            (direction === "delegate" && "secondary.02.text") ||
            (direction === "unbond" && "secondary.05.text") ||
            undefined
          }
          value={item.amount}
          decimals={6}
          prefix={
            (direction === "delegate" && "+") ||
            (direction === "unbond" && "-") ||
            undefined
          }
          currency="SEI"
          isLoading={isLoading}
          keepIntegerPart
        />
      </Td>
    </Tr>
  )
}

export default memo(ValidatorBondedChangeTableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item === next.item &&
    prev.hash === next.hash &&
    prev.type === next.type
  )
})
