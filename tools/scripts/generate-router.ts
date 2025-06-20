import nextConfig from "next.config"
import nextRoutes from "nextjs-routes/config"

const currentDir = process.cwd()

const withRoutes = nextRoutes({
  dir: currentDir,
  outDir: "nextjs",
})

withRoutes(nextConfig)
