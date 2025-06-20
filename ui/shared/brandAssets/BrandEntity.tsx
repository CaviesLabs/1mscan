import type {
  CenterProps,
  ColorMode,
  FlexProps,
  StackProps,
} from "@chakra-ui/react"
import { Box, Center, GridItem, HStack, Link, chakra } from "@chakra-ui/react"
import type { ReactNode } from "react"
import Column from "ui/shared/Column"
import type { IconSvgProps } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"
import type { OptimizationImageProps } from "ui/shared/OptimizationImage"
import OptimizationImage from "ui/shared/OptimizationImage"
import Row from "ui/shared/Row"
import type { ColorMetadata } from "./types"

export const Download = ({
  items,
}: {
  items: { name: string; href: string; title: string; isExternal?: boolean }[]
}) => {
  return (
    <Row alignItems="center" gap={1}>
      <span>Download</span>
      {items?.map(({ name, href, title, isExternal }) => {
        return (
          <Link
            key={name}
            href={href}
            download={name}
            target={isExternal ? "_blank" : undefined}
          >
            {title}
          </Link>
        )
      })}
    </Row>
  )
}

export const LogoBox = (props: CenterProps) => {
  return (
    <Center
      borderWidth="0.522px"
      borderColor="neutral.light.3"
      borderRadius="0.5rem"
      boxShadow="0px 16px 40px 0px rgba(0, 0, 0, 0.03)"
      backgroundColor="neutral.light.1"
      overflow="hidden"
      flexDirection={{ base: "column", lg: "row" }}
      {...props}
    ></Center>
  )
}

export const LogoComplex = ({
  colorMode = "light",
  isFull,
  showDescription = true,
  stackProps,
  iconProps,
  nameProps,
  ...props
}: {
  colorMode?: ColorMode
  isFull?: boolean
  showDescription?: boolean
  stackProps?: StackProps
  iconProps?: Partial<OptimizationImageProps>
  nameProps?: Partial<IconSvgProps>
} & Partial<CenterProps>) => {
  return (
    <Center
      paddingTop="3.25rem"
      paddingBottom="1.5rem"
      paddingX={{ base: "3.75rem", lg: "2.6rem" }}
      flexDirection="column"
      justifyContent="space-between"
      flex={1}
      height="full"
      width="full"
      backgroundColor={(colorMode === "dark" && "black") || "neutral.light.1"}
      gap={10}
      {...props}
    >
      <HStack
        gap="0.65rem"
        width="full"
        justifyContent="center"
        {...stackProps}
      >
        <OptimizationImage
          hasWrapper
          wrapperProps={{
            boxSize: isFull ? "2.60869rem" : "5rem",
            flexShrink: 0,
          }}
          alt="brand_logo"
          src="/icons/logo/logo.svg"
          {...iconProps}
        ></OptimizationImage>
        {isFull && (
          <IconSvg
            flexShrink={0}
            name="seitrace"
            width="9.90897rem"
            height="1.4087rem"
            color={
              (colorMode === "dark" && "neutral.light.1") || "neutral.light.8"
            }
            {...nameProps}
          ></IconSvg>
        )}
      </HStack>
      {showDescription && (
        <chakra.span
          color={colorMode === "dark" ? "neutral.light.2" : "neutral.light.7"}
        >
          Logo in {colorMode === "dark" ? "Dark" : "Light"} mode
        </chakra.span>
      )}
    </Center>
  )
}

export const SubTitleBox = ({ children }: { children: ReactNode }) => {
  return (
    <Column width={{ base: "full", lg: "15rem" }} paddingY={{ base: 0, lg: 3 }}>
      {children}
    </Column>
  )
}

export const ColorCatalog = ({
  background,
  name,
  hex,
  ...props
}: ColorMetadata & Omit<FlexProps, "background">) => {
  return (
    <GridItem
      display="flex"
      flexDirection="column"
      width={{ lg: "10.125rem" }}
      height="9rem"
      borderWidth="0.5px"
      borderColor="neutral.light.4"
      backgroundColor="neutral.light.1"
      borderRadius="0.25rem"
      overflow="hidden"
      boxSizing="content-box"
      {...props}
    >
      <Box background={background} flex={1}></Box>
      <Column padding={3} textStyle="875" color="neutral.light.6">
        <span>{name}</span>
        <span>{hex}</span>
      </Column>
    </GridItem>
  )
}
