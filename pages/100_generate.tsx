import type { GetStaticProps } from "next"

type Props = {}

const PreGenerate = ({}: Props) => {
  return <></>
}

export default PreGenerate

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildSvg = await import("../tools/scripts/pre-build.mts").then(
    (module) => module.buildSvg,
  )
  await buildSvg().then(() => {
    console.log("🧿 SVG icons built successfully")
  })

  return {
    props: {},
  }
}
