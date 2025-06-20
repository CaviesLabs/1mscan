import fs from "fs";
import path from "path";

/**
 * Transform environment variables
 * @returns {Record<string, string>} envObject - A transformed object containing all environment variables
 */
export const transformEnv = () => {
  const envObject = {};
  for (const key in process.env) {
    if (Object.hasOwnProperty.call(process.env, key)) {
      envObject[key] = process.env[key];
    }
  }
  return envObject;
};

/**
 * Transform public environment variables
 * @returns {NodeJS.ProcessEnv} publicEnv - A transformed object containing only public environment variables (prefixed with NEXT_PUBLIC_)
 */
export const transformPublicEnv = () => {
  const publicEnv = {};
  for (const key in process.env) {
    if (!String(key).startsWith("NEXT_PUBLIC_")) {
      continue;
    }

    const publicKey = `NEXT_PUBLIC_${String(key).replace("NEXT_PUBLIC_", "")}`;
    publicEnv[publicKey] = process.env[key];
  }

  return publicEnv;
};

/**
 * Transform environment variables from a JSON file
 * @returns {Record<string, string>} commonConfig - Common configuration object read from the JSON config file
 */
export const transformEvnFromJsonFile = () => {
  const env = process.env.APP_ENV || "dev";
  const configFilePath = path.resolve(
    // Adjust this path according to the environment
    process.cwd(),
    `configs/envs/config.${
      {
        prod: "prod",
        dev: "dev",
        "local-dev": "local",
      }[env]
    }.json`,
  );

  // Read and parse the config file
  const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
  const commonConfig = config.common;

  // Return the common config or an empty object if not available
  return commonConfig ? commonConfig : {};
};
