import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import Hybrids from "ui/pages/Hybrids"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/hybrids">
      <Hybrids />
    </PageNextJs>
  )
}

// Page.getHead = () => {
// return <BuildHead pathname="/hybrids">// </BuildHead>;
// };

export default Page
