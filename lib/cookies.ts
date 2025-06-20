import * as cookie from "cookie"

import isBrowser from "./isBrowser"

export enum NAMES {
  API_TOKEN = "_explorer_key",
  // ADBLOCK_DETECTED = "adblock_detected",
}

export function get(name?: NAMES | undefined | null) {
  try {
    if (!isBrowser() || !name) {
      return undefined
    }

    return cookie.parse(document.cookie)[name]
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export function deleteKey(name: string) {
  if (!isBrowser()) {
    return
  }

  document.cookie = cookie.serialize(name, "", {
    expires: new Date(0),
  })
}
