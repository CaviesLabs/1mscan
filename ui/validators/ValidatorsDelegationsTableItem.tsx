import { Button, Td, Tr } from "@chakra-ui/react"
import { SEI_APP_IO } from "configs/shared/seiio"
import { getLanguage } from "languages/useLanguage"
import { currentChainConfig } from "lib/hooks/useCurrentChain"
import moment from "moment"
import { memo, useMemo } from "react"
import type { IDelegationType, IValidatorDelegation } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import LinkExternal from "ui/shared/LinkExternal"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  item: IValidatorDelegation
  isLoading?: boolean
  type: Extract<IDelegationType, "delegate" | "unbond">
}

const ValidatorsDelegationsTableItem = ({ item, isLoading, type }: Props) => {
  const validator = useMemo(() => {
    return type === "delegate" ? item.validator_dst : item.validator_src
  }, [item.validator_dst, item.validator_src])

  return (
    <Tr role="group">
      <Td>
        <AddressEntityV2
          address={{
            hash: validator.operator_address,
            name: validator.name,
            image_url: validator.image_url,
          }}
          iconProps={{
            boxSize: "2.5rem",
          }}
          nameProps={{
            textStyle: "87500",
          }}
          hashProps={{
            color: "neutral.light.6",
          }}
          isLoading={isLoading}
          isValidator
          showAddress
          copyProps={{
            wrapperProps: {
              alignSelf: "flex-end",
            },
          }}
        />
      </Td>
      <Td>
        <AddressEntityV2
          address={{
            hash: item.delegator_address,
          }}
          isLoading={isLoading}
          noIcon
          noName
        />
      </Td>
      <Td textAlign="right">
        <CurrencyValue
          isLoading={isLoading}
          color={
            (item.type === "delegate" && "secondary.02.text") ||
            (item.type === "unbond" && "secondary.05.text") ||
            undefined
          }
          prefix={
            (item.type === "delegate" && "+") ||
            (item.type === "unbond" && "-") ||
            undefined
          }
          value={item.amount}
          decimals={6}
          currency="SEI"
          keepIntegerPart
        />
      </Td>
      <Td>
        <TxEntityV2
          maxWidth="10rem"
          hash={item.transaction_hash}
          isLoading={isLoading}
        />
      </Td>
      <Td textAlign="right">
        <SkeletonText isLoading={isLoading} color="neutral.light.7">
          {moment(item.block_timestamp).fromNow()}
        </SkeletonText>
      </Td>

      <Td textAlign="right">
        <Button
          as={LinkExternal}
          isLoading={isLoading}
          variant="subtle"
          paddingX={2}
          paddingY="0.38rem"
          href={`${SEI_APP_IO[currentChainConfig?.networkType]}/stake/${
            validator.operator_address
          }`}
          _hover={{ textDecoration: "none", color: "inherit" }}
          noIcon
        >
          {getLanguage("validators_page.delegate")}
        </Button>
      </Td>
    </Tr>
  )
}

export default memo(ValidatorsDelegationsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
