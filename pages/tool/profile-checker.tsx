import type { NextPage } from "next"
import type { Props } from "nextjs/getServerSideProps"
import ProfileChecker from "ui/pages/Tool/ProfileChecker/ProfileChecker"
import LayoutTool from "ui/shared/layout/LayoutTool"

const Page: NextPage<Props> = () => {
  return <ProfileChecker />
}

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>
}

export default Page
