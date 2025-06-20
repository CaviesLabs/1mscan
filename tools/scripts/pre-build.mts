import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import isBrowser from "../../lib/isBrowser";

const root = process.cwd();
const sourceDir = path.resolve(root, "node_modules/monaco-editor");
const destinationDir = path.resolve(root, "public/monaco-editor");

const execAsync = promisify(exec);

// let isCalled = false;

// export class BeforeCompilePlugin {
//   async apply() {
//     if (process.env.NODE_ENV === "local-dev") return;

//     if (isCalled || typeof window !== "undefined") return;

//     isCalled = true;

//     await Promise.all([
//       this.copyMonaco().then(() =>
//         console.log("🧿 Monaco Editor copied successfully"),
//       ),
//       this.buildSvg().then(() =>
//         console.log("🧿 SVG icons built successfully"),
//       ),
//     ]);
//   }

//   /**
//    * Copy the entire directory from source to destination.
//    * @returns {Promise<void>}
//    */
//   copyMonaco() {
//     return fs.promises.cp(sourceDir, destinationDir, { recursive: true });
//   }

//   /**
//    * Copy the entire directory from source to destination.
//    * @returns {Promise<void>}
//    */
//   buildSvg() {
//     return execAsync(
//       "./node_modules/.bin/icons build -i ./icons -o ./public/icons --optimize",
//     );
//   }
// }

// export const beforeBuildPlugin = new BeforeCompilePlugin();

/**
 * Copy the entire directory from source to destination.
 * @returns {Promise<void>}
 */
export const copyMonaco = async () => {
  // @ts-ignore
  if (process.env.NODE_ENV === "local-dev") return;
  if (isBrowser()) return;
  return fs.promises.cp(sourceDir, destinationDir, { recursive: true });
};

/**
 * Copy the entire directory from source to destination.
 * @returns {Promise<void>}
 */
export const buildSvg = async () => {
  // @ts-ignore
  if (process.env.NODE_ENV === "local-dev") return;
  if (isBrowser()) return;
  return execAsync(
    "./node_modules/.bin/icons build -i ./icons -o ./public/icons --optimize",
  );
};

// absolute path to ./sitemap.config.js