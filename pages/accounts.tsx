import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import Accounts from "ui/pages/Accounts"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/accounts">
      <Accounts />
    </PageNextJs>
  )
}

export default Page
