import { Flex } from "@chakra-ui/react"
import { memo } from "react"

import OptimizationImage from "ui/shared/OptimizationImage"
import FooterLinkGroup from "./FooterLinkGroup"
import FooterMoreInfo from "./FooterMoreInfo"
import FooterProjectInfo from "./FooterProjectInfo"
import { footerHyperlinkGroupList } from "./types"

const Footer = () => {
  return (
    <Flex
      zIndex={3}
      bottom={0}
      marginTop="auto"
      marginBottom={0}
      mx="auto"
      as="footer"
      width="full"
      position="relative"
      height={{ base: "31.3125rem", lg: "16.8125rem" }}
    >
      <OptimizationImage
        hasWrapper
        wrapperProps={{ width: "full", height: "full" }}
        alt="footer"
        src="/images/home_background.jpeg"
        objectPosition="bottom left"
        backgroundColor="secondary.03"
      ></OptimizationImage>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        inset={0}
        position="absolute"
        width={{ base: "full", xl: "1440px" }}
        mx="auto"
        paddingTop={10}
        paddingX={{ base: 4, lg: 5, "2lg": 8, xl: 10 }}
        paddingBottom={{ base: 3, lg: 2 }}
        gap={10}
      >
        <Flex
          height="full"
          justifyContent={{ lg: "space-between" }}
          alignItems="stretch"
          flexDirection={{ base: "column", lg: "row" }}
          gap={10}
        >
          <FooterProjectInfo></FooterProjectInfo>
          <Flex
            gap={{ base: "1rem", lg: "7.5rem" }}
            justifyContent="space-between"
          >
            {footerHyperlinkGroupList.map(({ title, items }) => (
              <FooterLinkGroup
                key={title}
                title={title}
                items={items}
              ></FooterLinkGroup>
            ))}
          </Flex>
        </Flex>
        <FooterMoreInfo></FooterMoreInfo>
      </Flex>
    </Flex>
  )
}

export default memo(Footer, () => true)
