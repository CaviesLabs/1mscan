import { ProposalVoteOption } from "types/api/proposal"

export const PROPOSAL_OPTION_MAP = {
  [`${ProposalVoteOption.VOTE_OPTION_YES}`]: {
    color: "secondary.02.text",
    text: "Yes",
  },
  [`${ProposalVoteOption.VOTE_OPTION_NO}`]: {
    color: "secondary.05.text",
    text: "No",
  },

  [`${ProposalVoteOption.VOTE_OPTION_VETO}`]: {
    color: "secondary.01.text",
    text: "No with veto",
  },
  [`${ProposalVoteOption.VOTE_OPTION_ABSTAIN}`]: {
    color: "neutral.light.7",
    text: "Abstain",
  },
  get getValue() {
    return (
      type: string | `${ProposalVoteOption}`,
    ): {
      color: string
      text: string
    } => {
      return (
        this[type] || {
          color: undefined,
          text: "",
        }
      )
    }
  },
}
