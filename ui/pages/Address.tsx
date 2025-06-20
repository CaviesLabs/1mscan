import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { getAddressType, getIsContract } from "lib/getOSType"
import { useMemoEffect } from "lib/hooks/useShallow"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useMemo } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { ADDRESS_INFO } from "stubs/address"
import AddressContract from "ui/address/AddressContract"
import AddressDetails from "ui/address/AddressDetails"
import AddressInternalTxs from "ui/address/AddressInternalTxs"
import AddressLogs from "ui/address/AddressLogs"
import AddressTokenTransfers from "ui/address/AddressTokenTransfers"
import AddressTokens from "ui/address/AddressTokens"
import AddressTxs from "ui/address/AddressTxs"
import AddressCategoryTags from "ui/address/tag/AddressCategoryTags"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"

type Props = {}

const Address = ({}: Props) => {
  const { showBoundary } = useErrorBoundary()

  const [hash] = useSetStateQuery("hash", [], {
    throttle: 1000,
    cleanUp: {
      keepQueries: ["hash"],
    },
    decode: (value) => String(value ?? "").toLowerCase(),
  })

  const {
    data: address,
    error: addressError,
    isPlaceholderData: addressIsLoading,
  } = useApiQuery("address", {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: ADDRESS_INFO,
    },
  })

  const { addressType, evmHash, nativeHash, associatedHash } = useMemo(() => {
    const addressType = getAddressType(hash)
    if (addressType === "EVM") {
      return {
        addressType,
        evmHash: hash,
        nativeHash: address?.association?.sei_hash?.toLowerCase(),
        associatedHash: address?.association?.sei_hash?.toLowerCase(),
      }
    }

    if (addressType === "Cosmos") {
      return {
        addressType,
        evmHash: address?.association?.evm_hash?.toLowerCase(),
        nativeHash: hash,
        associatedHash: address?.association?.evm_hash?.toLowerCase(),
      }
    }

    return {
      addressType,
      evmHash: undefined,
      nativeHash: undefined,
    }
  }, [address?.association, hash])

  const isContract = useMemo(() => {
    return getIsContract(address)
  }, [address?.is_contract])

  const { data: tabCounters } = useApiQuery("address_tabs_counters", {
    pathParams: { hash },
    queryOptions: {},
    configs: {
      timeout: 20000,
    },
  })

  const { data: associatedTabCounters } = useApiQuery("address_tabs_counters", {
    pathParams: {
      hash: associatedHash,
    },
    queryOptions: {},
    configs: {
      timeout: 20000,
    },
  })

  const { data: counter, isFetching: countersIsLoading } = useApiQuery(
    "address_tokens_counter",
    {
      pathParams: { hash },
      queryOptions: {},
      configs: {
        timeout: 15000,
      },
    },
  )

  const tokensTabCounter = useMemo(() => {
    if (!counter) {
      return {
        erc721_count: 0,
        erc20_count: 0,
        erc1155_count: 0,
        erc404_count: 0,
        cw721_count: 0,
        cw20_count: 0,
        ics20_count: 0,
        native_count: 0,
        nft_count: 0,
        total_count: 0,
      }
    }
    const nft_count =
      counter?.cw721_count +
      counter?.erc721_count +
      counter?.erc1155_count +
      counter?.erc404_count
    return {
      ...counter,
      nft_count,
      total_count:
        counter.erc20_count +
        counter.cw20_count +
        counter.ics20_count +
        counter.native_count +
        nft_count,
    }
  }, [counter])

  useMemoEffect(() => {
    if (addressError) {
      showBoundary(addressError)
    }
  }, [addressError])

  const isLoading = addressIsLoading

  const {
    transferCount,
    transactionCount,
    internalCount,
    evmTransactionCount,
    nativeTransactionCount,
    evmTransferCount,
    nativeTransferCount,
  } = useMemo(() => {
    const evmTransactionCount =
      addressType === "EVM"
        ? tabCounters?.transactions_count || 0
        : associatedTabCounters?.transactions_count || 0
    const nativeTransactionCount =
      addressType === "Cosmos"
        ? tabCounters?.transactions_count || 0
        : associatedTabCounters?.transactions_count || 0
    const evmTransferCount =
      addressType === "EVM"
        ? tabCounters?.token_transfers_count || 0
        : associatedTabCounters?.token_transfers_count || 0
    const nativeTransferCount =
      addressType === "Cosmos"
        ? tabCounters?.token_transfers_count || 0
        : associatedTabCounters?.token_transfers_count || 0
    const transferCount = evmTransferCount + nativeTransferCount
    const transactionCount = evmTransactionCount + nativeTransactionCount
    const internalCount = tabCounters?.internal_txs_count || 0
    return {
      transferCount,
      transactionCount,
      internalCount,
      evmTransactionCount,
      nativeTransactionCount,
      evmTransferCount,
      nativeTransferCount,
    }
  }, [tabCounters, associatedTabCounters])

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        title={
          address?.is_contract
            ? getLanguage("address.contract_details")
            : getLanguage("address.account_details")
        }
        contentAfter={
          <AddressCategoryTags
            isLoading={isLoading}
            address={address}
            hash={hash}
          />
        }
        secondRow={
          <Flex
            width="full"
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            columnGap={8}
            rowGap={2}
          >
            <Flex
              alignItems="center"
              columnGap={{ base: 2, lg: 4 }}
              rowGap={2}
              flexWrap="wrap"
              overflow="hidden"
            >
              <AddressV2
                address={address}
                iconProps={{ boxSize: 5 }}
                truncation="tail"
                textStyle="1125"
                noLink
                flex={1}
                gap={2}
                noName
                isLoading={isLoading}
              />
            </Flex>
          </Flex>
        }
      />

      <AddressDetails
        address={address}
        hash={hash}
        isLoading={isLoading}
        isCounterLoading={countersIsLoading}
        addressType={addressType}
        evmHash={evmHash}
        nativeHash={nativeHash}
        counter={tokensTabCounter}
      />

      <ScrollTab
        mt={4}
        isLoading={isLoading}
        cleanupOnTabChange={{ keepQueries: ["hash"] }}
        minHeight="40rem"
        tabs={[
          {
            id: "transactions",
            title: getLanguage("address.transactions"),
            count: transactionCount,
            component: AddressTxs,
            props: {
              evmHash,
              nativeHash,
              isLoading,
              evmCounter: evmTransactionCount,
              nativeCounter: nativeTransactionCount,
            },
          },
          {
            id: "token_transfers",
            title: getLanguage("address.token_transfers"),
            count: transferCount,
            component: AddressTokenTransfers,
            props: {
              evmHash,
              nativeHash,
              isLoading,
              evmCounter: evmTransferCount,
              nativeCounter: nativeTransferCount,
            },
          },
          {
            id: "token_holdings",
            title: getLanguage("address.token_holdings"),
            count: tokensTabCounter.total_count,
            component: AddressTokens,
            props: {
              evmHash,
              nativeHash,
              address,
              isLoading,
              counter: tokensTabCounter,
            },
          },
          addressType === "EVM" && {
            id: "internal_txns",
            title: getLanguage("address.internal_txns"),
            count: internalCount,
            component: AddressInternalTxs,
            props: {
              hash: evmHash,
              isLoading,
            },
          },
          isContract &&
            addressType === "EVM" && {
              id: "logs",
              title: getLanguage("address.logs"),
              count: !Number.isNaN(Number(tabCounters?.logs_count))
                ? tabCounters?.logs_count
                : undefined,
              component: AddressLogs,
              props: {
                hash: evmHash,
              },
            },
          isContract && {
            id: "contract",
            title: getLanguage("address.contract"),
            isChecked: address?.is_verified,
            component: AddressContract,
            props: {
              hash,
            },
            comingSoon: addressType === "Cosmos",
          },
        ]}
      />
    </>
  )
}

export default memo(Address, () => true)
