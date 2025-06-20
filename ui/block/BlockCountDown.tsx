import {
  Center,
  type CenterProps,
  Flex,
  HStack,
  type StackProps,
  VStack,
  chakra,
} from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"
import type moment from "moment"
import { useMemo } from "react"
import {
  blockNumberFormat,
  buildHourTensKeyframes,
  buildKeyframes,
  computeCountdownValues,
  createArray,
  getSingleDigitKf,
} from "./utils"

type StepProps = CenterProps

const Step = ({ children, ...props }: StepProps) => {
  return <Center {...props}>{children}</Center>
}

type UnitProps = Omit<StackProps, "height"> & {
  term: "sec1" | "sec10" | "min1" | "min10" | "hour1" | "hour3"
  delay: number
  count: number
  height: StackProps["height"]
}

const termConfig = {
  sec1: { stepsCount: 10, duration: 10 },
  sec10: { stepsCount: 6, duration: 60 },
  min1: { stepsCount: 10, duration: 600 },
  min10: { stepsCount: 6, duration: 3600 },
  hour1: { stepsCount: 10, duration: 36000 },
}

const Unit = ({ term, delay, count, height: _height }: UnitProps) => {
  const { steps, duration, kf, height } = useMemo(() => {
    if (term === "hour3") {
      return {
        steps: createArray(3),
        kf: keyframes(buildHourTensKeyframes()),
        height: "calc(3 * 3.75rem)",
        duration: 86400,
      }
    }
    // Configuration mapping for each term

    // Get the configuration for the current term
    const config = termConfig[term]

    if (config) {
      const { stepsCount, duration } = config
      // Create the steps array based on the steps count
      const steps = createArray(stepsCount)
      // Build keyframes for the animation
      const kf = keyframes(buildKeyframes(stepsCount, duration))
      // Calculate the total height for the animation container
      const height = `calc(${stepsCount} * ${_height})`

      return { steps, duration, kf, height }
    } else {
      // Default return if term is not recognized
      return {
        steps: [],
        duration: 0,
        kf: "",
        height: "0",
      }
    }
  }, [term, _height])

  return (
    <Flex overflow="hidden" height={_height} alignItems="flex-end">
      <VStack
        whiteSpace="nowrap"
        spacing={0}
        sx={{
          animationName: `${kf}`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationFillMode: "none",
          animationTimingFunction: "linear",
          animationIterationCount: count,
        }}
        height={height}
      >
        {steps.map((num) => {
          return (
            <Step key={num} height={_height}>
              {num}
            </Step>
          )
        })}
      </VStack>
    </Flex>
  )
}

type GroupProps = {
  title: string // Display title for the group (e.g., "Days", "Hours").
} & (
  | {
      // Case where term is 'days'
      term: "days"
      init: number // Initial value for the block.
      term1?: undefined // Ensure other terms are excluded.
      delay1?: undefined
      term2?: undefined

      delay2?: undefined
      count1?: undefined
      count2?: undefined

      titleDelay?: undefined
      titleDuration?: undefined
    }
  | {
      // Case where term1 and term2 are defined (not "days").
      term?: undefined // Ensure `term` is not defined.
      init?: number // Initial value for the block.
      term1: "hour3" | "hour1" | "min10" | "min1" | "sec10" | "sec1"
      delay1: number // Delay for term1.
      term2: "hour3" | "hour1" | "min10" | "min1" | "sec10" | "sec1"
      delay2: number // Delay for term2.
      count1: number // Animation count for term1.
      count2: number // Animation count for term2.
      titleDuration: number // Duration for the title animation.
      titleDelay: number // Delay for the title animation.
    }
)

const Group = ({
  term1,
  delay1,
  term2,
  delay2,
  title,
  count1,
  count2,
  term,
  init,
  titleDelay,
  titleDuration,
}: GroupProps) => {
  const kf = useMemo(
    () =>
      keyframes(
        getSingleDigitKf(
          (term1 === "hour3" && 24) ||
            ((term1 === "min10" || term1 === "sec10") && 60) ||
            undefined,
        ),
      ),
    [titleDuration],
  )

  return (
    <VStack spacing="0.13rem" color="secondary.06.text">
      <HStack spacing={0} textStyle="325">
        {term && (
          <chakra.span>
            {blockNumberFormat.format(Math.floor(init) ?? 0)}
          </chakra.span>
        )}
        {term1 &&
          term2 &&
          typeof count1 === "number" &&
          typeof count2 === "number" &&
          typeof delay1 === "number" &&
          typeof delay2 === "number" && (
            <>
              <Unit
                term={term1}
                delay={delay1}
                count={count1}
                height="3.75rem"
              />
              <Unit
                term={term2}
                delay={delay2}
                count={count2}
                height="3.75rem"
              />
            </>
          )}
      </HStack>

      <chakra.span
        textStyle="1"
        sx={{
          _before: {
            position: "relative",
            content: `"${title}"`,
          },
          _after: {
            postion: "relative",
            content: `"${term === "days" && init === 1 ? "" : "s"}"`,
            animation: (term === "days" && "none") || undefined,
            animationName: `${kf}`,
            animationDuration: `${titleDuration}s`,
            animationDelay: `${titleDelay}s`,
            animationIterationCount: count1,
            animationFillMode: "none",
            animationTimingFunction: "linear",
          },
        }}
      />
    </VStack>
  )
}

type Props = {
  duration: moment.Duration
}

const BlockCountDown = ({ duration }: Props) => {
  const {
    sec1Delay,
    sec10Delay,
    min1Delay,
    min10Delay,
    hour1Delay,
    hour3Delay,
    countSec1,
    countSec10,
    countMin1,
    countMin10,
    countHour1,
    countHour3,

    titleDelaySecs,
    titleDelayMins,
    titleDelayHours,
    titleDurationSecs,
    titleDurationMins,
    titleDurationHours,
    days,
  } = useMemo(() => computeCountdownValues(duration), [duration])

  return (
    <HStack
      alignItems="stretch"
      overflow="hidden"
      justifyContent="space-between"
      color="secondary.06.text"
    >
      <Group term="days" init={days} title="Day" />

      <Group
        term1="hour3"
        delay1={hour3Delay}
        term2="hour1"
        delay2={hour1Delay}
        count1={countHour3}
        count2={countHour1}
        title="Hour"
        titleDelay={titleDelayHours}
        titleDuration={titleDurationHours}
      />

      <Group
        term1="min10"
        delay1={min10Delay}
        term2="min1"
        delay2={min1Delay}
        count1={countMin10}
        count2={countMin1}
        title="Minute"
        titleDelay={titleDelayMins}
        titleDuration={titleDurationMins}
      />

      <Group
        term1="sec10"
        delay1={sec10Delay}
        term2="sec1"
        delay2={sec1Delay}
        count1={countSec10}
        count2={countSec1}
        title="Second"
        titleDelay={titleDelaySecs}
        titleDuration={titleDurationSecs}
      />
    </HStack>
  )
}

export default BlockCountDown
