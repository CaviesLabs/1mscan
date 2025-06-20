import { Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import type { IParamters } from "types/api/chain"
import CurrencyValue from "ui/shared/CurrencyValue"

import Divider from "ui/shared/Divider"
import IconSvg from "ui/shared/IconSvg"
import PageTitle from "ui/shared/Page/PageTitle"
import Utilization from "ui/shared/Utilization/Utilization"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import BinraryItem from "./BinraryItem"
import Duration from "./Duration"
import NumberWidgetList from "./NumberWidgetList"
type Props = {
  //
}

const Parameters = (props: Props & { parameters: IParamters }) => {
  const {
    tendermint_version,
    binary_version,
    ibc_version,
    cosmos_sdk_version,
    min_deposit,
    max_deposit_period,
    quorum,
    threshold,
    veto_threshold,
    voting_period,
    max_validators,
    unbonding_time,
    max_entries,
    historical_entries,
    bond_denom,
    withdraw_addr_enabled,
    community_tax,
    base_proposer_reward,
    signed_blocks_window,
    slash_fraction_downtime,
    min_signed_per_window,
    downtime_jail_duration,
    slash_fraction_double_sign,
    amount,
    pool,
    inflation,
  } = props.parameters

  const binaryInfos = [
    {
      src: "/images/cosmos.jpg",
      title: "Cosmos SDK Version",
      value: cosmos_sdk_version,
    },
    {
      src: "/images/tendermint.jpg",
      title: "Tendermint Version",
      value: tendermint_version,
    },
    {
      src: "/images/ibc.jpg",
      title: "IBC Version",
      value: ibc_version,
    },
    {
      name: "binary",
      title: "Binary Version",
      value: binary_version,
    },
  ]

  return (
    <VStack alignItems="stretch">
      <PageTitle title="Sei Network Parameters" />
      <NumberWidgetList
        amount={amount}
        pool={pool}
        inflation={inflation}
      ></NumberWidgetList>
      <VStack spacing={6} alignItems="stretch">
        <Stack spacing={3}>
          <Text
            as="h2"
            textStyle="125"
            color="neutral.light.8"
            letterSpacing="-0.0125rem"
          >
            Binary information
          </Text>

          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            padding={6}
            gap={{ base: 4, lg: 6 }}
            borderRadius="0.5rem"
            backgroundColor="neutral.light.1"
            justifyContent="space-between"
            alignItems="stretch"
            borderWidth="1px"
            borderColor="neutral.light.3"
            rounded={2}
          >
            {binaryInfos.map((item, index) => {
              return (
                <>
                  {index !== 0 && (
                    <Divider
                      mode="unset"
                      orientation={{ base: "horizontal", lg: "vertical" }}
                    ></Divider>
                  )}
                  <BinraryItem
                    key={item.title}
                    flex={1}
                    {...(item as any)}
                  ></BinraryItem>
                </>
              )
            })}
          </Flex>
        </Stack>

        <Flex
          alignItems="stretch"
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
        >
          <VStack spacing={3} flex={1} alignItems="flex-start">
            <Text
              as="h2"
              textStyle="125"
              color="neutral.light.8"
              letterSpacing="-0.0125rem"
            >
              Governance parameters
            </Text>
            <DetailsInfoGroup flex={1}>
              <InfoItem displayPadding="none" title="Min deposit">
                <CurrencyValue
                  value={min_deposit}
                  decimals={6}
                  currency="SEI"
                ></CurrencyValue>
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Max deposit period"
                gap={2}
              >
                <Duration value={max_deposit_period}></Duration>
              </InfoItem>

              <InfoItem displayPadding="none" title="Voting period" gap={2}>
                <Duration value={voting_period}></Duration>
              </InfoItem>

              <InfoItem displayPadding="none" title="Quorum" gap={2}>
                <Utilization
                  colorScheme="red"
                  width={{ base: "full", lg: "max-content" }}
                  value={quorum}
                  columnGap={3}
                  labelProps={{
                    textStyle: "1",
                  }}
                  barProps={{
                    width: {
                      base: "full",
                      lg: "7.5rem",
                    },
                  }}
                ></Utilization>
              </InfoItem>

              <InfoItem displayPadding="none" title="Threshold" gap={2}>
                <Utilization
                  colorScheme="red"
                  width={{ base: "full", lg: "max-content" }}
                  value={threshold}
                  columnGap={3}
                  labelProps={{
                    textStyle: "1",
                  }}
                  barProps={{
                    width: {
                      base: "full",
                      lg: "7.5rem",
                    },
                  }}
                ></Utilization>
              </InfoItem>

              <InfoItem displayPadding="none" title="Veto Threshold" gap={2}>
                <Utilization
                  colorScheme="red"
                  width={{ base: "full", lg: "max-content" }}
                  value={veto_threshold}
                  columnGap={3}
                  labelProps={{
                    textStyle: "1",
                  }}
                  barProps={{
                    width: {
                      base: "full",
                      lg: "7.5rem",
                    },
                  }}
                ></Utilization>
              </InfoItem>
            </DetailsInfoGroup>
          </VStack>

          <VStack spacing={3} flex={1} alignItems="flex-start">
            <Text
              as="h2"
              textStyle="125"
              color="neutral.light.8"
              letterSpacing="-0.0125rem"
            >
              Distribution parameters
            </Text>
            <DetailsInfoGroup flex={1}>
              <InfoItem displayPadding="none" title="Withdraw address enabled">
                <Text
                  textStyle="1"
                  color={
                    (withdraw_addr_enabled === true && "secondary.02.text") ||
                    (withdraw_addr_enabled === false && "secondary.05.text") ||
                    undefined
                  }
                >
                  {String(withdraw_addr_enabled || "").capitalizeFirstLetter()}
                </Text>
              </InfoItem>

              <InfoItem displayPadding="none" title="Community tax" gap={2}>
                {BigNumber(community_tax || 0).isGreaterThan(0)
                  ? BigNumber(community_tax).toFormat()
                  : "-"}
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Base proposer reward"
                gap={2}
              >
                {BigNumber(base_proposer_reward || 0).isGreaterThan(0)
                  ? BigNumber(base_proposer_reward).toFormat()
                  : "-"}
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Bonus proposer reward"
                gap={2}
              >
                {BigNumber(community_tax || 0).isGreaterThan(0)
                  ? BigNumber(community_tax).toFormat()
                  : "-"}
              </InfoItem>
            </DetailsInfoGroup>
          </VStack>
        </Flex>

        <Flex
          alignItems="stretch"
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
        >
          <VStack spacing={3} flex={1} alignItems="flex-start">
            <Text
              as="h2"
              textStyle="125"
              color="neutral.light.8"
              letterSpacing="-0.0125rem"
            >
              Slashing parameters
            </Text>
            <DetailsInfoGroup flex={1}>
              <InfoItem displayPadding="none" title="Signed block window">
                {BigNumber(signed_blocks_window || 0).isGreaterThan(0)
                  ? BigNumber(signed_blocks_window).toFormat()
                  : "-"}
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Downtime jail duration"
                gap={2}
              >
                <Duration value={downtime_jail_duration}></Duration>
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Min signed per window"
                gap={2}
              >
                <Utilization
                  colorScheme="red"
                  width={{ base: "full", lg: "max-content" }}
                  value={min_signed_per_window}
                  columnGap={3}
                  labelProps={{
                    textStyle: "1",
                  }}
                  barProps={{
                    width: {
                      base: "full",
                      lg: "7.5rem",
                    },
                  }}
                ></Utilization>
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Slash fraction double sign"
              >
                {BigNumber(slash_fraction_double_sign || 0).isGreaterThan(0)
                  ? BigNumber(slash_fraction_double_sign).toFormat()
                  : "-"}
              </InfoItem>

              <InfoItem displayPadding="none" title="Slash fraction downtime">
                {BigNumber(slash_fraction_downtime || 0).isGreaterThan(0)
                  ? BigNumber(slash_fraction_downtime).toFormat()
                  : "-"}
              </InfoItem>
            </DetailsInfoGroup>
          </VStack>

          <VStack spacing={3} flex={1} alignItems="flex-start">
            <Text
              as="h2"
              textStyle="125"
              color="neutral.light.8"
              letterSpacing="-0.0125rem"
            >
              Staking parameters
            </Text>
            <DetailsInfoGroup flex={1}>
              <InfoItem displayPadding="none" title="Max validators">
                <HStack gap={2}>
                  <IconSvg
                    boxSize={4}
                    color="neutral.light.5"
                    name="user"
                  ></IconSvg>

                  <span>{BigNumber(max_validators || 0).toFormat()}</span>
                </HStack>
              </InfoItem>

              <InfoItem displayPadding="none" title="Unbonding time" gap={2}>
                <Duration value={unbonding_time}></Duration>
              </InfoItem>

              <InfoItem displayPadding="none" title="Max enteries" gap={2}>
                {BigNumber(max_entries || 0).toFormat()}
              </InfoItem>

              <InfoItem
                displayPadding="none"
                title="Historical enteries"
                gap={2}
              >
                {BigNumber(historical_entries || 0).toFormat()}
              </InfoItem>

              <InfoItem displayPadding="none" title="Bond denom" gap={2}>
                {bond_denom.toUpperCase()}
              </InfoItem>
            </DetailsInfoGroup>
          </VStack>
        </Flex>
      </VStack>
    </VStack>
  )
}

export default Parameters
