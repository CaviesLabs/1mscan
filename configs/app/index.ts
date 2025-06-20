import chain from "./chain"
import * as features from "./features"
import ipfs from "./ipfs"
import services from "./services"

const config = Object.freeze({
  chain,
  features,
  services,
  ipfs,
})

export * as utils from "../hydration/utils"

export default config
