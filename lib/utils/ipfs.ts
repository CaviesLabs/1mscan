// import { create } from "ipfs-http-client";
// import axios from "axios";

// const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// const checkIPFS = async (ipfsPath: string) => {
//   return await ipfs.files
//     .stat(`/ipfs/${ipfsPath}`)
//     .then(() => true)
//     .catch((error) => {
//       if (axios.isAxiosError(error) && error?.response?.status === 404) {
//         return false;
//       } else {
//         return error;
//       }
//     });
//   return true;
// };

// function extractPathFromURL(url: string) {
//   if (!url?.includes("ipfs")) return false;
//   const parsedUrl = new URL(url);
//   const parts = parsedUrl.pathname.split("/").filter(Boolean);
//   if (parts.length < 2) {
//     return false;
//   }
//   const gateway = `${parsedUrl.origin}/ipfs/`;

//   return url.replace(gateway, "");
// }

// export const checkIPFSURL = async (url: any) => {
//   const path = extractPathFromURL(url);
//   if (path === false) return undefined;
//   return checkIPFS(path);
// };
