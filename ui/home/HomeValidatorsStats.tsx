import { Grid, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import SkeletonText from "ui/shared/text/SkeletonText"
import { mapCounters } from "ui/validators/NumberWidgetsList"
import HomeValidatorsStat from "./HomeValidatorsStat"

type Props = {}

const HomeValidatorsStats = (props: Props) => {
  const { data, isPlaceholderData } = useApiQuery("validators_stats", {
    queryOptions: {
      placeholderData: [],
      select: mapCounters,
    },
  })
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" gap={2} color="neutral.light.8">
      <HomeValidatorsStat
        title={getLanguage("main_homepage.validators_section.active")}
      >
        <SkeletonText
          isLoading={isPlaceholderData}
          display="flex"
          gap={1}
          alignItems="center"
        >
          <Text textStyle="1500">{data?.activeValidators}</Text>
          <Text color="accent.blue" textStyle="8125" lineHeight="normal">
            /
          </Text>
          <Text color="accent.blue" textStyle="8125" lineHeight="normal">
            {data?.totalValidators}
          </Text>
        </SkeletonText>
      </HomeValidatorsStat>
      <HomeValidatorsStat
        title={getLanguage("main_homepage.validators_section.bonded_tokens")}
      >
        <SkeletonText isLoading={isPlaceholderData} textStyle="1500">
          {data?.bondedToken}
        </SkeletonText>
      </HomeValidatorsStat>
      <HomeValidatorsStat
        title={getLanguage("main_homepage.validators_section.avg_commission")}
      >
        <SkeletonText isLoading={isPlaceholderData} textStyle="1">
          5%
        </SkeletonText>
      </HomeValidatorsStat>
      <HomeValidatorsStat
        title={getLanguage("main_homepage.validators_section.block_time")}
      >
        <SkeletonText isLoading={isPlaceholderData} textStyle="1">
          0.3s
        </SkeletonText>
      </HomeValidatorsStat>
    </Grid>
  )
}

export default memo(HomeValidatorsStats, () => true)
