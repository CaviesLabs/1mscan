// import fs from "fs";
// import type { NextApiRequest, NextApiResponse } from "next";
// import pino from "pino";

// // const root = process.cwd();

// // if (!fs.existsSync(`${root}/logs`)) {
// //   fs.mkdirSync(`${root}/logs`);
// // }

// const stream = fs.createWriteStream(`./logs/collect.log`, {
//   flags: "a",
//   encoding: "utf8",
// });

// const logger = pino(stream);

// export default async function collect(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const ip = req.headers["x-real-ip"] || req.socket.remoteAddress || "";
//   const user_agent = req.headers["user-agent"] || "";
//   const hostname = req.headers["host"] || "";
//   const body = req.body;
//   const url = req.url;

//   logger.error({
//     ip,
//     user_agent,
//     hostname,
//     url,
//     body,
//   });

//   return res.status(202).json({ message: "Accepted" });
// }
