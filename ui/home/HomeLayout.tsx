import { HStack, Stack, type StackProps, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { type ReactNode, memo } from "react"
import Hint from "ui/shared/Hint"
import LinkInternal from "ui/shared/LinkInternal"

type Props = {
  title: ReactNode
  href?: string
  children: ReactNode
  hint?: ReactNode
  subTitle?: ReactNode
  titleBoxProps?: StackProps
  contentProps?: StackProps
} & Omit<StackProps, "title">

const HomeLayout = ({
  title,
  href,
  children,
  hint,
  subTitle,
  titleBoxProps,
  contentProps,
  ...props
}: Props) => {
  return (
    <Stack
      padding={4}
      gap={4}
      flex={1}
      boxShadow="primary"
      borderRadius={2}
      backgroundColor="neutral.light.1"
      {...props}
    >
      <Stack gap={2} {...titleBoxProps}>
        <HStack justifyContent="space-between">
          <HStack
            whiteSpace="nowrap"
            textStyle="1125700"
            color="neutral.light.7"
          >
            <Text as="h2">{title}</Text>
            {hint && <Hint label={hint} />}
          </HStack>
          {href && (
            <LinkInternal href={href}>
              {getLanguage("utils.view_all")}
            </LinkInternal>
          )}
        </HStack>
        {subTitle}
      </Stack>
      <Stack
        flex={1}
        gap={4}
        overflow="hidden"
        maxWidth="full"
        position="relative"
        {...contentProps}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default memo(HomeLayout, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.href === next.href &&
    prev.subTitle === next.subTitle &&
    prev.hint === next.hint &&
    prev.children === next.children
  )
})
