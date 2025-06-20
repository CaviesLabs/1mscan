import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import VerifiedContracts from "ui/pages/VerifiedContracts"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/verified-contracts">
      <VerifiedContracts />
    </PageNextJs>
  )
}

export default Page
