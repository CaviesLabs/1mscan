import _ from "lodash"

export const matchItems = <T extends Primitive>(
  from: T[],
  to: T[],
  options?: {
    fallback?: T[] | true
  },
) => {
  return _.chain(_.intersection(from, to))
    .thru((matches) => {
      if (!matches.length) {
        return options?.fallback === true ? to : options?.fallback || []
      }
      return matches
    })
    .value()
}
