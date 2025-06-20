import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import type { Props } from "nextjs/getServerSideProps"

import CodeIDVerification from "ui/pages/CodeIDVerification"

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/code-id-verification" query={props}>
      <CodeIDVerification />
    </PageNextJs>
  )
}

// Page.getHead = (props) => {
// return <BuildHead pathname="/code-id-verification" query={props}>// </BuildHead>;
// };

export default Page
