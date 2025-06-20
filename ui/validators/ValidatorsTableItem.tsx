import { Button, Flex, Skeleton, Td, Text, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { SEI_APP_IO } from "configs/shared/seiio"
import { getLanguage } from "languages/useLanguage"
import { currentChainConfig } from "lib/hooks/useCurrentChain"
import _ from "lodash"
import { memo } from "react"
import type { ValidatorWithAdditionalInfo } from "types/api/validator"
import CurrencyValue from "ui/shared/CurrencyValue"
import LinkExternal from "ui/shared/LinkExternal"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  item: ValidatorWithAdditionalInfo
  isLoading?: boolean
}

const ValidatorsTableItem = ({ item, isLoading }: Props) => {
  return (
    <Tr role="group">
      <Td>
        <AddressEntityV2
          address={{
            hash: item.operator_address,
            name: item.name,
            image_url: item.image_url,
          }}
          iconProps={{
            boxSize: "2.5rem",
          }}
          nameProps={{
            textStyle: "87500",
          }}
          isLoading={isLoading}
          isValidator
          showAddress
          copyProps={{
            wrapperProps: {
              alignSelf: "flex-end",
            },
          }}
          // tooltipProps={{ placement: "right" }}
        />
      </Td>
      <Td textAlign="right" paddingRight="1.25rem !important">
        <Flex flexDirection="column" gap="0.125rem" alignItems="flex-end">
          <SkeletonText isLoading={isLoading} color="neutral.light.7">
            {BigNumber(item.voting_power_amount).toFormat(4)}
          </SkeletonText>
          <SkeletonText isLoading={isLoading} color="neutral.light.6">
            {item.voting_power_percentage}
          </SkeletonText>
        </Flex>
      </Td>
      <Td textAlign="right" paddingRight="1.25rem !important">
        <CurrencyValue
          float="right"
          value={item.apr}
          decimals={0}
          currency="%"
          stickyCurrency={false}
          isLoading={isLoading}
          keepIntegerPart
        />
      </Td>
      <Td textAlign="right" paddingRight="1.25rem !important">
        {_.chain(item.commission || "")
          .thru((commision) => Number(commision.match(/[\d.]+/)))
          .thru((commission) => (
            <CurrencyValue
              isLoading={isLoading}
              value={commission}
              decimals={0}
              currency="%"
              stickyCurrency={false}
              keepIntegerPart
            />
          ))
          .value()}
      </Td>
      <Td textAlign="right" paddingRight="1.25rem !important">
        <Flex flexDirection="column" gap="0.125rem" alignItems="flex-end">
          <Skeleton isLoaded={!isLoading}>
            <Text variant="light7">
              {Number(item.participation_percentage.replace("%", ""))
                ? item.participation_percentage
                : "0%"}
            </Text>
          </Skeleton>
          <SkeletonText isLoading={isLoading} color="neutral.light.6">
            {item.participation_ratio}
          </SkeletonText>
        </Flex>
      </Td>
      <Td textAlign="right" paddingRight="1.25rem !important">
        <SkeletonText isLoading={isLoading} color="neutral.light.7">
          {item.uptime}
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
            item.operator_address
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

export default memo(ValidatorsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
