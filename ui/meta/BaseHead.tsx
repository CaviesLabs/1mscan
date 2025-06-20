import Head from "next/head"
import { memo } from "react"

type Props = {
  description: string
  origin: string
  keywords: string
  title: string
  pathname: string
  query: Record<string, any>
}

const BaseHead = ({
  title,
  description,
  origin,
  keywords,
  pathname,
  query,
}: Props) => {
  const ogImage =
    (pathname === "/earning/[id]" &&
      `${origin}/api/earnings/seo?pool_address=${query.id}`) ||
    `${origin}/static/og_placeholder.png`

  return (
    <Head>
      {/* {children} */}
      <title key="title">{title}</title>
      <meta key="charset" charSet="utf-8" />
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <meta key="description" name="description" content={description} />
      <meta key="keywords" name="keywords" content={keywords || ""} />

      <meta key="og_type" property="og:type" content="website" />
      <meta key="og_site_name" property="og:site_name" content="1Mscan" />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_image" property="og:image" content={ogImage} />
      <meta key="og_image_width" property="og:image:width" content="945" />
      {/* <meta key="og_image_height" property="og:image:height" content="532" /> */}
      <meta key="og_image_type" property="og:image:type" content="image/png" />

      <meta
        key="twitter_card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter_title" name="twitter:title" content={title} />
      <meta
        key="twitter_description"
        name="twitter:description"
        content={description}
      />
      <meta key="twitter_image" name="twitter:image" content={ogImage} />
      <meta key="twitter_site" name="twitter:site" content="@seitrace_" />
      <meta key="twitter_creator" name="twitter:creator" content="@seitrace_" />

      {/* FAVICON */}
      <link
        key="icon_48"
        rel="icon"
        href="/favicon/favicon.png"
        sizes="48x48"
      />
      <link key="icon_mask" rel="mask-icon" href="/icons/logo/logo.svg" />
      <link key="sprite" rel="preload" as="image" href="/icons/sprite.svg" />
    </Head>
  )
}

export default memo(
  BaseHead,
  (prev, next) =>
    // prev.children === next.children &&
    prev.description === next.description &&
    prev.title === next.title &&
    prev.origin === next.origin &&
    prev.keywords === next.keywords &&
    prev.pathname === next.pathname &&
    prev.query === next.query,
)

// export default BaseHead;
