import { Flex, type FlexProps, Skeleton, chakra } from "@chakra-ui/react"
import _, { isNil } from "lodash"
import { type ReactNode, memo } from "react"
import Hint from "../Hint"

type Props = {
  title: ReactNode
  hintDisabled?: boolean
  hint?: string
  children?: ReactNode
  isLoading?: boolean
  titleProps?: FlexProps
  swapTitle?: boolean
  contentProps?: FlexProps
  hasSkeleton?: boolean
  displayPadding?: FlexProps["display"]
  displayDivider?: FlexProps["display"] | FlexProps["margin"]
  dividerProps?: FlexProps
} & Omit<FlexProps, "title" | "hint">

const InfoItem = ({
  title,
  hint,
  children,
  isLoading,
  titleProps,
  swapTitle,
  contentProps,
  hasSkeleton,
  displayPadding,
  hintDisabled,
  displayDivider,
  dividerProps,
  ...props
}: Props) => {
  const titleElement = _.chain(title)
    .thru((title) => {
      if (isLoading) return <Skeleton>{title}</Skeleton>
      return title
    })
    .value()

  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems={{ base: "stretch", lg: "center" }}
      alignSelf="stretch"
      gap={1}
      position="relative"
      maxWidth="full"
      marginY={JSON.parse(
        JSON.stringify(displayDivider || "0.5rem")
          .replace("block", "1rem")
          .replace("none", "0.5rem"),
      )}
      // marginTop="0.5rem"
      _first={{
        marginTop: JSON.parse(
          JSON.stringify(displayDivider || "0rem").replace("block", "1rem"),
        ),
      }}
      _last={{
        marginBottom: 0,
      }}
      _after={{
        content: '""',
        position: "absolute",
        display: (displayDivider && "block") || "none",
        top: "calc(100% + 1rem)",
        height: "1px",
        insetX: "1.75rem",
        backgroundColor: "neutral.light.3",
        _last: {
          display: "none",
        },
        ...dividerProps,
      }}
      {...props}
    >
      <Flex
        alignItems="center"
        gap={2}
        textStyle="1"
        color="neutral.light.7"
        isTruncated
        flexShrink={0}
        width={{
          base: "full",
          lg: "15rem",
        }}
        _empty={{
          display: "none",
        }}
        {...titleProps}
      >
        {swapTitle && titleElement}
        {!hintDisabled && hint && (
          <Hint label={hint} flexShrink={0} isLoading={isLoading} />
        )}
        {!swapTitle && titleElement}
      </Flex>

      <Flex
        alignItems="center"
        gap={2}
        textStyle="1"
        color="neutral.light.7"
        flex={1}
        isTruncated
        {...contentProps}
      >
        <chakra.span
          flexShrink={0}
          boxSize={5}
          display={
            typeof displayPadding === "object" || isNil(displayPadding)
              ? {
                  lg: "none",
                  ...(displayPadding || {}),
                }
              : displayPadding
          }
        />
        {_.chain(children)
          .thru((children) => {
            if (hasSkeleton && isLoading)
              return <Skeleton isTruncated>{children}</Skeleton>
            return children
          })
          .value()}
      </Flex>
    </Flex>
  )
}

export default memo(InfoItem)
