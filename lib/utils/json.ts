export const parseClause = <R extends object = object>(
  value: any,
  fallback?: R,
) => {
  try {
    return JSON.parse(value) as R
  } catch {
    return fallback as typeof fallback
  }
}

export const stringifyClause = <R = string>(value: any, fallback?: R) => {
  try {
    return JSON.stringify(value) as R
  } catch {
    return fallback as R
  }
}
