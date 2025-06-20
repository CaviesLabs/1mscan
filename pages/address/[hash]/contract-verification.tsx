import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import type { Props } from "nextjs/getServerSideProps"
import ContractVerificationForAddress from "ui/pages/ContractVerificationForAddress"

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/address/[hash]/contract-verification" query={props}>
      <ContractVerificationForAddress />
    </PageNextJs>
  )
}

// Page.getHead = (props) => {
//   return (
//     <BuildHead
//       pathname="/address/[hash]/contract-verification"
//       query={props}
//     ></BuildHead>
//   );
// };

export default Page
