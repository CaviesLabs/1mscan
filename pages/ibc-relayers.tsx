import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import IBCRelayers from "ui/pages/IBCRelayers"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/ibc-relayers">
      <IBCRelayers />
    </PageNextJs>
  )
}

export default Page
