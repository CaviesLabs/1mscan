// import React from "react";

// import { http } from "viem";
// import { WagmiProvider, createConfig } from "wagmi";
// import type { WagmiAppKitOptions } from "@web3modal/wagmi/react";
// import { createWeb3Modal } from "@web3modal/wagmi/react";

// import colors from "theme/foundations/colors";
// import zIndices from "theme/foundations/zIndices";

// import config from "configs/app";
// import { useRouter } from "next/router";

// import WalletIdsExcludeOkx from "lib/web3/wallet-id-exclude-okx.json";
// import { chainConfigs, MainNet } from "configs/frontend/chain/chainConfigs";
// import { getChainKeyConfig } from "configs/frontend/chain/utils";

// const feature = config.features.blockchainInteraction;

// const OKX_ID =
//   "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709";

// const getConfig = () => {
//   try {
//     if (!feature.isEnabled) {
//       throw new Error();
//     }

//     const chainKey = chainKey;
//     const chainConfig = chainConfigs.find(
//       (chain) => chain.chainKey === chainKey,
//     );

//     const wagmiConfig = createConfig({
//       chains: chainConfig?.config ? [chainConfig.config] : [MainNet],
//       connectors: [],
//       transports: chainConfig?.config?.id
//         ? {
//             [chainConfig?.config?.id]: http(
//               chainConfig?.config?.rpcUrls.default.http[0],
//             ),
//           }
//         : {},
//     });

//     return { wagmiConfig };
//   } catch {
//     return {};
//   }
// };

// export const { wagmiConfig } = getConfig();

// const Fallback = ({
//   children,
//   fallback,
// }: {
//   children: React.ReactNode;
//   fallback?: JSX.Element | (() => JSX.Element);
// }) => {
//   return typeof fallback === "function"
//     ? fallback()
//     : fallback || <>{children}</>;
// };

// const Provider = ({
//   children,
//   fallback,
// }: {
//   children: React.ReactNode;
//   fallback?: JSX.Element | (() => JSX.Element);
// }) => {
//   const router = useRouter();
//   if (!wagmiConfig || !feature.isEnabled) {
//     return <Fallback fallback={fallback}>{children}</Fallback>;
//   }

//   const configOptions: WagmiAppKitOptions = {
//     wagmiConfig,
//     projectId: feature.walletConnect.projectId,
//     themeMode: "light",
//     themeVariables: {
//       "--w3m-z-index": zIndices.modal,
//       "--w3m-accent": colors.blue[600],
//       "--w3m-border-radius-master": "2px",
//     },
//   };

//   if (router.pathname === "/claim-reward/[id]") {
//     configOptions.excludeWalletIds = [...WalletIdsExcludeOkx];
//     configOptions.featuredWalletIds = [OKX_ID];
//     configOptions.includeWalletIds = [OKX_ID];
//   }

//   createWeb3Modal(configOptions);

//   return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
// };

// const Web3ModalProvider =
//   wagmiConfig && feature.isEnabled ? Provider : Fallback;

// export default Web3ModalProvider;
