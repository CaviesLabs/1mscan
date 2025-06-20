import { Center, Flex, Link, Text } from "@chakra-ui/react"
import { getEnvValue } from "configs/hydration/utils"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import Divider from "ui/shared/Divider"
import type { IconName } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import FooterAddChainEvm from "./FooterAddChainEvm"
import FooterAddCompass from "./FooterAddCompass"

type Props = {
  //
}

const SEITRACE_LINKS: {
  iconSize: string
  text: string
  name?: IconName
  href: string
}[] = [
  {
    iconSize: "1.5rem",
    text: "1Mscan @2025",
    name: "twitter",
    href: "https://x.com/seitrace_",
  },
]

const DonationAddress = ({ hash }: { hash: string }) => {
  return (
    <AddressEntityV2
      address={{ hash: hash }}
      headLength={6}
      tailLength={6}
      hashProps={{ color: "secondary.01" }}
      noLink
      noIcon
      truncation="constant"
      copyProps={{ color: "neutral.light.2", boxSize: 4 }}
    ></AddressEntityV2>
  )
}

const FooterMoreInfo = ({}: Props) => {
  return (
    <Flex
      gap={{ base: 3, lg: 2 }}
      flexDirection="column"
      width="full"
      alignItems="stretch"
      textStyle="875"
    >
      <Divider
        width="full"
        backgroundColor="neutral.light.1"
        opacity={0.2}
      ></Divider>
      <Flex
        alignItems="center"
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        gap={{ base: 2, lg: 3 }}
      >
        <Flex height={7} alignItems="center" gap={3}>
          <Text textStyle="875" color="neutral.light.1">
            {getLanguage("footer.add_sei_to_wallets")}
          </Text>
          <FooterAddChainEvm></FooterAddChainEvm>
          <FooterAddCompass></FooterAddCompass>
        </Flex>

        <Flex
          alignItems="center"
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent="flex-end"
          gap={{ base: 2, lg: 3 }}
          opacity={0.8}
        >
          <Flex height={7} alignItems="center" gap={3}>
            {SEITRACE_LINKS.map((link) => (
              <Flex key={link.name} alignItems="center" height={6} gap={3}>
                <Center as={Link} boxSize={6} href={link.href} target="_blank">
                  <IconSvg name={link.name!} boxSize="full" cursor="pointer" />
                </Center>
                <Divider
                  height={4}
                  orientation="vertical"
                  backgroundColor="neutral.light.1"
                  opacity={0.3}
                ></Divider>
                <Text textStyle="875" color="neutral.light.1">
                  {link.text}
                </Text>
              </Flex>
            ))}

            <Divider
              height="unset"
              alignSelf="stretch"
              orientation="vertical"
              backgroundColor="neutral.light.1"
              opacity={0.3}
            ></Divider>

            <Text color="neutral.light.1">
              v.{getEnvValue("NEXT_PUBLIC_GIT_TAG")}+commit.
              {getEnvValue("NEXT_PUBLIC_GIT_COMMIT_SHA")}
            </Text>
          </Flex>

          <Divider
            height={4}
            orientation="vertical"
            backgroundColor="neutral.light.1"
            opacity={0.3}
            display={{ base: "none", lg: "inline-block" }}
          ></Divider>

          <Flex alignItems="center" gap={3}>
            <Text color="neutral.light.1">
              {getLanguage("footer.donations")}:
            </Text>
            <DonationAddress hash="sei1ghpsfnzq0cwzs6d5knmxyhse3a9e6r5mpjnru7"></DonationAddress>
            <DonationAddress hash="0x68c466145d3095832c87d9bd9b5013496886b895"></DonationAddress>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(FooterMoreInfo, () => true)
