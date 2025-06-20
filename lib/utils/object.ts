import { isNil, omitBy } from "lodash"

export const isEmptyField = (value: any) =>
  !value ||
  isNil(value) ||
  value === "null" ||
  value === "undefined" ||
  value === "NaN"
export const cleanObject = (obj: any) => {
  return omitBy(obj, isEmptyField)
}
