// import type { UseQueryResult } from "@tanstack/react-query";
// import type { ResourceError } from "lib/api/resources";
// import useApiQuery from "lib/api/useApiQuery";
// import * as cookies from "lib/cookies";
// import { useSetStateQuery } from "lib/router/useSetStateQuery";
// import useSocketChannel from "lib/socket/useSocketChannel";
// import { useCallback, useMemo, useState } from "react";
// import type { Address as TAddress } from "types/api/address";
// import type { SmartContract } from "types/api/contract";
// import ContractCodeEVM from "ui/address/contract/ContractCodeEVM";
// import ContractMethodsCustom from "ui/address/contract/methods/ContractMethodsCustom";
// import ContractMethodsProxy from "ui/address/contract/methods/ContractMethodsProxy";
// import ContractMethodsRegular from "ui/address/contract/methods/ContractMethodsRegular";
// import { divideAbiIntoMethodTypes } from "ui/address/contract/methods/utils";
// import type { RoutedTab } from "ui/shared/Tabs/types";

// const CONTRACT_TAB_IDS = [
//   "contract_code",
//   "read_contract",
//   "read_contract_rpc",
//   "read_proxy",
//   "read_custom_methods",
//   "write_contract",
//   "write_contract_rpc",
//   "write_proxy",
//   "write_custom_methods",
// ] as const;

// export default function useContractTabs({
//   addressQuery,
//   contractQuery,
// }: {
//   addressQuery: UseQueryResult<TAddress, ResourceError>;
//   contractQuery: UseQueryResult<SmartContract, ResourceError<unknown>>;
// }) {
//   const { isPlaceholderData, data } = addressQuery;

//   const customAbiQuery = useApiQuery("custom_abi", {
//     queryOptions: {},
//   });

//   const methods = useMemo(
//     () => divideAbiIntoMethodTypes(contractQuery.data?.abi ?? []),
//     [contractQuery.data?.abi],
//   );

//   const methodsCustomAbi = useMemo(() => {
//     return divideAbiIntoMethodTypes(
//       customAbiQuery.data?.find(
//         (item) =>
//           data &&
//           item.contract_address_hash.toLowerCase() === data.hash.toLowerCase(),
//       )?.abi ?? [],
//     );
//   }, [customAbiQuery.data, data]);

//   const verifiedImplementations = useMemo(() => {
//     return (
//       data?.implementations?.filter(
//         ({ name, address }) => name && address && address !== data?.hash,
//       ) || []
//     );
//   }, [data?.hash, data?.implementations]);

//   return useMemo(() => {
//     return {
//       tabs: [
//         {
//           id: "contract_code" as const,
//           title: "Code",
//           component: (
//             <ContractCodeEVM
//               contractQuery={contractQuery}
//               channel={channel}
//               addressHash={data?.hash}
//             />
//           ),
//         },
//         methods.read.length > 0 && {
//           id: "read_contract" as const,
//           title: "Read contract",
//           component: (
//             <ContractMethodsRegular
//               type="read"
//               abi={methods.read}
//               isLoading={contractQuery.isPlaceholderData}
//               addressHash={data?.hash}
//               tab={tab}
//             />
//           ),
//         },
//         methodsCustomAbi.read.length > 0 && {
//           id: "read_custom_methods" as const,
//           title: "Read custom",
//           component: (
//             <ContractMethodsCustom
//               type="read"
//               abi={methodsCustomAbi.read}
//               isLoading={contractQuery.isPlaceholderData}
//               addressHash={data?.hash}
//               tab={tab}
//             />
//           ),
//         },
//         verifiedImplementations.length > 0 && {
//           id: "read_proxy" as const,
//           title: "Read proxy",
//           component: (
//             <ContractMethodsProxy
//               type="read"
//               implementations={verifiedImplementations}
//               isLoading={contractQuery.isPlaceholderData}
//               addressHash={data?.hash}
//               tab={tab}
//             />
//           ),
//         },
//         methods.write.length > 0 && {
//           id: "write_contract" as const,
//           title: "Write contract",
//           component: (
//             <ContractMethodsRegular
//               type="write"
//               abi={methods.write}
//               isLoading={contractQuery.isPlaceholderData}
//               addressHash={data?.hash}
//               tab={tab}
//             />
//           ),
//         },
//         methodsCustomAbi.write.length > 0 && {
//           id: "write_custom_methods" as const,
//           title: "Write custom",
//           component: (
//             <ContractMethodsCustom
//               type="write"
//               abi={methodsCustomAbi.write}
//               isLoading={contractQuery.isPlaceholderData}
//               addressHash={data?.hash}
//               tab={tab}
//             />
//           ),
//         },
//         verifiedImplementations.length > 0 && {
//           id: "write_proxy" as const,
//           title: "Write proxy",
//           component: (
//             <ContractMethodsProxy
//               type="write"
//               implementations={verifiedImplementations}
//               isLoading={contractQuery.isPlaceholderData}
//               addressHash={data?.hash}
//               tab={tab}
//             />
//           ),
//         },
//       ].filter(Boolean) as RoutedTab[],
//       hideOnSingle:
//         !contractQuery.data?.is_verified &&
//         !methodsCustomAbi.read.length &&
//         !methodsCustomAbi.write.length,
//     };
//   }, [
//     contractQuery,
//     data?.hash,
//     verifiedImplementations,
//     methods.read,
//     methods.write,
//     methodsCustomAbi.read,
//     methodsCustomAbi.write,
//   ]);
// }
