import type { NextPage } from "next"
import PageNextJs from "nextjs/PageNextJs"
import type { Props } from "nextjs/getServerSideProps"
import Validator from "ui/pages/Validator"

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/validator/[hash]" query={props}>
      <Validator />
    </PageNextJs>
  )
}

export default Page
