// if (isBrowser()) throw new Error("This is a server-side only function");
// import { getEnvValue } from "configs/hydration/utils";
// import isBrowser from "lib/isBrowser";
// import type { IJsonChainConfigs } from "types/api";

// const env = getEnvValue("NEXT_PUBLIC_APP_ENV");
// const name =
//   (env === "prod" && "prod") || (env === "local-dev" && "local") || "dev";

// export const readJsonConfigs = async () => {
//   return await import(`configs/envs/config.${name}.json`).then(
//     (data) => data.default as IJsonChainConfigs,
//   );
// };
