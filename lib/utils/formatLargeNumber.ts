import BigNumber from "bignumber.js"

const units = [
  // { abbreviation: "K", value: new BigNumber(1e3) },
  { abbreviation: "M", value: new BigNumber(1e6) },
  { abbreviation: "B", value: new BigNumber(1e9) },
  { abbreviation: "T", value: new BigNumber(1e12) },
  { abbreviation: "Qa", value: new BigNumber(1e15) },
  { abbreviation: "Qi", value: new BigNumber(1e18) },
  { abbreviation: "Sx", value: new BigNumber(1e21) },
  { abbreviation: "Sp", value: new BigNumber(1e24) },
  { abbreviation: "Oc", value: new BigNumber(1e27) },
  { abbreviation: "No", value: new BigNumber(1e30) },
  { abbreviation: "Dc", value: new BigNumber(1e33) },
  { abbreviation: "UnD", value: new BigNumber(1e36) },
  { abbreviation: "DuD", value: new BigNumber(1e39) },
  { abbreviation: "TrD", value: new BigNumber(1e42) },
  { abbreviation: "QaD", value: new BigNumber(1e45) },
  { abbreviation: "QiD", value: new BigNumber(1e48) },
  { abbreviation: "SxD", value: new BigNumber(1e51) },
  { abbreviation: "SpD", value: new BigNumber(1e54) },
  { abbreviation: "OcD", value: new BigNumber(1e57) },
  { abbreviation: "NoD", value: new BigNumber(1e60) },
  { abbreviation: "Vg", value: new BigNumber(1e63) },
  { abbreviation: "Ct", value: new BigNumber(1e303) },
]
/**
 * Format a large number into a human-readable string with a maximum of three significant digits
 * and an abbreviation for the corresponding large unit (e.g., M for Million).
 *
 * @param {string|number} value - The number to format.
 * @param options
 * @returns {string} - The formatted string.
 */
export function formatLargeNumber(
  value: any,
  options?: {
    fallback?: any
    decimals?: number
    sticky?: boolean
    accuracy?:
      | number
      | null
      | {
          base: number
          pivot?: number
          upper?: number
        }
  },
): string {
  const number = BigNumber(value).div(
    options?.decimals ? new BigNumber(10).pow(options.decimals) : 1,
  )

  if (number.isNaN()) {
    return options?.fallback ?? "NaN"
  }

  // Iterate through the list of units from largest to smallest

  for (let i = units.length - 1; i >= 0; i--) {
    if (number.isGreaterThanOrEqualTo(units[i].value)) {
      const divided = number.dividedBy(units[i].value)
      return `${divided
        .dp(
          options?.accuracy === null
            ? (null as never)
            : typeof options?.accuracy === "object"
              ? options.accuracy.pivot &&
                number.isGreaterThanOrEqualTo(options.accuracy.pivot)
                ? options.accuracy.upper!
                : options.accuracy.base
              : (options?.accuracy ?? 3),
        )
        .toFormat()}${units[i].abbreviation ? `${options?.sticky ? "" : " "}${units[i].abbreviation}` : ""}`
    }
  }

  return number
    .dp(
      options?.accuracy === null
        ? (null as never)
        : typeof options?.accuracy === "object"
          ? options?.accuracy?.base
          : (options?.accuracy ?? 3),
    )
    .toFormat() // Return the number as a string if no unit is applicable
}
