import type { TextProps } from "@chakra-ui/react"
import { HStack, Text, Tooltip, chakra } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import type { IconName } from "public/icons/name"
import type { ReactNode } from "react"
import { useMemo } from "react"
import type { IconSvgProps } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"

type Props = {
  value: any
  hasStatus?: boolean
  suffix?: ReactNode
  prefix?: ReactNode
} & Partial<TextProps>

type Info = {
  color: string
  name: IconName
  textColor?: string
  description: string
}

function getAPIColorInfo(remainingCredits: BigNumber): Info {
  if (remainingCredits.gte(5_000_000)) {
    return {
      color: "secondary.02.text",
      name: "status/success",
      description: "Sufficient API credits available",
    }
  } else if (remainingCredits.gte(2_500_000)) {
    return {
      color: "#ECD400",
      name: "status/warning-1",
      description: "Warning: API credits are running low",
    }
  } else {
    return {
      color: "secondary.05.text",
      textColor: "secondary.05.text",
      name: "status/danger",
      description: "Critical: API credits are nearly depleted",
    }
  }
}

const Status = ({
  color,
  name,
  description,
  ...props
}: Info & Partial<IconSvgProps>) => {
  return (
    <Tooltip label={description}>
      <IconSvg
        cursor="pointer"
        {...props}
        name={name}
        boxSize={5}
        color={color}
      />
    </Tooltip>
  )
}

const CreditValue = ({ value, hasStatus, suffix, prefix, ...props }: Props) => {
  const { fully, formated } = useMemo(() => {
    return {
      fully: BigNumber(value).toFormat(),
      formated: formatLargeNumber(value, {
        decimals: 0,
        sticky: true,
        fallback: "-",
      }),
    }
  }, [value])

  const { color, name, textColor, description } = useMemo(() => {
    if (!hasStatus) return {} as Info
    return getAPIColorInfo(BigNumber(value))
  }, [value, hasStatus])

  return (
    <HStack spacing={1} display="inline-flex">
      <Tooltip label={fully} isDisabled={fully === formated}>
        <Text
          as="span"
          width="fit-content"
          display="inline-flex"
          gap={1}
          color={(formated !== "NaN" && textColor) || "inherit"}
          {...props}
        >
          {prefix && (
            <chakra.span _empty={{ display: "none" }}>{prefix}</chakra.span>
          )}
          {formated}
          {suffix && (
            <chakra.span _empty={{ display: "none" }}>{suffix}</chakra.span>
          )}
        </Text>
      </Tooltip>
      {hasStatus && (
        <Status color={color} name={name} description={description} />
      )}
    </HStack>
  )
}

export default CreditValue
