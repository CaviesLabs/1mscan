import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { memo, useEffect } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { VALIDATOR_DETAIL } from "stubs/validator"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import ValidatorBondedChange from "ui/validator/ValidatorBondedChange"
import ValidatorDelegators from "ui/validator/ValidatorDelegators"
import ValidatorDetails from "ui/validator/ValidatorDetails"
import ValidatorOverview from "ui/validator/ValidatorOverview"
import ValidatorProposedBlocks from "ui/validator/ValidatorProposedBlocks"
import ValidatorVotes from "ui/validator/ValidatorVotes"
import { getValidatorAPR } from "ui/validators/apr"

const Validator = () => {
  const [hash] = useSetStateQuery<string>("hash")

  const { showBoundary } = useErrorBoundary()

  const { data: stakingPool } = useApiQuery("params_staking_pool", {
    queryOptions: {},
  })

  const { data: mint } = useApiQuery("params_mint", {
    queryOptions: {},
  })

  const {
    data: validator,
    isPlaceholderData,
    error,
  } = useApiQuery("validator", {
    pathParams: {
      address: hash,
    },
    queryOptions: {
      placeholderData: VALIDATOR_DETAIL,
      select: (data) => {
        return {
          ...data,
          apr: getValidatorAPR(
            stakingPool?.pool.bonded_tokens,
            mint?.params.token_release_schedule,
            data?.commission.commission_rates.rate,
          ).toFixed(2),
        }
      },
    },
  })

  const { data: counters, isFetching: isCounterFetching } = useApiQuery(
    "validator_counters",
    {
      pathParams: {
        address: hash,
      },
    },
  )

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  const isLoading = isPlaceholderData

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        title={getLanguage("validator_page.page_title")}
      />
      <ValidatorDetails
        hash={hash}
        isLoading={isLoading}
        validator={validator}
      />
      <ScrollTab
        marginTop={8}
        cleanupOnTabChange={{ keepQueries: ["hash"] }}
        tabs={[
          {
            id: "overview",
            title: getLanguage("validator_page.tabs.overview"),
            component: ValidatorOverview,
            props: {
              hash,
              validator,
              isLoading,
            },
          },
          {
            id: "bonded-token-change",
            title: getLanguage("validator_page.tabs.bonded_token_change"),
            component: ValidatorBondedChange,
            isCounterLoading: isCounterFetching,
            count:
              (counters?.total_delegations || 0) +
              (counters?.total_undelegations || 0) +
              (counters?.total_redelegations || 0),
            props: {
              hash,
              counters,
              isLoading,
            },
          },
          {
            id: "delegators",
            title: getLanguage("validator_page.tabs.delegators"),
            component: ValidatorDelegators,
            isCounterLoading: isCounterFetching,
            count: counters?.total_delegators,
            props: {
              hash,
              isLoading,
            },
          },
          {
            id: "votes",
            title: getLanguage("validator_page.tabs.votes"),
            component: ValidatorVotes,
            isCounterLoading: isCounterFetching,
            count: counters?.total_votes,
            props: {
              hash,
              isLoading,
            },
          },
          {
            id: "proposed-blocks",
            title: getLanguage("validator_page.tabs.proposed_blocks"),
            component: ValidatorProposedBlocks,
            isCounterLoading: isCounterFetching,
            count: counters?.total_proposed_blocks,
            props: {
              hash,
              isLoading,
            },
          },
        ]}
      />
    </>
  )
}

export default memo(Validator, () => true)
