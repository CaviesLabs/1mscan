import { isEqual } from "lodash"
import "./global"

describe("[global]: test", () => {
  const a = [1, 4, 3, 2]
  it("[global:test]: should sort asc", () => {
    const result = a.sortByBigNumber("asc")
    expect(isEqual(result, [1, 2, 3, 4])).toBe(true)
  })
  it("[global:test]: should sort desc", () => {
    const result = a.sortByBigNumber("desc")
    expect(isEqual(result, [4, 3, 2, 1])).toBe(true)
  })
})
