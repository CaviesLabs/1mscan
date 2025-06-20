/* eslint-disable @typescript-eslint/no-unused-vars */
export function isJSON(str: any) {
  try {
    const json = JSON.parse(str)
    return typeof json === "object"
  } catch (e) {
    return false
  }
}

export const parseJSONTry = <T extends { [key: string]: any }>(
  str: any,
  defaultValue?: T,
) => {
  try {
    return JSON.parse(str) as T
  } catch (e) {
    console.log(e)
    return (defaultValue || {}) as T
  }
}
