import { Stack, Td, Tr } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { IValidatorVote } from "types/api/validator"
import ProposalStatus from "ui/proposal/ProposalStatus"
import ProposalIsExpeditedTag from "ui/proposal/stats/ProposalIsExpeditedTag"
import ProposalTypeTag from "ui/proposal/stats/ProposalTypeTag"
import { PROPOSAL_OPTION_MAP } from "ui/proposal/types"
import LinkInternal from "ui/shared/LinkInternal"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  item: IValidatorVote
  isLoading?: boolean
}

const ValidatorVotesTableItem = ({ item, isLoading }: Props) => {
  const { color, text } = useMemo(() => {
    if (item.vote === "DID_NOT_VOTE") {
      return {
        color: "neutral.light.7",
        text: getLanguage("validator_page.votes.did_not_vote"),
      }
    }
    return PROPOSAL_OPTION_MAP.getValue(item.vote?.vote_option!)
  }, [item.vote])

  const submitedAgo = useTimeAgoIncrement(item.submit_time)

  return (
    <Tr role="group">
      <Td>
        <LinkInternal
          isLoading={isLoading}
          isScrollTop
          href={route({
            pathname: "/proposal/[id]",
            query: { id: item.proposal_id.toString() },
          })}
        >
          #{item.proposal_id}
        </LinkInternal>
      </Td>

      <Td>
        <Stack gap={1} overflow="hidden">
          <SkeletonText
            color="neutral.light.7"
            fontWeight={700}
            isLoading={isLoading}
          >
            {item.title}
          </SkeletonText>

          <Stack gap={2} overflow="hidden">
            {item.is_onchain_expedited && (
              <ProposalIsExpeditedTag isLoading={isLoading} />
            )}
            <ProposalTypeTag isLoading={isLoading} type={item.type} />
          </Stack>
        </Stack>
      </Td>

      <Td>
        <Stack gap={1} overflow="hidden" maxWidth="13rem">
          {typeof item.vote === "object" && (
            <TxEntityV2 hash={item.vote?.txhash} isLoading={isLoading} />
          )}
          {item.submit_time && (
            <SkeletonText
              color="neutral.light.5"
              textStyle="8125"
              isLoading={isLoading}
            >
              {submitedAgo}
            </SkeletonText>
          )}
        </Stack>
      </Td>
      <Td>
        <SkeletonText isLoading={isLoading} color={color}>
          {text}
        </SkeletonText>
      </Td>

      <Td textAlign="right">
        <ProposalStatus status={item.status} isLoading={isLoading} />
      </Td>
    </Tr>
  )
}

export default memo(ValidatorVotesTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
