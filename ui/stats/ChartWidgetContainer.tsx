import useApiQuery from "lib/api/useApiQuery"
import { memo, useEffect, useMemo } from "react"
import type { StatsIntervalIds } from "types/client/stats"
import ChartWidget from "../shared/chart/ChartWidget"
import { STATS_INTERVALS } from "./constants"

type Props = {
  id: string
  title: string
  description: string
  units?: string
  interval: StatsIntervalIds
  onLoadingError: () => void
  isPlaceholderData: boolean
}

function formatDate(date: Date) {
  return date.toISOString().substring(0, 10)
}

const ChartWidgetContainer = ({
  id,
  title,
  description,
  interval,
  onLoadingError,
  units,
  isPlaceholderData,
}: Props) => {
  const selectedInterval = STATS_INTERVALS[interval]

  // if endDate is undefined api will return value to one day before, todo: allways set the end day is now
  const endDate = formatDate(new Date())
  const startDate = selectedInterval.start
    ? formatDate(selectedInterval.start)
    : undefined

  const { data, isPending, isError } = useApiQuery("stats_line", {
    pathParams: { id },
    queryParams: {
      from: startDate,
      to: endDate,
    },
    queryOptions: {
      enabled: !isPlaceholderData,
      refetchOnMount: false,
    },
  })

  const items = useMemo(
    () =>
      data?.chart?.map((item) => {
        return { date: new Date(item.date), value: Number(item.value) }
      }),
    [data],
  )

  useEffect(() => {
    if (isError) {
      onLoadingError()
    }
  }, [isError, onLoadingError])

  return (
    <ChartWidget
      isError={isError}
      items={items}
      title={title}
      units={units}
      description={description}
      isLoading={isPending}
      minH="230px"
    />
  )
}

export default memo(ChartWidgetContainer, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.interval === next.interval &&
    prev.isPlaceholderData === next.isPlaceholderData &&
    prev.title === next.title &&
    prev.description === next.description &&
    prev.units === next.units &&
    prev.onLoadingError === next.onLoadingError
  )
})
