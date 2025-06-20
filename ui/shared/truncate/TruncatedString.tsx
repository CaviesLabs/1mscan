import type { TextProps } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import { useShallowMemoRef } from "lib/hooks/useShallow"
import _ from "lodash"
import type { ForwardedRef, MutableRefObject } from "react"
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { multipleRef } from "ui/utils/dom"
import type { ContentBaseProps } from "../entities/base/components"
import { TruncatedContext } from "./TruncatedProvider"
import { calculateString } from "./hashStringFormat"
import shortenString from "./shortenString"

export type TruncatedStringProps = {
  entityRef?: MutableRefObject<HTMLElement | null>
  tailLength?: number
  headLength?: number
  hash: string
  fallback?: string
  ref?: ForwardedRef<HTMLSpanElement | null>
} & TextProps &
  Pick<ContentBaseProps, "contentBoxRef" | "noTooltip">

const TruncatedString = ({
  tailLength,
  headLength,
  entityRef,
  contentBoxRef,
  hash,
  noTooltip,
  fallback = "",
  ref,
  ...props
}: TruncatedStringProps) => {
  const { setIsTruncated } = useContext(TruncatedContext)
  const elementRef = useRef<HTMLSpanElement>(null)

  const tailLengthRef = useShallowMemoRef(() => tailLength, [tailLength])
  const hashRef = useShallowMemoRef(() => hash, [hash])

  const noTooltipRef = useShallowMemoRef(() => noTooltip, [noTooltip])

  const isHeadRef = useShallowMemoRef(
    () =>
      (typeof headLength === "number" && typeof tailLength !== "number") ||
      (typeof headLength === "number" &&
        typeof tailLength === "number" &&
        headLength + tailLength >= hash.length),
    [headLength, tailLength],
  )

  const isTailRef = useShallowMemoRef(
    () => typeof headLength !== "number" && typeof tailLength === "number",
    [headLength, tailLength],
  )

  const isCutRef = useShallowMemoRef(
    () =>
      typeof headLength === "number" &&
      typeof tailLength === "number" &&
      headLength + tailLength < hash.length,
    [headLength, tailLength],
  )

  const isDynamicRef = useShallowMemoRef(
    () => typeof headLength !== "number" && typeof tailLength !== "number",
    [headLength, tailLength],
  )

  const [displayText, setDisplayText] = useState(
    isCutRef.current ? shortenString(hash, headLength, tailLength) : hash,
  )
  const firstPartRef = useShallowMemoRef(
    () =>
      hash.substring(
        0,
        (isCutRef.current && headLength) ||
          (isHeadRef.current && headLength) ||
          (isTailRef.current && hash.length - tailLength!) ||
          Math.floor(hash.length / 2),
      ),
    [headLength, tailLength, hash],
  )
  const secondPartRef = useShallowMemoRef(
    () =>
      hash.substring(
        (isCutRef.current && hash.length - tailLength!) ||
          (isHeadRef.current && hash.length - headLength! + 1) ||
          (isTailRef.current && hash.length - tailLength!) ||
          Math.ceil(hash.length / 2),
      ),
    [headLength, tailLength, hash],
  )

  const resizeHandler = useCallback(
    _.debounce(() => {
      if (elementRef.current) {
        elementRef.current.innerText = hash
        elementRef.current.style.textOverflow = "ellipsis"
      }

      const text = calculateString({
        firstPart: firstPartRef.current,
        secondPart: secondPartRef.current,
        hash: hashRef.current,
        elementRef,
        isDynamic: isDynamicRef.current,
        isCut: isCutRef.current,
        isHead: isHeadRef.current,
        isTail: isTailRef.current,
        tailLength: tailLengthRef.current,
        entityRef,
        contentBoxRef,
      })!
      if (elementRef.current) {
        elementRef.current.style.textOverflow = "clip"
        elementRef.current.innerText = text
      }
      setDisplayText(text)
      if (!noTooltipRef.current) {
        setIsTruncated?.(text.includes("..."))
      }
    }, 100),
    [],
  )

  useEffect(() => {
    // if (isCut) return;
    resizeHandler()
  }, [
    elementRef.current,
    isDynamicRef.current,
    isCutRef.current,
    isHeadRef.current,
    isTailRef.current,
    hashRef.current,
    hash,
  ])

  useEffect(() => {
    // if (isCut) return;

    const resizeObserver = new ResizeObserver(resizeHandler)

    resizeObserver.observe(document.body)
    return function cleanup() {
      resizeObserver.unobserve(document.body)
    }
  }, [])

  return (
    // <Skeleton isLoaded={displayText !== "placeholder"}>
    // </Skeleton>
    <chakra.span
      noOfLines={1}
      ref={(el) => {
        multipleRef(el, elementRef, ref)
      }}
      flex={1}
      display="flex"
      width="full"
      position="relative"
      {...props}
      overflow="unset"
      textOverflow="unset"
      whiteSpace="normal"
      // lineHeight={props.lineHeight || "1.25rem"}
      // height={props.lineHeight || "1.25rem"}
      // data-font-size={fontSize || "N/A"}
      // data-first={firstPartRef.current}
      // data-second={secondPartRef.current}
      // data-hash={hash}
      // data-dynamic={isDynamicRef.current}
      // data-cut={isCutRef.current}
      // data-count={renderCount.current}
      // data-head={headLength}
      // data-tail={tailLength}
      {...props}
    >
      {displayText || fallback}
    </chakra.span>
  )
}

export default memo(TruncatedString)
