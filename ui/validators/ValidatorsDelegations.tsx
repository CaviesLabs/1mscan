import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { ValidatorsCountersResponse } from "types/api/validator"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import ValidatorsDelegationsDelegate from "./ValidatorsDelegationsDelegate"
import ValidatorsDelegationsRedelegate from "./ValidatorsDelegationsRedelegate"
import ValidatorsDelegationsUndelegate from "./ValidatorsDelegationsUndelegate"

type Props = {
  isActive?: boolean
  counters: ValidatorsCountersResponse | undefined
}

const ValidatorsDelegations = ({ isActive, counters }: Props) => {
  return (
    <ScrollTabFloat
      id="delegations"
      cleanupOnTabChange={{
        keepQueries: ["tab"],
      }}
      isActive={isActive}
      listProps={{
        width: "full",
        borderBottomColor: "neutral.light.4",
        borderBottomWidth: "1px",
        paddingBottom: "7px",
      }}
      tabs={[
        {
          id: "delegate",
          title: getLanguage(
            "validators_page.delegations.tabs.delegations",
          ),
          count: counters?.total_delegations,
          component: ValidatorsDelegationsDelegate,
          props: {},
        },

        {
          id: "undelegate",
          title: getLanguage(
            "validators_page.delegations.tabs.un_delegations",
          ),
          count: counters?.total_undelegations,
          component: ValidatorsDelegationsUndelegate,
          props: {},
        },
        {
          id: "redelegate",
          title: getLanguage(
            "validators_page.delegations.tabs.re_delegations",
          ),
          count: counters?.total_redelegations,
          component: ValidatorsDelegationsRedelegate,
          props: {},
        },
      ]}
    />
  )
}

export default memo(ValidatorsDelegations, (prev, next) => {
  return prev.isActive === next.isActive && prev.counters === next.counters
})
