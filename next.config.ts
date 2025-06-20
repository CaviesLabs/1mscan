import { stickConfigs } from "tools/scripts/stickConfigs"

stickConfigs(`${process.env.NEXT_PUBLIC_APP_ENV}`)

import dotenv from "dotenv"
import type { NextConfig } from "next"
import headers from "nextjs/headers"
import { rewrites } from "nextjs/rewrites"
import dns from "node:dns"
import { transformPublicEnv } from "./tools/scripts/transform-env.mjs"

// Default DNS ipv4
dns.setDefaultResultOrder("ipv4first")

const env = `.env.${process.env.NEXT_PUBLIC_APP_ENV || "dev"}`
console.log(`Loading env from ${env}`)

// Load environment variables
dotenv.config({
  path: env,
})

// Load envs
const publicEnvs = transformPublicEnv()
// const commonConfig = transformEvnFromJsonFile();

const isLocal = process.env.NEXT_PUBLIC_APP_ENV === "local-dev"
const isBuilt = process.env.NODE_ENV === "production"
const isTurboEnabled = process.env.EXPERIMENTAL_TURBO === "true"

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  distDir: ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: !isLocal,
  },
  transpilePackages: [
    "swagger-client",
    "swagger-ui-react",
    "@tanstack/react-query",
    "@logto/react",
  ],
  reactStrictMode: false,
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.(test|pw)\.(js|ts|tsx)$/,
      loader: "ignore-loader",
    })

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: any) => {
        resource.request = resource.request.replace(/^node:/, "")
      }),
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
          },
        },
      ],
    })

    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push("pino-pretty", "lokijs", "encoding")

    return config
  },
  serverExternalPackages: ["pino-pretty", "lokijs", "encoding"],
  compress: isBuilt && !isLocal,
  headers: headers,
  rewrites: rewrites,
  productionBrowserSourceMaps: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              dimensions: false,
            },
          },
        ],
        as: "*.js",
      },
      "*.pw.tsx": {
        loaders: ["ignore-loader"],
        as: "*.js",
      },
      "*.pw.ts": {
        loaders: ["ignore-loader"],
        as: "*.js",
      },
      "*.test.ts": {
        loaders: ["ignore-loader"],
        as: "*.js",
      },
      "*.test.tsx": {
        loaders: ["ignore-loader"],
        as: "*.js",
      },
    },
    resolveExtensions: [
      ".mts",
      ".cts",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".cjs",
      ".json",
    ],
  },
  experimental: {
    // edge-runtime: true,
    esmExternals: isTurboEnabled ? undefined : false,
    optimisticClientCache: true,
    optimizePackageImports:
      isBuilt && !isLocal
        ? [
            /**
             *  Remove react and react-dom from the bundle to fix
             * https://github.com/vercel/next.js/discussions/43577
             */
            // "react",
            // "react-dom",
            // ** Collecting page data  .SyntaxError: Unexpected token ','
            // "handlebars",
            // ** Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (10:0)
            // "react-intersection-observer",
            // "bs58",
            // "@monaco-editor/react",
            // "react-hook-form",
            // "@hookform/resolvers",

            "@tanstack/react-query",
            "@tanstack/query-core",
            "bignumber.js",
            "body-scroll-lock",
            "moment",
            "@chakra-ui/react",
            "pako",
            "@reduxjs/toolkit",
            "@okxconnect/ui",
            "axios",
            "cookie",
            "cosmjs-utils",
            "@sei-js/cosmjs",
            "@sei-js/evm",
            "@sei-js/proto",
            "chart.js",
            "chartjs-adapter-date-fns",
            "chartjs-plugin-annotation",
            "d3",
            "date-fns",
            "decimal.js",
            "dom-to-image",
            "dompurify",
            "file-saver",
            "file-type",
            "filesize",
            "papaparse",
            "path-to-regexp",
            "query-string",
            "qrcode.react",
            "react-chartjs-2",
            "react-number-format",
            "react-redux",
            "react-scroll",
            "react-turnstile",
            "swagger-ui-react",
            "validator",
            "@cosmjs/math",
            "@cosmjs/stargate",
            "@metamask/providers",
            "@metamask/sdk-react",
            "cosmos-kit",
            "@cosmos-kit/react",
            "@reown/appkit",
            "@reown/appkit-adapter-wagmi",
            "@logto/react",
            "viem",
            "wagmi",
            "xss",
            "yup",
            "zustand",
            "zod",
            "@dicebear/collection",
            "@dicebear/core",
            "@emotion/react",
            "ethers",
            "lodash",
            "@floating-ui/react",
            "@codemirror/lang-javascript",
            "@codemirror/lint",
            "@codemirror/state",
            "@codemirror/view",
            "@chakra-ui/react",
            "@chakra-ui/styled-system",
            "@chakra-ui/system",
            "@chakra-ui/theme-tools",
            "@chakra-ui/utils",
          ]
        : [],
    workerThreads: false,
    optimizeCss: false,
    nextScriptWorkers: true,
    cpus: 8,
    memoryBasedWorkersCount: false,
    webpackMemoryOptimizations: false,
    staticGenerationMinPagesPerWorker: 4,
    staticGenerationMaxConcurrency: 8,
    staticGenerationRetryCount: 1,
    serverSourceMaps: true,
    webpackBuildWorker: true,
  },
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  publicRuntimeConfig: publicEnvs,
  env: publicEnvs,
}

export default nextConfig
