import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import NumberWidgetsList from "ui/validators/NumberWidgetsList"
import ValidatorsContent from "ui/validators/ValidatorsContent"
import ValidatorsDelegations from "ui/validators/ValidatorsDelegations"
import ValidatorsDelegators from "ui/validators/ValidatorsDelegators"

type Props = {
  // empty
}

const Validators = ({}: Props) => {
  const { data, isFetching } = useApiQuery("validators_counters", {})
  return (
    <>
      <PageTitle title={getLanguage("validators_page.page_title")} />
      <NumberWidgetsList />
      <ScrollTab
        marginTop="2.5rem"
        cleanupOnTabChange={{ keepQueries: [] }}
        tabs={[
          {
            id: "validators",
            title: getLanguage("validators_page.tabs.validators"),
            isCounterLoading: isFetching,
            count: data?.total_validators,
            component: ValidatorsContent,
            props: {},
          },
          {
            id: "delegations",
            title: getLanguage("validators_page.tabs.delegations"),
            isCounterLoading: isFetching,
            count:
              (data?.total_delegations || 0) +
              (data?.total_undelegations || 0) +
              (data?.total_redelegations || 0),
            component: ValidatorsDelegations,
            props: {
              counters: data,
            },
          },
          {
            id: "delegators",
            title: getLanguage("validators_page.tabs.delegators"),
            isCounterLoading: isFetching,
            count: data?.total_delegators,
            component: ValidatorsDelegators,
            props: {},
          },
        ]}
      />
    </>
  )
}

export default memo(Validators, () => true)
