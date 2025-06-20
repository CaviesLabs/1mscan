import type { NextPage } from "next"

import PageNextJs from "nextjs/PageNextJs"
import type { Props } from "nextjs/getServerSideProps"
import CodeIDs from "ui/pages/CodeIDs"

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/code-ids" query={props}>
      <CodeIDs />
    </PageNextJs>
  )
}

export default Page
