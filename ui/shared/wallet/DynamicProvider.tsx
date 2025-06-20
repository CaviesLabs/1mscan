// import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
// import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
// import { SEI_BASE_COSMOS_KIT_CHAIN } from "configs/frontend/chain/data";
// import { chainKey } from "configs/frontend/chain/utils";
// import type { NetworksOverrides } from "node_modules/@dynamic-labs/sdk-react-core/src/lib/context/DynamicContext";
// import { memo, useMemo } from "react";
// import { http } from "viem";
// import {
//   cookieStorage,
//   createConfig,
//   createStorage,
//   WagmiProvider,
// } from "wagmi";
// import { chainConfigs } from "../../../configs/frontend/chain/chainConfigs";

// type Props = {
//   children: React.ReactNode;
// };

// const DynamicProvider = ({ children }: Props) => {
//   const { config, evmNetworks } = useMemo(() => {
//     const chainConfig =
//       chainConfigs.find((chain) => chain.chainKey === chainKey) ??
//       chainConfigs[0];

//     const chainEVMConfig = chainConfig.config;

//     const config = createConfig({
//       chains: [chainEVMConfig],
//       storage: createStorage({
//         key: "wagmi",
//         storage: cookieStorage,
//       }),
//       ssr: true,
//       syncConnectedChain: false,
//       multiInjectedProviderDiscovery: false,
//       transports: {
//         [chainEVMConfig.id]: http(chainEVMConfig.rpcUrls.default.http[0]),
//       },
//     });

//     const evmNetworks = [
//       {
//         ...chainEVMConfig,
//         blockExplorerUrls: [chainEVMConfig.blockExplorers!.default.url],
//         iconUrls: [SEI_BASE_COSMOS_KIT_CHAIN.logo_URIs.svg!],
//         rpcUrls: chainEVMConfig.rpcUrls.default.http as string[],
//         chainId: chainConfig.chainId,
//         networkId: chainConfig.chainId,
//         name: chainConfig.chainPrettyName,
//       },
//     ] as NetworksOverrides;
//     return {
//       config,
//       evmNetworks,
//     };
//   }, []);
//   return (
//     <DynamicContextProvider
//       settings={{
//         // Find your environment id at https://app.dynamic.xyz/dashboard/developer
//         environmentId: "4534cac5-c8e7-4ba9-890f-b98316efe575",
//         walletConnectors: [EthereumWalletConnectors],
//         overrides: { evmNetworks: evmNetworks },
//         initialAuthenticationMode: "connect-only",
//       }}
//     >
//       <WagmiProvider reconnectOnMount config={config}>
//         <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
//       </WagmiProvider>
//     </DynamicContextProvider>
//   );
// };

// export default memo(DynamicProvider, (prev, next) => {
//   return prev.children === next.children;
// });
