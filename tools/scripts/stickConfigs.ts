import fs from "fs"
import type { IJsonChainConfigs } from "types/api"

export const stickConfigs = (env: string | undefined) => {
  const name =
    (env === "prod" && "prod") ||
    (env === "staging" && "staging") ||
    (env === "local-dev" && "local") ||
    "dev"

  const filePath = `./configs/envs/config.${name}.json`
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const CHAIN_CONFIGS = JSON.parse(fileContent) as IJsonChainConfigs

  globalThis.configs = CHAIN_CONFIGS
  return CHAIN_CONFIGS
}
