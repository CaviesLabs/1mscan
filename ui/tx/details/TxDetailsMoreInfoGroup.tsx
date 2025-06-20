import { Button, Skeleton } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import ArrowToggle from "ui/shared/ArrowToggle"
import RawInputData from "ui/shared/RawInputData"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { default as InfoItem } from "ui/shared/group/InfoItem"
import LogDecodedInputData from "ui/shared/logs/LogDecodedInputData"
import TxDetailsOther from "ui/tx/details/TxDetailsOther"

type Props = {
  isLoading?: boolean
  tx: Transaction<"EVM"> | undefined
}

const TxDetailsMoreInfoGroup = ({ isLoading, tx }: Props) => {
  if (!tx) return <></>

  return (
    <DetailsInfoGroup
      backgroundColor="neutral.light.1"
      overflow="hidden"
      hasCollapsed
      defaultExpanded={false}
      header={{
        element: ({ isExpanded }) => (
          <Skeleton isLoaded={!isLoading}>
            <Button
              width="7rem"
              variant="tertiary"
              justifyContent="space-between"
            >
              {isExpanded
                ? getLanguage("utils.hide")
                : getLanguage("utils.show")}{" "}
              <ArrowToggle isOpen={isExpanded} />
            </Button>
          </Skeleton>
        ),
        hasArrow: false,
      }}
    >
      <TxDetailsOther
        nonce={tx.nonce}
        type={tx.type}
        position={tx.position}
        isLoading={isLoading}
      />
      <InfoItem
        title={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.raw_input",
        )}
        hint={getLanguage(
          "transaction_details_page.evm_details.details_tab_content.binary_data_included_with_the_transaction_see_logs_tab_for_additional_info",
        )}
        displayDivider="block"
        titleProps={{
          alignSelf: "flex-start",
        }}
        isLoading={isLoading}
      >
        <RawInputData hex={tx.raw_input} />
      </InfoItem>
      {tx.decoded_input && (
        <InfoItem
          title={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.decoded_input_data",
          )}
          hint={getLanguage(
            "transaction_details_page.evm_details.details_tab_content.decoded_input_data_hint",
          )}
          displayDivider="block"
          overflow="hidden"
          isLoading={isLoading}
          hasSkeleton
        >
          <LogDecodedInputData data={tx.decoded_input} />
        </InfoItem>
      )}
    </DetailsInfoGroup>
  )
}

export default memo(TxDetailsMoreInfoGroup, (prev, next) => {
  return prev.tx === next.tx && prev.isLoading === next.isLoading
})
