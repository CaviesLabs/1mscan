import type { Route } from "nextjs-routes"

export type ApiData<R extends Route> = R["pathname"] extends "/token/[hash]"
  ? { symbol: string }
  : R["pathname"] extends "/token/[hash]/instance/[id]"
    ? { symbol: string }
    : R["pathname"] extends "/apps/[id]"
      ? { app_name: string }
      : never

export interface Metadata {
  title: string
  description: string | undefined
  // opengraph: {
  //   title: string;
  //   description?: string;
  // };
}
