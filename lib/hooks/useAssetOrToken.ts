// import { chainKey } from "configs/frontend/chain/utils";
// import useApiQuery from "lib/api/useApiQuery";
// import { useFindToken } from "./useFindToken";

// export const useAssetOrToken = (
//   identifier: string | undefined | null,
//   options?: {
//     enabled?: boolean;
//   },
// ) => {
//   const enabled = options?.enabled ?? true;

//   const {
//     data: asset,
//     isFetching: isFetchingAsset,
//     isFetched: isFetchedAsset,
//   } = useApiQuery("asset_detail", {
//     queryParams: {
//       identifier: identifier!,
//       chain_id: chainKey,
//     },
//     queryOptions: {
//       enabled: Boolean(identifier && identifier !== "usei" && enabled),
//     },
//   });

//   const { data: token, isFetching: isFetchingToken } = useFindToken(
//     identifier,
//     {
//       enabled: Boolean(
//         identifier &&
//           identifier !== "usei" &&
//           enabled &&
//           isFetchedAsset &&
//           !asset,
//       ),
//     },
//   );

//   return {
//     asset,
//     token,
//     isFetching: isFetchingAsset || isFetchingToken,
//   };
// };
