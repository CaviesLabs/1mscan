export type IPolicyValue =
  | "'self'"
  | "blob:"
  | "data:"
  | "'none'"
  | "'unsafe-inline'"
  | "'unsafe-eval'"

export type IDirectiveValue =
  | "child-src"
  | "connect-src"
  | "default-src"
  | "font-src"
  | "frame-src"
  | "img-src"
  | "manifest-src"
  | "media-src"
  | "object-src"
  | "prefetch-src"
  | "script-src"
  | "script-src-elem"
  | "script-src-attr"
  | "style-src"
  | "style-src-elem"
  | "style-src-attr"
  | "worker-src"
  | "base-uri"
  | "plugin-types"
  | "sandbox"
  | "form-action"
  | "frame-ancestors"
  | "navigate-to"
  | "report-uri"
  | "report-to"
  | "block-all-mixed-content"
  | "referrer"
  | "require-sri-for"
  | "require-trusted-types-for"
  | "trusted-types"
  | "upgrade-insecure-requests"

export type ICSP = {
  [key in IDirectiveValue]?: {
    sites: string[]
    policy?: IPolicyValue[]
  }
}

export const contentPolicyBuilder = (csp: ICSP): string => {
  return Object.entries(csp)
    .map(([directive, { sites, policy }]) => {
      return `${directive} ${sites.join(" ")} ${(policy || []).join(" ")}`
    })
    .join("; ")
}
