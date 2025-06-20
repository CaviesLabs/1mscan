import { Tooltip, chakra } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import React from "react"
import type { AbiParameter } from "viem"

import { route } from "nextjs-routes"

import { WEI } from "lib/consts"
import CopyToClipboard from "ui/shared/CopyToClipboard"
import LinkInternal from "ui/shared/LinkInternal"

import { matchInt } from "../utils"
import ItemLabel from "./ItemLabel"
import { printRowOffset } from "./utils"

function castValueToString(value: unknown): string {
  switch (typeof value) {
    case "string":
      return value === "" ? `""` : value
    case "undefined":
      return ""
    case "number":
      return value.toLocaleString(undefined, { useGrouping: false })
    case "bigint":
      return value.toString()
    // case "boolean": // biome-ignore lint/style/noUnusedCase: <explanation>
    default:
      return String(value)
  }
}

const INT_TOOLTIP_THRESHOLD = 10 ** 9

interface Props {
  abiParameter: AbiParameter
  data: unknown
  level: number
  hideLabel?: boolean
}

const ItemPrimitive = ({ abiParameter, data, level, hideLabel }: Props) => {
  const value = (() => {
    if (abiParameter.type === "address" && typeof data === "string") {
      return (
        <>
          <LinkInternal
            href={route({ pathname: "/address/[hash]", query: { hash: data } })}
          >
            {data}
          </LinkInternal>
          <CopyToClipboard text={data} verticalAlign="sub" />
        </>
      )
    }

    const intMatch = matchInt(abiParameter.type)
    if (
      intMatch &&
      typeof data === "bigint" &&
      intMatch.max > INT_TOOLTIP_THRESHOLD &&
      data > INT_TOOLTIP_THRESHOLD
    ) {
      const dividedValue = BigNumber(data.toString()).div(WEI)
      return (
        <Tooltip label={dividedValue.toLocaleString() + " SEI"}>
          <span>{castValueToString(data)}</span>
        </Tooltip>
      )
    }

    return <span>{castValueToString(data)}</span>
  })()

  return (
    <chakra.p textStyle="1" color="neutral.light.6">
      <span>{printRowOffset(level)}</span>
      {!hideLabel && <ItemLabel abiParameter={abiParameter} />}
      {value}
    </chakra.p>
  )
}

export default React.memo(ItemPrimitive)
