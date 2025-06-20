import BigNumber from "bignumber.js"
import type { Moment } from "moment"
import moment from "moment"
import type {
  Proposal,
  ProposalCountVote,
  ProposalTally,
} from "types/api/proposal"
import { ProposalStatus } from "types/api/proposal"
import type { ITallyParams, IVotingParams } from "./../../types/api/proposal"

export const generateVotingDuration = (from: Moment, to: Moment) => {
  const duration = moment.duration(to.diff(from))

  // Past cases
  if (duration.asSeconds() < 0) {
    const absDuration = moment.duration(-duration)

    // More than one day ago
    if (absDuration.asDays() >= 1) {
      return Math.floor(absDuration.asDays()) === 1
        ? "1 day ago"
        : `${Math.floor(absDuration.asDays())} days ago`
    }

    // Less than one hour ago
    if (absDuration.asHours() < 1) {
      return "less than an hour ago"
    }

    // Exactly one hour ago
    if (Math.floor(absDuration.asHours()) === 1) {
      return "1 hour ago"
    }

    // Multiple hours ago (from 2 to 23 hours)
    if (
      Math.floor(absDuration.asHours()) > 1 &&
      Math.floor(absDuration.asHours()) <= 23
    ) {
      return `${Math.floor(absDuration.asHours())} hours ago`
    }
  }

  // Present cases (today, within the next 24 hours)
  if (duration.asDays() < 1) {
    // Less than one hour from now
    if (duration.asHours() < 1) {
      return "less than an hour"
    }

    // Exactly in one hour
    if (Math.floor(duration.asHours()) === 1) {
      return "in 1 hour"
    }

    // In multiple hours (from 2 to 23 hours)
    if (
      Math.floor(duration.asHours()) > 1 &&
      Math.floor(duration.asHours()) <= 23
    ) {
      return `in ${Math.floor(duration.asHours())} hours`
    }
  }

  // Future cases: more than one day in the future
  if (duration.asDays() >= 1) {
    return Math.floor(duration.asDays()) === 1
      ? "in 1 day"
      : `in ${Math.floor(duration.asDays())} days`
  }

  return ""
}

export const mergeTotalDepositArray = (proposal: Proposal | undefined) => {
  if (!proposal?.total_deposit || !proposal?.total_deposit.length) {
    return BigNumber(0)
  }

  const total = BigNumber.sum(
    ...(proposal.total_deposit || [])
      .filter((item) => item.denom === "usei")
      .map((item) => item.amount || 0),
  )

  if (total.gt(0)) return total
  return BigNumber(0)
}

export const getIsShowVote = (status: any) => {
  return (
    status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD ||
    status === ProposalStatus.PROPOSAL_STATUS_PASSED ||
    status === ProposalStatus.PROPOSAL_STATUS_FAILED ||
    status === ProposalStatus.PROPOSAL_STATUS_REJECTED
  )
}

export const getIsVoteEnded = (status: any) => {
  return (
    status === ProposalStatus.PROPOSAL_STATUS_PASSED ||
    status === ProposalStatus.PROPOSAL_STATUS_FAILED ||
    status === ProposalStatus.PROPOSAL_STATUS_REJECTED
  )
}

export type ICategory = Extract<
  keyof ProposalCountVote,
  "yes" | "no" | "no_with_veto" | "abstain"
>

export const resolveProposalReason = ({
  is_expedited,
  status,
  calculated,
}: {
  is_expedited: boolean
  status: ProposalStatus
  calculated: ICalculatedIndicators
}):
  | string[]
  | undefined
  | ProposalStatus.PROPOSAL_STATUS_PASSED
  | ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT
  | ProposalStatus.PROPOSAL_STATUS_FAILED => {
  if (
    status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
    status === ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED
  ) {
    return undefined
  }
  if (status === ProposalStatus.PROPOSAL_STATUS_PASSED) return status

  if (status === ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT)
    return status

  if (status === ProposalStatus.PROPOSAL_STATUS_FAILED) return status

  if (!calculated) return undefined

  const reasons: string[] = []

  const quorum = calculated[is_expedited ? "expedited_quorum" : "quorum"]!
  if (!quorum) {
    return undefined
  }

  const turnout = calculated.turnout!
  const no_with_veto = calculated.no_with_veto!
  const total = calculated.total || BigNumber(Number.NaN)

  // If there is not enough quorum of votes, the proposal fails
  if (!turnout.gte(quorum)) {
    reasons.push(
      `Quorum no reached (${turnout.times(100).toFormat(2)}%/${quorum.times(100).toFormat(2)}%)`,
    )
  }

  const no_with_veto_per = no_with_veto.div(total)
  const veto_threshold = calculated.veto_threshold!

  // If more than 1/3 of voters veto, proposal fails
  if (no_with_veto_per.gt(veto_threshold)) {
    reasons.push(
      `Veto threshold reached (${no_with_veto_per.times(100).toFormat(2)}%/${veto_threshold.times(100).toFormat(2)}%)`,
    )
  }

  // if not more than threshold of yes votes, proposal fails
  const threshold =
    calculated[is_expedited ? "expedited_threshold" : "threshold"]!
  const yes_per = calculated.yes_per!
  if (yes_per?.gt(threshold)) {
    if (!reasons.length) reasons.push(ProposalStatus.PROPOSAL_STATUS_PASSED)
  } else {
    reasons.push(
      `Threshold not reached (${yes_per?.gt(0) ? yes_per.times(100).toFormat(2) : "0.00"}%/${threshold.times(100).toFormat(2)}%)`,
    )
  }

  if (!reasons.length) {
    reasons.push("Unknown reason")
  }

  if (reasons[0] === ProposalStatus.PROPOSAL_STATUS_PASSED)
    return ProposalStatus.PROPOSAL_STATUS_PASSED

  return reasons
}

export const highLightCategory = ({
  calculated,
  status,
}: {
  calculated: ICalculatedIndicators
  status: ProposalStatus
}): ICategory | undefined => {
  if (
    status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
    status === ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT ||
    status === ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED ||
    !calculated.total
  ) {
    return undefined
  }

  const yes = calculated.yes!
  const no = calculated.no!
  const no_with_veto = calculated.no_with_veto!
  const abstain = calculated.abstain!

  const no_with_veto_per = calculated.no_with_veto_per!
  const veto_threshold = calculated.veto_threshold!

  // If more than 1/3 of voters veto, proposal fails
  if (no_with_veto_per.gt(veto_threshold)) return "no_with_veto"

  const max = BigNumber.max(yes, no, no_with_veto, abstain)

  if (max.eq(yes)) return "yes"
  if (max.eq(no)) return "no"
  if (max.eq(no_with_veto)) return "no_with_veto"
  if (max.eq(abstain)) return "abstain"

  return undefined
}

export const CATEGORY_COLORS = {
  yes: "secondary.02",
  no: "secondary.05",
  no_with_veto: "secondary.01",
  abstain: "secondary.06",
}

export const getPercentage = ({
  category,
  calculated,
}: {
  category: ICategory | undefined
  calculated: ICalculatedIndicators | undefined
}) => {
  if (!category || !calculated?.total)
    return {
      percentage: BigNumber(0),
      isSmall: false,
    }
  const value = BigNumber(calculated[category] || 0)
  const total = calculated.total
  const percent = value.div(total).times(100)
  if (percent.isNaN())
    return {
      percentage: BigNumber(0),
      isSmall: false,
    }

  if (percent.lt(0.01))
    return {
      percentage: BigNumber(0),
      isSmall: true,
    }
  return {
    percentage: percent,
    isSmall: false,
  }
}

export type ICalculatedIndicators = Partial<{
  yes: BigNumber
  no: BigNumber
  no_with_veto: BigNumber
  abstain: BigNumber
  total: BigNumber
  yes_per: BigNumber
  no_per: BigNumber
  no_with_veto_per: BigNumber
  abstain_per: BigNumber
  quorum: BigNumber
  turnout: BigNumber
  threshold: BigNumber
  veto_threshold: BigNumber
  expedited_quorum: BigNumber
  expedited_threshold: BigNumber
  voting_period: string
  expedited_voting_period: string
}>

export const calculateIndicators = ({
  tally,
  tally_params,
  voting_params,
  turnout: _turnout,
}: {
  tally: ProposalTally | undefined
  tally_params: ITallyParams | undefined
  voting_params: IVotingParams | undefined
  turnout: number | undefined
}): ICalculatedIndicators => {
  if (!tally || !tally_params || !voting_params) return {}
  const quorum = BigNumber(tally_params.quorum)
  const turnout = BigNumber(_turnout || 0)
  const threshold = BigNumber(tally_params.threshold)
  const veto_threshold = BigNumber(tally_params.veto_threshold)
  const expedited_quorum = BigNumber(tally_params.expedited_quorum)
  const expedited_threshold = BigNumber(tally_params.expedited_threshold)
  const voting_period = voting_params.voting_period
  const expedited_voting_period = voting_params.expedited_voting_period

  const yes = BigNumber(tally?.yes || 0)
  const no = BigNumber(tally?.no || 0)
  const no_with_veto = BigNumber(tally?.no_with_veto || 0)
  const abstain = BigNumber(tally?.abstain || 0)

  const total = BigNumber.sum(yes, no, no_with_veto, abstain)

  if (!total.gt(0)) {
    return {
      yes,
      no,
      no_with_veto,
      abstain,
      quorum,
      turnout,
      threshold,
      veto_threshold,
      expedited_quorum,
      expedited_threshold,
      voting_period,
      expedited_voting_period,
    }
  }
  const no_with_veto_per = no_with_veto.div(total)
  const abstain_per = abstain.div(total)

  const available = total.minus(abstain)
  if (!available.gt(0)) {
    return {
      yes,
      no,
      no_with_veto,
      abstain,
      total,
      no_with_veto_per,
      abstain_per,
      quorum,
      turnout,
      threshold,
      veto_threshold,
      expedited_quorum,
      expedited_threshold,
      voting_period,
      expedited_voting_period,
    }
  }
  const yes_per = yes.div(available)
  const no_per = no.div(available)

  return {
    yes,
    no,
    no_with_veto,
    abstain,
    total,
    yes_per,
    no_per,
    no_with_veto_per,
    abstain_per,
    quorum,
    turnout,
    threshold,
    veto_threshold,
    expedited_quorum,
    expedited_threshold,
    voting_period,
    expedited_voting_period,
  }
}
