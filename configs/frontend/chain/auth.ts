import { appHost } from "./api"
import { getEnvValueV2 } from "./configs"

export const workspaceId = getEnvValueV2("workspace.WORKSPACE_ID")
export const workspaceEndpoint = getEnvValueV2("workspace.WORKSPACE_ENDPOINT")
export const workspaceResource = getEnvValueV2("workspace.WORKSPACE_RESOURCE")

export const workspaceCallback = `${appHost}/workspace/callback`
