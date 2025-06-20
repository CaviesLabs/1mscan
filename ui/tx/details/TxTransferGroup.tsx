import { Flex, HStack, Stack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenTransfer } from "types/api/tokenTransfer"
import type { Transaction } from "types/api/transaction"
import type { OSType } from "types/base"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { default as InfoItem } from "ui/shared/group/InfoItem"
import TxStatusIcon from "../tag/TxStatusIcon"
import TxDetailsTokenTransfer from "./TxDetailsTokenTransfer"
import TxViewAll from "./TxViewAll"

type Props = {
  tx: Transaction
  isLoading?: boolean
  hash: string
  transactionType: OSType | undefined
}

const TxTransferGroup = ({ tx, isLoading, hash, transactionType }: Props) => {
  const {
    coinTransfers,
    tokenTransfers,
    tokenMints,
    tokenBurns,
    tokenCreates,
    tokenTransfersOverflow,
    coinTransfersOverflow,
    tokenMintsOverflow,
    tokenBurnsOverflow,
    tokenCreatesOverflow,
  } = useMemo(() => {
    const coinTransfers = [] as TokenTransfer[]
    const tokenTransfers = [] as TokenTransfer[]
    const tokenMints = [] as TokenTransfer[]
    const tokenBurns = [] as TokenTransfer[]
    const tokenCreates = [] as TokenTransfer[]

    tx.token_transfers?.forEach((item) => {
      if (item.type === "coin_transfer" && item.total.denom === "usei") {
        if (coinTransfers.length <= 3) coinTransfers.push(item)
      } else {
        if (tokenTransfers.length <= 3) tokenTransfers.push(item)
      }
      if (item.type === "mint" || item.type === "token_minting") {
        if (tokenMints.length <= 3) tokenMints.push(item)
        return
      }
      if (item.type === "burn" || item.type === "token_burning") {
        if (tokenBurns.length <= 3) tokenBurns.push(item)
        return
      }
      if (item.type === "token_creation" || item.type === "token_spawning") {
        if (tokenCreates.length <= 3) tokenCreates.push(item)
        return
      }
    })

    return {
      coinTransfers,
      tokenTransfers,
      tokenMints,
      tokenBurns,
      tokenCreates,
      get coinTransfersOverflow() {
        return this.coinTransfers.length > 3
      },
      get tokenTransfersOverflow() {
        return this.tokenTransfers.length > 3
      },
      get tokenMintsOverflow() {
        return this.tokenMints.length > 3
      },
      get tokenBurnsOverflow() {
        return this.tokenBurns.length > 3
      },
      get tokenCreatesOverflow() {
        return this.tokenCreates.length > 3
      },
      get isEmtpy() {
        return (
          !this.coinTransfers.length &&
          !this.tokenTransfers.length &&
          !this.tokenMints.length &&
          !this.tokenBurns.length &&
          !this.tokenCreates.length
        )
      },
    }
  }, [tx.token_transfers])

  return (
    <DetailsInfoGroup backgroundColor="neutral.light.1">
      {transactionType === "EVM" && (
        <InfoItem
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.from",
          )}
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.the_sending_party_of_the_transaction",
          )}
          displayDivider="block"
          isLoading={isLoading}
        >
          <AddressEntityV2
            truncation="tail"
            textStyle="1"
            address={tx.from}
            isLoading={isLoading}
          />
        </InfoItem>
      )}
      {transactionType === "EVM" && (
        <InfoItem
          title={
            tx.to?.is_contract
              ? getLanguage(
                  "transaction_details_page.evm_details.details_tab_content.interacted_with_contract",
                )
              : getLanguage(
                  "transaction_details_page.evm_details.details_tab_content.to",
                )
          }
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.the_receiving_party_of_the_transaction",
          )}
          displayDivider="block"
          isLoading={isLoading}
        >
          <HStack spacing={2} whiteSpace="normal" overflow="hidden">
            {tx.to?.hash ? (
              <>
                <AddressEntityV2
                  truncation="tail"
                  address={tx.to}
                  textStyle="1"
                  isTruncated
                  isLoading={isLoading}
                />
                {tx.to?.is_contract && (
                  <TxStatusIcon status={tx.status} isLoading={isLoading} />
                )}
              </>
            ) : tx.created_contract ? (
              <>
                <span>[Contract </span>
                <AddressEntityV2
                  textStyle="1"
                  address={tx.created_contract}
                  truncation="tail"
                  isLoading={isLoading}
                  noIcon
                />
                <span>created]</span>
                {tx.created_contract?.is_contract && (
                  <TxStatusIcon status={tx.status} isLoading={isLoading} />
                )}
              </>
            ) : (
              <>[ Contract creation ]</>
            )}
          </HStack>
        </InfoItem>
      )}
      {Boolean(tokenTransfers.length) && (
        <InfoItem
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.tokens_transferred",
          )}
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.list_of_tokens_nfts_transferred_in_the_transaction",
          )}
          displayDivider="block"
          position="relative"
          isLoading={isLoading}
          titleProps={{
            alignSelf: "flex-start",
          }}
        >
          <Stack spacing={5} flex={1} overflow="hidden">
            {tokenTransfers.map((item, index) => (
              <TxDetailsTokenTransfer
                key={generateKey(
                  index,
                  isLoading,
                  item.token?.address,
                  item.token?.token_denom,
                  item.from.hash,
                  item.to.hash,
                  item.log_index,
                  item.total.value,
                  item.total.token_id,
                  item.total.denom,
                )}
                data={item}
              />
            ))}
            {tokenTransfersOverflow && (
              <TxViewAll hash={hash} isLoading={isLoading} />
            )}
          </Stack>
        </InfoItem>
      )}
      {Boolean(coinTransfers.length) && (
        <InfoItem
          key="coin_transfer"
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.coin_transfers",
          )}
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.list_of_coin_transferred_in_the_transaction",
          )}
          displayDivider="block"
          position="relative"
          isLoading={isLoading}
        >
          <Flex
            flexDirection="column"
            alignItems="stretch"
            rowGap={5}
            w="100%"
            overflow="hidden"
          >
            {coinTransfers.map((item, index) => (
              <TxDetailsTokenTransfer
                key={generateKey(
                  index,
                  isLoading,
                  item.token?.address,
                  item.token?.token_denom,
                  item.from.hash,
                  item.to.hash,
                  item.log_index,
                  item.total.value,
                  item.total.token_id,
                  item.total.denom,
                )}
                data={item}
              />
            ))}
            {coinTransfersOverflow && (
              <TxViewAll hash={hash} isLoading={isLoading} />
            )}
          </Flex>
        </InfoItem>
      )}
      {Boolean(tokenMints.length) && (
        <InfoItem
          key="token_mint"
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.tokens_minted",
          )}
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.list_of_tokens_minted_in_this_transaction",
          )}
          displayDivider="block"
          position="relative"
          isLoading={isLoading}
        >
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            rowGap={5}
            w="100%"
            overflow="hidden"
          >
            {tokenMints.map((item, index) => (
              <TxDetailsTokenTransfer
                key={generateKey(
                  index,
                  isLoading,
                  item.token?.address,
                  item.token?.token_denom,
                  item.from.hash,
                  item.to.hash,
                  item.log_index,
                  item.total.value,
                  item.total.token_id,
                  item.total.denom,
                )}
                data={item}
              />
            ))}
            {tokenMintsOverflow && (
              <TxViewAll hash={hash} isLoading={isLoading} />
            )}
          </Flex>
        </InfoItem>
      )}
      {Boolean(tokenBurns.length) && (
        <InfoItem
          key="token_burn"
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.tokens_burnt",
          )}
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.list_of_tokens_burnt_in_this_transaction",
          )}
          displayDivider="block"
          position="relative"
          isLoading={isLoading}
        >
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            rowGap={5}
            w="100%"
            overflow="hidden"
          >
            {tokenBurns.map((item, index) => (
              <TxDetailsTokenTransfer
                key={generateKey(
                  index,
                  isLoading,
                  item.token?.address,
                  item.token?.token_denom,
                  item.from.hash,
                  item.to.hash,
                  item.log_index,
                  item.total.value,
                  item.total.token_id,
                  item.total.denom,
                )}
                data={item}
              />
            ))}
            {tokenBurnsOverflow && (
              <TxViewAll hash={hash} isLoading={isLoading} />
            )}
          </Flex>
        </InfoItem>
      )}
      {Boolean(tokenCreates.length) && (
        <InfoItem
          key="token_create"
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.tokens_created",
          )}
          _first={{
            marginTop: 0,
          }}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.list_of_tokens_created_in_the_transaction",
          )}
          displayDivider="block"
          position="relative"
          isLoading={isLoading}
        >
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            rowGap={5}
            w="100%"
            overflow="hidden"
          >
            {tokenCreates.map((item, index) => (
              <TxDetailsTokenTransfer
                key={generateKey(
                  index,
                  isLoading,
                  item.token?.address,
                  item.token?.token_denom,
                  item.from.hash,
                  item.to.hash,
                  item.log_index,
                  item.total.value,
                  item.total.token_id,
                  item.total.denom,
                )}
                data={item}
              />
            ))}
            {tokenCreatesOverflow && (
              <TxViewAll hash={hash} isLoading={isLoading} />
            )}
          </Flex>
        </InfoItem>
      )}
    </DetailsInfoGroup>
  )
}

export default memo(TxTransferGroup, (prev, next) => {
  return (
    prev.tx === next.tx &&
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash &&
    prev.transactionType === next.transactionType
  )
})
