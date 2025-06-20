import { Flex, Th, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"

import type {
  Validator,
  ValidatorWithAdditionalInfo,
} from "types/api/validator"

import { Thead } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import Hint from "ui/shared/Hint"
import TbodyControl from "ui/shared/TbodyControl"
import ScrollTable from "ui/shared/group/ScrollTable"
import SortIndicator from "ui/shared/table/SortIndicator"
import ValidatorsTableItem from "ui/validators/ValidatorsTableItem"
import type { ICombinedSortApi } from "./utils"

interface Props {
  items: ValidatorWithAdditionalInfo[] | undefined
  isLoading: boolean
  sort: undefined | ICombinedSortApi
  setSort: (nextValue: undefined | ICombinedSortApi) => void
}

const ValidatorsTable = ({ items, isLoading, sort, setSort }: Props) => {
  const itemsSorted = useMemo(() => {
    if (!items) return []
    const newItems = [...items]

    switch (sort) {
      case "voting_power-asc": {
        return newItems.sortByBigNumber("asc", "voting_power_amount")
      }
      case "voting_power-desc": {
        return newItems.sortByBigNumber("desc", "voting_power")
      }
      case "apr-asc":
      case "apr-desc": {
        return newItems.sort((a, b) => {
          const aApr = BigNumber(a?.apr)
          const bApr = BigNumber(b?.apr)
          if (sort === "apr-asc") {
            return aApr.comparedTo(bApr)
          }
          if (sort === "apr-desc") {
            return bApr.comparedTo(aApr)
          }
          return 0
        })
      }
      case "commission-asc":
      case "commission-desc": {
        return newItems.sort((a: Validator, b: Validator) => {
          const aCommission = BigNumber(a?.commission?.replace("%", ""))
          const bCommission = BigNumber(b?.commission.replace("%", ""))
          if (sort === "commission-asc") {
            return aCommission.comparedTo(bCommission)
          }
          if (sort === "commission-desc") {
            return bCommission.comparedTo(aCommission)
          }
          return 0
        })
      }
      case "participation-asc":
      case "participation-desc": {
        return newItems.sort((a: Validator, b: Validator) => {
          const aParticipation = BigNumber(
            a?.participation_percentage.replace("%", ""),
          )
          const bParticipation = BigNumber(
            b?.participation_percentage.replace("%", ""),
          )
          if (sort === "participation-asc") {
            return aParticipation.comparedTo(bParticipation)
          }
          if (sort === "participation-desc") {
            return bParticipation.comparedTo(aParticipation)
          }
          return 0
        })
      }
      case "uptime-asc":
      case "uptime-desc": {
        return newItems.sort((a: Validator, b: Validator) => {
          const aUptime = BigNumber(a?.uptime.replace("%", ""))
          const bUptime = BigNumber(b?.uptime.replace("%", ""))
          if (sort === "uptime-asc") {
            return aUptime.comparedTo(bUptime)
          }
          if (sort === "uptime-desc") {
            return bUptime.comparedTo(aUptime)
          }
          return 0
        })
      }
    }
    return newItems
  }, [items, sort])

  return (
    <ScrollTable variant="v2" sizes={[25, 20, 15, 15, 15, 10]}>
      <Thead>
        <Tr>
          <Th>{getLanguage("validators_page.validators.validator")}</Th>

          <Th textAlign="right">
            <Flex alignItems="center" gap={1} justifyContent="flex-end">
              <Hint
                label={getLanguage(
                  "validators_page.validators.the_more_sei_delegated_to_a_validator_the_higher_the_validator's_voting_power",
                )}
              />
              {getLanguage("validators_page.validators.voting_power")}
              <SortIndicator
                sorting={sort}
                value1="voting_power-desc"
                value2="voting_power-asc"
                onClick={() =>
                  setSort(
                    sort !== "voting_power-asc" && sort !== "voting_power-desc"
                      ? "voting_power-asc"
                      : sort === "voting_power-asc"
                        ? "voting_power-desc"
                        : undefined,
                  )
                }
              ></SortIndicator>
            </Flex>
          </Th>
          <Th textAlign="right">
            <Flex alignItems="center" gap={1} justifyContent="flex-end">
              {getLanguage("validators_page.validators.apr")}
              <SortIndicator
                sorting={sort}
                value1="apr-desc"
                value2="apr-asc"
                onClick={() =>
                  setSort(
                    sort !== "apr-asc" && sort !== "apr-desc"
                      ? "apr-asc"
                      : sort === "apr-asc"
                        ? "apr-desc"
                        : undefined,
                  )
                }
              ></SortIndicator>
            </Flex>
          </Th>
          <Th textAlign="right">
            <Flex alignItems="center" gap={1} justifyContent="flex-end">
              <Hint
                label={getLanguage(
                  "validators_page.validators.the_proportion_of_staking_reward_being_taken_by_the_validator_as_a_commission",
                )}
              />
              {getLanguage("validators_page.validators.commission")}
              <SortIndicator
                sorting={sort}
                value1="commission-desc"
                value2="commission-asc"
                onClick={() =>
                  setSort(
                    sort !== "commission-asc" && sort !== "commission-desc"
                      ? "commission-asc"
                      : sort === "commission-asc"
                        ? "commission-desc"
                        : undefined,
                  )
                }
              ></SortIndicator>
            </Flex>
          </Th>

          <Th textAlign="right">
            <Flex alignItems="center" gap={1} justifyContent="flex-end">
              <Hint
                label={getLanguage(
                  "validators_page.validators.the_rate_is_participation_rate_over_all",
                )}
              />
              {getLanguage("validators_page.validators.participation")}
              <SortIndicator
                sorting={sort}
                value1="participation-desc"
                value2="participation-asc"
                onClick={() =>
                  setSort(
                    sort !== "participation-asc" &&
                      sort !== "participation-desc"
                      ? "participation-asc"
                      : sort === "participation-asc"
                        ? "participation-desc"
                        : undefined,
                  )
                }
              ></SortIndicator>
            </Flex>
          </Th>
          <Th textAlign="right">
            <Flex alignItems="center" gap={1} justifyContent="flex-end">
              <Hint
                label={getLanguage(
                  "validators_page.validators.validator's_availability",
                )}
              />
              {getLanguage("validators_page.validators.uptime")}
              <SortIndicator
                sorting={sort}
                value1="uptime-desc"
                value2="uptime-asc"
                onClick={() =>
                  setSort(
                    sort !== "uptime-asc" && sort !== "uptime-desc"
                      ? "uptime-asc"
                      : sort === "uptime-asc"
                        ? "uptime-desc"
                        : undefined,
                  )
                }
              ></SortIndicator>
            </Flex>
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <TbodyControl>
        {itemsSorted.map((item, index) => (
          <ValidatorsTableItem
            item={item}
            isLoading={isLoading}
            key={generateKey(index, isLoading, item.operator_address)}
          />
        ))}
      </TbodyControl>
    </ScrollTable>
  )
}

export default memo(ValidatorsTable, (prev, next) => {
  return (
    prev.items === next.items &&
    prev.isLoading === next.isLoading &&
    prev.sort === next.sort &&
    prev.setSort === next.setSort
  )
})
