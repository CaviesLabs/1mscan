import { Box, HStack, Stack, chakra } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import _ from "lodash"
import moment from "moment"
import Image from "next/image"
import { useMemo } from "react"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import SkeletonText from "ui/shared/text/SkeletonText"
import BlockCountDown from "./BlockCountDown"
import BlockCountDownAnimation from "./BlockCountDownAnimation"
import { blockNumberFormat, calculateTotalTimeStd } from "./utils"

type Props = {
  target: number | string
  latestBlock: number
}

const BlockEstimate = ({ target: _target, latestBlock }: Props) => {
  const target = useMemo(() => Number(_target), [_target])

  const { data: _averageBlockTime, isFetched: averageBlockTimeIsFetched } =
    useApiQuery("stats_counters", {
      queryOptions: {
        select: (data) =>
          Number(
            data?.counters?.find((item) => item.id === "averageBlockTime")
              ?.value || 0,
          ),
        retry: 0,
        staleTime: Number.POSITIVE_INFINITY,
      },
    })

  const isLoading = !averageBlockTimeIsFetched || !_averageBlockTime

  const {
    remaingBlock,
    remainingTime,
    estimatedTime,
    glassDuration,
    glassCount,
    estimateBlock,
  } = useMemo(() => {
    if (!latestBlock) return {}

    const totalTime = calculateTotalTimeStd(
      _averageBlockTime || 0,
      0.1,
      target - latestBlock,
    )

    const remainingTime = moment.duration(totalTime, "seconds")

    return {
      remaingBlock: blockNumberFormat.format(target - latestBlock),
      remainingTime,
      estimatedTime: moment()
        .add(remainingTime.asSeconds(), "seconds")
        .format("DD MMM YYYY, HH:mm:ss"),
      glassDuration: 3,
      glassCount: Math.ceil(remainingTime.asSeconds() / 3),
      estimateBlock: blockNumberFormat.format(target),
      latestBlock: blockNumberFormat.format(latestBlock),
    }
  }, [latestBlock, target, _averageBlockTime])

  console.log(_averageBlockTime)
  return (
    <>
      <Box position="static">
        <Image
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
          id="bg-dot"
          src="/icons/error-background.svg"
          objectFit="cover"
          layout="fill"
          alt="estimated-block-background"
        ></Image>
      </Box>
      <Stack spacing={3} zIndex={1} alignItems="stretch">
        <PageTitle
          title={`Block #${target}`}
          hasDefaultBackLink={true}
        ></PageTitle>

        <DataListDisplay
          mt={4}
          isLoading={isLoading}
          mx="auto"
          width="full"
          maxWidth="41.875rem"
          backgroundColor="neutral.light.1"
          borderRadius="1.5rem"
          borderWidth="1px"
          borderColor="neutral.light.3"
          padding={8}
          gap={6}
          alignItems="stretch"
        >
          <BlockCountDown duration={remainingTime!} />

          <BlockCountDownAnimation
            duration={glassDuration!}
            count={glassCount!}
          />

          <Stack alignItems="stretch" spacing={4} textStyle="1">
            <HStack justifyContent="space-between">
              <SkeletonText isLoading={isLoading}>Target Block</SkeletonText>
              <SkeletonText isLoading={isLoading} fontWeight={500}>
                {/* 39,038,886 */}
                {estimateBlock}
              </SkeletonText>
            </HStack>

            <HStack justifyContent="space-between" overflow="hidden">
              <SkeletonText
                isLoading={isLoading}
                whiteSpace="nowrap"
                flexShrink={0}
              >
                Estimated Time
              </SkeletonText>
              <SkeletonText
                isLoading={isLoading}
                fontWeight={500}
                alignItems="center"
                flexWrap="wrap"
                columnGap={1}
                justifyContent="flex-end"
              >
                {/* 23 Nov 2024, 19:34:01 */}
                {_.chain(estimatedTime?.split(", "))
                  .thru((values) => {
                    const date = `${values?.[0] || ""},`
                    const time = values?.[1] || ""
                    return (
                      <>
                        <chakra.span flexShrink={0}>{date}</chakra.span>
                        <chakra.span flexShrink={0}>{time}</chakra.span>
                      </>
                    )
                  })
                  .value()}
              </SkeletonText>
            </HStack>

            <HStack justifyContent="space-between">
              <SkeletonText isLoading={isLoading}>
                Blocks Remaining
              </SkeletonText>
              <SkeletonText isLoading={isLoading} fontWeight={500}>
                {
                  // 1,234
                  remaingBlock
                }
              </SkeletonText>
            </HStack>

            <HStack justifyContent="space-between">
              <SkeletonText isLoading={isLoading}>Current block</SkeletonText>
              <SkeletonText
                isLoading={isLoading}
                fontWeight={500}
                color="primary.light.4"
              >
                {/* 39,038,886 */}
                {latestBlock}
              </SkeletonText>
            </HStack>
          </Stack>
        </DataListDisplay>
      </Stack>
    </>
  )
}

export default BlockEstimate
