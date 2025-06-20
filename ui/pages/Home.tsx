import { Grid, Stack } from "@chakra-ui/react"
import { memo } from "react"
import HomeSearch from "ui/home/HomeSearch"
import HomeValidators from "ui/home/HomeValidators"
import LatestBlocks from "ui/home/LatestBlocks"
import LatestTxs from "ui/home/LatestTxs"
import HomeChart from "ui/home/indicators/HomeChart"

const Home = () => {
  return (
    <Stack
      gap={{
        base: 4,
        lg: 5,
      }}
    >
      <HomeSearch />
      <Grid
        maxWidth="full"
        templateColumns={{
          base: "100%",
          lg: "1fr 23.275rem",
          "2lg": "1fr 27.5rem",
        }}
        gridTemplateAreas={{
          base: `
          "blocks"
          "chart"
          "txs"
          "validators"
          `,
          lg: `
          "blocks blocks"
          "chart chart"
          "txs validators"
          `,
          "2lg": `
          "blocks chart"
          "blocks validators"
          "txs validators"
          `,
        }}
        gap={{
          base: 4,
          lg: 5,
        }}
        width="100%"
      >
        <HomeChart gridArea="chart" />
        <LatestBlocks gridArea="blocks" />
        <LatestTxs gridArea="txs" />
        <HomeValidators gridArea="validators" />
      </Grid>
    </Stack>
  )
}

export default memo(Home, () => true)
