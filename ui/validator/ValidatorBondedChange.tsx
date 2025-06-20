import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { ValidatorCounterResponse } from "types/api/validator"
import ScrollTabFloat from "ui/shared/Tabs/ScrollTabFloat"
import ValidatorBondedChangeDelegate from "./ValidatorBondedChangeDelegate"
import ValidatorBondedChangeRedelegate from "./ValidatorBondedChangeRedelegate"
import ValidatorBondedChangeUndelegate from "./ValidatorBondedChangeUndelegate"

type Props = {
  isActive?: boolean
  hash: string
  counters: ValidatorCounterResponse | undefined
}

const ValidatorBondedChange = ({ isActive, hash, counters }: Props) => {
  return (
    <ScrollTabFloat
      id="delegations"
      cleanupOnTabChange={{
        keepQueries: ["hash", "tab"],
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
            "validator_page.bonded_token_change.tabs.delegations",
          ),
          count: counters?.total_delegations,
          component: ValidatorBondedChangeDelegate,
          props: {
            hash,
          },
        },

        {
          id: "undelegate",
          title: getLanguage(
            "validator_page.bonded_token_change.tabs.un_delegations",
          ),
          count: counters?.total_undelegations,
          component: ValidatorBondedChangeUndelegate,
          props: {
            hash,
          },
        },
        {
          id: "redelegate",
          title: getLanguage(
            "validator_page.bonded_token_change.tabs.re_delegations",
          ),
          count: counters?.total_redelegations,
          component: ValidatorBondedChangeRedelegate,
          props: {
            hash,
          },
        },
      ]}
    />
  )
}

export default memo(ValidatorBondedChange, (prev, next) => {
  return (
    prev.isActive === next.isActive &&
    prev.hash === next.hash &&
    prev.counters === next.counters
  )
})
