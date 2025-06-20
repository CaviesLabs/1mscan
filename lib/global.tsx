"use client"

import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import "lib/date/moment"
import "lib/setLocale"
import _, { reduce, transform } from "lodash"
import React, { useMemo, useState } from "react"
import { proxy } from "valtio"
import { quickSort } from "./sort/quickSort"

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect
}

Array.prototype.sum = function () {
  return reduce(
    this,
    (acc, num) => {
      return acc.plus(new BigNumber(num))
    },
    new BigNumber(0),
  )
}

const getChildValue = (item: any, args: any[]) =>
  args.reduce((temp, key) => temp[key], item)

Array.prototype.sortByBigNumber = function (
  order: "asc" | "desc",
  ...args: any[]
) {
  return this.sort((a, b) => {
    const bnA = BigNumber(getChildValue(a, args))
    const bnB = BigNumber(getChildValue(b, args))
    if (order === "desc") return bnB.comparedTo(bnA)
    return bnA.comparedTo(bnB)
  })
}

// @ts-ignore
Array.prototype.quickSortBigNumber = function (
  order: "asc" | "desc",
  path: string,
  defaultValue: string,
) {
  return quickSort(this, (a, b) => {
    const bnA = BigNumber(_.get(a, path, defaultValue))
    const bnB = BigNumber(_.get(b, path, defaultValue))
    if (order === "desc") return bnB.comparedTo(bnA)
    return bnA.comparedTo(bnB)
  }) as unknown
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}

BigNumber.config({
  EXPONENTIAL_AT: 1e9, // Always use normal notation for large numbers
})

BigNumber.prototype.humanizeCurrency = function (decimals = 0) {
  return this.dividedBy(new BigNumber(10).pow(decimals))
}

globalThis.useSplitProps = (props: any, keys: any[]) => {
  return useMemo(() => {
    const KEYS = new Set(keys)
    return transform(
      props as any,
      (result, value, key: any) => {
        if (KEYS.has(key)) {
          result[0][key as never] = value as never
        } else {
          ;(result[1] as never)[key as never] = value as never
        }
      },
      [{} as never, {} as never],
    )
  }, [props, keys])
}

globalThis.useStore = (initialState: any) => {
  return useState(proxy(initialState))[0]
}

Array.prototype.insertDelimiters = function <T>(delimiter: T) {
  return this.flatMap((n, i) => (i + 1 < this.length ? [n, delimiter] : [n]))
}

globalThis.getLanguage = getLanguage
