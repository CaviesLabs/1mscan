import { Box } from "@chakra-ui/react"

import PageTitle from "ui/shared/Page/PageTitle"

import { memo } from "react"
import ChartsWidgetsList from "../stats/ChartsWidgetsList"
import NumberWidgetsList from "../stats/NumberWidgetsList"
import StatsFilters from "../stats/StatsFilters"
import useStats from "../stats/useStats"

const Stats = () => {
  const {
    isPlaceholderData,
    isError,
    sections,
    currentSection,
    handleSectionChange,
    interval,
    handleIntervalChange,
    handleFilterChange,
    displayedCharts,
    filterQuery,
  } = useStats()

  return (
    <>
      <PageTitle title="SEI stats" />

      <Box mt={8} mb={{ base: 6, sm: 8 }}>
        <NumberWidgetsList />
      </Box>

      <Box mb={{ base: 6, sm: 8 }}>
        <StatsFilters
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          interval={interval}
          onIntervalChange={handleIntervalChange}
          onFilterInputChange={handleFilterChange}
        />
      </Box>

      <ChartsWidgetsList
        filterQuery={filterQuery}
        isError={isError}
        isPlaceholderData={isPlaceholderData}
        charts={displayedCharts}
        interval={interval}
      />
    </>
  )
}

export default memo(Stats, () => true)
