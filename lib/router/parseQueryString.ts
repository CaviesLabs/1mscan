import _ from "lodash"

export const parseQueryString = <T = string>(
  query: any,
  options?: { transform?: (value: string) => T },
) => {
  return _.chain(query)
    .thru((str) => String(str ?? "").split(","))
    .map((part) => (options?.transform ? options.transform(part) : part))
    .thru((parts) =>
      _.isArray(parts) && parts.length === 1 ? parts[0] : parts,
    )
    .value() as T | T[]
}
