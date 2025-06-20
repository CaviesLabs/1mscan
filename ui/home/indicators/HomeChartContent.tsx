import { Box, Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useLastSync } from "lib/hooks/useLastSync"
import { memo } from "react"
import DataListDisplay from "ui/shared/DataListDisplay"
import Hint from "ui/shared/Hint"
import ChartGraphic from "./ChartGraphic"

type Props = {
  data:
    | {
        labels: Date[]
        data: string[]
        valueFormatter: (value: string) => string
        name: string
      }
    | undefined
  isError: boolean
  isPending: boolean
  dataUpdatedAt: number
}

const ChainIndicatorChartContainerV3 = ({
  data,
  isError,
  isPending,
  dataUpdatedAt,
}: Props) => {
  const lastSync = useLastSync(dataUpdatedAt, [data])

  return (
    <DataListDisplay
      minHeight={{
        base: "14.15rem",
        lg: "9.375rem",
        "2lg": "unset",
      }}
      loadingProps={{
        minHeight: "none",
      }}
      gap="0.15rem"
      isLoading={isPending}
      isError={isError}
      paddingX={{ base: 2, lg: 3 }}
      paddingTop={{ base: 2, lg: 3 }}
      paddingBottom={{ base: 1, lg: 2 }}
      flexDirection="column"
      flex={1}
      position="relative"
      display="flex"
      isEmpty={!data}
    >
      <ChartGraphic data={data!} />
      <Flex
        alignItems="center"
        fontSize={{ base: "9px", md: "xs" }}
        bg="#80808021"
        borderRadius="8px"
        paddingY="0px"
        paddingRight="2px"
        paddingLeft="6px"
        flexWrap="wrap"
        display="inline-flex"
        width="fit-content"
        columnGap="1ch"
      >
        <Box flexShrink={0}>
          {getLanguage(
            "main_homepage.overview_chart.market_data_powered_by_coingecko_api",
          )}
        </Box>{" "}
        <Hint
          label={`${getLanguage("utils.last_sync")}: ${lastSync}`}
          boxSize={4}
          color="gray.600"
          tooltipProps={{
            offset: [0, 0],
            fontSize: "12px",
            borderRadius: "md",
            placement: "bottom-end",
            bgColor: "blackAlpha.900",
          }}
        />
      </Flex>
    </DataListDisplay>
  )
}

export default memo(ChainIndicatorChartContainerV3, (prev, next) => {
  return (
    prev.data === next.data &&
    prev.isError === next.isError &&
    prev.isPending === next.isPending &&
    prev.dataUpdatedAt === next.dataUpdatedAt
  )
})
