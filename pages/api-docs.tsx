import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import { default as LinkInternal } from "ui/shared/LinkInternal"
import PageTitle from "ui/shared/Page/PageTitle"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/api-docs">
      <PageTitle title="API Documentation" />
      <h3>
        Please go to{" "}
        <LinkInternal href={"/insights-docs"}>1Mscan Insights</LinkInternal>
      </h3>
    </PageNextJs>
  )
}

// Page.getHead = () => {
// return <BuildHead pathname="/api-docs">// </BuildHead>;
// };

export default Page

// export { apiDocs as getServerSideProps } from "nextjs/getServerSideProps";
