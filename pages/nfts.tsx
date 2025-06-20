import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import Nfts from "ui/pages/Nfts"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/nfts">
      <Nfts />
    </PageNextJs>
  )
}

// Page.getHead = () => {
// return <BuildHead pathname="/nfts">// </BuildHead>;
// };

export default Page
