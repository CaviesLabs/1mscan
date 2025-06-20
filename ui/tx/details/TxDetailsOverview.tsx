import { HStack, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import moment from "lib/date/moment"
import getConfirmationDuration from "lib/tx/getConfirmationDuration"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import IconSvg from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"
import BlockEntityV2 from "ui/shared/entities/block/BlockEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { default as InfoItem } from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"
import TxRevertReason from "ui/tx/details/TxRevertReason"
import TxStatus from "ui/tx/tag/TxStatus"

type Props = {
  isLoading?: boolean
  data: Transaction
}

const TxDetailsOverview = ({ isLoading, data }: Props) => {
  return (
    <DetailsInfoGroup backgroundColor="neutral.light.1" overflow="hidden">
      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.transaction_hash",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.unique_character_string_txid_assigned_to_every_transaction",
        )}
        displayDivider="block"
        flexWrap="nowrap"
        _first={{
          marginTop: 0,
        }}
        isLoading={isLoading}
      >
        <TxEntityV2
          isLoading={isLoading}
          noLink
          color="neutral.light.7"
          textStyle="1"
          hash={data.hash}
        ></TxEntityV2>
      </InfoItem>
      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.status_and_method",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.the_status_of_the_transaction",
        )}
        displayDivider="block"
        isLoading={isLoading}
      >
        <HStack rowGap={1} columnGap={3} flexWrap="wrap">
          <TxStatus
            variant="unborder"
            status={data.status}
            errorText={data.status === "error" ? data.result : undefined}
            isLoading={isLoading}
          />
          {data.method && (
            <Tag
              variant="unborder"
              colorScheme={data.method === "Multicall" ? "teal" : "gray"}
              isLoading={isLoading}
              isTruncated
            >
              {data.method}
            </Tag>
          )}

          {data.status === "error" && (
            <chakra.span color="accent.red" whiteSpace="break-spaces">
              {data.result}
            </chakra.span>
          )}
        </HStack>
      </InfoItem>
      {data.revert_reason && (
        <InfoItem
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.revert_reason",
          )}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.the_revert_reason_of_the_transaction",
          )}
          displayDivider="block"
          isLoading={isLoading}
          hasSkeleton
          overflow="hidden"
          contentProps={{
            overflow: "hidden",
          }}
        >
          <TxRevertReason reason={data.revert_reason} isLoading={isLoading} />
        </InfoItem>
      )}
      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.block",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.number_of_the_block_in_which_the_transaction_is_recorded_block_confirmations_indicate_how_many_blocks_have_been_added_since_the_transaction_was_produced",
        )}
        displayDivider="block"
        isLoading={isLoading}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "flex-start", lg: "center" }}
        textStyle="1"
      >
        <HStack rowGap={1} columnGap={3} flexWrap="wrap">
          <BlockEntityV2
            noCopy
            isLoading={isLoading}
            number={data.block}
            noIcon
            textStyle="1"
          />
          {Boolean(data.confirmations) && (
            <HStack columnGap={3} rowGap={1} flexWrap="wrap">
              <SkeletonText
                isLoading={isLoading}
                color="neutral.light.7"
                borderLeftWidth={{
                  base: "0px",
                  lg: "1px",
                }}
                paddingLeft={{
                  base: 0,
                  lg: 3,
                }}
              >
                {data.confirmations}
              </SkeletonText>
              <SkeletonText isLoading={isLoading} color="neutral.light.6">
                {getLanguage(
                  "transaction_details_page.evm_details.details_tab_content.block_confirmations",
                )}
              </SkeletonText>
            </HStack>
          )}
        </HStack>
      </InfoItem>
      {data.timestamp && (
        <InfoItem
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.timestamp",
          )}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.the_date_and_time_at_which_a_transaction_is_produced",
          )}
          displayDivider="block"
          isLoading={isLoading}
          textStyle="1"
        >
          <HStack rowGap={1} columnGap={3} flexWrap="wrap">
            <IconSvg
              name="clock"
              boxSize={5}
              color="neutral.light.5"
              isLoading={isLoading}
            />
            <SkeletonText
              isLoading={isLoading}
              whiteSpace="pre-line"
              borderLeftWidth={{
                base: "0px",
                lg: "1px",
              }}
              paddingLeft={{
                base: 0,
                lg: 3,
              }}
            >
              {moment(data.timestamp).fromNow()}
            </SkeletonText>

            <SkeletonText
              isLoading={isLoading}
              whiteSpace="pre-line"
              borderLeftWidth={{
                base: "0px",
                lg: "1px",
              }}
              paddingLeft={{
                base: 0,
                lg: 3,
              }}
            >
              {moment(data.timestamp).format("short")}
            </SkeletonText>

            <SkeletonText
              isLoading={isLoading}
              //   whiteSpace="pre-line"
              borderLeftWidth={{
                base: "0px",
                lg: "1px",
              }}
              paddingLeft={{
                base: 0,
                lg: 3,
              }}
            >
              {getConfirmationDuration(data.confirmation_duration)}
            </SkeletonText>
          </HStack>
        </InfoItem>
      )}
      {data.memo && (
        <InfoItem
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.memo",
          )}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.transaction_memo_is_included_in_onchain_data",
          )}
          displayDivider="block"
          isLoading={isLoading}
        >
          <SkeletonText isLoading={isLoading} whiteSpace="break-spaces">
            {data.memo}
          </SkeletonText>
        </InfoItem>
      )}
    </DetailsInfoGroup>
  )
}

export default memo(TxDetailsOverview, (prev, next) => {
  return prev.data === next.data && prev.isLoading === next.isLoading
})
