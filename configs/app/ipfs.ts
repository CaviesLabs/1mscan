import { getEnvValue } from "../hydration/utils"

export default Object.freeze({
  ipfsGateway: getEnvValue("NEXT_PUBLIC_IPFS_GATEWAY"),
})
