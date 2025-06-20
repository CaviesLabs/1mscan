import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import Terms from "ui/pages/Terms"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/terms">
      <Terms></Terms>
    </PageNextJs>
  )
}

// Page.getLayout = (page) => {
//   return <LayoutDefault>{page}</LayoutDefault>;
// };

// Page.getHead = () => {
// return <BuildHead pathname="/terms">// </BuildHead>;
// };

export default Page
