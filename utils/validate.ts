import { isURL } from "validator"

export const checkIsURL = (value: any) => {
  if (!isURL(String(value))) return false

  try {
    new URL(value)
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}
