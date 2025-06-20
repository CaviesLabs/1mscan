import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import type { Props } from "nextjs/getServerSideProps"

import ContractVerification from "ui/pages/ContractVerification"

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/contract-verification" query={props}>
      <ContractVerification />
    </PageNextJs>
  )
}

// Page.getHead = (props) => {
//   return (
//     <BuildHead pathname="/contract-verification" query={props}></BuildHead>
//   );
// };

export default Page
