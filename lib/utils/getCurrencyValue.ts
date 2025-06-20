import BigNumber from "bignumber.js"
import _ from "lodash"
import type { ReactNode } from "react"

type Params = {
  accuracy: number | "full" | null | undefined
  value: string | BigNumber | number | null | undefined
  usdPrice?: string | number | null
  accuracyUsd?: number | "full" | null
  decimals: string | number | null | BigNumber | undefined
  fallback: ReactNode | undefined
  fallbackUsd: ReactNode | undefined
  hideValue?: boolean
  usdCurrency?: ReactNode | null
  fixedAccuracy?: boolean
  enablePrice?: boolean
  keepIntegerPart?: boolean
}

export default function getCurrencyValue({
  value,
  accuracyUsd,
  decimals,
  usdPrice,
  accuracy,
  fallback,
  fallbackUsd,
  hideValue,
  usdCurrency,
  fixedAccuracy,
  enablePrice,
  keepIntegerPart,
}: Params) {
  const valueRaw = BigNumber(value ?? Number.NaN).div(
    BigNumber(10).pow(decimals || 0),
  )

  if (valueRaw.isNaN()) {
    return {
      valueFormated: fallback || "",
      usdFormated: fallbackUsd || "",
      valueFull: "",
      valueIsTruncated: false,
      usdIsTruncated: false,
      usdFull: "",
      value: undefined,
      usd: undefined,
      isFallbackValue: Boolean(fallback),
      isFallbackUsd: Boolean(fallbackUsd),
    }
  }

  const currencyResult = _.chain(valueRaw)
    .thru((value) => {
      if (hideValue) {
        return {
          valueFormated: "",
          valueFull: "",
          isTruncated: false,
          value: BigNumber(0),
          isFallback: false,
        }
      }
      if (accuracy === "full") {
        return {
          valueFormated: value.toFormat(),
          get valueFull() {
            return this.valueFormated as string
          },
          value: value,
          isTruncated: false,
          isFallback: false,
        }
      }

      if (fixedAccuracy) {
        return {
          valueFormated: value.toFormat(accuracy || 0),
          valueFull: value.toFormat(),
          value: value,
          get isTruncated() {
            return this.valueFormated !== this.valueFull
          },
          isFallback: false,
        }
      }

      const valueBn = typeof accuracy === "number" ? value.dp(accuracy) : value

      const { formated, isTruncated } = getTruncate(valueBn, {
        keepIntegerPart: keepIntegerPart,
      })
      return {
        valueFormated: formated,
        valueFull: valueBn.toFormat(),
        value: valueBn,
        isTruncated,
        isFallback: false,
      }
    })
    .value()

  const usdResult = _.chain(valueRaw)
    .thru((valueRaw) => {
      if (!enablePrice) return undefined
      if (usdPrice !== undefined && usdPrice !== null && usdPrice !== "") {
        return BigNumber(usdPrice).times(valueRaw)
      }
      return undefined
    })
    .thru((value) => {
      if (!enablePrice) {
        return {
          valueFormated: "",
          valueFull: "",
          isTruncated: false,
          value: undefined,
          isFallback: false,
        }
      }

      if (value === undefined) {
        return {
          valueFormated: fallbackUsd || "",
          valueFull: "",
          isTruncated: false,
          value: undefined,
          isFallback: Boolean(fallbackUsd),
        }
      }
      if (value.isNaN()) {
        return {
          valueFormated: fallbackUsd || "",
          valueFull: "",
          isTruncated: false,
          value: undefined,
          isFallback: Boolean(fallbackUsd),
        }
      }
      if (accuracyUsd === "full") {
        return {
          valueFormated: `${usdCurrency}${value.toFormat()}`,
          get valueFull() {
            return this.valueFormated as string
          },
          isTruncated: false,
          value: value,
          isFallback: false,
        }
      }
      const valueBn =
        typeof accuracyUsd === "number" ? value.dp(accuracyUsd) : value

      const { formated, isTruncated } = getTruncate(valueBn, {
        keepIntegerPart: keepIntegerPart,
      })

      return {
        valueFormated: `${usdCurrency}${formated}`,
        valueFull: `${usdCurrency}${valueBn.toFormat()}`,
        isTruncated,
        value: valueBn,
        isFallback: false,
      }
    })
    .value()

  return {
    valueFormated: currencyResult.valueFormated,
    usdFormated: usdResult.valueFormated,
    valueFull: currencyResult.valueFull,
    valueIsTruncated: currencyResult.isTruncated,
    usdIsTruncated: usdResult.isTruncated,
    usdFull: usdResult.valueFull,
    value: currencyResult.value,
    usd: usdResult.value,
    isFallbackValue: currencyResult.isFallback,
    isFallbackUsd: usdResult.isFallback,
  }
}

/**
 * Shifts the decimal point of a BigNumber to the left by the number of decimal places it contains.
 * @param bigNumber The BigNumber to shift.
 * @returns The BigNumber with its decimal point shifted to the left.
 */
export function shiftDecimalToLeft(bigNumber: BigNumber) {
  // Find the number of decimal places
  const decimalPlaces = bigNumber.decimalPlaces() || 0

  // Get the absolute value of the number
  const absoluteValue = bigNumber.abs()

  // Shift the number to the left by multiplying with 10^decimalPlaces
  const shiftedNumber = absoluteValue.times(
    new BigNumber(10).exponentiatedBy(decimalPlaces),
  )

  return shiftedNumber
}

/**
 * Fills the input string with zeros to reach the specified length.
 * @param input The input string.
 * @param length The desired length of the string after filling with zeros.
 * @param position The position to fill zeros, either "head" or "tail". Default is "tail".
 * @returns The input string filled with zeros.
 */
export function fillZero(
  input: string,
  length: number,
  position: "head" | "tail" = "tail",
): string {
  const diff = length - input.length
  if (diff <= 0) return input
  if (position === "head") return "0".repeat(diff) + input
  return input + "0".repeat(diff)
}

/**
 * Rounds the given BigNumber to four digits after the decimal point.
 * @param bigNumber The BigNumber to round.
 * @returns The rounded BigNumber with four digits after the decimal point.
 */
export function roundAndCutToFourDigits(bigNumber: BigNumber) {
  // Convert the number to a string for processing
  const numberStr = bigNumber.toFixed()

  // Get the first four digits for rounding consideration
  const firstFourDigits = new BigNumber(fillZero(numberStr.slice(0, 4), 4))
  const fifthDigit = Number.parseInt(fillZero(numberStr.charAt(4), 1), 10)

  // Round up if the fifth digit is greater than or equal to 5
  if (fifthDigit >= 5) {
    return firstFourDigits.plus(1)
  } else {
    return firstFourDigits
  }
}

const handleIntegerTruncate = (integerPart: BigNumber) => {
  // const formated = integerPart.toFormat(0);
  // const splittedArray = formated.split(",");
  // if (splittedArray.length > 6) {
  //   return {
  //     isTruncated: true,
  //     formated: `${splittedArray.slice(0, 6).join(",")}...`,
  //   };
  // }
  // return {
  //   isTruncated: false,
  //   formated: formated,
  // };
  return integerPart.toFormat(0).split(",").slice(0, 6).join(",") + "..."
}

/**
 * Separates a BigNumber into its integer and decimal parts.
 * @param number The BigNumber to separate.
 * @returns An object containing the integer and decimal parts of the BigNumber.
 */
export const separatePart = (number: BigNumber) => {
  const integerPart = number.integerValue()
  const decimalPart = number.minus(integerPart).toFixed().substring(2)
  return {
    integerPart,
    decimalPart,
  }
}

/**
 * Truncates a BigNumber to a string with a maximum of six significant digits.
 * @param bigNumber The BigNumber to truncate.
 * @returns The truncated string and isTruncated representation of the BigNumber.
 */
const handleTruncate = (
  bigNumber: BigNumber,
  options?: {
    keepIntegerPart?: boolean
  },
): {
  isTruncated: boolean
  formated: string
} => {
  const { integerPart, decimalPart } = separatePart(bigNumber)

  const zeroDecimalPivot = decimalPart
    .split("")
    .findIndex((charactor) => charactor !== "0")
  const decimalLength = decimalPart.length
  const decimalTailLength = _.clamp(decimalLength - zeroDecimalPivot, 0, 4)
  if (zeroDecimalPivot >= 6) {
    const roundedBigNumber = bigNumber.decimalPlaces(
      zeroDecimalPivot + decimalTailLength,
      BigNumber.ROUND_HALF_CEIL,
    )
    if (roundedBigNumber.isGreaterThan(bigNumber)) {
      return handleTruncate(roundedBigNumber, options)
    } else {
      const { decimalPart: roundedDecimalPart } = separatePart(roundedBigNumber)

      const roundedZeroDecimalPivot = roundedDecimalPart
        .split("")
        .findIndex((charactor) => charactor !== "0")

      const roundedDecimalLength = roundedDecimalPart.length
      const roundedDecimalTailLength = _.clamp(roundedDecimalLength - 6, 0, 4)

      const tailFourString = roundedDecimalPart.substring(
        roundedZeroDecimalPivot,
        roundedZeroDecimalPivot + roundedDecimalTailLength,
      )

      const formatedDecimal = `0...${fillZero(tailFourString, roundedDecimalTailLength, "head")}`

      if (!options?.keepIntegerPart) {
        if (integerPart.toFixed().length + formatedDecimal.length > 18) {
          return {
            isTruncated: true,
            formated: handleIntegerTruncate(integerPart),
          }
        }
      }
      return {
        isTruncated: true,
        formated: `${integerPart.toFormat(0)}.${formatedDecimal}`,
      }
    }
  } else {
    const rounded = bigNumber.decimalPlaces(6, BigNumber.ROUND_HALF_CEIL)
    const isTruncated = !rounded.isEqualTo(bigNumber)
    if (!options?.keepIntegerPart) {
      if (integerPart.toFixed().length > 18) {
        return {
          isTruncated: true,
          formated: handleIntegerTruncate(integerPart),
        }
      }
    }
    return {
      isTruncated: isTruncated,
      formated: `${rounded.toFormat()}`,
    }
  }
}

/**
 * Gets the truncated representation of a BigNumber with a maximum of six significant digits.
 * @param bigNumber The BigNumber to truncate.
 * @returns The truncated string and isTruncated representation of the BigNumber.
 */
export const getTruncate = (
  bigNumber: BigNumber,
  options?: {
    keepIntegerPart?: boolean
  },
) => {
  return handleTruncate(bigNumber, options)
}
