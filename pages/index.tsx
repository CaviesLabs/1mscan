import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import Home from "ui/pages/Home"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/">
      <Home />
    </PageNextJs>
  )
}

// Page.getHead = () => {
// return <BuildHead pathname="/">// </BuildHead>;
// };
export default Page
