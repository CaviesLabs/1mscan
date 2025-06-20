import { Grid } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import { memo } from "react"
import NumberWidget from "ui/shared/NumberWidget"

type Props = {
  //
}

const NumberWidgetList = ({ ...props }: Props) => {
  const { data, isFetched } = useApiQuery("contract_codes_stats")
  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        isLoading={!isFetched}
        index={0}
        label="Total Code IDs"
        value={formatLargeNumber(data?.total_codes, { decimals: 0 })}
      />
      <NumberWidget
        isLoading={!isFetched}
        index={1}
        label="Total Verified Code IDs"
        value={formatLargeNumber(data?.total_verified_codes, { decimals: 0 })}
      />
      <NumberWidget
        isLoading={!isFetched}
        index={2}
        label="Total Verified COSMOS Contracts"
        value={formatLargeNumber(data?.total_verified_contracts, {
          decimals: 0,
        })}
      />
    </Grid>
  )
}

export default memo(NumberWidgetList, () => true)
