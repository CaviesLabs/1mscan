import BigNumber from "bignumber.js"
import type {
  BubbleDataPoint,
  Chart as ChartJS,
  ChartTypeRegistry,
  Point,
  TooltipModel,
} from "chart.js"
import "chartjs-adapter-date-fns"
import { formatNumberWithSuffix } from "lib/bignumber/format"
import moment from "lib/date/moment"
import type { TimeChartDataItem } from "../types"

import { getLanguage } from "languages/useLanguage"
import { componentToDOMElement } from "ui/utils/dom"

export function formatValue(value: any, index: number) {
  if (index % 2 !== 0) return undefined

  const bnValue = new BigNumber(value)

  return formatNumberWithSuffix(bnValue, {
    decimalPlaces: 2,
  }).fullyFormattedNumber
}

const getOrCreateTooltip = (
  colors: string[],
  chart: ChartJS<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint | null)[],
    unknown
  >,
) => {
  const [, neutralLight1, neutralLight3] = colors
  const tooltipEl: HTMLElement =
    chart.canvas.parentNode!.querySelector("#tooltip") ||
    (() => {
      const newElement = componentToDOMElement(() => (
        <div
          id="tooltip"
          style={{
            zIndex: 996,
            backgroundColor: neutralLight1,
            borderRadius: "0.5rem",
            color: "red",
            opacity: 1,
            pointerEvents: "none",
            padding: "0.75rem !important",
            position: "absolute",
            transform: "translate(-50%, 20px)",
            transition: "all .1s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.12)",
            borderWidth: "1px",
            borderColor: neutralLight3,
            minWidth: "9.5rem",
            height: "fit-content",
            //   height: "4rem",
          }}
        />
      ))

      chart.canvas.parentNode!.appendChild(newElement)
      return newElement
    })()

  // Remove old children
  while (tooltipEl.firstChild) {
    tooltipEl.firstChild.remove()
  }
  return tooltipEl
}

export const externalTooltipHandler = (
  colors: string[],
  dataFn: Pick<TimeChartDataItem, "name" | "valueFormatter">,
  context: {
    chart: ChartJS
    tooltip: TooltipModel<keyof ChartTypeRegistry>
  },
) => {
  const [, neutralLight1, neutralLight3, neutralLight6, neutralLight8] = colors
  // Tooltip Element
  const { chart, tooltip } = context
  const tooltipEl = getOrCreateTooltip(colors, chart)

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0"
    return
  }

  //   console.log(context);

  const labelUnix = tooltip.dataPoints?.[0]?.parsed?.x as number | undefined

  const valueString = tooltip.dataPoints?.[0]?.parsed?.y as unknown as
    | string
    | undefined
  if (valueString !== undefined && labelUnix) {
    const label = moment(labelUnix).format("DD MMM YYYY")
    const valueBignumber = BigNumber(valueString)
    tooltipEl.appendChild(
      componentToDOMElement(() => (
        <table
          style={{
            margin: 0,
          }}
        >
          <tr>
            <td
              style={{
                width: "2.625rem",
                color: neutralLight6,
                fontSize: "0.8125rem",
                fontWeight: 400,
                lineHeight: "1rem",
                whiteSpace: "nowrap",
              }}
            >
              {getLanguage("utils.date")}
            </td>
            <td
              style={{
                color: neutralLight8,
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: "1.25rem",
                paddingLeft: "0.75rem",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </td>
          </tr>

          <tr>
            <td
              style={{
                width: "2.625rem",
                color: neutralLight6,
                fontSize: "0.8125rem",
                fontWeight: 400,
                whiteSpace: "nowrap",
                lineHeight: "1rem",
              }}
            >
              {dataFn.name}
            </td>
            <td
              style={{
                color: neutralLight8,
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: "1.25rem",
                paddingLeft: "0.75rem",
                whiteSpace: "nowrap",
              }}
            >
              {dataFn.valueFormatter?.(valueBignumber)}
            </td>
          </tr>
        </table>
      )),
    )
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  // Display, position, and set styles for font
  tooltipEl.style.opacity = "1"
  tooltipEl.style.left = positionX + tooltip.caretX + "px"
  tooltipEl.style.top = positionY + tooltip.caretY + "px"
  tooltipEl.style.font = "Inter"
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px"

  // Create a new div element for the pseudo-element
  const triaggleElement = componentToDOMElement(() => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: 0,
        height: 0,
        transform: "translate(-50%, -100%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: `12px solid ${neutralLight3}`,
        borderTop: "12px solid transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 2px)",
          width: 0,
          height: 0,
          borderLeft: "6.5px solid transparent",
          borderRight: "6.5px solid transparent",
          borderBottom: `10px solid ${neutralLight1}`,
        }}
      ></div>
    </div>
  ))

  // Insert the new div element before the existing content of the div
  tooltipEl.appendChild(triaggleElement)
}

// const removeChildren = (el: HTMLElement) => {
//   while (el.firstChild) {
//     el.firstChild.remove();
//   }
// };
