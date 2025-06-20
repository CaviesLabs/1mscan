import { Flex, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import { ProposalStatus } from "types/api/proposal"
import IconSvg from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"

const ProposalStatusComponent = (props: {
  status: string | undefined
  isOutline?: boolean
  isLoading?: boolean
}) => {
  const { status, isOutline, isLoading } = props

  const { colorScheme, iconName, title } = useMemo(() => {
    return {
      colorScheme:
        status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
          ? "purple"
          : status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
            ? "orange"
            : status === ProposalStatus.PROPOSAL_STATUS_PASSED
              ? "green"
              : status === ProposalStatus.PROPOSAL_STATUS_REJECTED
                ? "red"
                : status === ProposalStatus.PROPOSAL_STATUS_FAILED
                  ? "red"
                  : status === ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT
                    ? "red"
                    : "gray",
      iconName:
        status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
          ? "deposit"
          : status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
            ? "proposal_loading"
            : status === ProposalStatus.PROPOSAL_STATUS_PASSED
              ? "success"
              : status === ProposalStatus.PROPOSAL_STATUS_REJECTED
                ? "reject"
                : status === ProposalStatus.PROPOSAL_STATUS_FAILED
                  ? "cancel"
                  : status === ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT
                    ? "cancel"
                    : "unspecified",
      title:
        status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
          ? getLanguage("status.deposit_period")
          : status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
            ? getLanguage("status.voting_period")
            : status === ProposalStatus.PROPOSAL_STATUS_PASSED
              ? getLanguage("status.passed")
              : status === ProposalStatus.PROPOSAL_STATUS_REJECTED
                ? getLanguage("status.rejected")
                : status === ProposalStatus.PROPOSAL_STATUS_FAILED
                  ? getLanguage("status.failed")
                  : status === ProposalStatus.PROPOSAL_STATUS_NOT_ENOUGH_DEPOSIT
                    ? getLanguage("status.deposit_failed")
                    : getLanguage("status.unspecified"),
    }
  }, [status])

  return (
    <Tag
      variant={isOutline ? "outline" : undefined}
      colorScheme={colorScheme}
      isLoading={isLoading}
    >
      <Flex alignItems="center" gap={2}>
        <IconSvg name={iconName as any} boxSize="14px" />
        <chakra.span>{title}</chakra.span>
      </Flex>
    </Tag>
  )
}

export default memo(ProposalStatusComponent)
