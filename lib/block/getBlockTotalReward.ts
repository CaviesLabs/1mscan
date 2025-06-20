import BigNumber from "bignumber.js"
import { WEI } from "lib/consts"
import type { Block } from "types/api/block"

export default function getBlockTotalReward(block: Block) {
  return BigNumber.sum(...block.rewards.map((item) => item.reward || 0)).div(
    WEI,
  )
}
