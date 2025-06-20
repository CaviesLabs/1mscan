import { Grid } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import type { IStakingPool, ITotalSupply } from "types/api/chain"
import NumberWidget from "ui/shared/NumberWidget"
import GasTracker from "./GasTracker"

type Props = {
  amount: ITotalSupply["amount"]
  pool: IStakingPool["pool"]
  inflation: number
}

/**
 * Calculates the percentage of 'a' in relation to the sum of 'a' and 'b'.
 *
 * @param {BigNumber.Value} a - The value of 'a'.
 * @param {BigNumber.Value} b - The value of 'b'.
 * @returns {string} - The percentage of 'a' relative to the total of 'a' and 'b'.
 */
function calculatePercentage(bonded_tokens: any, total_supply: any): string {
  // Convert a and b to BigNumber instances
  const bondedTokensBn = new BigNumber(bonded_tokens)
  const totalSupplyBn = new BigNumber(total_supply)

  // Calculate the percentage of a relative to the total
  const percentA = bondedTokensBn.dividedBy(totalSupplyBn).multipliedBy(100)

  return percentA.toFormat(2)
}

const NumberWidgetList = ({ amount, pool, inflation, ...props }: Props) => {
  return (
    <Grid
      gridTemplateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }}
      gridGap="0.75rem"
      width="full"
      {...props}
    >
      <NumberWidget
        index={0}
        label="SEI Supply"
        value={formatLargeNumber(amount.amount, { decimals: 6 })}
      />
      <NumberWidget
        index={1}
        label="SEI Bonded"
        value={formatLargeNumber(pool.bonded_tokens, { decimals: 6 })}
      />
      <NumberWidget
        index={2}
        label="Inflation"
        value={`${BigNumber(inflation).toFormat(2)}%`}
      />
      <NumberWidget
        index={3}
        label="Bonded ratio"
        value={`${calculatePercentage(pool.bonded_tokens, amount.amount)}%`}
      />
      <GasTracker></GasTracker>
    </Grid>
  )
}

export default NumberWidgetList
