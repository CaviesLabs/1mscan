import { Box, useBreakpointValue, useToken } from "@chakra-ui/react"
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js"
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js"
import "chartjs-adapter-date-fns"
import { memo, useMemo, useRef } from "react"
import { Line } from "react-chartjs-2"
import { externalTooltipHandler, formatValue } from "./utils/chart"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
)

type Props = {
  data: {
    labels: Date[]
    data: string[]
    valueFormatter: (value: string) => string
    name: string
  }
}

const ChartGraphic = ({ data: rawData }: Props) => {
  const colors = useToken("colors", [
    "secondary.03",
    "neutral.light.1",
    "neutral.light.3",
    "neutral.light.6",
    "neutral.light.8",
    "accent.blue",
    "primary.light.3",
  ])
  const [secondary03, , neutralLight3, , , accentBlue, primaryLight3] = colors
  const chartRef = useRef(null)

  const stepSize = useBreakpointValue(
    {
      base: 7,
      lg: 3,
      "2lg": 5,
    },
    {
      fallback: "lg",
    },
  )

  const data = useMemo(
    () =>
      ({
        labels: rawData.labels,

        datasets: [
          {
            label: "",
            // force BigNumber to string
            data: rawData.data as any,
            fill: true,
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx
              const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                context.chart.height,
              )
              gradient.addColorStop(0, primaryLight3)
              gradient.addColorStop(1, "rgba(255, 255, 255, 0.00)")
              return gradient
            },
            borderWidth: 1,
            borderColor: secondary03,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "white",
            pointHoverBorderColor: accentBlue,
            pointHoverBorderWidth: 2,
          },
        ],
      }) as ChartData<"line">,
    [colors, rawData],
  )

  const options = useMemo(
    () =>
      ({
        maintainAspectRatio: false,
        responsive: true,
        resizeDelay: 300,
        aspectRatio: 3,

        onHover: (event, chartElement) => {
          // @ts-ignore
          event.native!.target!.style.cursor = chartElement.length
            ? "pointer"
            : "default"
        },

        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
            position: "nearest",
            external: externalTooltipHandler.bind(null, colors, {
              name: rawData.name,
              valueFormatter: rawData.valueFormatter,
            }),
            mode: "nearest",
            intersect: false,
          },
        },

        hover: {
          mode: "nearest",
          intersect: false,
        },

        scales: {
          x: {
            display: true,
            type: "time" as const,
            time: {
              unit: "day",
              tooltipFormat: "d MMM",
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: true,
              stepSize: stepSize,
              // maxRotation: 0,
              // minRotation: 0,
            },
            border: {
              display: false,
            },
          },

          y: {
            display: true,
            position: "right" as const,
            beginAtZero: false,
            ticks: {
              autoSkip: true,
              // stepSize: 3,
              callback: formatValue,
            },
            border: {
              display: false,
            },
            grid: {
              color: neutralLight3,
            },
          },
        },
      }) as ChartOptions<"line">,
    [colors, rawData.name, rawData.valueFormatter, stepSize],
  )

  return (
    <Box
      minHeight={{
        base: "12.25rem",
        lg: "9.375rem",
        "2lg": "unset",
      }}
      height="100%"
      maxHeight={{
        base: "12.25rem",
        lg: "9.375rem",
        "2lg": "16.75rem",
        // xl: "11rem",
      }}
      flex={1}
    >
      <Line
        width="100%"
        height="100%"
        ref={chartRef}
        data={data}
        options={options}
      />
    </Box>
  )
}

export default memo(ChartGraphic, (prev, next) => {
  return prev.data === next.data
})
