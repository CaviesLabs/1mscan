import type { FlexProps, MergeWithAs } from "@chakra-ui/react"
import { Flex, forwardRef, useBreakpointValue } from "@chakra-ui/react"
import type { MotionProps } from "framer-motion"
import { motion } from "framer-motion"
import type {
  DetailedHTMLProps,
  ElementType,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react"
import { useContext } from "react"
import { PopoverModalContext } from "./PopoverModalContext"

type Props = {
  children?: React.ReactNode
} & FlexProps &
  MotionProps

const MotionFlex = motion.create(
  Flex as ForwardRefExoticComponent<
    MergeWithAs<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      any,
      FlexProps,
      ElementType
    >
  >,
)

const localProps = {
  position: "absolute" as any,
  mt: 2,
  width: "25rem",
  maxWidth: "90vw",
  boxShadow: "xl",
  borderRadius: "0.5rem",
  border: "1px",
  borderColor: "neutral.light.3",
}

const PopoverModalContent = ({ children, ...props }: Props, ref: any) => {
  const { open, isFullscreen } = useContext(PopoverModalContext)

  const shouldAnimate = useBreakpointValue({ base: false, lg: true })

  return (
    <MotionFlex
      ref={ref}
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      // visibility={{
      //   base:
      //     isFullscreen === false ? (open ? "visible" : "hidden") : "visible",
      //   lg: open ? "visible" : "hidden",
      // }}
      backgroundColor="neutral.light.1"
      zIndex={998}
      top="100%"
      position={{
        base: isFullscreen === false ? localProps.position : undefined,
        lg: localProps.position,
      }}
      mt={{
        base: isFullscreen === false ? localProps.mt : undefined,
        lg: localProps.mt,
      }}
      width={{
        base: isFullscreen === false ? "full" : undefined,
        lg: isFullscreen === false ? "full" : localProps.width,
      }}
      maxWidth={{
        lg: isFullscreen === false ? undefined : localProps.maxWidth,
      }}
      boxShadow={{
        base: isFullscreen === false ? localProps.boxShadow : undefined,
        lg: localProps.boxShadow,
      }}
      borderRadius={{
        base: isFullscreen === false ? localProps.borderRadius : undefined,
        lg: localProps.borderRadius,
      }}
      border={{
        base: isFullscreen === false ? localProps.border : undefined,
        lg: localProps.border,
      }}
      borderColor={{
        base: isFullscreen === false ? localProps.borderColor : undefined,
        lg: localProps.borderColor,
      }}
      initial={
        shouldAnimate || !isFullscreen
          ? { opacity: 0, scale: 0.9, visibility: "hidden" }
          : { opacity: 0, scale: 1, visibility: "hidden" }
      }
      animate={
        shouldAnimate || !isFullscreen
          ? {
              opacity: open ? 1 : 0,
              scale: open ? 1 : 0.9,
              visibility: open ? "visible" : "hidden",
            }
          : {
              opacity: open ? 1 : 0,
              scale: 1,
              visibility: open ? "visible" : "hidden",
            }
      }
      willChange="opacity, scale, visibility"
      transition={shouldAnimate ? { duration: 0.12, ease: "easeInOut" } : {}}
      transformOrigin="top center"
      // overflowY="auto"
      flex={1}
      {...props}
    >
      {children}
    </MotionFlex>
  )
}

export type PopoverModalContentProps = Props

export default forwardRef(PopoverModalContent)
