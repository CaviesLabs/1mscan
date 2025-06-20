import type { BoxProps, FlexProps } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import type { MouseEventHandler, ReactNode } from "react"
import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { isEmptyElement } from "ui/utils/dom"

const MotionFlex = motion.create(Flex)

// Define the props for the function-based header
interface HeaderFunctionProps {
  isExpanded?: boolean
  onToggle?: () => void
}

// Define the type for the header, which can be either a ReactNode or a function returning a ReactNode
type HeaderType = ReactNode | ((props: HeaderFunctionProps) => ReactNode)

// Utility function to add onClick handler if it doesn't already exist
const addOnClickToHeader = (
  header: HeaderType, // The header could be either a ReactNode or a function returning ReactNode
  onClickHandler: MouseEventHandler<HTMLElement>, // The onClick handler to add
  isExpanded: boolean, // Optional flag passed if the header is a function
  onToggle: () => void, // Optional toggle function passed if the header is a function
): ReactNode => {
  // Case 1: If the header is a function that returns a ReactNode
  if (typeof header === "function") {
    const renderedHeader = header({ isExpanded, onToggle }) // Call the function with the isExpanded flag
    if (React.isValidElement(renderedHeader)) {
      // Check if the returned ReactNode already has an onClick property
      return !(renderedHeader.props as any)?.onClick
        ? React.cloneElement(renderedHeader as any, {
            onClick: onClickHandler,
          }) // Add onClick if it doesn't exist
        : renderedHeader
    }
    return renderedHeader // Return as is if it is not a valid ReactNode
  }

  // Case 2: If the header is a ReactNode
  if (React.isValidElement(header)) {
    // Check if the ReactNode already has an onClick property
    return (header.props as any)?.onClick
      ? React.cloneElement(header as any, {
          onClick: onClickHandler,
        }) // Add onClick if it doesn't exist
      : header
  }

  // Return the header unchanged if it's not a valid ReactNode or function
  return header
}

const Collapse = ({
  children,
  open,
  header,
  groupProps,
  defaultExpanded,
  duration,
  startHeight,
  endHeight,
  startOpacity,
  endOpacity,
  onToggle: _onToggle,
  isDisabled,
  hideWhenEmpty,
  ...rest
}: {
  children: ReactNode | (({ isExpanded }: { isExpanded: boolean }) => ReactNode)
  open?: boolean
  header?:
    | ReactNode
    | (({
        isExpanded,
      }: {
        isExpanded: boolean
        onToggle: () => void
      }) => ReactNode)
  defaultExpanded?: boolean
  groupProps?: Partial<FlexProps>
  duration?: number
  startHeight?: number | string
  endHeight?: number | string
  startOpacity?: number
  endOpacity?: number
  isDisabled?: boolean
  onToggle?: (value: boolean) => void
  hideWhenEmpty?: boolean
} & Partial<Omit<BoxProps, "repeat" | "initial" | "animate" | "onToggle">>) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded ?? Boolean(open))

  const passFirstTime = useRef(false)
  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect
  }
  useLayoutEffect(() => {
    if (passFirstTime.current === false) {
      passFirstTime.current = true
      return
    }
    if (typeof open !== "boolean") return
    setIsOpen(open)
  }, [open])

  const onToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev
      return next
    })
  }, [])

  const variants = useMemo(
    () =>
      ({
        expanded: {
          height: endHeight ?? "auto", // Or set a specific expanded height
          opacity: startOpacity ?? 1,
          transition: { duration: duration || 0.5 } as any,
        },
        collapsed: {
          height: startHeight ?? 0,
          opacity: endOpacity ?? 0,
          overflow: "hidden",
          transition: { duration: duration || 0.5 },
        },
      }) as Variants,
    [duration, endHeight, endOpacity, startHeight, startOpacity],
  )

  // Apply onClick logic to the header
  const headerWithOnClick = useMemo(
    () =>
      addOnClickToHeader(
        header,
        () => {
          setIsOpen((prev) => {
            if (isDisabled) return prev
            const next = !prev
            _onToggle?.(next)
            return next
          })
        },
        isOpen,
        onToggle,
      ),
    [header, isOpen, _onToggle],
  )

  if (hideWhenEmpty && isEmptyElement(children)) {
    return null
  }

  return (
    <Flex flexDirection="column" width="full" overflow="hidden" {...groupProps}>
      {headerWithOnClick}

      <MotionFlex
        flexDirection="column"
        alignItems="stretch"
        width="full"
        initial={defaultExpanded ? "expanded" : "collapsed"}
        animate={isOpen ? "expanded" : "collapsed"}
        variants={variants}
        overflow="hidden"
        _empty={{
          display: "none",
        }}
        {...(rest as object)}
      >
        {typeof children === "function"
          ? children({ isExpanded: isOpen })
          : children}
      </MotionFlex>
    </Flex>
  )
}

export default memo(Collapse)
