import { get } from "lodash"

// if (!isBrowser()) {
//   throw new Error("This configs.ts is only available in the browser");
// }

/**
 * Get the value of an environment variable
 * @param path
 * @param defaultValue
 */
export const getEnvValueV2 = <R = string>(path: string, defaultValue?: any) => {
  return get(globalThis.configs, path, defaultValue) as R
}
