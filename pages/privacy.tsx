import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import Privacy from "ui/pages/Privacy"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/privacy">
      <Privacy></Privacy>
    </PageNextJs>
  )
}

// Page.getLayout = (page) => {
//   return <LayoutDefault>{page}</LayoutDefault>;
// };

// Page.getHead = () => {
// return <BuildHead pathname="/privacy">// </BuildHead>;
// };

export default Page
