import type { TextProps } from "@chakra-ui/react"
import { Box, Flex, type FlexProps, Skeleton, Text } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import BackLink from "./BackLink"

type Props = {
  isLoading?: boolean
  secondRow?: ReactNode
  afterTitle?: ReactNode
  beforeTitle?: ReactNode
  contentAfter?: ReactNode
  secondRowProps?: FlexProps
  hasDefaultBackLink?: boolean
  title: ReactNode
  titleProps?: TextProps
  contentAfterBoxProps?: FlexProps
  contentBoxProps?: FlexProps
  thirdRow?: ReactNode
  thirdRowProps?: FlexProps
  rowBoxProps?: FlexProps
  mainProps?: FlexProps
  rightContent?: ReactNode
} & Omit<FlexProps, "title">

const PageTitle = ({
  title,
  isLoading,
  afterTitle,
  beforeTitle,
  contentAfter,
  secondRow,
  secondRowProps,
  hasDefaultBackLink,
  titleProps,
  contentAfterBoxProps,
  contentBoxProps,
  thirdRow,
  thirdRowProps,
  rowBoxProps,
  mainProps,
  rightContent,
}: Props) => {
  return (
    <>
      <Flex
        flexWrap="wrap"
        paddingBottom={4}
        gap={{ base: 2, lg: 4 }}
        _empty={{ display: "none" }}
      >
        <Skeleton
          isLoaded={!isLoading}
          alignSelf="flex-start"
          _empty={{ display: "none" }}
          position="relative"
        >
          {hasDefaultBackLink && <BackLink isLoading={isLoading} />}
        </Skeleton>
        <Flex
          flexDirection="column"
          gap={1}
          overflow="hidden"
          flex={1}
          {...rowBoxProps}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            rowGap={1}
            columnGap={4}
            flexWrap="wrap"
            paddingBottom={0}
          >
            <Flex
              rowGap={1}
              columnGap={4}
              maxWidth="full"
              overflow="hidden"
              flexDirection={{ base: "column", lg: "row" }}
              alignItems={{ base: "flex-start", lg: "center" }}
              {...contentBoxProps}
            >
              <Flex
                alignItems="center"
                gap={4}
                overflow="hidden"
                maxWidth="full"
                {...mainProps}
              >
                {beforeTitle}
                <Skeleton
                  isLoaded={!isLoading}
                  overflow="hidden"
                  display="flex"
                  alignItems="flex-end"
                  gap={1}
                  flexWrap="wrap"
                >
                  <Box overflow="hidden">
                    <Text
                      as="h1"
                      color="neutral.light.8"
                      fontWeight={600}
                      lineHeight="2.25rem"
                      fontSize="1.75rem"
                      whiteSpace="pre-wrap"
                      letterSpacing="-0.035rem"
                      {...titleProps}
                    >
                      {title}
                    </Text>
                  </Box>
                  {afterTitle}
                </Skeleton>
              </Flex>
              <Box
                _empty={{ display: "none" }}
                flexShrink={0}
                {...contentAfterBoxProps}
              >
                {contentAfter}
              </Box>
            </Flex>
            {rightContent}
          </Flex>

          {secondRow && (
            <Flex
              alignItems="center"
              overflow="hidden"
              paddingY={3}
              _empty={{ display: "none" }}
              {...secondRowProps}
            >
              {secondRow}
            </Flex>
          )}
          {thirdRow && (
            <Flex
              alignItems="center"
              overflow="hidden"
              _empty={{ display: "none" }}
              {...thirdRowProps}
            >
              {thirdRow}
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default memo(PageTitle)
