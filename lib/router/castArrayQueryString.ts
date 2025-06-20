import _ from "lodash"

export const castArrayQueryString = <T extends string = string>(query: any) => {
  return _.chain(query)
    .thru((str) => String(str ?? "").split(","))
    .value() as T[]
}
