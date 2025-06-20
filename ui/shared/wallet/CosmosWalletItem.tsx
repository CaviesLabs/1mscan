import type { StackProps } from "@chakra-ui/react"
import { Flex, HStack, Text } from "@chakra-ui/react"
import type { ChainWalletBase, DownloadInfo } from "@cosmos-kit/core"
import { getBrowser } from "lib/getBrowser"
import { useMemo, useState } from "react"
import OptimizationImage from "../OptimizationImage"

type Props = { chainWallet: ChainWalletBase } & StackProps

const findLink = (browser: string | null, data: DownloadInfo[] | undefined) => {
  for (const group of data || []) {
    if (group.device === "desktop" && group.browser === browser) {
      return group.link
    }
  }
  return undefined
}

const CosmosWalletItem = ({ chainWallet, ...props }: Props) => {
  const { walletInfo, isWalletNotExist } = chainWallet

  const [browserName] = useState(getBrowser())

  const downloadLink = useMemo(
    () =>
      isWalletNotExist
        ? findLink(browserName, walletInfo.downloads)
        : undefined,
    [browserName, walletInfo.downloads, isWalletNotExist],
  )
  return (
    <HStack
      as="button"
      _hover={{
        backgroundColor: "primary.light.1",
      }}
      spacing={3}
      width="full"
      padding={3}
      rounded="0.375rem"
      transition="all 0.2s ease-in-out"
      onClick={() => {
        if (downloadLink) {
          window.open(downloadLink, "_blank")
        }
      }}
      {...props}
    >
      <OptimizationImage
        hasWrapper
        alt={`wallet logo ${walletInfo.prettyName}`}
        src={
          (typeof walletInfo.logo === "string" && walletInfo.logo) ||
          (typeof walletInfo.logo === "object" && walletInfo.logo.major) ||
          ""
        }
        wrapperProps={{
          boxSize: "2.5rem",
          rounded: "0.25rem",
          overflow: "hidden",
        }}
      ></OptimizationImage>

      <Flex flexDirection="column" gap={1}>
        <Text textStyle="1125" color="neutral.light.7" textAlign="left">
          {walletInfo.prettyName}
        </Text>
      </Flex>
    </HStack>
  )
}

export default CosmosWalletItem
