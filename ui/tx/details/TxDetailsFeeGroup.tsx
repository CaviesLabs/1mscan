import { HStack, chakra } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import type { OSType } from "types/base"
import CurrencyValue from "ui/shared/CurrencyValue"
import Utilization from "ui/shared/Utilization/Utilization"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { default as InfoItem } from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  tx: Transaction | undefined
  isLoading?: boolean
  transactionType: OSType | undefined
}

const TxDetailsFeeGroup = ({ isLoading, tx, transactionType }: Props) => {
  if (!tx) return <></>
  return (
    <DetailsInfoGroup backgroundColor="neutral.light.1">
      <InfoItem
        marginTop={0}
        _first={{ marginTop: 0 }}
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.value",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.the_value_being_transacted_in_sei_and_fiat_value",
        )}
        displayDivider="block"
        isLoading={isLoading}
      >
        <CurrencyValue
          value={tx.value}
          currency="SEI"
          accuracy="full"
          isLoading={isLoading}
          osType={transactionType}
          flexWrap="wrap"
          stickyCurrency
          autoPrice
          usdProps={{
            textStyle: "1",
            color: "neutral.light.5",
          }}
          usdHasParenthesis
        />
      </InfoItem>

      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.transaction_fee",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.amount_paid_to_process_the_transaction_in_sei_and_fiat_value",
        )}
        displayDivider="block"
        isLoading={isLoading}
      >
        <CurrencyValue
          flexWrap="wrap"
          value={tx.fee?.value}
          isLoading={isLoading}
          osType={transactionType}
          currency="SEI"
          accuracy="full"
          stickyCurrency
          usdHasParenthesis
          autoPrice
          usdProps={{
            textStyle: "1",
            color: "neutral.light.5",
          }}
        />
      </InfoItem>

      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.gas_price",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.price_per_unit_of_gas_specified_by_the_sender_higher_gas_prices_can_prioritize_transaction_inclusion_during_times_of_high_usage",
        )}
        isLoading={isLoading}
        textStyle="1"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "flex-start", lg: "center" }}
        displayDivider="block"
      >
        <HStack rowGap={1} columnGap={3} flexWrap="wrap" overflow="hidden">
          <CurrencyValue
            value={tx.gas_price}
            accuracy="full"
            flexWrap="wrap"
            osType={transactionType}
            isLoading={isLoading}
            currency="SEI"
            stickyCurrency
            autoPrice
            usdProps={{
              textStyle: "1",
              color: "neutral.light.5",
            }}
            isTruncated
            usdHasParenthesis
          ></CurrencyValue>
          {transactionType === "EVM" && (
            <CurrencyValue
              isLoading={isLoading}
              color="neutral.light.5"
              textStyle="1"
              value={tx.gas_price}
              decimals={9}
              stickyCurrency
              accuracy="full"
              currency="nsei"
              hasParenthesis
              isTruncated
            ></CurrencyValue>
          )}
        </HStack>
      </InfoItem>
      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.gas_usage_limit_by_txn",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.actual_gas_amount_used_by_the_transaction",
        )}
        displayDivider="block"
        isLoading={isLoading}
        textStyle="1"
      >
        <HStack rowGap={1} columnGap={3} flexWrap="wrap">
          <SkeletonText isLoading={isLoading}>
            {BigNumber(tx.gas_used || 0).toFormat()}
          </SkeletonText>

          <SkeletonText
            isLoading={isLoading}
            borderLeftWidth={{
              base: "0px",
              lg: "1px",
            }}
            paddingLeft={{
              base: 0,
              lg: 3,
            }}
          >
            {BigNumber(tx.gas_limit).toFormat()}
          </SkeletonText>
          <Utilization
            value={BigNumber(tx.gas_used || 0).dividedBy(
              BigNumber(tx.gas_limit),
            )}
            width="10rem"
            colorScheme={
              (tx.status === "ok" && "green") ||
              (tx.status === "error" && "red") ||
              "gray"
            }
            textStyle="1"
            isLoading={isLoading}
          />
        </HStack>
      </InfoItem>
      {transactionType === "EVM" &&
        (tx.base_fee_per_gas ||
          tx.max_fee_per_gas ||
          tx.max_priority_fee_per_gas) && (
          <InfoItem
            title={getLanguage(
              "transaction_details_page.evm_details.details_tab_content.gas_fees_nsei",
            )}
            textStyle="1"
            hint={getLanguage(
              "transaction_details_page.evm_details.details_tab_content.the_gas_fees_of_transaction",
            )}
            displayDivider="block"
            isLoading={isLoading}
            flexDirection={{ base: "column", lg: "row" }}
            alignItems={{ base: "flex-start", lg: "center" }}
          >
            <HStack rowGap={1} columnGap={3} flexWrap="wrap">
              {tx.base_fee_per_gas && (
                <CurrencyValue
                  textStyle="1"
                  color="neutral.light.8"
                  accuracy="full"
                  prefix={
                    <chakra.span color="neutral.light.5">
                      {getLanguage(
                        "transaction_details_page.evm_details.details_tab_content.base",
                      )}
                      :
                    </chakra.span>
                  }
                  isLoading={isLoading}
                  value={tx.base_fee_per_gas}
                  decimals={9}
                />
              )}
              {tx.max_fee_per_gas && (
                <CurrencyValue
                  textStyle="1"
                  color="neutral.light.8"
                  accuracy="full"
                  prefix={
                    <chakra.span color="neutral.light.5">
                      {getLanguage(
                        "transaction_details_page.evm_details.details_tab_content.max",
                      )}
                      :
                    </chakra.span>
                  }
                  isLoading={isLoading}
                  value={tx.max_fee_per_gas}
                  decimals={9}
                  borderLeftWidth={{
                    base: "0px",
                    lg: "1px",
                  }}
                  paddingLeft={{
                    base: 0,
                    lg: 3,
                  }}
                />
              )}
              {tx.max_priority_fee_per_gas && (
                <CurrencyValue
                  textStyle="1"
                  color="neutral.light.8"
                  accuracy="full"
                  prefix={
                    <chakra.span color="neutral.light.5">
                      {getLanguage(
                        "transaction_details_page.evm_details.details_tab_content.max_priority",
                      )}
                      :
                    </chakra.span>
                  }
                  isLoading={isLoading}
                  value={tx.max_priority_fee_per_gas}
                  decimals={9}
                  borderLeftWidth={{
                    base: "0px",
                    lg: "1px",
                  }}
                  paddingLeft={{
                    base: 0,
                    lg: 3,
                  }}
                />
              )}
            </HStack>
          </InfoItem>
        )}
    </DetailsInfoGroup>
  )
}

export default memo(TxDetailsFeeGroup, (prev, next) => {
  return (
    prev.tx === next.tx &&
    prev.isLoading === next.isLoading &&
    prev.transactionType === next.transactionType
  )
})
