import debounce from "lodash/debounce"
import type { ForwardedRef, ReactElement, ReactNode } from "react"
import {
  Children,
  cloneElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { multipleRef } from "ui/utils/dom"
import TooltipV2, { type TooltipV2Props } from "../tootltip/TooltipV2"
import TruncatedProvider, { TruncatedContext } from "./TruncatedProvider"

type ContentProps = {
  children: ReactNode
  label: ReactNode
  isLoading?: boolean
  compareWith?: "self" | "parent" | "child" | "mixed"
  ref?: ForwardedRef<HTMLDivElement | null>
} & TooltipV2Props

const TruncatedTextTooltipContent = ({
  children,
  label,
  isDisabled,
  isLoading,
  compareWith = "self",
  ref,
  ...props
}: ContentProps) => {
  const childRef = useRef<HTMLElement | null>(null)
  const { isTruncated, setIsTruncated } = useContext(TruncatedContext)

  const updatedTruncateState = useCallback(() => {
    if (childRef.current) {
      const scrollWidth =
        (compareWith === "parent" || compareWith === "mixed"
          ? childRef.current.parentElement?.scrollWidth
          : childRef.current.scrollWidth) || 0
      const clientWidth =
        (compareWith === "child" || compareWith === "mixed"
          ? childRef.current.lastElementChild?.clientWidth
          : childRef.current.clientWidth) || 0

      if (scrollWidth > clientWidth) {
        setIsTruncated?.(true)
      } else {
        setIsTruncated?.(false)
      }
    }
  }, [])

  const updatedTruncateStateDebounced = useCallback(
    debounce(updatedTruncateState, 1500),
    [],
  )

  // FIXME: that should be useLayoutEffect, but it keeps complaining about SSR
  // let's keep it as it is until the first issue
  useEffect(() => {
    if (isDisabled) {
      return
    }
    updatedTruncateState()
  }, [isDisabled])

  // we want to do recalculation when isFontFaceLoaded flag is changed
  // but we don't want to create more resize event listeners
  // that's why there are separate useEffect hooks
  useEffect(() => {
    if (isDisabled) {
      return
    }

    window.addEventListener("resize", updatedTruncateStateDebounced)

    return function cleanup() {
      window.removeEventListener("resize", updatedTruncateStateDebounced)
    }
  }, [isDisabled])

  useEffect(() => {
    if (isDisabled) {
      return
    }
    updatedTruncateStateDebounced()
  }, [children])

  const modifiedChildren = useMemo(() => {
    // as for now it supports only one child
    // and it is not cleared how to manage case with two or more children
    const child = Children.only(children) as ReactElement
    return cloneElement(child as ReactElement<any>, {
      ref: (el: HTMLDivElement) => {
        multipleRef(el, ref, childRef)
      },
    })
  }, [children, ref, childRef])

  return (
    <TooltipV2
      label={label}
      isDisabled={!isTruncated || isDisabled || isLoading}
      {...props}
    >
      {modifiedChildren}
    </TooltipV2>
  )
}

type Props = ContentProps & {
  defaultIsTruncated?: boolean
  highPriorityIsTruncated?: boolean
  ref?: ForwardedRef<HTMLDivElement | null>
}

const TruncatedTextTooltip = ({
  defaultIsTruncated,
  highPriorityIsTruncated,
  ref,
  ...props
}: Props) => {
  return (
    <TruncatedProvider
      defaultIsTruncated={defaultIsTruncated}
      highPriorityIsTruncated={highPriorityIsTruncated}
    >
      <TruncatedTextTooltipContent
        {...props}
        ref={ref}
      ></TruncatedTextTooltipContent>
    </TruncatedProvider>
  )
}

export type TruncatedTextTooltipProps = Partial<Props>

export default memo(TruncatedTextTooltip)
