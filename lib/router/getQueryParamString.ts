export default function getQueryParamString<T extends string>(
  param: string | Array<string> | undefined,
) {
  if (Array.isArray(param)) {
    return param.join(",") as T | ""
  }

  if (param === "undefined" || param === "null") return ""

  return (param || "") as T | ""
}
