import type { FlexProps } from "@chakra-ui/react"
import { Flex, Text } from "@chakra-ui/react"
import config from "configs/app"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import OptimizationImage from "ui/shared/OptimizationImage"

type Props = {
  //
} & Partial<FlexProps>

const FooterProjectInfo = (props: Props) => {
  return (
    <Flex flexDirection="column" justifyContent="space-between" gap={4}>
      <Flex
        display="flex"
        flexDirection="column"
        color="neutral.light.1"
        width={{ base: "full", lg: "unset" }}
        flexWrap="wrap"
        {...props}
        gap={3}
      >
        <OptimizationImage
          hasWrapper
          wrapperProps={{ boxSize: 8 }}
          src="/icons/logo/footer-logo.svg"
          alt={`${config.chain.name} network logo`}
        />

        <Flex flexDirection="column" gap={1}>
          <Text
            as="h2"
            width="full"
            color="neutral.light.1"
            textStyle="125"
            letterSpacing="-0.0125rem"
          >
            {getLanguage("footer.powered_by_1matrix_blockchain")}
          </Text>

          {/* <Flex alignItems="center" width="full"> */}
          <Text as="h2" textStyle="1" width="full" color="neutral.light.1">
            {getLanguage(
              "footer.1mscan_is_a_block_explorer_and_analytics_platform_for_1matrix",
            )}
          </Text>
          {/* </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(FooterProjectInfo, () => true)
