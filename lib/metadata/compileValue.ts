const PLACEHOLDER_REGEX = /%(\w+)%/g

export default function compileValue(
  template: string | undefined,
  params: Record<string, string | Array<string> | undefined> | undefined,
) {
  if (!template) return template || ""
  return template?.replaceAll(PLACEHOLDER_REGEX, (match, p1) => {
    const value = params?.[p1] || ""

    if (Array.isArray(value)) {
      return value.join(", ")
    }

    if (value === undefined) {
      return ""
    }

    return value
  })
}
