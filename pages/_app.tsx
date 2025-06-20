import "../lib/global"

import { getEnvValue } from "configs/hydration/utils"
import type { IChainKey } from "configs/server/chain"
import { getCookieLang, loadLanguage } from "languages/loadLanguage"
import type { ILang } from "languages/utils"
import { inter, kodeMono } from "lib/fonts"
import isBrowser from "lib/isBrowser"
import { serverGenerate } from "lib/metadata/serverGenerate"
import assetsMemoryCache from "lib/providers/assets.provider"
import "lib/setLocale"
import type { NextPage } from "next"
import App, { type AppContext, type AppProps } from "next/app"
import Router from "next/router"
import Script from "next/script"
import { type ReactNode, memo, useMemo } from "react"
import "styles/index.css"
import "styles/interchain-ui-kit-react.cjs.css"
import type { IJsonChainConfigs } from "types/api"
import InitContexts from "ui/init/InitContexts"
import CheckStatusTrigger from "ui/maintenance/CheckStatusTrigger"
import BaseHead from "ui/meta/BaseHead"
import AppErrorBoundary from "ui/shared/AppError/AppErrorBoundary"
import LayoutDefault from "ui/shared/layout/LayoutDefault"

type Props = AppProps & {
  Component: NextPage
  title: string
  description: string
  origin: string | undefined
  protocol: string
  chain: string
  keywords: string
  configs: IJsonChainConfigs
  assets: any
  pathname: string
  query: Record<string, string>
  lang: ILang
  language: any
}

const PageErrorBoundary = memo(
  ({ children, Component }: { children: ReactNode; Component: NextPage }) => {
    const CatchedPage = useMemo(() => {
      console.log("Rendering page")
      return ({ children }: { children: ReactNode }) => (
        <AppErrorBoundary>{children}</AppErrorBoundary>
      )
    }, [Component])
    return <CatchedPage>{children}</CatchedPage>
  },
  (prev, next) => {
    return prev.children === next.children
  },
)

const ProtectableLayout = memo(
  ({
    Component,
    pageProps,
    configs,
  }: Pick<Props, "Component" | "pageProps"> & {
    configs: IJsonChainConfigs
  }) => {
    if (Component.getLayout) {
      return Component.getLayout(
        <PageErrorBoundary Component={Component}>
          <Component {...pageProps} />
        </PageErrorBoundary>,
      )
    }

    return (
      <AppErrorBoundary>
        <CheckStatusTrigger configs={configs} />
        <LayoutDefault
          customContent={Component.getCustomContent?.(pageProps)}
          getSubLayout={Component.getSubLayout}
        >
          <PageErrorBoundary Component={Component}>
            <Component {...pageProps} />
          </PageErrorBoundary>
        </LayoutDefault>
      </AppErrorBoundary>
    )
  },
  (prev, next) => {
    return (
      prev.Component === next.Component && prev.pageProps === next.pageProps
    )
  },
)

function MyApp({
  Component,
  pageProps,
  title = "",
  description = "",
  origin = "1mscan.com",
  protocol = "https",
  chain = "pacific-1",
  keywords = "",
  configs,
  assets,
  pathname,
  query,
  lang,
  language,
}: Props) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-kode-mono: ${kodeMono.style.fontFamily};
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>

      <Script
        id="set-globalThis-chain"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            globalThis.chain = "${chain}";
            console.log('globalThis.chain is changed to :', chain);
          `,
        }}
      />

      <Script
        id="set-globalThis-configs"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                  globalThis.configs = ${JSON.stringify(configs)};
                  console.log('globalThis.configs is changed to :', globalThis.configs);
                `,
        }}
      />

      <Script
        id="set-globalThis-assets"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            globalThis.assets = ${JSON.stringify(assets)};
            console.log('globalThis.assets is set to :', globalThis.assets);
          `,
        }}
      />

      <Script
        id="set-globalThis-language"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            globalThis.lang = "${lang}";
            globalThis.${lang} = ${JSON.stringify(language)};
            console.log('globalThis.${lang} is set to :', globalThis.${lang});
          `,
        }}
      />

      <BaseHead
        title={title}
        description={description}
        keywords={keywords}
        pathname={isBrowser() ? Router.pathname : pathname}
        query={isBrowser() ? Router.query : query}
        origin={`${protocol}://${origin}`}
      />

      <InitContexts chain={chain}>
        <ProtectableLayout
          Component={Component}
          pageProps={pageProps}
          configs={configs}
        />
      </InitContexts>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const ctx = appContext.ctx

  const chain = (ctx.query.chain || "pacific-1") as IChainKey

  if (!globalThis.configs && !isBrowser()) {
    await import("tools/scripts/stickConfigs").then(({ stickConfigs }) => {
      const env = getEnvValue("NEXT_PUBLIC_APP_ENV")
      stickConfigs(env)
    })
  }

  const origin = ctx.req?.headers.host

  const protocol = ctx.req?.headers["x-forwarded-proto"]

  const lang = getCookieLang(ctx.req)

  const [appProps, assets, language] = await Promise.all([
    App.getInitialProps(appContext),
    assetsMemoryCache.getCacheWithHook(`assets:${chain}`, `assets:${chain}`, {
      host: origin,
    }),
    loadLanguage(lang as ILang),
  ])

  const seo = await serverGenerate(appContext, lang, chain, assets)

  const title = seo?.title
  const description = seo?.description
  const keywords = seo?.keywords

  return {
    ...appProps,
    query: ctx.query,
    pathname: ctx.pathname,
    origin,
    title,
    description,
    keywords,
    protocol,
    chain: chain,
    configs: globalThis.configs,
    assets: assets,
    lang,
    language,
  }
}

export default MyApp
