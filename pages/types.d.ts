// types.d.ts
import type { NextComponentType, NextPageContext } from "next"
import type { ReactElement, ReactNode } from "react"

declare module "next" {
  export type NextPage<
    Props extends Record<string, any> = object,
    InitialProps = Props,
  > = NextComponentType<NextPageContext, InitialProps, Props> & {
    getHead?: (props: Props) => ReactNode
    getCustomContent?: (props: Props) => ReactNode
    getLayout?: (page: ReactElement) => ReactNode
    getSubLayout?: (page: ReactElement) => ReactNode
    noContext?: boolean
  }
}
