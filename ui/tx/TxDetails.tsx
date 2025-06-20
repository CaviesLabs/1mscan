import { Alert, Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { currentChainConfig } from "lib/hooks/useCurrentChain"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { NativeMessage, Transaction } from "types/api/transaction"
import type { OSType } from "types/base"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { default as InfoItem } from "ui/shared/group/InfoItem"
import TxDetailsFeeGroup from "./details/TxDetailsFeeGroup"
import TxDetailsMoreInfoGroup from "./details/TxDetailsMoreInfoGroup"
import TxDetailsOverview from "./details/TxDetailsOverview"
import { default as TxDetailsSignerGroup } from "./details/TxDetailsSignerGroup"
import TxMessageGroup from "./details/TxMessageGroup"
import TxTransferGroup from "./details/TxTransferGroup"

type Props = {
  transactionType: OSType | undefined
  data: Transaction | undefined
  isLoading: boolean
  hash: string
}

const TxDetails = ({ transactionType, data, isLoading, hash }: Props) => {
  const associationHash = useMemo(() => {
    if (transactionType === "EVM") {
      return data?.association?.sei_hash
    }
    if (transactionType === "Cosmos") {
      return data?.association?.evm_hash
    }
  }, [data?.association])

  if (!data) {
    return null
  }

  return (
    <Flex flexDirection="column" gap={5} width="full">
      {currentChainConfig?.networkType !== "mainnet" && (
        <Alert variant="verifyContract" colorScheme="orange">
          {getLanguage(
            "transaction_details_page.evm_details.this_is_a_devnet_transaction",
            {
              metadata: {
                networkType: currentChainConfig?.networkType,
              },
            },
          )}
        </Alert>
      )}
      {associationHash && (
        <DetailsInfoGroup
          backgroundColor="neutral.light.1"
          contentProps={{
            gap: 8,
          }}
          overflow="hidden"
        >
          <InfoItem
            title={getLanguage(
              "transaction_details_page.evm_details.details_tab_content.associated_trx_hash",
            )}
            _first={{
              marginTop: 0,
            }}
            hint={getLanguage(
              "transaction_details_page.this_trx_hash_represents_the_corresponding_transaction_on_another_os_evm_native_cosmos",
            )}
            displayDivider="block"
            isLoading={isLoading}
          >
            <TxEntityV2
              isLoading={isLoading}
              hash={associationHash}
              textStyle="1"
            ></TxEntityV2>
          </InfoItem>
        </DetailsInfoGroup>
      )}

      <TxDetailsOverview data={data} isLoading={isLoading} />

      <TxTransferGroup
        tx={data}
        isLoading={isLoading}
        hash={hash}
        transactionType={transactionType}
      />

      {transactionType === "Cosmos" && (
        <>
          {(data as any).native_messages?.map(
            (message: NativeMessage, index) => {
              return (
                <TxMessageGroup
                  key={generateKey(index, isLoading, message.id)}
                  message={message}
                  isLoading={isLoading}
                />
              )
            },
          )}
        </>
      )}

      {transactionType === "Cosmos" &&
        Boolean((data as any).signers?.length) && (
          <TxDetailsSignerGroup
            tx={data as Transaction<"Cosmos">}
            isLoading={isLoading}
          />
        )}

      <TxDetailsFeeGroup
        tx={data}
        isLoading={isLoading}
        transactionType={transactionType}
      />

      {transactionType === "EVM" && (
        <TxDetailsMoreInfoGroup tx={data} isLoading={isLoading} />
      )}
    </Flex>
  )
}

export default memo(
  TxDetails,
  (prev, next) =>
    prev.data === next.data &&
    prev.transactionType === next.transactionType &&
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading,
)
