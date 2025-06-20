import type { ChakraProviderProps } from "@chakra-ui/react"
import { ChakraProvider as ChakraProviderDefault } from "@chakra-ui/react"
import { memo } from "react"
import theme from "theme"
import Toast from "ui/shared/Toast"

interface Props extends ChakraProviderProps {
  // cookies?: string;
}

function ChakraProvider({ children }: Props) {
  // const colorModeManager =
  //   typeof cookies === "string"
  //     ? cookieStorageManagerSSR(
  //         typeof document !== "undefined" ? document.cookie : cookies,
  //       )
  //     : localStorageManager;

  return (
    <ChakraProviderDefault
      theme={theme}
      toastOptions={{
        // component: Toast,
        defaultOptions: {
          render: Toast,
          position: "top-right",
          duration: 4000,
          isClosable: true,
          containerStyle: {},
        },
      }}
    >
      {children}
    </ChakraProviderDefault>
  )
}

export default memo(ChakraProvider, (prev, next) => {
  return prev.children === next.children
})
