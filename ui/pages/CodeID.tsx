import useApiQuery from "lib/api/useApiQuery"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useEffect } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { CONTRACT_CODE } from "stubs/codeID"
import CodeIDContracts from "ui/codeID/CodeIDContracts"
import CodeIDDetails from "ui/codeID/CodeIDDetails"
import CodeIDVerifieds from "ui/codeID/CodeIDVerifieds"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"

type Props = {
  //
}

const CodeID = ({}: Props) => {
  const { showBoundary } = useErrorBoundary()
  const [codeId] = useSetStateQuery<string>("id", [])
  const { data, isPlaceholderData, error } = useApiQuery("contract_code", {
    pathParams: {
      codeId: codeId,
    },
    queryOptions: {
      placeholderData: CONTRACT_CODE,
    },
  })

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        title={`CW Code ID #${codeId} details`}
      ></PageTitle>

      <CodeIDDetails codeId={codeId}></CodeIDDetails>

      <ScrollTab
        mt={8}
        cleanupOnTabChange={{ keepQueries: ["id"] }}
        isLoading={isPlaceholderData}
        tabs={[
          {
            id: "contracts",
            title: "Contracts",
            count: Number(data?.smart_contracts_count || 0),
            component: CodeIDContracts,
            props: {
              codeId,
            },
          },
          {
            id: "verify_code_id",
            title: "Verify Code ID",
            comingSoon: true,
            component: CodeIDVerifieds,
            props: {
              codeId,
            },
          },
        ]}
      ></ScrollTab>
    </>
  )
}

export default memo(CodeID, () => true)
