import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import Blocks from "ui/pages/Blocks"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/blocks">
      <Blocks />
    </PageNextJs>
  )
}

export default Page
