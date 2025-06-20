import { Flex, Grid, Text, chakra } from "@chakra-ui/react"
import Column from "ui/shared/Column"
import Divider from "ui/shared/Divider"
import Title from "ui/shared/Title"
import {
  ColorCatalog,
  Download,
  LogoBox,
  LogoComplex,
  SubTitleBox,
} from "ui/shared/brandAssets/BrandEntity"
import FullLogo from "ui/shared/brandAssets/fullLogo.svg"
import Logo from "ui/shared/brandAssets/logo.svg"
import type { ColorMetadata } from "ui/shared/brandAssets/types"

type Props = {
  //
}

const primaryColors: ColorMetadata[] = [
  { name: "Persian Red", background: "primary.light.4", hex: "#BD0F36" },
  {
    name: "Gradient Persian Red",
    background: "primaryLightButton",
    hex: "#9C1237",
  },
]

const secondaryColors: ColorMetadata[] = [
  { name: "Sandy Brown", background: "secondary.01", hex: "#FAA352" },
  { name: "Sea Green", background: "secondary.02", hex: "#3ABD77" },
  { name: "Slate Purple", background: "secondary.03", hex: "#8160EB" },
  { name: "Azure Blue", background: "secondary.04", hex: "#3E8DF9" },
  { name: "Coral Red", background: "secondary.05", hex: "#F45959" },
  { name: "Stone Gray", background: "secondary.06", hex: "#A0A0A0" },
]

const BrandAssets = ({}: Props) => {
  return (
    <Column textStyle="1" color="neutral.light.7">
      <Column
        gap={2}
        width="full"
        paddingTop={{ base: "1rem", lg: "1.5rem" }}
        paddingBottom="1rem"
      >
        <Title as="h1">Brand assets</Title>
        <span>
          Thank you for your support and appreciation of our work. Below are
          guidelines for using our brand assets.
        </span>
      </Column>

      <Column paddingTop="1.5rem" paddingBottom="3.75rem" gap={8}>
        <Column gap={2}>
          <Title as="h3">Guidelines</Title>
          <Column>
            <span>
              You may use the 1Mscan name and logo on your website or app, but
              please adhere to the following guidelines:
            </span>
            <chakra.ul paddingLeft="2ch">
              <li>
                Do not alter, modify, or recreate the 1Mscan logo. Use it as
                provided in its original colors.
              </li>
              <li>
                Do not combine the 1Mscan logo with other images or use it for
                your own branding without written permission.
              </li>
              <li>
                Always include sufficient clear space around the logo and
                respect the minimum size requirement of 20px height.
              </li>
              <li>
                Do not use the 1Mscan brand to imply a relationship,
                affiliation, or endorsement (e.g., "we partner with 1Mscan").
              </li>
              <li>
                Reference 1Mscan appropriately: "Powered by 1Mscan," "Data
                provided by 1Mscan," or "Source: 1Mscan."
              </li>
              <li>
                Do not use the 1Mscan brand in any illegal or unlawful activity,
                promotion, or product.
              </li>
            </chakra.ul>
          </Column>
        </Column>

        <Divider></Divider>

        <Column rowGap={{ base: 6, lg: 10 }}>
          <Column gap={2}>
            <Title as="h3">1Mscan Logo</Title>
            <span>
              The official 1Mscan logos and icons are in PNG & SVG format.
            </span>
          </Column>

          <Column gap={8}>
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              columnGap={10}
              rowGap={2}
            >
              <SubTitleBox>
                <Title as="h4">1Mscan Logo and Name</Title>
                <Download
                  items={[
                    {
                      name: "full-logo.svg",
                      title: "SVG",
                      href: "/icons/logo/full-logo.svg",
                    },
                    {
                      name: "full-logo.png",
                      title: "PNG",
                      href: "/images/logo/full-logo.png",
                    },
                  ]}
                ></Download>
              </SubTitleBox>

              <LogoBox
                width={{ base: "full", lg: "37.5rem" }}
                paddingY="3.25rem"
                paddingX="2.6875rem"
              >
                <FullLogo></FullLogo>
              </LogoBox>
            </Flex>

            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              columnGap={10}
              rowGap={2}
            >
              <SubTitleBox>
                <Title as="h4">1Mscan Logo</Title>
                <Download
                  items={[
                    {
                      name: "logo.svg",
                      title: "SVG",
                      href: "/icons/logo/logo.svg",
                    },
                    {
                      name: "logo.png",
                      title: "PNG",
                      href: "/images/logo/logo.png",
                    },
                  ]}
                ></Download>
              </SubTitleBox>

              <LogoBox
                boxSize={{ base: "full", lg: "37.5rem" }}
                padding="6.25rem"
              >
                <Logo></Logo>
              </LogoBox>
            </Flex>

            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              columnGap={10}
              rowGap={2}
            >
              <SubTitleBox>
                <Title as="h4">Logo and Name in Light & Dark mode</Title>
              </SubTitleBox>
              <LogoBox width={{ base: "full", lg: "37.5rem" }}>
                <LogoComplex isFull></LogoComplex>
                <LogoComplex isFull colorMode="dark"></LogoComplex>
              </LogoBox>
            </Flex>

            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              columnGap={10}
              rowGap={2}
            >
              <SubTitleBox>
                <Title as="h4">Logo in Light & Dark mode</Title>
              </SubTitleBox>
              <LogoBox width={{ base: "full", lg: "37.5rem" }}>
                <LogoComplex></LogoComplex>
                <LogoComplex colorMode="dark"></LogoComplex>
              </LogoBox>
            </Flex>
          </Column>

          <Divider></Divider>

          <Column gap={5}>
            <Title as="h3">Brand Color</Title>
            <Column gap={8}>
              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                columnGap={10}
                rowGap={2}
              >
                <SubTitleBox>
                  <Title as="h4">Primary Color</Title>
                </SubTitleBox>
                <Grid
                  alignItems="stretch"
                  gridTemplateColumns={{
                    base: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                    "2lg": "1fr 1fr 1fr 1fr",
                    xl: "repeat(6, 1fr)",
                  }}
                  gap={5}
                >
                  {primaryColors.map(({ background, name, hex }) => (
                    <ColorCatalog
                      key={hex}
                      name={name}
                      background={background}
                      hex={hex}
                    ></ColorCatalog>
                  ))}
                </Grid>
              </Flex>
              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                columnGap={10}
                rowGap={2}
              >
                <SubTitleBox>
                  <Title as="h4">Secondary Color</Title>
                </SubTitleBox>
                <Grid
                  gap={5}
                  gridTemplateColumns={{
                    base: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                    "2lg": "1fr 1fr 1fr 1fr",
                    xl: "repeat(6, 1fr)",
                  }}
                >
                  {secondaryColors.map(({ background, name, hex }) => (
                    <ColorCatalog
                      key={hex}
                      name={name}
                      background={background}
                      hex={hex}
                    ></ColorCatalog>
                  ))}
                </Grid>
              </Flex>
            </Column>
          </Column>

          <Divider></Divider>

          <Column gap={5}>
            <Title as="h3">Typography</Title>
            <Column gap={8}>
              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                columnGap={10}
                rowGap={2}
              >
                <SubTitleBox>
                  <Title as="h4">Font family</Title>
                </SubTitleBox>
                <Column gap={3}>
                  <Text
                    fontSize="3.25rem"
                    fontWeight={500}
                    lineHeight="3.75rem"
                    color="neutral.light.8"
                    letterSpacing="-0.0975rem"
                  >
                    Inter
                  </Text>
                  <Column textStyle="1125">
                    <span>
                      A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S,
                      T, U, V, W, X, Y, Z
                    </span>
                    <span>
                      A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S,
                      T, U, V, W, X, Y, Z
                    </span>
                    <span>1, 2, 3, 4, 5, 6, 7, 8, 9, 0.</span>
                    <span>@ # $ % & * ( ) &#123; &#125; [ ]</span>
                  </Column>
                  <Download
                    items={[
                      {
                        name: "inter-font",
                        title: "Inter font family",
                        href: "https://fonts.google.com/specimen/Inter",
                        isExternal: true,
                      },
                    ]}
                  ></Download>
                </Column>
              </Flex>
            </Column>
          </Column>

          {/* <Divider></Divider> */}

          {/* <Column gap={2}>
            <Title as="h4">Agreement</Title>
            <p>
              Before using our brand assets, ensure compliance with our{" "}
              <>Branding Guidelines</> and <>Terms & Conditions</>.
            </p>
            <p>
              For inquiries about using the 1Mscan name not covered in the
              guidelines, feel free to reach out to us.
            </p>
          </Column> */}
        </Column>
      </Column>
    </Column>
  )
}

export default BrandAssets
