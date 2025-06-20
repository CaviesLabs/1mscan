import type { StackProps } from "@chakra-ui/react"
import { Box, HStack } from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"
import { route } from "nextjs-routes"
import { Fragment } from "react"
import IconSvg from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"

const iconContent = (
  <IconSvg
    src="/icons/flower-white.svg"
    flexShrink={0}
    width="11px"
    height="11px"
    display="block"
    overflow="visible"
  />
)

const TOTAL_TEXTS = 5

const textContent = (
  <HStack flexShrink={0} whiteSpace="nowrap">
    <LinkInternal
      color="accent.yellow"
      _hover={{ color: "accent.yellow", textDecoration: "underline" }}
      href={route({
        pathname: "/claim-reward/[id]",
        query: { id: "sei " },
      })}
      flexShrink={0}
    >
      Claim your share
    </LinkInternal>
    <span>of the OKX Cryptopedia $300k SEI rewards today!</span>
  </HStack>
)

const BlockContent = ({ ...props }: StackProps) => (
  <HStack whiteSpace="nowrap" flexShrink={0} {...props}>
    {Array.from({ length: TOTAL_TEXTS }).map((_, i) => (
      <Fragment key={i}>
        {textContent}
        {iconContent}
      </Fragment>
    ))}
  </HStack>
)

const marqueeBoxes = (
  <Box
    overflow="hidden"
    width="100%"
    height="32px"
    alignItems="center"
    textStyle="875"
    bg="primary.light.4"
    color="neutral.light.1"
    role="group"
    position="relative"
  >
    <BlockContent
      paddingX={2}
      whiteSpace="nowrap"
      overflow="visible"
      animation={`${keyframes`
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        `} 20s linear infinite`}
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      spacing={4}
      _groupHover={{
        animationPlayState: "paused",
      }}
    ></BlockContent>
    <BlockContent
      paddingX={2}
      whiteSpace="nowrap"
      animation={`${keyframes`
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        `} 20s linear infinite`}
      position="absolute"
      spacing={4}
      overflow="visible"
      top={0}
      left={0}
      bottom={0}
      _groupHover={{
        animationPlayState: "paused",
      }}
    />
  </Box>
)

export default marqueeBoxes
