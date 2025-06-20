import type {
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next"

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "nextjs-routes"

export type Props = {
  cookies: string
  referrer: string
  id: string
  address: string
  height_or_hash: string
  hash: string
  number: string
  q: string
  channel_id: string
  counterparty_channel_id: string
  chain_id?: string
  slug?: string[]
  tab?: string | ""
  message?: string
}

export function matchPathname(url: string): boolean {
  const pattern = /^\/claim-reward\/[^/]+\/address\/[^/]+$/
  const pathname = url.split("?")[0]
  return pattern.test(pathname)
}

export const base: GetServerSideProps<Props> = async ({
  req,
  query,
  params,
}) => {
  const props = {
    cookies: req.headers.cookie || "",
    referrer: req.headers.referer || "",
    id: query.id?.toString() || "",
    address: query.address?.toString() || "",
    hash: query.hash?.toString() || "",
    height_or_hash: query.height_or_hash?.toString() || "",
    number: query.number?.toString() || "",
    q: query.q?.toString() || "",
    channel_id: query.channel_id?.toString() || "",
    counterparty_channel_id: query.counterparty_channel_id?.toString() || "",
    chain_id: query.chain_id?.toString() || "",
    slug: (params?.slug || []) as never,
    tab: String(query.tab || ""),
    message: String(query.message || ""),
  }

  return {
    props: {
      ...props,
    },
  }
}

export const custom: (
  handler: (
    context: GetServerSidePropsContext,
    metadata: Props,
  ) => Promise<GetServerSidePropsResult<any>>,
) => GetServerSideProps<any> = (handler) => async (context) => {
  const metadata = (await base(context)) as any
  return await Promise.resolve(handler(context, metadata.props))
}

export const staticside =
  (
    handler: (
      context: GetStaticPropsContext,
      metadata: Props,
    ) => Promise<GetStaticPropsResult<any>>,
  ) =>
  async (context: any) => {
    const metadata = (await base(context)) as any
    return await Promise.resolve(handler(context, metadata.props))
  }
