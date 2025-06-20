import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import BrandAssets from "ui/pages/BrandAssets"

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/brand-assets">
      <BrandAssets></BrandAssets>
    </PageNextJs>
  )
}

// Page.getLayout = (page) => {
//   return (
//     <LayoutDefault paddingBottom={0} paddingTop={0} px={0}>
//       {page}
//     </LayoutDefault>
//   );
// };

// Page.getHead = () => {
// return <BuildHead pathname="/brand-assets">// </BuildHead>;
// };

export default Page
