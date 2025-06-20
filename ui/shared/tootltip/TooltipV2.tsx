import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
} from "@chakra-ui/react"
import { FloatingPortal } from "@floating-ui/react"
import { type ReactNode, memo } from "react"
import { POPOVER_PROPS } from "../PopoverModal"

type Props = {
  children?: ReactNode
  label: ReactNode
  isDisabled?: boolean
} & Omit<Partial<PopoverProps & PopoverContentProps>, "isOpen" | "ref">

const TooltipV2 = ({ children, label, isDisabled, ...props }: Props) => {
  const [popoverProps, contentProps] = useSplitProps(props, POPOVER_PROPS)

  return (
    <Popover
      variant="unstyled"
      trigger="hover"
      openDelay={20}
      closeDelay={0}
      lazyBehavior="unmount"
      isLazy
      computePositionOnMount={false}
      isOpen={isDisabled ? false : undefined}
      closeOnBlur={true}
      strategy="absolute"
      preventOverflow
      offset={[8, 8]}
      boundary={document.body}
      {...popoverProps}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <FloatingPortal root={document.body}>
        <PopoverContent
          borderRadius="0.25rem"
          maxWidth="100vw"
          width="max-content"
          transitionProperty="width, height"
          transitionDuration="normal"
          transitionTimingFunction="ease-in-out"
          backgroundColor="neutral.light.8"
          opacity={0.85}
          border="none"
          zIndex={1500}
          boxShadow="0px 16px 32px 0px rgba(0, 0, 0, 0.12)"
          {...contentProps}
        >
          <PopoverArrow
            shadowColor="transparent"
            backgroundColor="neutral.light.8"
            opacity={0.85}
          />
          <PopoverBody
            padding="0.375rem"
            textStyle="8125"
            color="neutral.light.1"
            userSelect="none"
            textAlign="center"
            whiteSpace="pre-line"
          >
            <>{label}</>
          </PopoverBody>
        </PopoverContent>
      </FloatingPortal>
    </Popover>
  )
}

export type TooltipV2Props = Partial<Omit<Props, "ref">>

export default memo(TooltipV2, (prev, next) => {
  return (
    prev.children === next.children &&
    prev.label === next.label &&
    prev.isDisabled === next.isDisabled
  )
})
