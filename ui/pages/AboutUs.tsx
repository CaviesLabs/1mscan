import {
  Box,
  Grid,
  Text,
  type TextProps,
  VStack,
  chakra,
} from "@chakra-ui/react"
import type { ReactNode } from "react"
import LinkExternal from "ui/shared/LinkExternal"
import OptimizationImage from "ui/shared/OptimizationImage"
import { LogoComplex } from "ui/shared/brandAssets/BrandEntity"

type Props = {
  //
}

const members = [
  { name: "Tin Tran", role: "CEO/Co-founder/BD", avatar: "tintran.jpg" },
  { name: "Khang Tran", role: "Co-founder/CTO", avatar: "khangtran.jpg" },
  {
    name: "Hoang Phan",
    role: "Co-founder/Product Manager",
    avatar: "hoangphan.jpeg",
  },
  { name: "Thien Nguyen", role: "UI Designer", avatar: "thiennguyen.jpg" },
  {
    name: "Phat Nguyen",
    role: "Sr. Software Developer",
    avatar: "phatnguyen.jpg",
  },
  {
    name: "Stephen Pham",
    role: "Sr. Software Developer",
    avatar: "stephenpham.jpg",
  },
  { name: "Vu Tran", role: "Quality Control", avatar: "vutran.jpg" },
  { name: "Hai Dang", role: "Product Owner", avatar: "dang.jpg" },
  { name: "Khanh Le", role: "Software developer", avatar: "khanhle.jpg" },
  { name: "Hien Nguyen", role: "Quality Control", avatar: "hien.jpg" },
]

const Title = ({ children, ...props }: { children: ReactNode } & TextProps) => {
  return (
    <Text
      as="h2"
      textStyle="175"
      color="neutral.light.8"
      letterSpacing="-0.035rem"
      {...props}
    >
      {children}
    </Text>
  )
}

const Highlight = ({ children }: { children: ReactNode }) => {
  return <chakra.span textStyle="1500">{children}</chakra.span>
}

const AboutUs = ({}: Props) => {
  return (
    <VStack>
      <VStack
        width="full"
        height="4.75rem"
        paddingTop={{ base: "1rem", lg: "1.5rem" }}
        paddingBottom="1rem"
      >
        <Title as="h1">About us</Title>
      </VStack>
      <VStack
        gap={8}
        paddingTop="1.5rem"
        paddingBottom="3.75rem"
        width={{ base: "full", lg: "47.5rem" }}
      >
        <VStack width="full" gap={8}>
          <Box
            position="relative"
            width="full"
            height="12.5rem"
            overflow="hidden"
            borderRadius="0.5rem"
          >
            <LogoComplex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              isFull
              zIndex={1}
              width="unset"
              height="unset"
              colorMode="dark"
              backgroundColor="none"
              paddingTop={0}
              paddingBottom={0}
              paddingX={0}
              showDescription={false}
              stackProps={{ flexDirection: "column", gap: 6 }}
              iconProps={{ wrapperProps: { boxSize: "5rem" } }}
              nameProps={{ width: "13.96488rem", height: "1.98531rem" }}
            ></LogoComplex>
            <OptimizationImage
              hasWrapper
              alt="about_us"
              src="/images/home_background.jpeg"
              objectFit="cover"
              objectPosition="center"
              wrapperProps={{
                width: "full",
                height: "full",
                overflow: "hidden",
                position: "relative",
              }}
            ></OptimizationImage>
          </Box>
          <VStack gap={3}>
            <Title>About 1Mscan</Title>
            <VStack color="neutral.light.7">
              <Text as="p" textAlign="center" textStyle="1">
                <Highlight>1Mscan</Highlight> is the{" "}
                <Highlight>premier block explorer</Highlight> and{" "}
                <Highlight>analytics platform</Highlight> for the{" "}
                <Highlight>Sei Network</Highlight>, uniquely{" "}
                <Highlight>supporting both the parallelized EVM</Highlight> and{" "}
                <Highlight>Native Cosmos</Highlight> (on Wasm)
              </Text>
              <Text mt={6} as="p" textAlign="center" textStyle="1">
                Built and launched by the{" "}
                <LinkExternal
                  textStyle="1500"
                  display="inline"
                  href="https://cavies.xyz/"
                  noIcon
                >
                  Cavies team
                </LinkExternal>
                , 1Mscan provides a deep dive into real-time insights as the{" "}
                <Highlight>first comprehensive explorer</Highlight> for the{" "}
                <Highlight>
                  Sei Network. Track transactions, accounts, and contracts,
                  verify contracts,
                </Highlight>{" "}
                and <Highlight>explore network activity</Highlight> with our
                intuitive analytics tools, all designed to offer{" "}
                <Highlight>a thorough</Highlight> and{" "}
                <Highlight>user-friendly experience.</Highlight>
              </Text>
            </VStack>
          </VStack>
        </VStack>

        <VStack gap={10}>
          <VStack gap={3}>
            <Title>Our Team</Title>
            <VStack color="neutral.light.7">
              <Text as="p" textAlign="center" textStyle="1">
                Our team is{" "}
                <Highlight>
                  deeply passionate, enthusiastic about the decentralized
                  information and infrastructure applications
                </Highlight>{" "}
                that Sei enables.
              </Text>
            </VStack>
          </VStack>

          <Grid
            width="full"
            templateColumns={{
              base: "1fr",
              lg: "repeat(3, minmax(14.5rem, 1fr))",
            }}
            columnGap={8}
            rowGap={{ base: 6, lg: 10 }}
          >
            {members.map(({ name, role, avatar }) => {
              return (
                <VStack key={name}>
                  <OptimizationImage
                    src={`/images/avatar/${avatar}`}
                    hasWrapper
                    wrapperProps={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      aspectRatio: 1,
                      width: "full",
                      borderRadius: "0.5rem",
                      borderWidth: "0.5px",
                      borderColor: "neutral.light.4",
                      backgroundColor: "#F08C44",
                      overflow: "hidden",
                    }}
                    alt={name}
                  ></OptimizationImage>
                  <VStack paddingY={3} gap={1}>
                    <Text as="h4" textStyle="125" color="neutral.light.8">
                      {name}
                    </Text>
                    <Text as="span" textStyle="1" color="neutral.light.7">
                      {role}
                    </Text>
                  </VStack>
                </VStack>
              )
            })}
          </Grid>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default AboutUs
