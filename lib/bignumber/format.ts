import BigNumber from "bignumber.js"

const trillion = new BigNumber(1e12)
const billion = new BigNumber(1e9)
const million = new BigNumber(1e6)
const thousand = new BigNumber(1e3)
// const oneHundredBillion = new BigNumber("100000000000");

export function formatNumberWithSuffix(
  number: BigNumber,
  options?: { decimalPlaces?: number; roundingMode?: BigNumber.RoundingMode },
) {
  let dividedBignumber: BigNumber
  let suffix: string | undefined = undefined

  if (number.isGreaterThanOrEqualTo(trillion)) {
    dividedBignumber = number.dividedBy(trillion)
    suffix = "T"
  } else if (number.isGreaterThanOrEqualTo(billion)) {
    dividedBignumber = number.dividedBy(billion)
    suffix = "B"
  } else if (number.isGreaterThanOrEqualTo(million)) {
    dividedBignumber = number.dividedBy(million)
    suffix = "M"
  } else if (number.isGreaterThanOrEqualTo(thousand)) {
    dividedBignumber = number.dividedBy(thousand)
    suffix = "K"
  } else {
    dividedBignumber = number
  }

  const formattedNumber = options?.decimalPlaces
    ? dividedBignumber
        .decimalPlaces(
          options?.decimalPlaces,
          options.roundingMode || BigNumber.ROUND_HALF_CEIL,
        )
        .toFormat()
    : dividedBignumber.toFormat()

  return {
    dividedBignumber,
    formattedNumber,
    suffix,
    fullyFormattedNumber: `${formattedNumber}${suffix ? suffix : ""}`,
  }
}
