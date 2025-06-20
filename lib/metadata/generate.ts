import { chainConfigs } from "configs/frontend/chain/chainConfigs"
import Handlebars from "handlebars"
import { getLanguage } from "languages/useLanguage"
import type { ILang } from "languages/utils"
import type { Route } from "nextjs-routes"
import { keyword } from "./templates"

const DEFAULT_KEYWORD = keyword.DEFAULT_TEMPLATE

// Compile templates safely
const compileTemplate = (
  template: string | undefined,
  fallback: string,
  context: Record<string, any>,
) => {
  try {
    if (!template) return fallback
    return Handlebars.compile(template)(context)
  } catch {
    return fallback
  }
}

/**
 * Generates SEO metadata (title, description, keyword) based on the route and query parameters.
 *
 * @param pathname - The route pathname.
 * @param query - Query parameters for dynamic content.
 * @param chain - Optional chain identifier.
 * @returns An object containing title, description, and keyword.
 */
export default function generate<R extends Route>(
  pathname: R["pathname"],
  query: R["query"],
  lang: ILang,
  chain?: string,
) {
  try {
    // Prepare the context for template rendering
    const context = {
      ...query,
      network_name: "SEI",
      chain,
      chain_name: chainConfigs.find((c) => c.chainKey === chain)?.chainName,
    }

    // Retrieve raw templates from mappings
    const title = getLanguage(`title['${pathname}']` as any, {
      lang,
      metadata: context,
      defaultValue: getLanguage("title.DEFAULT_TEMPLATE" as any, {
        lang,
      }),
    })
    const description = getLanguage(`description['${pathname}']` as any, {
      lang,
      metadata: context,
      defaultValue: getLanguage("description.DEFAULT_TEMPLATE" as any, {
        lang,
      }),
    })
    const keywordRaw = keyword.KEYWORD_MAP[pathname]

    // Generate SEO metadata
    return {
      title,
      description,
      keywords: compileTemplate(keywordRaw, DEFAULT_KEYWORD, context),
    }
  } catch {
    return {
      title: "",
      description: "",
      keywords: DEFAULT_KEYWORD,
    }
  }
}
