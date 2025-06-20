import type { BoxProps, FlexProps } from "@chakra-ui/react"
import { Box, Flex, Skeleton, Text, VStack, useToken } from "@chakra-ui/react"
import { currentChainConfig } from "lib/hooks/useCurrentChain"
import { memo, useMemo } from "react"
import type { IIBCChain, IIBCRelayerChannel } from "types/api/ibcRelayer"
import IBCRelayerChain from "./IBCRelayerChain"
import type { IIBCRelayersStatus } from "./types"

type IBCRelayerChainConnectorProps = {
  counterparty: IIBCChain | undefined
  isLoading?: boolean
}

const IBCRelayerConnectorContent = ({
  label,
  value,
  status,
  isLoading,
}: {
  label: any
  value?: any
  status: IIBCRelayersStatus
  isLoading?: boolean
}) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <VStack
        paddingX={4}
        paddingY={2}
        backgroundColor={`secondary.${status === "opened" ? "02" : "05"}.text`}
        borderRadius="0.375rem"
        borderWidth="1px"
        borderColor={`secondary.${status === "opened" ? "02" : "05"}`}
        boxShadow="0px 4px 8px 0px rgba(6, 75, 38, 0.40)"
        spacing={1}
      >
        <Text color="neutral.light.1" textStyle="1">
          {label}
        </Text>
        {value && (
          <Text
            color="neutral.light.1"
            wordBreak="keep-all"
            whiteSpace="nowrap"
            textStyle="8125"
          >
            {value}
          </Text>
        )}
      </VStack>
    </Skeleton>
  )
}

const Connector = ({
  placement,
  status,
  isLoading,
  ...props
}: BoxProps & {
  placement: "1st" | "2nd"
  status: IIBCRelayersStatus
  isLoading?: boolean
}) => {
  const secondary02Text = useToken("colors", "secondary.02.text")
  const dotStyles = useMemo(
    () =>
      ({
        position: "absolute",
        boxSize: "0.375rem",
        borderRadius: "full",
        zIndex: 1,

        backgroundColor:
          status === "opened" ? "secondary.02.text" : "transparent",
      }) as BoxProps,
    [status],
  )

  return (
    <Skeleton
      width={{ base: "1px", lg: "full" }}
      height={{ base: "1.5rem", lg: "1px" }}
      marginRight={{ lg: placement === "1st" ? "0.15rem" : 0 }}
      marginLeft={{ lg: placement === "2nd" ? "0.15rem" : 0 }}
      marginTop={{ base: placement === "2nd" ? "0.15rem" : 0, lg: 0 }}
      marginBottom={{ base: placement === "1st" ? "0.15rem" : 0, lg: 0 }}
      zIndex={1}
      isLoaded={!isLoading}
    >
      <Box
        width="full"
        height="full"
        backgroundImage={
          status === "opened"
            ? `linear-gradient(to right, ${secondary02Text}, ${secondary02Text})`
            : (placement === "1st" &&
                `linear-gradient(to right, 
                      rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1) 12px, 
                      transparent 12px, transparent 17px, 
                      rgba(255, 0, 0, 0.3) 17px, rgba(255, 0, 0, 0.3) 29px, 
                      transparent 29px, transparent 34px, 
                      rgba(255, 0, 0, 0.5) 34px, rgba(255, 0, 0, 0.5) 46px, 
                      transparent 46px, transparent 51px, 
                      rgba(255, 0, 0, 0.7) 51px, rgba(255, 0, 0, 0.7) 63px, 
                      transparent 63px, transparent 68px, 
                      rgba(255, 0, 0, 1) 68px, rgba(255, 0, 0, 1) 80px)`) ||
              (placement === "2nd" &&
                `linear-gradient(to right, 
                      rgba(255, 0, 0, 1), rgba(255, 0, 0, 1) 12px, 
                      transparent 12px, transparent 17px, 
                      rgba(255, 0, 0, 0.7) 17px, rgba(255, 0, 0, 0.7) 29px, 
                      transparent 29px, transparent 34px, 
                      rgba(255, 0, 0, 0.5) 34px, rgba(255, 0, 0, 0.5) 46px, 
                      transparent 46px, transparent 51px, 
                      rgba(255, 0, 0, 0.3) 51px, rgba(255, 0, 0, 0.3) 63px, 
                      transparent 63px, transparent 68px, 
                      rgba(255, 0, 0, 0.1) 68px, rgba(255, 0, 0, 0.1) 80px)`) ||
              undefined
        }
        backgroundSize="85px 100%"
        backgroundRepeat="repeat-x"
        filter="drop-shadow(0px 4px 8px rgba(6, 75, 38, 0.40))"
        position="relative"
        {...props}
      >
        <Box
          {...dotStyles}
          top={{
            base: 0,
            lg: "50%",
          }}
          left={{ base: "50%", lg: 0 }}
          transform={{
            base: `translate(-50%, ${(placement === "1st" && "-50%") || (placement === "2nd" && "0") || ""})`,
            lg: `translate(${(placement === "1st" && "-50%") || (placement === "2nd" && "0") || ""}, -50%)`,
          }}
        ></Box>
        <Box
          {...dotStyles}
          top={{
            lg: "50%",
          }}
          bottom={{ base: 0, lg: "unset" }}
          right={{ base: "50%", lg: 0 }}
          transform={{
            base: `translate(50%, ${(placement === "1st" && "0") || (placement === "2nd" && "50%") || ""})`,
            lg: `translate(${(placement === "1st" && "0") || (placement === "2nd" && "50%") || ""}, -50%)`,
          }}
        ></Box>
      </Box>
    </Skeleton>
  )
}

export const IBCRelayerChainConnector = memo(
  ({ counterparty, isLoading }: IBCRelayerChainConnectorProps) => {
    const status = useMemo<IIBCRelayersStatus>(
      () => (counterparty?.open_channel ? "opened" : "closed"),
      [counterparty?.open_channel],
    )

    return (
      <Flex
        width="full"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="center"
        gap={0}
      >
        <IBCRelayerChain
          label={currentChainConfig?.chainPrettyName}
          value={currentChainConfig?.chainKey}
          image_url="/images/sei.svg"
          isLoading={isLoading}
        ></IBCRelayerChain>
        <Connector
          placement="1st"
          status={status}
          isLoading={isLoading}
        ></Connector>
        <IBCRelayerConnectorContent
          isLoading={isLoading}
          status={counterparty?.open_channel ? "opened" : "closed"}
          label={counterparty?.open_channel ? "Connected" : "Closed"}
          value={`${counterparty?.open_channel}/${counterparty?.total_channel} channels`}
        ></IBCRelayerConnectorContent>
        <Connector
          placement="2nd"
          status={status}
          isLoading={isLoading}
        ></Connector>
        <IBCRelayerChain
          label={counterparty?.pretty_name || "Unknown chain name"}
          value={counterparty?.chain}
          image_url={
            counterparty?.logo_URLs?.svg ||
            counterparty?.logo_URLs?.png ||
            undefined
          }
          chain={counterparty?.chain}
          isLoading={isLoading}
        ></IBCRelayerChain>
      </Flex>
    )
  },
  (prev, next) => {
    return (
      prev.isLoading === next.isLoading &&
      prev.counterparty === next.counterparty
    )
  },
)

type IBCRelayerChannelConnector = {
  channel: IIBCRelayerChannel
  isLoading?: boolean
} & FlexProps

export const IBCRelayerChannelConnector = memo(
  ({ channel, isLoading, ...props }: IBCRelayerChannelConnector) => {
    return (
      <Flex
        width="full"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="center"
        gap={0}
        {...props}
      >
        <IBCRelayerChain
          label={currentChainConfig?.chainName}
          value={channel.channel_id}
          image_url="/images/sei.svg"
          isLoading={isLoading}
        ></IBCRelayerChain>
        <Connector
          placement="1st"
          isLoading={isLoading}
          status={channel.state === "OPEN" ? "opened" : "closed"}
        ></Connector>
        <IBCRelayerConnectorContent
          isLoading={isLoading}
          status={channel.state === "OPEN" ? "opened" : "closed"}
          label={channel.state === "OPEN" ? "Opened" : "Closed"}
        ></IBCRelayerConnectorContent>
        <Connector
          placement="2nd"
          isLoading={isLoading}
          status={channel.state === "OPEN" ? "opened" : "closed"}
        ></Connector>
        <IBCRelayerChain
          label={channel.counterparty_chain_pretty_name}
          value={channel.counterparty_channel_id}
          image_url={
            channel.counterparty_chain_logo_URLs?.svg ||
            channel.counterparty_chain_logo_URLs?.png ||
            undefined
          }
          isLoading={isLoading}
        ></IBCRelayerChain>
      </Flex>
    )
  },
  (prev, next) => {
    return prev.isLoading === next.isLoading && prev.channel === next.channel
  },
)
