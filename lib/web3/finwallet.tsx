// import isBrowser from "lib/isBrowser";
// import { useMemo } from "react";

// export const getProvider = () => {
//   return window.fin?.provider || undefined;
// };

// export const useProvider = () => {
//   return useMemo(() => getProvider(), [window.fin?.provider]);
// };

// // Function to check Fin Wallet provider and open download link if not available
// export function downloadProfile() {
//   const provider = window.fin?.provider;
//   if (!provider) {
//     // Open download link for Fin Wallet extension if not detected
//     return window.open(
//       "https://chromewebstore.google.com/detail/fin-wallet-for-sei/dbgnhckhnppddckangcjbkjnlddbjkna",
//     );
//   }
//   return provider;
// }

// // Function to connect Fin Wallet when button is clicked
// function connectWallet() {
//   if (window.fin?.provider) {
//     // Request accounts access from Fin Wallet extension
//     window.fin.provider.request({ method: "eth_requestAccounts" });
//     return window.fin.provider;
//   }
//   return false;
// }

// // Function to check connected accounts from Fin Wallet
// export function checkAccounts() {
//   if (window.fin?.provider) {
//     window.fin.provider
//       .request({ method: "eth_accounts" })
//       .then((accounts: string[]) => {
//         if (accounts.length > 0) {
//           // Handle when accounts are connected
//         } else {
//           // Display when wallet is not found
//         }
//       })
//       .catch((error: any) => {
//         console.error("Error fetching accounts:", error);
//       });
//   }
// }

// // Function to disconnect Fin Wallet when button is clicked
// export function disconnectWallet() {
//   if (window.fin?.provider) {
//     window.fin.provider.disconnect();
//   }
// }

// export const checkAndConnectFinWallet = () => {
//   if (!isBrowser()) return false;
//   if (window.fin?.provider) {
//     return connectWallet();
//   }
//   return downloadProfile();
// };
