import type { NextPage } from "next"

import AboutUs from "ui/pages/AboutUs"

const Page: NextPage = () => {
  return <AboutUs></AboutUs>
}

// Page.getLayout = (page) => {
//   return <LayoutHeader>{page}</LayoutHeader>;
// };

// Page.getHead = () => {
// return <BuildHead pathname="/about">// </BuildHead>;
// };

export default Page

export const getStaticProps = () => {
  return {
    props: {},
  }
}
