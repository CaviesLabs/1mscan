import type { BoxProps, FlexProps, GridProps } from "@chakra-ui/react"
import { Box, Flex, Grid } from "@chakra-ui/react"
import { type ForwardedRef, type JSX, type ReactNode, memo } from "react"

type Props = {
  filterChildren?: ReactNode | JSX.Element
  filterProps?: Partial<GridProps>
  exportChildren?: ReactNode
  afterChildren?: ReactNode
  paginationChildren?: ReactNode
  moreInfoProps?: FlexProps
  mainProps?: BoxProps
  afterProps?: FlexProps
  ref?: ForwardedRef<HTMLDivElement>
} & Partial<FlexProps>

const ActionBar = ({
  children,
  filterChildren,
  filterProps,
  paginationChildren,
  moreInfoProps,
  mainProps,
  exportChildren,
  afterChildren,
  afterProps,
  ref,
  ...props
}: Props) => {
  return (
    <Flex
      justifyContent="space-between"
      width="full"
      transitionDuration="normal"
      flexDirection={{ base: "column", lg: "row" }}
      ref={ref}
      rowGap={3}
      columnGap={3}
      {...props}
    >
      {filterChildren && (
        <Grid
          order={1}
          gridTemplateColumns={{
            base: "max-content 1fr",
            lg: "max-content max-content max-content max-content",
          }}
          alignItems="center"
          rowGap={3}
          columnGap={3}
          _empty={{ display: "none" }}
          {...filterProps}
        >
          {filterChildren}
        </Grid>
      )}

      <Box
        order={{ base: 3, lg: 2 }}
        _empty={{ display: { base: "none", lg: "unset" } }}
        width="full"
        {...mainProps}
      >
        {children}
      </Box>

      <Flex
        order={{ base: 5, lg: 3 }}
        alignItems="center"
        gap={3}
        width={{ base: "full", lg: "fit-content" }}
        justifyContent="flex-end"
        _empty={{ display: "none" }}
        flexShrink={0}
        {...moreInfoProps}
      >
        {paginationChildren && (
          <Flex
            order={3}
            gap={{ lg: 3 }}
            alignItems="center"
            _empty={{ display: "none" }}
          >
            {paginationChildren}
          </Flex>
        )}
      </Flex>
      <Flex
        order={{ base: 2, lg: 4 }}
        _empty={{ display: "none" }}
        justifyContent="flex-end"
      >
        {exportChildren}
      </Flex>
      <Flex
        order={{ base: 1, lg: 5 }}
        _empty={{ display: "none" }}
        justifyContent="flex-end"
        {...afterProps}
      >
        {afterChildren}
      </Flex>
    </Flex>
  )
}

export default memo(ActionBar, (prev, next) => {
  return (
    prev.children === next.children &&
    prev.exportChildren === next.exportChildren &&
    prev.filterChildren === next.filterChildren &&
    prev.paginationChildren === next.paginationChildren &&
    prev.afterChildren === next.afterChildren &&
    prev.ref === next.ref
  )
})
