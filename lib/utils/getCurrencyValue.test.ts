import BigNumber from "bignumber.js"
import {
  getTruncate,
  roundAndCutToFourDigits,
  shiftDecimalToLeft,
} from "./getCurrencyValue"

describe("math functions", () => {
  test("shift decimal to integer", () => {
    const bigNumber = new BigNumber(0.0000001234)
    const shifted = shiftDecimalToLeft(bigNumber)
    expect(shifted.toString()).toBe("1234")
  })
})

describe("shiftDecimalToLeft", () => {
  test("0.0000001234", () => {
    const bigNumber = new BigNumber(0.0000001234)
    const shifted = shiftDecimalToLeft(bigNumber)
    expect(shifted.toString()).toBe("1234")
  })
  test("0.0000009999", () => {
    const bigNumber = new BigNumber(0.0000009999)
    const shifted = shiftDecimalToLeft(bigNumber)
    expect(shifted.toString()).toBe("9999")
  })
  test("0.000000999911", () => {
    const bigNumber = new BigNumber(0.000000999911)
    const shifted = shiftDecimalToLeft(bigNumber)
    expect(shifted.toString()).toBe("999911")
  })
})

describe("roundAndCutToFourDigits", () => {
  test("1234", () => {
    const bigNumber = new BigNumber(1234)
    const rounded = roundAndCutToFourDigits(bigNumber)
    expect(rounded.toString()).toBe("1234")
  })
  test("9999", () => {
    const bigNumber = new BigNumber(9999)
    const rounded = roundAndCutToFourDigits(bigNumber)
    expect(rounded.toString()).toBe("9999")
  })
  test("999911", () => {
    const bigNumber = new BigNumber(999911)
    const rounded = roundAndCutToFourDigits(bigNumber)
    expect(rounded.toString()).toBe("9999")
  })
  test("999991", () => {
    const bigNumber = new BigNumber(999991)
    const rounded = roundAndCutToFourDigits(bigNumber)
    expect(rounded.toString()).toBe("10000")
  })
})

describe("getTruncate function", () => {
  test("should truncate to six significant digits for small numbers", () => {
    expect(getTruncate(new BigNumber(0.00000012345)).formated).toBe(
      "0.0...1235",
    )
    expect(getTruncate(new BigNumber(0.0000012345)).formated).toBe("0.000001")
    expect(getTruncate(new BigNumber(0.0000015345)).formated).toBe("0.000002")
  })

  test("should truncate to six significant digits for large numbers", () => {
    expect(
      getTruncate(new BigNumber("600099009.000000000001234411112233")).formated,
    ).toBe("600,...,009.0...1234")
    expect(
      getTruncate(new BigNumber("600099009.000000000001234511112233")).formated,
    ).toBe("600,...,009.0...1235")
  })

  test("should handle different cases of significant digits", () => {
    expect(getTruncate(new BigNumber("600099009.000000000023")).formated).toBe(
      "600,...,009.0...0023",
    )
    expect(getTruncate(new BigNumber("600099009.0000001")).formated).toBe(
      "600,...,009.0...1",
    )
    expect(getTruncate(new BigNumber("600099009.00000019")).formated).toBe(
      "600,...,009.0...19",
    )
    expect(getTruncate(new BigNumber("600099009.000000019")).formated).toBe(
      "600,...,009.0...019",
    )
    expect(getTruncate(new BigNumber("600099009.0000000019")).formated).toBe(
      "600,...,009.0...0019",
    )
    expect(getTruncate(new BigNumber("600099009.00000000195")).formated).toBe(
      "600,...,009.0...0195",
    )
    expect(
      getTruncate(new BigNumber("600099009.6700000000000195")).formated,
    ).toBe("600,...,009.67")
    expect(getTruncate(new BigNumber("600099009.6711596")).formated).toBe(
      "600,...,009.67116",
    )
    expect(getTruncate(new BigNumber("600099009.6711996")).formated).toBe(
      "600,...,009.6712",
    )
    expect(getTruncate(new BigNumber("600099009.9999996")).formated).toBe(
      "600,...,010",
    )
  })
})
