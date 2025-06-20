import { getLanguage } from "languages/useLanguage"
import type { ReactNode } from "react"
import LinkInternal from "ui/shared/LinkInternal"

export const SUPPORT_EMAIL = "mailto:support@1mscan.com"
export const SALES_EMAIL = "mailto:sales@1mscan.com"

export const openSupportEmail = () => {
  window.open(SALES_EMAIL, "_blank")
}

export type FooterHyperlink = {
  title: string
  href?: string
  isExternal?: boolean
  component?: ReactNode
}

export const footerHyperlinkGroupList: {
  title: string
  items: FooterHyperlink[]
}[] = [
  {
    title: getLanguage("footer.company"),
    items: [
      { title: getLanguage("footer.about_us"), href: "/about" },
      { title: getLanguage("footer.brand_assets"), href: "/brand-assets" },
      {
        title: getLanguage("footer.contact_us"),
        href: SUPPORT_EMAIL,
        isExternal: true,
      },
      {
        title: getLanguage("footer.terms_and_privacy"),
        component: (
          <>
            <LinkInternal
              display="inline"
              color="inherit"
              isScrollTop
              href="/terms"
            >
              {getLanguage("footer.terms")}
            </LinkInternal>
            {" & "}
            <LinkInternal
              display="inline"
              color="inherit"
              isScrollTop
              href="/privacy"
            >
              {getLanguage("footer.privacy")}
            </LinkInternal>
          </>
        ),
      },
    ],
  },
  {
    title: getLanguage("footer.community"),
    items: [
      //   { title: "Update token info", href: "/update_token_info" },
      {
        title: getLanguage("footer.documents"),
        href: "https://docs.1mscan.com",
        isExternal: true,
      },
      {
        title: getLanguage("footer.report_issue"),
        href: "mailto:support@1mscan.com?subject=Report Issues",
        isExternal: true,
      },
    ],
  },
]
