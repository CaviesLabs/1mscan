import { Button, type ButtonProps, Center, Skeleton } from "@chakra-ui/react"
import { memo } from "react"

type Props = {
  isSubmitting?: boolean
} & ButtonProps

const ToolButton = ({
  onClick,
  children,
  isDisabled,
  isLoading,
  isSubmitting,
  ...props
}: Props) => {
  return (
    <Button
      onClick={(e) => {
        if (isLoading) {
          e.preventDefault()
          return
        }
        onClick?.(e)
      }}
      size="sm"
      isDisabled={isDisabled}
      variant="solid"
      borderRadius="0.5rem"
      textStyle="875"
      minWidth={{
        base: "max-content",
        lg: "10.9375rem",
      }}
      width="max-content"
      position="relative"
      height="3rem"
      overflow="visible"
      display="inline-flex"
      flexShrink={0}
      whiteSpace="nowrap"
      isLoading={isSubmitting}
      paddingX="0.375rem"
      paddingY="0.5rem"
      gap={2}
      {...props}
    >
      {isLoading && (
        <Center
          backgroundColor="neutral.light.3"
          position="absolute"
          zIndex={2}
          inset="-2px"
          overflow="hidden"
          rounded={2}
        >
          <Skeleton flex={1} />
        </Center>
      )}

      {children ?? "Next"}
    </Button>
  )
}

export default memo(ToolButton, (prev, next) => {
  return (
    prev.onClick === next.onClick &&
    prev.children === next.children &&
    prev.isDisabled === next.isDisabled &&
    prev.isLoading === next.isLoading &&
    prev.isSubmitting === next.isSubmitting
  )
})
