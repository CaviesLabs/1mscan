import { HStack, Skeleton } from "@chakra-ui/react"
import moment from "lib/date/moment"
import type { ReactNode } from "react"
import { memo, useMemo } from "react"
import IconSvg from "ui/shared/IconSvg"
type Props = {
  isLoading?: boolean
  value?: string
  children?: ReactNode
}

function splitNumberAndUnit(input: string) {
  const match = input.match(/^(\d+)(\D+)$/)
  if (match) {
    const amount = Number.parseInt(match[1], 10)
    const unit = match[2]
    return { amount, unit }
  }
  return undefined // Case when the input is not in the format of "number + unit"
}

export function durationStringToFormat(
  durationString: string | undefined,
  fallback = "-",
) {
  if (!durationString) return fallback
  const splitted = splitNumberAndUnit(durationString)
  if (!splitted) return fallback
  const { amount, unit } = splitted

  const now = moment()

  const next = now.clone().add(amount, unit as any)

  return next.fromPast(now)
}

const Duration = ({ isLoading, value, children }: Props) => {
  const content = useMemo(() => durationStringToFormat(value), [value])
  return (
    <HStack gap={2}>
      <IconSvg boxSize={4} isLoading={isLoading} name="clock"></IconSvg>
      <Skeleton isLoaded={!isLoading}>{content || children}</Skeleton>
    </HStack>
  )
}

export default memo(Duration)
