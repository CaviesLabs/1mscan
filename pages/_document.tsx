import { ColorModeScript } from "@chakra-ui/react"

import type { DocumentContext } from "next/document"
import Document, { Head, Html, Main, NextScript } from "next/document"

type Props = {}

const MyDocument = ({}: Props) => (
  <Html lang="en">
    <Head />
    <body tabIndex={0}>
      <div id="top"></div>
      <Main />
      <ColorModeScript initialColorMode="light" />
      <NextScript />
    </body>
  </Html>
)

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  return Document.getInitialProps(ctx)
}

export default MyDocument
