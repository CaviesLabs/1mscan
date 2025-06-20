import { importLazy } from "lib/importLazy"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import type { NextPage } from "next"
import type { Props } from "nextjs/getServerSideProps"

const FactoryToken = importLazy(() => import("ui/pages/FactoryToken"), {
  ssr: false,
})
const IBCToken = importLazy(() => import("ui/pages/IBCToken"), {
  ssr: false,
})
const Token = importLazy(() => import("ui/pages/Token"), {
  ssr: false,
})
const TokenInstance = importLazy(() => import("ui/pages/TokenInstance"), {
  ssr: false,
})

const Page: NextPage<Props> = () => {
  const [slug] = useSetStateQuery<string[]>("slug", [], {
    throttle: 1000,
    cleanUp: {
      keepQueries: ["slug"],
    },
    decode: (value) => String(value || "").split(","),
  })

  if (!slug.length) {
    return <></>
  }

  return (
    <>
      {slug?.[0] === "factory" ? (
        <FactoryToken hash={slug?.join("/")} />
      ) : slug?.[0] === "ibc" ? (
        <IBCToken hash={slug?.[1]} />
      ) : slug?.[1] === "instance" ? (
        <TokenInstance hash={slug?.[0] || ""} id={slug?.[2] || ""} />
      ) : (
        <Token hash={slug?.[0] || ""} />
      )}
    </>
  )
}

// Page.getHead = (props) => {
//   return (
//     <BuildHead
//       pathname="/token/[...slug]"
//       query={props as Required<Props>}
//     ></BuildHead>
//   );
// };

export default Page
