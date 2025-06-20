import _ from "lodash"
import type { RefObject } from "react"

export function convertFontSize(fontSize: any) {
  // If fontSize is already a number, no conversion is needed
  if (typeof fontSize === "number") {
    return fontSize
  }

  // If fontSize is a string and ends with 'px'
  if (typeof fontSize === "string" && fontSize.endsWith("px")) {
    // Remove 'px' and convert to a number
    return Number.parseFloat(fontSize.slice(0, -2))
  }

  if (typeof fontSize === "string") {
    if (fontSize === "sm") return 14
    if (fontSize === "lg") return 18
  }

  // If fontSize is a string and ends with 'rem'
  if (typeof fontSize === "string" && fontSize.endsWith("rem")) {
    // Remove 'rem', convert to a number, and multiply by root size (16px)
    return Number.parseFloat(fontSize.slice(0, -3)) * 16
  }

  // If fontSize is not 'px' or 'rem', default to 0
  return 16
}

const valueTable = {
  0: 0.635,
  1: 0.428125,
  2: 0.5875,
  3: 0.60125,
  4: 0.62125,
  5: 0.594375,
  6: 0.603125,
  7: 0.513125,
  8: 0.63625,
  9: 0.593125,
  A: 0.670625,
  a: 0.5525,
  B: 0.595,
  b: 0.595,
  C: 0.66625,
  c: 0.5525,
  D: 0.689375,
  d: 0.595,
  E: 0.60625,
  e: 0.56,
  F: 0.584375,
  f: 0.385,
  G: 0.583,
  H: 0.582,
  I: 0.581,
  J: 0.58,
  K: 0.579,
  L: 0.578,
  M: 0.577,
  N: 0.576,
  O: 0.575,
  P: 0.574,
  Q: 0.573,
  R: 0.572,
  S: 0.571,
  T: 0.57,
  U: 0.569,
  V: 0.568,
  W: 0.567,
  X: 0.566,
  Y: 0.565,
  Z: 0.564,
  g: 0.551,
  h: 0.55,
  i: 0.549,
  j: 0.548,
  k: 0.547,
  l: 0.546,
  m: 0.545,
  n: 0.544,
  o: 0.543,
  p: 0.542,
  q: 0.541,
  r: 0.54,
  s: 0.539,
  t: 0.538,
  u: 0.537,
  v: 0.536,
  w: 0.535,
  x: 0.534,
  y: 0.533,
  z: 0.533,
  ".": 0.22,
}

export function calculateTotalSpacing(
  str: string,
  rawFontSize?: number | `${number}rem` | `${number}px`,
) {
  const fontSize = convertFontSize(rawFontSize)
  // Table of values for each character

  // Initialize total spacing
  let totalSpacing = 0

  // Iterate over each character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    // If the character is in the value table
    // @ts-ignore
    if (valueTable[char] !== undefined) {
      // Calculate spacing for the character and add to total spacing
      // @ts-ignore
      totalSpacing += valueTable[char] * fontSize
    }
  }

  return Math.round(totalSpacing)
}

export function calculateSpacings(
  str: string,
  rawFontSize?: number | `${number}rem` | `${number}px`,
) {
  const fontSize = convertFontSize(rawFontSize)
  if (!rawFontSize) {
    return []
  }
  // Table of values for each character

  // Initialize total spacing
  const spacings: number[] = []

  // Iterate over each character in the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    // If the character is in the value table
    // @ts-ignore
    if (valueTable[char] !== undefined) {
      // Calculate spacing for the character and add to total spacing
      // @ts-ignore
      spacings.push(valueTable[char] * fontSize)
    } else {
      spacings.push(0)
    }
  }

  return spacings
}

export function getWidth(el: HTMLElement) {
  return el.getBoundingClientRect().width
}

export type ResultItem = {
  character: string
  size: number
}
export const returnFunction = (
  firstPartResult: ResultItem[],
  secondPartResult: ResultItem[],
) => {
  return (
    firstPartResult.map((x) => x.character).join("") +
    "..." +
    secondPartResult.map((x) => x.character).join("")
  )
}

export const getResultSizeFunction = (
  firstPartResult: ResultItem[],
  secondPartResult: ResultItem[],
  ...characterSpacings: number[]
) => {
  return _.sum([
    ...firstPartResult.map((x) => x.size),
    ...secondPartResult.map((x) => x.size),
    ...characterSpacings,
  ])
}

export const calculateString = ({
  firstPart,
  secondPart,
  hash,
  elementRef,
  isDynamic,
  isCut,
  isHead,
  isTail,
  tailLength,
  entityRef,
  contentBoxRef,
}: {
  firstPart: string
  secondPart: string
  hash: string
  elementRef: RefObject<HTMLElement | null>
  isDynamic: boolean
  isCut: boolean
  isHead: boolean
  isTail: boolean
  tailLength: number | undefined
  entityRef: React.MutableRefObject<HTMLElement | null> | undefined
  contentBoxRef?: React.MutableRefObject<HTMLElement | null>
}) => {
  const display = firstPart + secondPart
  if (!display) return "N/A"

  if (!elementRef?.current) return ""

  const parent = elementRef?.current?.parentNode as HTMLElement
  if (!parent) {
    return ""
  }

  const parentWidth = (() => {
    if (entityRef?.current && contentBoxRef?.current) {
      let parentWidth = entityRef.current.getBoundingClientRect().width
      const childrens = entityRef.current.children
      for (let i = 0; i < childrens?.length; i++) {
        const child = childrens[i]
        const nextChild = childrens[i + 1]
        if (child && child !== contentBoxRef?.current) {
          parentWidth -= child.getBoundingClientRect().width || 0
        }
        if (nextChild) {
          const distance = Math.abs(
            nextChild.getBoundingClientRect().left -
              child.getBoundingClientRect().right,
          )

          parentWidth -= distance
        }
      }

      return parentWidth
    }

    const parentWidth = getWidth(parent)

    if (!parentWidth) return 0
    return parentWidth
  })()

  if (!parentWidth) return ""
  const fontSize = getFontSize(elementRef)

  if (!fontSize) {
    const shadowEl = document.createElement("span")
    shadowEl.style.opacity = "0"
    parent.appendChild(shadowEl)
    shadowEl.textContent = hash
    if (getWidth(shadowEl) > parentWidth) {
      const tail = hash.slice(-(tailLength || 0))
      let leftI = 4
      let rightI = hash.length - (tailLength || 0)

      while (rightI - leftI > 1) {
        const medI =
          (rightI - leftI) % 2
            ? leftI + (rightI - leftI + 1) / 2
            : leftI + (rightI - leftI) / 2
        const res = hash.slice(0, medI) + "..." + tail
        shadowEl.textContent = res
        if (getWidth(shadowEl) < parentWidth) {
          leftI = medI
        } else {
          rightI = medI
        }
      }
      parent.removeChild(shadowEl)

      return hash.slice(0, rightI - 1) + "..." + tail
    } else {
      parent.removeChild(shadowEl)
      return hash
    }
  }

  const firstPartSpacings = calculateSpacings(firstPart, fontSize as any)

  const secondPartSpacings = calculateSpacings(secondPart, fontSize as any)
  const dotSpacing = calculateSpacings(".", fontSize as any)[0]
  const availableTextSize = parentWidth - dotSpacing * 3

  if (isCut) {
    const maximunSize = _.sum(firstPartSpacings) + _.sum(secondPartSpacings)
    if (maximunSize <= availableTextSize) return firstPart + "..." + secondPart
  } else {
    const maximunSize = _.sum(calculateSpacings(hash, fontSize as any))
    if (maximunSize <= parentWidth) return hash
  }
  if (isDynamic || isCut) {
    const firstPartResult: { character: string; size: number }[] = []
    const secondPartResult: { character: string; size: number }[] = []

    let firstIndex = 0
    let secondIndex = secondPart.length - 1
    while (firstIndex < firstPart.length || secondIndex >= 0) {
      if (firstIndex < firstPart.length) {
        const firstCharactor = firstPart[firstIndex]
        const firstCharactorSpacing = calculateSpacings(
          firstCharactor,
          fontSize as any,
        )[0]
        const tempResultSize = getResultSizeFunction(
          firstPartResult,
          secondPartResult,
          firstCharactorSpacing,
        )
        if (tempResultSize > availableTextSize) {
          return returnFunction(firstPartResult, secondPartResult)
        } else {
          firstPartResult.push({
            character: firstCharactor,
            size: firstCharactorSpacing,
          })
        }

        firstIndex = firstIndex + 1
      }
      if (secondIndex >= 0) {
        const secondCharactor = secondPart[secondIndex]

        const secondCharactorSpacing = calculateSpacings(
          secondCharactor,
          fontSize as any,
        )[0]
        const tempResultSize = getResultSizeFunction(
          firstPartResult,
          secondPartResult,
          secondCharactorSpacing,
        )
        if (tempResultSize > availableTextSize) {
          return returnFunction(firstPartResult, secondPartResult)
        } else {
          secondPartResult.unshift({
            character: secondCharactor,
            size: secondCharactorSpacing,
          })
        }
        secondIndex = secondIndex - 1
      }
    }

    return returnFunction(firstPartResult, secondPartResult)
  }

  if (isHead) {
    const firstPartResult: { character: string; size: number }[] = []
    const secondPartResult: { character: string; size: number }[] = []

    for (
      let firstIndex = 0;
      firstIndex < firstPartResult.length;
      firstIndex++
    ) {
      const firstCharactor = firstPart[firstIndex]
      const firstCharactorSpacing = calculateSpacings(
        firstCharactor,
        fontSize as any,
      )[0]

      firstPartResult.push({
        character: firstCharactor,
        size: firstCharactorSpacing,
      })
    }

    for (
      let secondIndex = secondPart.length - 1;
      secondIndex >= 0;
      secondIndex--
    ) {
      const secondCharactor = secondPart[secondIndex]

      const secondCharactorSpacing = calculateSpacings(
        secondCharactor,
        fontSize as any,
      )[0]

      const tempResultSize = getResultSizeFunction(
        firstPartResult,
        secondPartResult,
        secondCharactorSpacing,
      )
      if (tempResultSize > availableTextSize) {
        return returnFunction(firstPartResult, secondPartResult)
      } else {
        secondPartResult.unshift({
          character: secondCharactor,
          size: secondCharactorSpacing,
        })
      }
    }
    return returnFunction(firstPartResult, secondPartResult)
  }
  if (isTail) {
    const firstPartResult: { character: string; size: number }[] = []
    const secondPartResult: { character: string; size: number }[] = []

    for (
      let secondIndex = secondPart.length - 1;
      secondIndex >= 0;
      secondIndex--
    ) {
      const secondCharactor = secondPart[secondIndex]

      const secondCharactorSpacing = calculateSpacings(
        secondCharactor,
        fontSize as any,
      )[0]

      secondPartResult.unshift({
        character: secondCharactor,
        size: secondCharactorSpacing,
      })
    }

    for (let firstIndex = 0; firstIndex < firstPart.length; firstIndex++) {
      const firstCharactor = firstPart[firstIndex]
      const firstCharactorSpacing = calculateSpacings(
        firstCharactor,
        fontSize as any,
      )[0]

      const tempResultSize = getResultSizeFunction(
        firstPartResult,
        secondPartResult,
        firstCharactorSpacing,
      )
      if (tempResultSize > availableTextSize) {
        return returnFunction(firstPartResult, secondPartResult)
      } else {
        firstPartResult.push({
          character: firstCharactor,
          size: firstCharactorSpacing,
        })
      }
    }

    return returnFunction(firstPartResult, secondPartResult)
  }
  return ""
}

export const getFontSize = (elementRef: RefObject<HTMLElement | null>) => {
  // Get the computed style of the element
  if (!elementRef.current) return 0
  const computedStyle = window.getComputedStyle(elementRef.current)

  // Get the font size of the element
  return computedStyle.getPropertyValue("font-size")
}
