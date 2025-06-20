import _ from "lodash"

export const toQueryString = (query: Primitive[] | Primitive) => {
  if (!query || (Array.isArray(query) && query.length === 0)) return undefined
  return _.castArray(query).filter(Boolean).join(",")
}
