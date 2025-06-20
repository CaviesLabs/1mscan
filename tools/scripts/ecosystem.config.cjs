// ecosystem.config.mjs
const CURRENT_PATH = process.cwd();

module.exports = {
  apps: [
    {
      name: "app",
      script: `${CURRENT_PATH}/server.ts`,
      interpreter: "/home/ubuntu/.bun/bin/bun", // Use bun as the interpreter
      exec_mode: "fork",
      watch: false,
      instances: 1,
      max_memory_restart: "10G",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_APP_ENV: "prod",
        CLUSTERS: 1,
        PORT: 3000,
      },
    },
  ],
};
