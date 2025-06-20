import BigNumber from "bignumber.js"
import moment, { type Moment } from "moment"
import type { IMint, IStakingPool } from "types/api/chain"
import type {
  Validator,
  ValidatorWithAdditionalInfo,
} from "types/api/validator"

const getSortedReleaseSchedule = (
  schedule: IMint["params"]["token_release_schedule"],
): {
  startDate: Moment
  endDate: Moment
  tokenReleaseAmount: number
}[] => {
  if (!schedule) return []
  return schedule
    .map((item) => ({
      startDate: moment(item.start_date),
      endDate: moment(item.end_date),
      tokenReleaseAmount: Number(item.token_release_amount),
    }))
    .sort((a, b) => a.startDate.diff(b.startDate))
}

const calculateDaysInclusive = (start: Moment, end: Moment): number => {
  return Math.round(end.diff(start, "days", true)) + 1
}

const getUpcomingMintTokens = (
  start: Moment,
  daysAhead: number,
  schedule: IMint["params"]["token_release_schedule"],
): number => {
  const end = start.clone().add(daysAhead, "days")
  const sortedSchedule = getSortedReleaseSchedule(schedule)

  let total = 0

  for (const item of sortedSchedule) {
    if (!item.endDate.isBefore(start)) {
      if (item.startDate.isAfter(end)) break

      const fullPeriodDays = calculateDaysInclusive(
        item.startDate,
        item.endDate,
      )

      if (item.startDate.isBefore(start)) {
        const overlapEnd = moment.min(
          end.clone().subtract(1, "days"),
          item.endDate,
        )
        const overlapDays = calculateDaysInclusive(start, overlapEnd)
        total += (overlapDays / fullPeriodDays) * item.tokenReleaseAmount
      } else if (item.endDate.isAfter(end)) {
        const overlapDays = Math.round(end.diff(item.startDate, "days", true))
        total += (overlapDays / fullPeriodDays) * item.tokenReleaseAmount
      } else {
        total += item.tokenReleaseAmount
      }
    }
  }

  return total
}

const estimateStakingAPR = (
  bonded_tokens: string,
  tokenReleaseSchedule: IMint["params"]["token_release_schedule"],
  days = 365,
): number => {
  const bondedTokens = Number(bonded_tokens)
  if (!bondedTokens || bondedTokens <= 0) return 0

  const now = moment()
  const totalRelease = getUpcomingMintTokens(now, days, tokenReleaseSchedule)

  const apr = totalRelease / bondedTokens
  return apr
}

export const getValidatorAPR = (
  bonded_tokens: IStakingPool["pool"]["bonded_tokens"] | undefined,
  token_release_schedule: IMint["params"]["token_release_schedule"] | undefined,
  commission: string | number,
) => {
  const chainAPR = estimateStakingAPR(bonded_tokens!, token_release_schedule)
  const apr = chainAPR * (100 - Number(commission))
  return apr
}

export const mapValidatorsAPR = (
  bonded_tokens: IStakingPool["pool"]["bonded_tokens"] | undefined,
  token_release_schedule: IMint["params"]["token_release_schedule"] | undefined,
  validators: Validator[],
  options?: {
    slice?: boolean
  },
) => {
  if (!bonded_tokens || !token_release_schedule) {
    return validators
      .sort((a, b) =>
        BigNumber(b.voting_power_amount).isGreaterThan(a.voting_power_amount)
          ? 1
          : -1,
      )
      .slice(0, options?.slice ? 4 : undefined) as ValidatorWithAdditionalInfo[]
  }

  const chainAPR = estimateStakingAPR(bonded_tokens, token_release_schedule)

  return validators
    .map((validator) => {
      const apr =
        chainAPR * (100 - Number(validator.commission.replace("%", "")))
      return {
        ...validator,
        operator_address: validator.operator_address?.toLowerCase(),
        apr: apr,
      } as ValidatorWithAdditionalInfo
    })
    .sort((a, b) => b.apr - a.apr)
    .slice(0, options?.slice ? 4 : undefined)
}
