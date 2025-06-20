import type { NextPage } from "next"
import type { Props } from "nextjs/getServerSideProps"
import WalletProfile from "ui/pages/Tool/WalletProfile/WalletProfile"
import LayoutTool from "ui/shared/layout/LayoutTool"

const Page: NextPage<Props> = () => {
  return <WalletProfile />
}

Page.getSubLayout = (page) => {
  return <LayoutTool>{page}</LayoutTool>
}

export default Page
