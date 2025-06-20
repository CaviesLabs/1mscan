import { contentPolicyBuilder } from "./contentPolicy"

const csp = contentPolicyBuilder({
  "default-src": {
    sites: [
      "*.sei.io",
      "*.1mscan.com",
      "*.web3modal.org",
      "*.metamask.io",
      "*.githubusercontent.com",
      "*.googleapis.com",
      "*.walletconnect.org",
      "*.googletagmanager.com",
      "*.cloudflare.com",
      "*.cloudflareinsights.com",
      "*.dexscreener.com",
      "*.geckoterminal.com",
    ],
    policy: ["'self'", "data:"],
  },
  "frame-src": {
    sites: [
      "*.sei.io",
      "*.1mscan.com",
      "*.web3modal.org",
      "*.dexscreener.com",
      "https://dexscreener.com/",
      "*.cloudflare.com",
      "*.geckoterminal.com",
      "https://geckoterminal.com/",
    ],
    policy: ["'self'"],
  },
  "script-src": {
    sites: [
      "*.sei.io",
      "*.1mscan.com",
      "*.web3modal.org",
      "*.metamask.io",
      "*.githubusercontent.com",
      "*.googleapis.com",
      "*.walletconnect.org",
      "*.googletagmanager.com",
      "*.cloudflare.com",
      "*.cloudflareinsights.com",
      "*.google-analytics.com",
    ],
    policy: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  },
  "style-src": {
    sites: [
      "*.sei.io",
      "*.1mscan.com",
      "*.web3modal.org",
      "*.metamask.io",
      "*.githubusercontent.com",
      "*.googleapis.com",
      "*.walletconnect.org",
      "*.googletagmanager.com",
    ],
    policy: ["'self'", "'unsafe-inline'"],
  },
  "media-src": {
    sites: ["*"],
    policy: ["'self'", "data:", "blob:"],
  },
  "img-src": {
    sites: ["*"],
    policy: ["'self'", "data:", "blob:"],
  },
  "frame-ancestors": {
    sites: [
      "*.sei.io",
      "*.1mscan.com",
      "*.web3modal.org",
      "*.metamask.io",
      "*.githubusercontent.com",
      "*.googleapis.com",
      "*.walletconnect.org",
      "*.googletagmanager.com",
    ],
    policy: ["'self'"],
  },
  "connect-src": {
    sites: ["*"],
    policy: ["'self'"],
  },
  "font-src": {
    sites: ["fonts.gstatic.com"],
    policy: ["'self'"],
  },
  "worker-src": {
    sites: [
      "*.sei.io",
      "*.1mscan.com",
      "*.web3modal.org",
      "*.metamask.io",
      "*.githubusercontent.com",
      "*.googleapis.com",
      "wss://*.1mscan.com",
      "wss://*.walletconnect.org",
      "*.walletconnect.org",
      "*.googletagmanager.com",
      "*.cloudflare.com",
      "*.cloudflareinsights.com",
      "*.google-analytics.com",
      "*.sei-apis.com",
    ],
    policy: ["'self'"],
  },
})

async function headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: csp, // Assuming contentPolicyBuilder generates the correct CSP value from the object
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "unsafe-none",
        },
        // cors
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
      ],
    },
  ]
}

export default headers
