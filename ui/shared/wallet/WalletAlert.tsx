import {
  Alert,
  type AlertProps,
  Button,
  HStack,
  chakra,
} from "@chakra-ui/react"
import { memo } from "react"
import AddressEntityV2 from "../entities/address/AddressEntityV2"

type Props = {
  hash: string | undefined
  isConnected: boolean
  isConnecting: boolean
  onConnect: AnyFunction
} & AlertProps

const WalletAlert = ({
  hash,
  isConnected,
  isConnecting,
  onConnect,
  ...props
}: Props) => {
  return (
    <Alert
      variant="verifyContract"
      colorScheme={hash ? "green" : "orange"}
      maxWidth="full"
      flex={1}
      overflow="hidden"
      {...props}
    >
      <HStack
        alignItems="center"
        spacing={3}
        overflow="hidden"
        flexWrap="wrap"
        flex={1}
      >
        {isConnected ? (
          <>
            <span>Connected to </span>
            <AddressEntityV2
              flex={1}
              address={{ hash: hash }}
              truncation="dynamic"
              tailLength={4}
            />
          </>
        ) : (
          <>
            <chakra.span textStyle="1" color="secondary.01.text">
              Not connected
            </chakra.span>
            <Button
              onClick={onConnect}
              size="sm"
              variant="outline"
              backgroundColor="neutral.light.1"
              isLoading={isConnecting}
              loadingText="Connect wallet"
              borderRadius="0.5rem"
              paddingX="0.375rem"
              paddingY="0.5rem"
              textStyle="875"
              minWidth="5.625rem"
            >
              Connect wallet
            </Button>
          </>
        )}
      </HStack>
    </Alert>
  )
}

export default memo(WalletAlert, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isConnected === next.isConnected &&
    prev.isConnecting === next.isConnecting
  )
})
