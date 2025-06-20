import type { Route } from "nextjs-routes"
import type React from "react"

type Props = Route & {
  children?: React.ReactNode
}

const PageNextJs = (props: Props) => {
  // useGetCsrfToken();
  // useAdblockDetect();

  return props.children
}

export default PageNextJs
