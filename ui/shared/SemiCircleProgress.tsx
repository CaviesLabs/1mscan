import { Box, Flex, Text, chakra } from "@chakra-ui/react"
import { type FC, useMemo } from "react"

type ISemiCircleProgress = {
  strokeWidth: number
  strokeLinecap?: "butt" | "round" | "square" | "inherit"
  percentage: number | undefined
  size: {
    width: number
    height: number
  }
  hasBackground?: Boolean
}

const LOW = 23
const MEDIUM = 50

const ScoreTag: FC<{ score?: number | undefined }> = ({ score }) => {
  const color = useMemo(() => {
    if (score === undefined) return "#A0A0A0"
    if (score <= LOW) return "#3ABD77"
    if (score <= MEDIUM) return "#FAA352"
    return "#F45959"
  }, [score])

  const label = useMemo(() => {
    if (score === undefined) return "N/A"
    if (score <= LOW) return "LOW RISK"
    if (score <= MEDIUM) return "MEDIUM RISK"
    return "HIGH RISK"
  }, [score])

  return (
    <Flex
      py="2px"
      px="8px"
      borderRadius="4px"
      alignItems="center"
      justifyContent="center"
      bg={color}
    >
      <Text fontSize="16px" color="neutral.light.1" fontWeight={500}>
        {label}
      </Text>
    </Flex>
  )
}

export const SemiCircleProgress: FC<ISemiCircleProgress> = ({
  strokeWidth,
  percentage,
  size,
  strokeLinecap,
  hasBackground = false,
}: ISemiCircleProgress) => {
  if (percentage && (percentage < 0 || percentage > 100)) {
    throw new Error("Percentage must be between 0 and 100")
  }

  if (Number.isNaN(strokeWidth) || strokeWidth <= 0) {
    throw new Error("Stroke width must be a positive number")
  }

  if (
    Number.isNaN(size.width) ||
    size.width <= 0 ||
    Number.isNaN(size.height) ||
    size.height <= 0
  ) {
    throw new Error("Size must be a positive number")
  }

  const radius = 50 - strokeWidth / 2
  const circumference = 1.1 * Math.PI * radius
  const strokeDashoffset =
    circumference -
    ((percentage === undefined ? 0 : percentage === 0 ? 1 : percentage) / 100) *
      circumference
  const bgStrokeDashoffset = circumference - 1 * circumference
  const pathDescription = "M5,64 a1,1 0 0,1 90,0"

  const strokeColor = useMemo(() => {
    if (percentage === undefined) return "#E5E4E5"
    if (percentage <= LOW) return "#3ABD77"
    if (percentage <= MEDIUM) return "#FAA352"
    return "#F45959"
  }, [percentage])

  const textColor = useMemo(() => {
    if (percentage === undefined) return "#474747"
    if (percentage <= LOW) return "#02813D"
    if (percentage <= MEDIUM) return "#D96900"
    return "#DF0100"
  }, [percentage])

  return (
    <Box position="relative" width={size.width} height={size.height}>
      <chakra.svg
        width={size.width}
        height={size.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="_half-circular-progress"
      >
        <chakra.defs>
          <linearGradient
            id="gradient-low"
            x1="13.8138"
            y1="78.3856"
            x2="204.311"
            y2="79.9025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C8FFD0" />
            <stop offset="0.325" stop-color="#FF5252" />
            <stop offset="1" stop-color="#FF5252" />
          </linearGradient>
        </chakra.defs>
        {hasBackground && (
          <chakra.path
            d={pathDescription}
            style={{
              transition: "stroke-dashoffset 0.35s",
              stroke: percentage ? "url(#gradient-low)" : "#E5E4E5",
              strokeLinecap: strokeLinecap || "round",
              strokeDasharray: `${circumference}`,
              strokeDashoffset: `${bgStrokeDashoffset}`,
              strokeWidth: `${strokeWidth}`,
              strokeOpacity: 0.5,
            }}
            fill="none"
          />
        )}
        <chakra.path
          d={pathDescription}
          style={{
            transition: "stroke-dashoffset 0.35s",
            stroke: strokeColor,
            strokeLinecap: strokeLinecap || "round",
            strokeDasharray: `${circumference}`,
            strokeDashoffset: `${strokeDashoffset}`,
            strokeWidth: `${strokeWidth}`,
          }}
          fill="none"
        />
        <chakra.animate
          attributeName="stroke-dashoffset"
          from="283"
          to="0"
          dur="1s"
          fill="freeze"
        />
      </chakra.svg>
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, 0%)"
        flexDir="column"
        gap="4px"
        justifyContent="center"
      >
        <Text
          fontSize="28px"
          fill="#04001b"
          fontWeight={600}
          color={textColor}
          textAlign="center"
        >
          {`${percentage === undefined ? "N/A" : percentage ? percentage.toFixed(2) : "0"}`}
          <chakra.span fontSize="16px" color="#8F8F8F" fontWeight={400}>
            /100
          </chakra.span>
        </Text>
        <ScoreTag score={percentage} />
      </Flex>
    </Box>
  )
}
