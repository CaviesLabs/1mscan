import {
  Box,
  Grid,
  Heading,
  List,
  ListItem,
  Skeleton,
  Text,
} from "@chakra-ui/react"
import { useCallback, useState } from "react"

import type { StatsChartsSection } from "types/api/stats"
import type { StatsIntervalIds } from "types/client/stats"

import { apos } from "lib/html-entities"
import EmptySearchResult from "ui/shared/EmptySearchResult"

import ChartWidgetContainer from "./ChartWidgetContainer"
import ChartsLoadingErrorAlert from "./ChartsLoadingErrorAlert"

type Props = {
  filterQuery: string
  isError: boolean
  isPlaceholderData: boolean
  charts?: Array<StatsChartsSection>
  interval: StatsIntervalIds
}

const ChartsWidgetsList = ({
  filterQuery,
  isError,
  isPlaceholderData,
  charts,
  interval,
}: Props) => {
  const [isSomeChartLoadingError, setIsSomeChartLoadingError] = useState(false)
  const isAnyChartDisplayed = charts?.some(
    (section) => section.charts.length > 0,
  )
  const isEmptyChartList = Boolean(filterQuery) && !isAnyChartDisplayed

  const handleChartLoadingError = useCallback(
    () => setIsSomeChartLoadingError(true),
    [setIsSomeChartLoadingError],
  )

  if (isError) {
    return <ChartsLoadingErrorAlert />
  }

  if (isEmptyChartList) {
    return (
      <EmptySearchResult
        text={`Couldn${apos}t find a chart that matches your filter query.`}
      />
    )
  }

  return (
    <Box>
      {isSomeChartLoadingError && <ChartsLoadingErrorAlert />}

      <List>
        {charts?.map((section) => (
          <ListItem
            key={section.id}
            mb={8}
            _last={{
              marginBottom: 0,
            }}
          >
            <Skeleton
              isLoaded={!isPlaceholderData}
              mb={4}
              display="inline-block"
            >
              <Heading display="inline-block" size="md">
                {section.title}
              </Heading>
              <Text
                ml={1}
                display="inline-block"
                as="span"
                color="neutral.light.6"
                textStyle="500"
              >
                (EVM only)
              </Text>
            </Skeleton>

            <Grid templateColumns={{ lg: "repeat(2, minmax(0, 1fr))" }} gap={4}>
              {section.charts?.map((chart) => (
                <ChartWidgetContainer
                  key={chart.id}
                  id={chart.id}
                  title={chart.title}
                  description={chart.description}
                  interval={interval}
                  units={chart.units || undefined}
                  isPlaceholderData={isPlaceholderData}
                  onLoadingError={handleChartLoadingError}
                />
              ))}
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ChartsWidgetsList
