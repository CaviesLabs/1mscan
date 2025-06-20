// "use client";

// import {
//   CompassExtensionProvider,
//   KeplrExtensionProvider,
//   KeplrMobileProvider,
//   LeapCosmosExtensionProvider,
//   LeapCosmosMobileProvider,
//   LeapMetamaskCosmosSnapExtensionProvider,
//   MetamaskExtensionProvider,
//   MetamaskMobileProvider,
//   OnseiMobileProvider,
//   ShuttleProvider,
// } from "@delphi-labs/shuttle-react";
// import { SEI_BASE_COSMOS_KIT_CHAIN } from "@sei-js/cosmjs";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const WC_PROJECT_ID = "3ab5de1807b141cc1972fe8125ba600f";

// const CONFIG = {
//   name: "Sei",
//   chainId: "pacific-1",
//   chainPrefix: "sei",
//   rpc: "https://rpc.sei-apis.com",
//   rest: "https://rest.sei-apis.com",
//   defaultCurrency: {
//     coinDenom: "SEI",
//     coinMinimalDenom: "usei",
//     coinDecimals: 6,
//     coinGeckoId: "sei",
//   },
//   bech32Config: SEI_BASE_COSMOS_KIT_CHAIN.bech32_config,
// };
// const extensionProviders = [
//   new LeapCosmosExtensionProvider({
//     networks: [CONFIG],
//   }),
//   new LeapMetamaskCosmosSnapExtensionProvider({
//     networks: [CONFIG],
//   }),

//   new KeplrExtensionProvider({
//     networks: [CONFIG],
//   }),
//   new CompassExtensionProvider({
//     networks: [CONFIG],
//   }),
//   new MetamaskExtensionProvider({
//     networks: [CONFIG],
//   }),
// ];

// const mobileProviders = [
//   new KeplrMobileProvider({
//     networks: [CONFIG],
//   }),
//   new LeapCosmosMobileProvider({
//     networks: [CONFIG],
//   }),

//   new MetamaskMobileProvider({
//     networks: [CONFIG],
//   }),
//   new OnseiMobileProvider({
//     networks: [CONFIG],
//   }),
// ];

// export const ShuttleKitProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const queryClient = new QueryClient();

//   return (
//     <ShuttleProvider
//       walletConnectProjectId={WC_PROJECT_ID}
//       mobileProviders={mobileProviders}
//       extensionProviders={extensionProviders}
//       // persistent
//     >
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </ShuttleProvider>
//   );
// };
