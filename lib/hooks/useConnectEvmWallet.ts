// import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
// import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from "ethers";
// import * as mixpanel from "lib/mixpanel/index";
// import React, { useMemo } from "react";
// import { wagmiConfig } from "ui/shared/wallet/Web3Provider";
// import type { WalletClient } from "viem";
// import {
//   useAccount,
//   useAccountEffect,
//   useDisconnect,
//   usePublicClient,
//   useWalletClient,
// } from "wagmi";
// // import { useRpcProvider } from "./userRpcProvider";

// const useWalletClientToSigner = (
//   client: WalletClient,
//   chainId: number,
//   name: string,
// ) => {
//   if (!client) return null;
//   const { account, transport } = client;
//   const provider = new BrowserProvider(transport as any, {
//     chainId,
//     name,
//   });

//   return new JsonRpcSigner(provider, account?.address as any);
// };

export const useConnectEvmWallet = (): any => {
  // const { open } = useWeb3Modal();
  // const { disconnect } = useDisconnect();
  // const { open: isOpen } = useWeb3ModalState();
  // const { address, isDisconnected } = useAccount({
  //   config: wagmiConfig,
  // });
  // const [isModalOpening, setIsModalOpening] = React.useState(false);
  // const client = useWalletClient();
  // const publicClient = usePublicClient();
  // const desiredChain = publicClient?.chain;
  // const rpcSigner = useMemo(() => {
  //   if (!address || isDisconnected) return null;
  //   return client?.data
  //     ? useWalletClientToSigner(
  //         client.data,
  //         Number(publicClient?.chain.id ?? 1329),
  //         String(publicClient?.chain?.name ?? "SEI"),
  //       )
  //     : null;
  // }, [client, isDisconnected, address, publicClient]);
  // const rpcProvider = useMemo(
  //   () => new JsonRpcProvider(desiredChain?.rpcUrls?.default?.http?.[0] || ""),
  //   [desiredChain],
  // );
  // const handleConnect = React.useCallback(async () => {
  //   setIsModalOpening(true);
  //   await open();
  //   setIsModalOpening(false);
  //   mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, {
  //     Source: "Smart contracts",
  //     Status: "Started",
  //   });
  // }, [open]);
  // const handleAccountConnected = React.useCallback(
  //   ({ isReconnected }: { isReconnected: boolean }) => {
  //     !isReconnected &&
  //       mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, {
  //         Source: "Smart contracts",
  //         Status: "Connected",
  //       });
  //   },
  //   [],
  // );
  // const handleDisconnect = React.useCallback(() => {
  //   disconnect();
  // }, [disconnect]);
  // useAccountEffect({
  //   config: wagmiConfig,
  //   onConnect: ({ isReconnected }) => {
  //     handleAccountConnected({ isReconnected });
  //   },
  //   onDisconnect: () => {
  //     // setIsDisconnected(true);
  //   },
  // });
  // return {
  //   handleConnect,
  //   handleDisconnect,
  //   isOpen,
  //   address,
  //   rpcSigner,
  //   rpcProvider,
  //   isDisconnected,
  //   isModalOpening,
  // };
  return {}
}
