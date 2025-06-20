import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import Tokens from "ui/pages/Tokens"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/tokens">
      <Tokens />
    </PageNextJs>
  )
}

// Page.getHead = () => {
// return <BuildHead pathname="/tokens">// </BuildHead>;
// };

export default Page
