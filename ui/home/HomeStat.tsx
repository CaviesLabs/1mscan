import {
  Center,
  type ChakraProps,
  HStack,
  Stack,
  type StackProps,
} from "@chakra-ui/react"
import { type ComponentType, type ReactNode, memo } from "react"
import IconSVGV2 from "ui/shared/icon/IconSVGV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  title: ReactNode
  children: ReactNode
  isLoading?: boolean
  iconColor: ChakraProps["color"]
  icon: ComponentType<any>
} & Omit<StackProps, "title">

const HomeStat = ({
  title,
  children,
  isLoading,
  iconColor,
  icon,
  ...props
}: Props) => {
  return (
    <HStack
      flex={1}
      backgroundColor="neutral.light.1"
      padding={3}
      borderRadius="0.54688rem"
      gap={2}
      position="relative"
      borderWidth={1}
      borderColor="neutral.light.3"
      boxShadow="mini"
      overflow="hidden"
      minWidth="14.8125rem"
      {...props}
    >
      <Center
        flexShrink={0}
        backgroundColor={iconColor}
        boxSize={8}
        borderRadius="full"
      >
        <IconSVGV2 boxSize={4} color="neutral.light.1" data={icon} />
      </Center>
      <Stack gap={1} flex={1} overflow="hidden">
        <SkeletonText isLoading={isLoading} textStyle="8125">
          {title}
        </SkeletonText>
        <SkeletonText isLoading={isLoading} textStyle="1500">
          {children}
        </SkeletonText>
      </Stack>
    </HStack>
  )
}

export default memo(HomeStat, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.children === next.children &&
    prev.isLoading === next.isLoading &&
    prev.iconColor === next.iconColor &&
    prev.icon === next.icon
  )
})
