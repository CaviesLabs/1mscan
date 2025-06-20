import { Flex, HStack, Skeleton, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { useMemo } from "react"
import { type Proposal, ProposalStatus } from "types/api/proposal"
import Divider from "ui/shared/Divider"
import Tag from "ui/shared/chakra/Tag"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import type { ICalculatedIndicators } from "../utils"
import ProposalDetailsStatsLayout from "./ProposalDetailsStatsLayout"
import ProposalIsExpeditedTag from "./ProposalIsExpeditedTag"
import ProposalMostVotedOn from "./ProposalMostVotedOn"

type Props = {
  proposal: Proposal | undefined
  isLoading: boolean
  calculated: ICalculatedIndicators
}

const ProposalDetailsStats = ({ proposal, isLoading, calculated }: Props) => {
  const mostVotedOn = useMemo(() => {
    if (
      !proposal ||
      !proposal.status ||
      proposal.status !== ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD ||
      !calculated
    ) {
      return undefined
    }
    const max = BigNumber.max(
      calculated.yes!,
      calculated.no!,
      calculated.no_with_veto!,
      calculated.abstain!,
    )
    if (!max.gt(0)) {
      return undefined
    }
    if (max.eq(calculated.yes!)) {
      return "yes"
    }
    if (max.eq(calculated.no!)) {
      return "no"
    }
    if (max.eq(calculated.no_with_veto!)) {
      return "no_with_veto"
    }
    if (max.eq(calculated.abstain!)) {
      return "abstain"
    }
  }, [proposal?.status, calculated])
  return (
    <Flex gap={6} flexDirection={{ base: "column", lg: "row" }} flexWrap="wrap">
      {mostVotedOn && (
        <>
          <Divider
            orientation={{
              base: "horizontal",
              lg: "vertical",
            }}
            isLoading={isLoading}
            alignSelf="stretch"
            backgroundColor="neutral.light.3"
            height={{
              base: "1px",
              lg: "unset",
            }}
            display={{ lg: "none" }}
          />
          <ProposalDetailsStatsLayout
            isLoading={isLoading}
            title="Most voted on"
          >
            <ProposalMostVotedOn
              isLoading={isLoading}
              highlight={mostVotedOn}
              calculated={calculated}
            />
          </ProposalDetailsStatsLayout>
          <Divider
            orientation={{
              base: "horizontal",
              lg: "vertical",
            }}
            isLoading={isLoading}
            alignSelf="stretch"
            backgroundColor="neutral.light.3"
            height={{
              base: "1px",
              lg: "unset",
            }}
          />
        </>
      )}

      {(proposal?.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD ||
        proposal?.status === ProposalStatus.PROPOSAL_STATUS_PASSED ||
        proposal?.status === ProposalStatus.PROPOSAL_STATUS_REJECTED ||
        proposal?.status === ProposalStatus.PROPOSAL_STATUS_FAILED) && (
        <>
          <ProposalDetailsStatsLayout
            isLoading={isLoading}
            title="Turnout / Quorum"
          >
            <Skeleton isLoaded={!isLoading}>
              <Text textStyle="1500" color="neutral.light.8">
                {`${Number(proposal?.turnout || 0).toFixed(2)}%`} /{" "}
                {`${(Number(calculated?.quorum || 0) * 100).toFixed(2)}%`}
              </Text>
            </Skeleton>
          </ProposalDetailsStatsLayout>

          <Divider
            orientation={{
              base: "horizontal",
              lg: "vertical",
            }}
            isLoading={isLoading}
            alignSelf="stretch"
            backgroundColor="neutral.light.3"
            height={{
              base: "1px",
              lg: "unset",
            }}
          />
        </>
      )}

      <ProposalDetailsStatsLayout isLoading={isLoading} title="Proposer">
        <AddressEntityV2
          address={{
            hash: proposal?.proposer_address,
            name: "",
          }}
          isLoading={isLoading}
          headLength={8}
          tailLength={8}
          truncation="dynamic"
          lineHeight="1rem"
          fontSize="0.8125rem"
          fontWeight={400}
        />
      </ProposalDetailsStatsLayout>

      <Divider
        orientation={{
          base: "horizontal",
          lg: "vertical",
        }}
        isLoading={isLoading}
        alignSelf="stretch"
        backgroundColor="neutral.light.3"
        height={{
          base: "1px",
          lg: "unset",
        }}
      />

      <ProposalDetailsStatsLayout isLoading={isLoading} title="Type">
        <HStack spacing={2} flexWrap="wrap">
          {proposal?.is_onchain_expedited && (
            <ProposalIsExpeditedTag
              isLoading={isLoading}
              calculated={calculated}
            />
          )}
          <Tag
            colorScheme="gray"
            isLoading={isLoading}
            maxWidth={{
              base: "full",
              lg: "9rem",
            }}
            isTruncated
            hasTooltip
          >
            {proposal?.type}
          </Tag>
        </HStack>
      </ProposalDetailsStatsLayout>

      <Divider
        orientation={{
          base: "horizontal",
          lg: "vertical",
        }}
        isLoading={isLoading}
        alignSelf="stretch"
        backgroundColor="neutral.light.3"
        height={{
          base: "1px",
          lg: "unset",
        }}
      />

      <ProposalDetailsStatsLayout isLoading={isLoading} title="Created tx">
        <TxEntityV2
          hash={proposal?.tx_hash_submit_proposal}
          isLoading={isLoading}
          width={{
            base: "full",
            lg: "8rem",
          }}
        />
      </ProposalDetailsStatsLayout>

      <Divider
        orientation={{
          base: "horizontal",
          lg: "vertical",
        }}
        isLoading={isLoading}
        alignSelf="stretch"
        backgroundColor="neutral.light.3"
        height={{
          base: "1px",
          lg: "unset",
        }}
        display={{ lg: "none" }}
      />
    </Flex>
  )
}

export default ProposalDetailsStats
