import type { BoxProps, FlexProps, GridProps } from "@chakra-ui/react"
import { Box, Flex } from "@chakra-ui/react"
import type { JSX, ReactNode } from "react"
import { memo } from "react"
import { isEmptyElement } from "ui/utils/dom"
import ArrowToggle from "../ArrowToggle"
import Collapse from "../Collapse"
import DataFetchAlert from "../DataFetchAlert"
import type { IconSvgProps } from "../IconSvg"

type SpecialRow = {
  isAvailabe?: boolean
  element: JSX.Element | string
  props?: GridProps
}

type GroupRowType =
  | JSX.Element
  | SpecialRow
  | null
  | undefined
  | never
  | false
  | string
  | number
type Props = {
  header?:
    | GroupRowType
    | {
        hasArrow?: boolean
        hasDivider?: boolean
        icon?: ReactNode
        element:
          | (({
              isExpanded,
              // isLoading,
            }: {
              isExpanded?: boolean
              // isLoading?: boolean;
            }) => any)
          | ReactNode
        onChange?: (isExpanded: boolean) => void
        arrowProps?: Partial<IconSvgProps>
      }
  leftContent?: GroupRowType
  contentProps?: Omit<BoxProps, "onToggle">
  isError?: boolean
  headerProps?: FlexProps
  displayEmpty?: FlexProps["display"]
  hasCollapsed?: boolean
  defaultExpanded?: boolean
} & FlexProps

const DetailsInfoGroup = ({
  header: _header,
  children,
  displayEmpty = "none",
  leftContent: _leftContent,
  contentProps,
  isError,
  headerProps,
  hasCollapsed,
  defaultExpanded = true,
  ...props
}: Props) => {
  const header = _header as any | undefined
  const leftContent = _leftContent as any | undefined
  return (
    <Collapse
      _empty={{
        display: "none",
      }}
      hideWhenEmpty
      defaultExpanded={defaultExpanded}
      groupProps={{
        borderColor: "neutral.light.3",
        backgroundColor: "neutral.light.1",
        borderWidth: "1px",
        padding: { base: 5, lg: 5 },
        flexShrink: 0,
        borderRadius: 2,
        columnGap: 8,
        _empty: {
          display: displayEmpty,
        },
        ...props,
      }}
      isDisabled={!hasCollapsed}
      // gap={hasDivider ? 8 : 4}
      gap={0}
      overflow="hidden"
      onToggle={header?.onChange}
      header={({ isExpanded }) => (
        <Flex
          w="full"
          position="relative"
          color="neutral.light.7"
          textStyle="125"
          display="flex"
          cursor={hasCollapsed ? "pointer" : "default"}
          gap={3}
          _empty={{
            display: "none",
          }}
          justifyContent="flex-start"
          borderColor="neutral.light.3"
          borderBottomWidth={header?.hasDivider ? "1px" : "0px"}
          paddingBottom={header?.hasDivider ? 2 : 0}
          alignItems="center"
          {...(header?.props || {})}
          {...(headerProps || {})}
        >
          {header?.icon}
          {(typeof header?.element === "function" &&
            header.element({
              isExpanded: isExpanded,
              // isLoading: isLoading,
            })) ||
            header?.element ||
            header}

          {header?.hasArrow && (
            <ArrowToggle
              marginLeft="auto"
              isOpen={isExpanded}
              color="neutral.light.5"
              boxSize="1.25rem"
              {...header?.arrowProps}
            />
          )}
        </Flex>
      )}
      borderColor="neutral.light.3"
      flexDirection="column"
      {...contentProps}
    >
      {isError ? (
        <Box width="full">
          <DataFetchAlert />
        </Box>
      ) : (
        <>
          {leftContent?.element || leftContent}
          {!isEmptyElement(children) && <>{children}</>}
        </>
      )}
    </Collapse>
  )
}

export default memo(DetailsInfoGroup)
