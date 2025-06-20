import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
  useToken,
} from "@chakra-ui/react"
import { FloatingPortal } from "@floating-ui/react"
import { memo } from "react"
import { POPOVER_PROPS } from "./utils"

type Props = {
  content: PopoverProps["children"]
  children: PopoverProps["children"]
  isDisabled?: boolean
  bodyProps?: Partial<PopoverContentProps>
} & Partial<Omit<PopoverProps & PopoverContentProps, "content" | "chilren">>

const PopoverShow = ({
  children,
  content,
  isDisabled,
  bodyProps,
  ...props
}: Props) => {
  const [popoverProps, contentProps] = useSplitProps(props, POPOVER_PROPS)
  const neutralLight3 = useToken("colors", "neutral.light.3")
  return (
    <Popover
      variant="unstyled"
      trigger="click"
      openDelay={20}
      closeDelay={0}
      lazyBehavior="keepMounted"
      isLazy
      isOpen={isDisabled === true ? false : undefined}
      closeOnBlur={true}
      strategy="absolute"
      {...popoverProps}
    >
      {({ isOpen, onClose, forceUpdate }) => (
        <>
          <PopoverTrigger>
            {typeof children === "function"
              ? children({ isOpen, onClose, forceUpdate })
              : children}
          </PopoverTrigger>
          <FloatingPortal>
            <PopoverContent
              borderRadius="0.75rem"
              width="max-content"
              backgroundColor="neutral.light.1"
              opacity={0.85}
              border={`1px solid ${neutralLight3}`}
              zIndex={1400}
              boxShadow="0px 24px 48px 0px rgba(0, 0, 0, 0.10)"
              {...contentProps}
            >
              <PopoverArrow
                shadowColor="neutral.light.3"
                backgroundColor="neutral.light.1"
                opacity={0.85}
              />
              <PopoverBody
                padding="0.375rem"
                textStyle="8125"
                color="neutral.light.1"
                userSelect="none"
                textAlign="center"
                {...bodyProps}
              >
                {typeof content === "function"
                  ? content({ isOpen, onClose, forceUpdate })
                  : content}
              </PopoverBody>
            </PopoverContent>
          </FloatingPortal>
        </>
      )}
    </Popover>
  )
}

export default memo(PopoverShow, (prev, next) => {
  return (
    prev.isDisabled === next.isDisabled &&
    prev.content === next.content &&
    prev.children === next.children &&
    prev.bodyProps === next.bodyProps
  )
})
