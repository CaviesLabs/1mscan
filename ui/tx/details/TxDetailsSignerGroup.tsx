import { memo } from "react"
import type { Transaction } from "types/api/transaction"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"

type Props = {
  tx: Transaction<"Cosmos">
  isLoading?: boolean
}

const TxDetailsSignerGroup = ({ tx, isLoading }: Props) => {
  return (
    <DetailsInfoGroup backgroundColor="neutral.light.1" overflow="hidden">
      {tx.signers?.map((signer, index, array) => {
        return (
          <InfoItem
            title={`${array.length > 1 ? `Signer ${index + 1}` : "Signed by"}`}
            hint="Address (external or contract) signed the transaction"
            displayDivider="block"
            isLoading={isLoading}
          >
            <AddressEntityV2
              truncation="tail"
              address={{
                hash: signer,
              }}
              isLoading={isLoading}
            />
          </InfoItem>
        )
      })}
    </DetailsInfoGroup>
  )
}

export default memo(
  TxDetailsSignerGroup,
  (prev, next) => prev.tx === next.tx && prev.isLoading === next.isLoading,
)
