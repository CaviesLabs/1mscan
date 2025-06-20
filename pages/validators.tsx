import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import Validators from "ui/pages/Validators"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/validators">
      <Validators />
    </PageNextJs>
  )
}

export default Page
