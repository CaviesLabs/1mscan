import type { ButtonProps, FlexProps, SkeletonProps } from "@chakra-ui/react"
import { Flex, HStack, Skeleton, Text, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { customThrottle } from "lib/hooks/useShallow"
import _ from "lodash"
import { memo, useCallback, useMemo } from "react"
import IconSvg from "ui/shared/IconSvg"
import Divider from "../Divider"
import type { IPagination } from "./types"

type Props = {
  dividerBoxProps?: Partial<SkeletonProps>
  pagination: IPagination
}

const Item = ({
  isLoading,
  onClick,
  isDisabled,
  children,
  skeletonProps,
  ...props
}: {
  isLoading: boolean
  onClick?: () => void
  isDisabled?: boolean
  children: React.ReactNode
  skeletonProps?: SkeletonProps
} & Partial<ButtonProps>) => {
  // return <></>;
  return (
    <Skeleton
      isLoaded={!isLoading}
      borderRadius="base"
      padding={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...skeletonProps}
    >
      <chakra.span
        aria-disabled={isDisabled || isLoading}
        _disabled={{
          cursor: "default",
          color: "neutral.light.5",
        }}
        height="full"
        cursor="pointer"
        onClick={(e) => {
          if (isDisabled || isLoading) {
            e.preventDefault()
            return
          }
          onClick?.()
        }}
        variant="unstyled"
        fontSize="0.875rem"
        lineHeight={6}
        fontWeight={400}
        // height="1.25rem"
        color="neutral.light.7"
        paddingX={2}
        // paddingX={1}
        {...props}
      >
        {children}
      </chakra.span>
    </Skeleton>
  )
}

const Pagination = ({
  dividerBoxProps,
  pagination,
  ...props
}: Props & FlexProps) => {
  // return <></>;
  const onNextPage = useCallback(
    customThrottle(() => {
      pagination.next()
    }, 500),
    [pagination.next],
  )

  const onPrevPage = useCallback(
    customThrottle(() => {
      pagination.back(-1)
    }, 500),
    [pagination.back],
  )

  const onResetPage = useCallback(
    customThrottle(() => {
      pagination.back(1)
    }, 500),
    [pagination],
  )

  const { total, isAvailable, postfix } = useMemo(
    () =>
      _.chain(Number(pagination.total))
        .thru((value) =>
          value > 0
            ? {
                total: value,
                isAvailable: true,
                postfix: value > 1 ? "s" : "",
              }
            : {
                total: 0,
                isAvailable: false,
                postfix: "s",
              },
        )

        .value(),
    [pagination.total],
  )

  const snap = pagination.snap

  return (
    <Flex
      alignItems={{ base: "flex-end", lg: "center" }}
      flexDirection={{ base: "column", lg: "row" }}
      gap={3}
      {...props}
    >
      {isAvailable && (
        <HStack spacing={3} height={9}>
          <Skeleton borderRadius="base" isLoaded={!pagination.loading}>
            <Text
              height={5}
              color="neutral.light.7"
              textStyle="875"
              whiteSpace="nowrap"
              wordBreak="keep-all"
            >
              {`${getLanguage("utils.total")} ${total.toLocaleString(
                "en-US",
              )} ${getLanguage("utils.item")} ${postfix} ${getLanguage(
                "utils.found",
              )}`}
            </Text>
          </Skeleton>
          <Skeleton
            display={{ base: "none", lg: "inline-flex" }}
            alignItems="stretch"
            height="1.25rem"
            width="1px"
            isLoaded={!pagination.loading}
            {...dividerBoxProps}
          >
            <Divider height={5} orientation="vertical"></Divider>
          </Skeleton>
        </HStack>
      )}

      <Flex alignItems="center" gap={2}>
        <Item
          isLoading={pagination.loading}
          onClick={onResetPage}
          isDisabled={pagination.loading || snap.page === 1}
          paddingX={1}
        >
          {getLanguage("utils.first")}
        </Item>
        <Item
          isLoading={pagination.loading}
          onClick={onPrevPage}
          isDisabled={!snap.can_back || pagination.loading}
          skeletonProps={{ height: "fit-content" }}
        >
          <IconSvg name="arrows/east-mini" boxSize={4} />
        </Item>
        <Item isLoading={pagination.loading} minWidth={6}>
          {snap.page}
        </Item>
        <Item
          isLoading={pagination.loading}
          isDisabled={!snap.can_next || pagination.loading}
          onClick={onNextPage}
          skeletonProps={{ height: "fit-content" }}
        >
          <IconSvg
            name="arrows/east-mini"
            boxSize={4}
            transform="rotate(180deg)"
          />
        </Item>
      </Flex>
    </Flex>
  )
}

export default memo(Pagination, (pre, next) => {
  return (
    pre.pagination.total === next.pagination.total &&
    pre.pagination.loading === next.pagination.loading &&
    pre.pagination.snap === next.pagination.snap
  )
})
