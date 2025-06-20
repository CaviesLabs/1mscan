import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import { getEnvValue } from "configs/hydration/utils"
import { memo } from "react"

const GoogleTools = () => {
  return (
    <>
      <GoogleAnalytics
        gaId={getEnvValue("NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID")}
      />
      <GoogleTagManager
        gtmId={getEnvValue("NEXT_PUBLIC_GOOGLE_TAG_MANAGER_PROPERTY_ID")}
      />
    </>
  )
}

export default memo(GoogleTools, () => true)
