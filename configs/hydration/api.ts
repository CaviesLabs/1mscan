import type { IncomingMessage } from "http"
import isBrowser from "lib/isBrowser"

export const getHost = (req?: IncomingMessage) => {
  if (isBrowser()) {
    return window.location.origin
  }
  const protocol = req?.headers?.["x-forwarded-proto"] || "https"
  const host = req?.headers?.host || ""

  return `${protocol}://${host}`
}
