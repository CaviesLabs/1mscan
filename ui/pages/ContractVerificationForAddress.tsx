import { useRouter } from "next/router"
import React, { memo, useEffect } from "react"

import type { SmartContractVerificationMethod } from "types/api/contract"

import useApiQuery from "lib/api/useApiQuery"
import getQueryParamString from "lib/router/getQueryParamString"
import { setRouter } from "lib/router/setQuery"
import ContractVerificationForm from "ui/contractVerification/ContractVerificationForm"
import ContractVerificationSkeleton from "ui/contractVerification/ContractVerificationSkeleton"
import useFormConfigQuery from "ui/contractVerification/useFormConfigQuery"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"

const ContractVerificationForAddress = () => {
  const router = useRouter()

  const hash = getQueryParamString(router.query.hash)
  const method = getQueryParamString(
    router.query.method,
  ) as SmartContractVerificationMethod

  const contractQuery = useApiQuery("contract", {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
    },
  })

  if (contractQuery.isError && contractQuery.error.status === 404) {
    throw Error("Not found", {
      cause: contractQuery.error as unknown as Error,
    })
  }

  const configQuery = useFormConfigQuery(Boolean(hash))

  React.useEffect(() => {
    if (method && hash) {
      router.replace(
        { pathname: "/address/[hash]/contract-verification", query: { hash } },
        undefined,
        { scroll: false, shallow: true },
      )
    }
    // onMount only
  }, [])

  const isVerifiedContract =
    contractQuery.data?.is_verified && !contractQuery.data.is_partially_verified

  useEffect(() => {
    if (isVerifiedContract) {
      setRouter(
        "/address/[hash]",
        { hash, tab: "contract" },
        {
          cleanQuery: true,
        },
      )
    }
  }, [hash, isVerifiedContract, router])

  return (
    <>
      <PageTitle title="Verify & publish contract (EVM)" hasDefaultBackLink />

      <DataListDisplay
        mt={8}
        isError={configQuery.isError || !hash || contractQuery.isError}
        isLoading={configQuery.isPending || contractQuery.isPending}
        placeholder={
          <ContractVerificationSkeleton></ContractVerificationSkeleton>
        }
      >
        <ContractVerificationForm
          method={
            method && configQuery.data!.verification_options.includes(method)
              ? method
              : undefined
          }
          config={configQuery.data!}
          hash={hash}
        />
      </DataListDisplay>
    </>
  )
}

export default memo(ContractVerificationForAddress, () => true)
