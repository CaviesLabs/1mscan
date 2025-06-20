import { Flex, HStack, Text, chakra } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import getBlockReward from "lib/block/getBlockReward"
import { WEI } from "lib/consts"
import moment from "lib/date/moment"
import { useSetQuery } from "lib/router/useSetQuery"
import _, { isNil } from "lodash"
import { route } from "nextjs-routes"
import { memo } from "react"
import type { Block } from "types/api/block"
import CurrencyValue from "ui/shared/CurrencyValue"
import Divider from "ui/shared/Divider"
import GasUsedToTargetRatio from "ui/shared/GasUsedToTargetRatio"
import IconSvg from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"
import Utilization from "ui/shared/Utilization/Utilization"
import CopyToClipboardAsync from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"
import { TruncatedTextDynamic } from "ui/shared/truncate"

type Props = {
  heightOrHash: string
  isLoading: boolean
  block: Block | undefined
}

const BlockDetails = ({
  heightOrHash,
  isLoading: _isLoading,
  block,
}: Props) => {
  const setBlockQuery = useSetQuery("height_or_hash", {
    throttle: 500,
    cleanUp: { keepQueries: [] },
  })

  if (isNil(block)) {
    return <></>
  }

  const isLoading = _isLoading
  return (
    <Flex gap="1.25rem" flexDirection="column">
      <DetailsInfoGroup
        backgroundColor="neutral.light.1"
        contentProps={{
          color: "neutral.light.7",
        }}
      >
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          _first={{
            marginTop: 0,
          }}
          title={getLanguage(
            "block_details_page.details_tab_content.block_height",
          )}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.a_block_producer_who_successfully_included_the_block_onto_the_blockchain",
          )}
          isLoading={isLoading}
          contentProps={{
            gap: 2,
          }}
        >
          <SkeletonText isLoading={isLoading}>
            {block.height}{" "}
            {block.height === 0 && (
              <chakra.span whiteSpace="pre">
                {" "}
                -{" "}
                {getLanguage(
                  "block_details_page.details_tab_content.genesis_block",
                )}
              </chakra.span>
            )}
          </SkeletonText>

          <HStack spacing={0}>
            <IconSvg
              isLoading={isLoading}
              name="arrows/east-single-left"
              boxSize={8}
              onClick={() => {
                setBlockQuery(Math.max(0, block.height - 1))
              }}
              cursor="pointer"
            />
            <IconSvg
              isLoading={isLoading}
              name="arrows/east-single-right"
              boxSize={8}
              onClick={() => {
                setBlockQuery(block.height + 1)
              }}
              cursor="pointer"
            />
          </HStack>
        </InfoItem>
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          title={getLanguage("block_details_page.details_tab_content.size")}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.size_of_the_block_in_bytes",
          )}
          isLoading={isLoading}
        >
          <SkeletonText isLoading={isLoading}>
            {block.size.toLocaleString()}
          </SkeletonText>
        </InfoItem>
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          title={getLanguage(
            "block_details_page.details_tab_content.timestamp",
          )}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.date_time_at_which_block_was_produced",
          )}
          isLoading={isLoading}
        >
          <HStack rowGap={1} columnGap={3} flexWrap="wrap" overflow="hidden">
            <IconSvg
              name="clock"
              boxSize={4}
              color="neutral.light.5"
              isLoading={isLoading}
              flexShrink={0}
            />
            <SkeletonText isLoading={isLoading}>
              {moment(block.timestamp).fromNow()}
            </SkeletonText>
            <Divider
              isLoading={isLoading}
              width="1px"
              flexShrink={0}
              display={{ base: "none", lg: "block" }}
              alignSelf="stretch"
              height="unset"
            />
            <SkeletonText
              isLoading={isLoading}
              overflow="hidden"
              isTruncated
              display="inline-block"
            >
              {moment(block.timestamp).format("llll")}
            </SkeletonText>
          </HStack>
        </InfoItem>

        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          title={getLanguage(
            "block_details_page.details_tab_content.transactions",
          )}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.the_number_of_transactions_in_the_block",
          )}
          isLoading={isLoading}
        >
          <SkeletonText isLoading={isLoading}>
            <LinkInternal
              href={route({
                pathname: "/block/[height_or_hash]",
                query: { height_or_hash: heightOrHash, tab: "transactions" },
              })}
            >
              {block.tx_count}{" "}
              {getLanguage(
                "block_details_page.details_tab_content.transaction_s",
                {
                  metadata: { plural: block.tx_count === 1 ? "" : "s" },
                },
              )}
            </LinkInternal>
          </SkeletonText>
        </InfoItem>
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          title={getLanguage(
            "block_details_page.details_tab_content.validated_by",
          )}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.a_block_producer_who_successfully_included_the_block_onto_the_blockchain",
          )}
          isLoading={isLoading}
        >
          <AddressV2
            isValidator
            textStyle="1"
            isLoading={isLoading}
            address={{
              ...block.miner,
              name: block.miner.validator_data?.description?.moniker || "",
              hash: block.miner.validator_data?.operator_address || "",
              image_url: block.miner.validator_data?.image_url,
            }}
          />
          {/* api doesn't return the block processing time yet */}
          {/* <Text>{ moment.duration(block.minedIn, 'second').humanize(true) }</Text> */}
        </InfoItem>
        {_.chain(block)
          .thru((block) => {
            if (!block) return
            return getBlockReward(block)
          })
          .thru(({ totalReward, staticReward, burntFees, txFees }) => {
            return _.chain(null)
              .thru(() => {
                if (!totalReward.gt(0) || !txFees.gt(0) || !burntFees.gt(0)) {
                  return <span>-</span>
                }
                return (
                  <HStack flexShrink={0} color="neutral.light.5" spacing={1}>
                    <TooltipV2
                      label={getLanguage(
                        "block_details_page.details_tab_content.static_block_reward",
                      )}
                    >
                      <SkeletonText
                        isLoading={isLoading}
                        whiteSpace="pre-line"
                        flexShrink={0}
                      >
                        {staticReward.toFormat()}
                      </SkeletonText>
                    </TooltipV2>

                    <SkeletonText isLoading={isLoading}>+</SkeletonText>

                    <TooltipV2
                      label={getLanguage(
                        "block_details_page.details_tab_content.txn_fees",
                      )}
                    >
                      <SkeletonText
                        isLoading={isLoading}
                        whiteSpace="pre-line"
                        flexShrink={0}
                      >
                        {txFees.toFormat()}
                      </SkeletonText>
                    </TooltipV2>
                  </HStack>
                )
              })
              .thru((children) => {
                return (
                  <InfoItem
                    titleProps={{
                      width: {
                        base: "full",
                        lg: "15rem",
                      },
                      flexShrink: 0,
                    }}
                    title={getLanguage(
                      "block_details_page.details_tab_content.block_reward",
                    )}
                    displayDivider="block"
                    hint={getLanguage(
                      "block_details_page.details_tab_content.for_each_block_the_validator_is_rewarded_with_a_finite_amount_of_sei_on_top_of_the_fees_paid_for_all_transactions_in_the_block",
                    )}
                    isLoading={isLoading}
                  >
                    <Flex
                      alignItems="flex-end"
                      columnGap={2}
                      rowGap={0}
                      flexWrap="wrap"
                      overflow="hidden"
                    >
                      <SkeletonText isLoading={isLoading} whiteSpace="pre-line">
                        {totalReward.toFormat()} SEI
                      </SkeletonText>
                      {children}
                    </Flex>
                  </InfoItem>
                )
              })
              .value()
          })
          .value()}

        {_.chain(block.rewards)
          ?.filter(
            ({ type }) =>
              type !== "Validator Reward" && type !== "Miner Reward",
          )
          .map(({ type, reward }) => (
            <InfoItem
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
                flexShrink: 0,
              }}
              key={type}
              title={type}
              displayDivider="block"
              // is this text correct for validators?
              hint={getLanguage(
                "block_details_page.details_tab_content.amount_of_distributed_reward_validators_receive_a_static_block_reward_tx_fees_uncle_fees",
              )}
            >
              {`${BigNumber(reward).dividedBy(WEI).toFormat() ?? "-"} SEI`}
            </InfoItem>
          ))
          .value()}
      </DetailsInfoGroup>

      <DetailsInfoGroup
        backgroundColor="neutral.light.1"
        contentProps={{
          color: "neutral.light.7",
        }}
      >
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          _first={{
            marginTop: 0,
          }}
          title={getLanguage(
            "block_details_page.details_tab_content.gas_usage",
          )}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.the_total_gas_amount_used_in_the_block_and_its_percentage_of_gas_filled_in_the_block",
          )}
          isLoading={isLoading}
        >
          <SkeletonText isLoading={isLoading}>
            <Text as="span">{BigNumber(block.gas_used || 0).toFormat()}</Text>
          </SkeletonText>
          <Utilization
            flex={1}
            maxWidth="6rem"
            width="unset"
            colorScheme="gray"
            display="flex"
            whiteSpace="nowrap"
            isLoading={isLoading}
            value={BigNumber(block.gas_used || 0).dividedBy(
              BigNumber(block.gas_limit),
            )}
          />
          {Boolean(block.gas_target_percentage) && (
            <>
              <Divider
                isLoading={isLoading}
                alignSelf="stretch"
                height="unset"
                width="1px"
                flexShrink={0}
              />
              <GasUsedToTargetRatio
                value={block.gas_target_percentage}
                isLoading={isLoading}
              />
            </>
          )}
        </InfoItem>

        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          title={getLanguage(
            "block_details_page.details_tab_content.gas_limit",
          )}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.total_gas_limit_provided_by_all_transactions_in_the_block",
          )}
          isLoading={isLoading}
        >
          <SkeletonText isLoading={isLoading}>
            {BigNumber(block.gas_limit).toFormat()}
          </SkeletonText>
        </InfoItem>
        {block.minimum_gas_price && (
          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
              flexShrink: 0,
            }}
            title={getLanguage(
              "block_details_page.details_tab_content.minimum_gas_price",
            )}
            displayDivider="block"
            hint={getLanguage(
              "block_details_page.details_tab_content.the_minimum_gas_price_a_transaction_should_have_in_order_to_be_included_in_this_block",
            )}
            isLoading={isLoading}
          >
            <CurrencyValue
              isLoading={isLoading}
              value={block.minimum_gas_price}
              decimals={WEI}
              accuracy="full"
              currency="nsei"
            />
          </InfoItem>
        )}
        {block.base_fee_per_gas && (
          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
              flexShrink: 0,
            }}
            title={getLanguage(
              "block_details_page.details_tab_content.base_fee_per_gas",
            )}
            displayDivider="block"
            hint={getLanguage(
              "block_details_page.details_tab_content.minimum_fee_required_per_unit_of_gas_fee_adjusts_based_on_network_congestion",
            )}
            isLoading={isLoading}
          >
            <HStack flex={1} gap={2} flexWrap="wrap">
              <CurrencyValue
                flexShrink={0}
                isLoading={isLoading}
                value={block.base_fee_per_gas}
                accuracy="full"
                decimals={18}
                currency="SEI"
              />

              <CurrencyValue
                flexShrink={0}
                isLoading={isLoading}
                value={block.base_fee_per_gas}
                accuracy="full"
                decimals={9}
                currency="nsei"
              />

              <CurrencyValue
                flexShrink={0}
                isLoading={isLoading}
                value={block.base_fee_per_gas}
                accuracy="full"
                decimals={18}
                hideValue
                autoPrice
                usdHasParenthesis
                usdProps={{
                  textStyle: "1",
                  color: "neutral.light.5",
                }}
              />
            </HStack>
          </InfoItem>
        )}
      </DetailsInfoGroup>

      {/* ADDITIONAL INFO */}
      <DetailsInfoGroup backgroundColor="neutral.light.1">
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
            flexShrink: 0,
          }}
          _first={{
            marginTop: 0,
          }}
          title={getLanguage("block_details_page.details_tab_content.hash")}
          displayDivider="block"
          hint={getLanguage(
            "block_details_page.details_tab_content.the_sha256_hash_of_the_block",
          )}
          isLoading={isLoading}
        >
          <TruncatedTextDynamic
            textStyle="875"
            isLoading={isLoading}
            // headLength={6}
            tailLength={6}
          >
            {block.hash}
          </TruncatedTextDynamic>
          <CopyToClipboardAsync
            wrapperProps={{
              flexShrink: 0,
            }}
            isLoading={isLoading}
            setValue={() => block.hash}
          />
        </InfoItem>

        {block.height > 0 && (
          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
              flexShrink: 0,
            }}
            title={getLanguage(
              "block_details_page.details_tab_content.parent_hash",
            )}
            displayDivider="block"
            isLoading={isLoading}
            hint={getLanguage(
              "block_details_page.details_tab_content.the_hash_of_the_block_from_which_this_block_was_generated",
            )}
          >
            <LinkInternal
              href={route({
                pathname: "/block/[height_or_hash]",
                query: { height_or_hash: String(block.height - 1) },
              })}
              overflow="hidden"
              whiteSpace="normal"
              // flex={1}
              isLoading={isLoading}
            >
              <TruncatedTextDynamic
                textStyle="875"
                // headLength={6}
                tailLength={6}
              >
                {block.parent_hash}
              </TruncatedTextDynamic>
            </LinkInternal>
            <CopyToClipboardAsync
              wrapperProps={{
                flexShrink: 0,
              }}
              isLoading={isLoading}
              setValue={() => block.parent_hash}
            />
          </InfoItem>
        )}
      </DetailsInfoGroup>
    </Flex>
  )
}

export default memo(BlockDetails, (prev, next) => {
  return (
    prev.heightOrHash === next.heightOrHash &&
    prev.isLoading === next.isLoading &&
    prev.block?.hash === next.block?.hash
  )
})
