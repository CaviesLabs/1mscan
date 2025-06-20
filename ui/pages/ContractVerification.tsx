import { memo } from "react"
import ContractVerificationForm from "ui/contractVerification/ContractVerificationForm"
import ContractVerificationSkeleton from "ui/contractVerification/ContractVerificationSkeleton"
import useFormConfigQuery from "ui/contractVerification/useFormConfigQuery"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"

const ContractVerification = () => {
  const configQuery = useFormConfigQuery(true)

  return (
    <>
      <PageTitle title="Verify & publish EVM contract" hasDefaultBackLink />
      <DataListDisplay
        mt={8}
        isLoading={configQuery.isPending}
        isError={configQuery.isError}
        placeholder={
          <ContractVerificationSkeleton></ContractVerificationSkeleton>
        }
      >
        <ContractVerificationForm config={configQuery.data!} />
      </DataListDisplay>
    </>
  )
}

export default memo(ContractVerification, () => true)
