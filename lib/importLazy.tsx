import { Skeleton } from "@chakra-ui/react"
import dynamic, { type DynamicOptions, type Loader } from "next/dynamic"
import type { ComponentType } from "react"

export const importLazy: <P = {}>(
  loader: Loader<P>,
  options?: DynamicOptions<P>,
) => ComponentType<P> = (loader) =>
  dynamic(loader, {
    ssr: false,
    loading:
      // () => <L3Animation />,

      () => (
        <Skeleton
          height="2.5rem"
          borderRadius="0.5rem"
          width="50%"
          maxWidth="100vw"
        ></Skeleton>
      ),
  }) as ComponentType<any>
