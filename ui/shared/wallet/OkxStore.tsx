// import { OKXUniversalConnectUI } from "@okxconnect/ui";
// import type { IUniversalProvider } from "@okxconnect/universal-provider";
// import { useCurrentChain } from "lib/hooks/useCurrentChain";
// import { useCallback, useEffect, useMemo } from "react";
// import { isMobile } from "react-device-detect";
// import { proxy, ref, useSnapshot } from "valtio";

// const store = proxy<{
//   address: string;
//   provider: IUniversalProvider | undefined;
//   isConnected: boolean;
//   isConnecting: boolean;
// }>({
//   address: "",
//   provider: undefined,
//   isConnected: false,
//   isConnecting: false,
// });

// // devtools(store, { name: "store", enabled: true });

// export const useOkxWallet = (props?: { syncChain?: boolean }) => {
//   const currentChainConfig = useCurrentChain();

//   const chainParams = useMemo(() => {
//     const config = currentChainConfig.config;
//     const chainIdHex = `0x${config.id.toString(16)}`;
//     return {
//       chainId: chainIdHex,
//       chainName: currentChainConfig.chainPrettyName,
//       // iconUrls: [CosmosMainNet.logo_URIs!.svg, CosmosMainNet.logo_URIs!.png],
//       nativeCurrency: {
//         name: config.nativeCurrency.name,
//         symbol: config.nativeCurrency.symbol,
//         decimals: config.nativeCurrency.decimals,
//       },
//       rpcUrls: config.rpcUrls.default.http,
//       blockExplorerUrls: [config.blockExplorers?.default.url],
//     };
//   }, [currentChainConfig?.chainKey]);

//   const connect = useCallback(async () => {
//     if (!store.provider) return;

//     store.isConnecting = true;

//     if (isMobile) {
//       await (store.provider as OKXUniversalConnectUI)?.openModal({
//         namespaces: {
//           eip155: {
//             chains: [`eip155:${currentChainConfig.chainId}`],
//             rpcMap: {
//               [currentChainConfig.chainId]:
//                 currentChainConfig.config.rpcUrls.default.http[0],
//             },
//             defaultChain: currentChainConfig.chainId.toString(),
//           },
//         },
//         optionalNamespaces: {
//           eip155: {
//             chains: [`eip155:${currentChainConfig.chainId}`],
//           },
//         },
//       });
//     }

//     await store.provider?.request({
//       method: "wallet_addEthereumChain",
//       params: [chainParams],
//     });

//     await store.provider
//       ?.request({
//         method: "eth_requestAccounts",
//       })

//       .then((addresses) => {
//         const address = (addresses as string[])[0];
//         console.log(address);
//       });

//     return;
//   }, [currentChainConfig?.chainKey]);
//   const disconnect = useCallback(async () => {
//     await store.provider?.request({
//       method: "wallet_disconnect",
//     });
//   }, []);

//   useEffect(() => {
//     if (!store.provider) {
//       if (isMobile) {
//         OKXUniversalConnectUI.init({
//           dappMetaData: {
//             icon: "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
//             name: "OKX WalletConnect",
//           },
//           actionsConfiguration: {
//             returnStrategy: "tg://resolve",
//             modals: "all",
//             tmaReturnUrl: "back",
//           },
//           language: "en_US",
//           uiPreferences: {},
//         })
//           .then((provider) => {
//             store.provider = ref(provider);
//             return provider;
//           })
//           .catch(console.log);
//       } else {
//         store.provider = ref(window.okxwallet!);
//       }
//     }

//     const onAccountsChanged = (accounts: string[]) => {
//       console.log(accounts);
//       store.address = accounts[0];
//     };

//     const onConnect = () => {
//       store.isConnected = true;
//     };

//     const onDisconnect = () => {
//       store.isConnected = false;
//     };

//     const onChainChanged = (chainId: string) => {
//       if (props?.syncChain && chainId !== chainParams.chainId) {
//         store.provider?.request({
//           method: "wallet_switchEthereumChain",
//           params: [chainParams],
//         });
//       }
//     };

//     store.provider?.on("connect", onConnect);
//     store.provider?.on("disconnect", onDisconnect);
//     store.provider?.on("accountsChanged", onAccountsChanged);
//     store.provider?.on("chainChanged", onChainChanged);
//     return () => {
//       store.provider?.off("accountsChanged", onAccountsChanged);
//       store.provider?.off("connect", onConnect);
//       store.provider?.off("disconnect", onDisconnect);
//       store.provider?.off("chainChanged", onChainChanged);
//     };
//   }, []);

//   return {
//     ...useSnapshot(store),
//     disconnect,
//     connect,
//   };
// };
