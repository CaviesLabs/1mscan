/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next"
import type { GetServerSidePropsContext } from "nextjs-routes"
import type { Props } from "nextjs/getServerSideProps"
import LayoutTool from "ui/shared/layout/LayoutTool"

const Page: NextPage<Props> = () => {
  return <></>
}

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>
}

export default Page

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  // redirect
  return {
    props: {},
    redirect: {
      permanent: true,
      destination: "/tool/wallet-profile",
    },
  }
}
