import { exec } from "child_process"
import cluster from "cluster"
import { createServer } from "http"
import next from "next"
import nextConfig from "next.config"
import { stickConfigs } from "tools/scripts/stickConfigs"
import { parse } from "url"
import { promisify } from "util"

const execAsync = promisify(exec)

const port = Number(process.env.PORT || "3000")
const host = process.env.HOST || "127.0.0.1"
const clusters = Number(process.env.CLUSTERS || 1)
const env = process.env.NEXT_PUBLIC_APP_ENV

await Promise.all([
  execAsync("git rev-parse --short HEAD").catch((error) => error),
  execAsync("git describe --tags --abbrev=0 || true").catch((error) => error),
])
  .then(([commitShaOut, gitTagOut]) => {
    const commitSha = commitShaOut?.stdout?.trim()
    const gitTag = gitTagOut?.stdout?.trim()
    console.log("Commit SHA:", commitSha)
    console.log("Git Tag:", gitTag)

    process.env.NEXT_PUBLIC_GIT_COMMIT_SHA = commitSha
    process.env.NEXT_PUBLIC_GIT_TAG = gitTag
  })
  .catch((err) => {
    console.error("Error while fetching git info", err)
    process.exit(0)
  })

if (cluster.isPrimary) {
  stickConfigs(env)

  console.log(`Primary ${process.pid} is running`)

  // Start N workers for the number of CPUs
  for (let i = 0; i < clusters; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code) => {
    console.log(`Worker ${worker.process.pid} exited: ${code}`)
  })
} else {
  stickConfigs(env)

  const app = next({
    conf: nextConfig,
    customServer: true,
    dev: process.env.NODE_ENV === "development",
  })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    // startMaintenanceJob();

    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true)
      handle(req, res, parsedUrl)
    }).listen(port, host, () => {
      console.log(
        `> Server listening at http://localhost:${port} as NODE_ENV ${
          process.env.NODE_ENV
        }`,
      )
    })
  })
}
