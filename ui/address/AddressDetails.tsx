import { Flex, HStack, Stack } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { getIsContract } from "lib/getOSType"
import _ from "lodash"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { Address, AddressTokensCounter } from "types/api/address"
import type { OSType } from "types/base"
import CurrencyValue from "ui/shared/CurrencyValue"
import IconSvg from "ui/shared/IconSvg"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import BlockV2 from "ui/shared/entities/block/BlockEntityV2"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import TxV2 from "ui/shared/entities/tx/TxEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { default as InfoItem } from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"
import LinkToAssociation from "./association/LinkToAssociation"
import AddressCounterLink from "./details/AddressCounterLink"
import AddressQrCode from "./details/AddressQrCode"
import TokenSelect from "./tokenSelect/TokenSelect"

export type Props = {
  hash: string
  evmHash: string | undefined
  nativeHash: string | undefined
  addressType: OSType | undefined
  address: Address | undefined
  isLoading?: boolean
  counter: AddressTokensCounter & {
    nft_count: number
    total_count: number
  }
  isCounterLoading?: boolean
}

const AddressDetails = ({
  hash,
  evmHash,
  nativeHash,
  address,
  isLoading,
  addressType,
  counter,
  isCounterLoading,
}: Props) => {
  const { data: evmCounter, isFetching: evmCounterIsFetching } = useApiQuery(
    "address_counters",
    {
      pathParams: { hash: evmHash },
      queryOptions: {
        enabled: Boolean(evmHash && !isLoading),
      },
      configs: {
        timeout: 20000,
      },
    },
  )

  const { data: nativeCounter, isFetching: nativeCounterIsFetching } =
    useApiQuery("address_counters", {
      pathParams: {
        hash: nativeHash,
      },
      queryOptions: {
        enabled: Boolean(nativeHash && !isLoading),
      },
      configs: {
        timeout: 20000,
      },
    })

  const isContract = useMemo(() => getIsContract(address), [address])

  const {
    evmTransactions,
    nativeTransactions,
    evmTransfers,
    nativeTransfers,
    gasUsage,
    validatedBlocks,
  } = useMemo(() => {
    return {
      evmTransactions: _.chain(Number(evmCounter?.transactions_count || 0))
        .thru((value) => (value > 0 ? value : 0))
        .value(),
      nativeTransactions: _.chain(
        Number(nativeCounter?.transactions_count || 0),
      )
        .thru((value) => (value > 0 ? value : 0))
        .value(),
      evmTransfers: _.chain(Number(evmCounter?.token_transfers_count || 0))
        .thru((value) => (value > 0 ? value : 0))
        .value(),
      nativeTransfers: _.chain(
        Number(nativeCounter?.token_transfers_count || 0),
      )
        .thru((value) => (value > 0 ? value : 0))
        .value(),
      gasUsage: BigNumber.sum(
        evmCounter?.gas_usage_count || 0,
        nativeCounter?.gas_usage_count || 0,
      ),
      validatedBlocks: Number(evmCounter?.validations_count || 0),
    }
  }, [evmCounter, nativeCounter, evmCounterIsFetching, nativeCounterIsFetching])

  return (
    <Flex
      gap={5}
      justifyContent="space-between"
      width="full"
      overflow="hidden"
      flexDirection={{ xl: "row", base: "column" }}
    >
      <DetailsInfoGroup
        header={{
          element: <>{getLanguage("address.overview")}</>,
          hasDivider: true,
          icon: <IconSvg name="group-overview" boxSize="20px" />,
        }}
        hasCollapsed={false}
        flex={{ base: 1, xl: "unset" }}
        width={{ xl: "49.0625rem" }}
        gap={5}
        height="full"
        overflow="unset"
        contentProps={{
          alignItems: "stretch",
          gap: {
            base: 5,
            lg: 10,
          },
          flexDirection: {
            base: "column",
            lg: "row",
          },
          height: "full",
        }}
        leftContent={
          <AddressQrCode
            width={{ base: "full", lg: "14.5rem" }}
            height={{ base: "full", lg: "14.5rem" }}
            hash={hash}
            evmHash={evmHash}
            nativeHash={nativeHash}
            isLoading={isLoading}
            flexShrink={0}
            addressType={addressType}
          />
        }
      >
        <Stack flex={1} spacing={0} mt={{ base: 20, lg: 0 }}>
          <InfoItem
            title={getLanguage("address.sei_balance")}
            hint={getLanguage("address.sei_balance_of_address")}
            isLoading={isLoading}
            titleProps={{
              width: "15rem",
            }}
          >
            <CurrencyValue
              isLoading={isLoading}
              accuracyUsd={2}
              gap="unset"
              rowGap="0.125rem"
              columnGap={2}
              flexWrap="wrap"
              osType={addressType}
              currency="SEI"
              value={address?.coin_balance || 0}
              autoPrice={address?.hash}
              isTruncated
              usdHasParenthesis
              usdProps={{
                textStyle: "1",
                color: "neutral.light.5",
              }}
            />
          </InfoItem>
          <InfoItem
            title={getLanguage("address.token_holdings")}
            hint={getLanguage(
              "address.all_assets_and_total_value_of_this_account",
            )}
            isLoading={isLoading}
            titleProps={{ width: { base: "full", lg: "15rem" } }}
          >
            <TokenSelect
              current={hash}
              evmHash={evmHash}
              nativeHash={nativeHash}
              isLoading={isLoading}
              counter={counter}
              isCounterLoading={isCounterLoading}
            />
          </InfoItem>
          <InfoItem
            title={getLanguage("address.transactions")}
            hint={getLanguage(
              "address.number_of_transactions_related_to_this_address",
            )}
            isLoading={isLoading}
            titleProps={{ width: { base: "full", lg: "15rem" } }}
            display={
              evmCounterIsFetching || nativeCounterIsFetching
                ? "none"
                : undefined
            }
            _after={{
              content: '"-"',
              display: "none",
            }}
            _empty={{
              _after: {
                display: "block",
              },
            }}
            alignItems="flex-start"
            hasSkeleton
          >
            <HStack
              overflow="hidden"
              flexWrap="wrap"
              columnGap={2}
              rowGap={1}
              _after={{
                content: '"-"',
                display: "none",
              }}
              _empty={{
                _after: {
                  display: "block",
                },
              }}
            >
              {Boolean(nativeHash) && !nativeCounterIsFetching && (
                <HStack spacing="1ch">
                  <SkeletonText>Cosmos:</SkeletonText>
                  <AddressCounterLink
                    isDisabled={!nativeTransactions}
                    href={route({
                      pathname: "/address/[hash]",
                      query: {
                        hash,
                        tab: "transactions",
                        transactions: "native",
                      },
                    })}
                  >
                    {nativeTransactions.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </AddressCounterLink>
                </HStack>
              )}
              {Boolean(evmHash) && !evmCounterIsFetching && (
                <HStack spacing="1ch">
                  <SkeletonText>{getLanguage("utils.evm")}:</SkeletonText>
                  <AddressCounterLink
                    isDisabled={!evmTransactions}
                    href={route({
                      pathname: "/address/[hash]",
                      query: {
                        hash,
                        tab: "transactions",
                        transactions: "evm",
                      },
                    })}
                  >
                    {evmTransactions.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </AddressCounterLink>
                </HStack>
              )}
            </HStack>
          </InfoItem>
          <InfoItem
            title={getLanguage("address.transfers")}
            hint={getLanguage(
              "address.number_of_transfers_to_from_this_address",
            )}
            isLoading={isLoading}
            titleProps={{ width: { base: "full", lg: "15rem" } }}
            display={
              evmCounterIsFetching || nativeCounterIsFetching
                ? "none"
                : undefined
            }
            alignItems="flex-start"
            hasSkeleton
          >
            <HStack
              columnGap={2}
              rowGap={1}
              overflow="hidden"
              flexWrap="wrap"
              _after={{
                content: '"-"',
                display: "none",
              }}
              _empty={{
                _after: {
                  display: "block",
                },
              }}
            >
              {Boolean(nativeHash) && !nativeCounterIsFetching && (
                <HStack spacing="1ch">
                  <SkeletonText>Cosmos:</SkeletonText>
                  <AddressCounterLink
                    isDisabled={!nativeTransfers}
                    href={route({
                      pathname: "/address/[hash]",
                      query: {
                        hash,
                        tab: "token_transfers",
                        token_transfers: "native",
                      },
                    })}
                  >
                    {nativeTransfers.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </AddressCounterLink>
                </HStack>
              )}
              {Boolean(evmHash) && !evmCounterIsFetching && (
                <HStack spacing="1ch">
                  <SkeletonText>{getLanguage("utils.evm")}:</SkeletonText>
                  <AddressCounterLink
                    isDisabled={!evmTransfers}
                    href={route({
                      pathname: "/address/[hash]",
                      query: {
                        hash,
                        tab: "token_transfers",
                        token_transfers: "evm",
                      },
                    })}
                  >
                    {evmTransfers.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </AddressCounterLink>
                </HStack>
              )}
            </HStack>
          </InfoItem>
          {!evmCounterIsFetching && !nativeCounterIsFetching && (
            <InfoItem
              title={getLanguage("address.gas_used")}
              isLoading={isLoading}
              hasSkeleton
              hint={getLanguage(
                "address.gas_used_by_address_displayed_in_the_unit_asei_1_sei_10¹⁸_asei",
              )}
              titleProps={{ width: { base: "full", lg: "15rem" } }}
            >
              <CurrencyValue
                value={gasUsage}
                accuracy={2}
                decimals={0}
                fallback="0"
                currency="asei"
              ></CurrencyValue>
            </InfoItem>
          )}
          {!evmCounterIsFetching && validatedBlocks > 0 && (
            <InfoItem
              title={getLanguage("address.blocks_validated")}
              hint={getLanguage(
                "address.number_of_blocks_validated_by_this_validator",
              )}
              titleProps={{ width: { base: "full", lg: "15rem" } }}
              hasSkeleton
              isLoading={isLoading}
            >
              {validatedBlocks}
            </InfoItem>
          )}
          {Number(address?.block_number_balance_updated_at) > 0 && (
            <InfoItem
              title={getLanguage("address.last_balance_update")}
              hint={getLanguage(
                "address.block_number_in_which_the_address_was_updated",
              )}
              isLoading={isLoading}
              titleProps={{ width: { base: "full", lg: "15rem" } }}
            >
              <BlockV2
                textStyle="1"
                number={address?.block_number_balance_updated_at}
                isLoading={isLoading}
                noCopy
              />
            </InfoItem>
          )}
        </Stack>
      </DetailsInfoGroup>

      <DetailsInfoGroup
        hasCollapsed={false}
        gap={5}
        header={{
          hasDivider: true,
          element:
            (isContract && getLanguage("address.more_information")) ||
            getLanguage("address.addresses"),
          icon: !isContract && <IconSvg name="wallet" boxSize="20px" />,
        }}
        flex={1}
      >
        {(address?.token && (
          <InfoItem
            title={getLanguage("address.token_name")}
            hint={getLanguage("address.token_name_and_symbol")}
            titleProps={{
              width: {
                base: "full",
                lg: "9.125rem",
              },
            }}
            isLoading={isLoading}
          >
            <TokenV2
              token={address?.token}
              isLoading={isLoading}
              noIcon
              noCopy
              textStyle="1"
            />
          </InfoItem>
        )) ||
          (address?.is_contract && address?.name && (
            <InfoItem
              title={getLanguage("address.contract_name")}
              hint={getLanguage(
                "address.the_name_found_in_the_source_code_of_the_contract",
              )}
              titleProps={{
                width: {
                  base: "full",
                  lg: "9.125rem",
                },
              }}
              isLoading={isLoading}
              hasSkeleton
            >
              {address?.name}
            </InfoItem>
          )) ||
          (address?.name && (
            <InfoItem
              title={getLanguage("address.validator_name")}
              hint={getLanguage("address.the_name_of_the_validator")}
              titleProps={{
                width: {
                  base: "full",
                  lg: "9.125rem",
                },
              }}
              isLoading={isLoading}
              hasSkeleton
            >
              {address?.name}
            </InfoItem>
          ))}
        {address?.is_contract &&
          address?.creation_tx_hash &&
          address?.creator_address_hash && (
            <InfoItem
              title={getLanguage("address.creator")}
              hint={getLanguage(
                "address.the_creator_of_this_contract_and_the_transaction_of_creation",
              )}
              titleProps={{
                width: {
                  base: "full",
                  lg: "9.125rem",
                },
              }}
              isLoading={isLoading}
            >
              <AddressV2
                flex={1}
                maxWidth={{ lg: "8.125rem", xl: "unset" }}
                address={{ hash: address?.creator_address_hash }}
                truncation="tail"
                noIcon
                textStyle="1"
                isLoading={isLoading}
              />
              <SkeletonText isLoading={isLoading} whiteSpace="pre">
                {getLanguage("address.at_txn")}
              </SkeletonText>
              <TxV2
                flex={1}
                hash={address?.creation_tx_hash}
                maxWidth={{ lg: "8.125rem", xl: "unset" }}
                isLoading={isLoading}
                textStyle="1"
              />
            </InfoItem>
          )}
        {Boolean(address?.is_contract && address?.implementations?.length) && (
          <InfoItem
            title={getLanguage("address.implementations")}
            isLoading={isLoading}
            hint={getLanguage(
              "address.implementation_addresses_of_the_proxy_contract",
            )}
            titleProps={{
              width: {
                base: "full",
                lg: "9.125rem",
              },
            }}
          >
            <Flex alignItems="center" width="full" gap={1} flexWrap="wrap">
              {address?.implementations!.map((implementation, index) => (
                <AddressV2
                  key={generateKey(index, isLoading, implementation.address)}
                  address={{
                    hash: implementation.address,
                    name: implementation.name,
                    is_contract: true,
                  }}
                  textStyle="1"
                  truncation="tail"
                  isLoading={isLoading}
                  noIcon
                />
              ))}
            </Flex>
          </InfoItem>
        )}
        {address?.is_contract && address?.token?.type && (
          <InfoItem
            title={getLanguage("address.contract_type")}
            hint={getLanguage(
              "address.defines_the_standard_and_functionality_for_tokens_or_assets_on_sei_blockchain",
            )}
            titleProps={{
              width: {
                base: "full",
                lg: "9.125rem",
              },
            }}
            isLoading={isLoading}
            hasSkeleton
          >
            {address?.token?.type}
          </InfoItem>
        )}
        {address?.code_id && (
          <InfoItem
            title={getLanguage("address.code_id")}
            hint={getLanguage(
              "address.a_code_id_is_a_unique_identifier_assigned_to_a_wasm_binary_code_uploaded_to_the_blockchain_used_for_referencing_and_interacting_with_deployed_smart_contracts",
            )}
            titleProps={{
              width: {
                base: "full",
                lg: "9.125rem",
              },
            }}
            isLoading={isLoading}
            hasSkeleton
          >
            {address?.code_id}
          </InfoItem>
        )}
        <InfoItem
          title={getLanguage("utils.evm")}
          hint={getLanguage("address.the_evm_address_of_this_account")}
          titleProps={{
            width: {
              base: "full",
              lg: "9.125rem",
            },
          }}
          overflow="hidden"
          isLoading={isLoading}
        >
          <AddressV2
            noIcon
            truncation="tail"
            textStyle="1"
            color="secondary.light.text.orange"
            address={{ hash: evmHash }}
            isLoading={isLoading}
            fallback={<LinkToAssociation disabled={address?.is_contract} />}
          />
        </InfoItem>
        <InfoItem
          title={getLanguage("utils.native_cosmos")}
          hint={getLanguage("address.the_native_address_of_this_account")}
          titleProps={{
            width: {
              base: "full",
              lg: "9.125rem",
            },
          }}
          isLoading={isLoading}
          overflow="hidden"
        >
          <AddressV2
            isLoading={isLoading}
            address={{ hash: nativeHash }}
            truncation="tail"
            textStyle="1"
            color="secondary.03.text"
            noIcon
            fallback={<LinkToAssociation disabled={address?.is_contract} />}
          />
        </InfoItem>
      </DetailsInfoGroup>
    </Flex>
  )
}

export default memo(AddressDetails, (pre, next) => {
  return (
    pre.hash === next.hash &&
    pre.evmHash === next.evmHash &&
    pre.nativeHash === next.nativeHash &&
    pre.isLoading === next.isLoading &&
    pre.addressType === next.addressType &&
    pre.address === next.address &&
    pre.counter === next.counter &&
    pre.isCounterLoading === next.isCounterLoading
  )
})
