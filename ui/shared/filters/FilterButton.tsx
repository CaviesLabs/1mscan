import type { ButtonProps, TextProps } from "@chakra-ui/react"
import { Center, HStack, chakra } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import ArrowToggle from "../ArrowToggle"

export type FilterButtonProps = {
  isActive?: boolean
  count?: number
  hasArrow?: boolean
  hasIcon?: boolean
  isOpen?: boolean
  title?: ReactNode
  titleProps?: TextProps
  ref?: React.RefObject<HTMLButtonElement>
} & Partial<Omit<ButtonProps, "title" | "ref">>

const FilterButton = ({
  count,
  hasIcon,
  hasArrow,
  isOpen,
  title,
  titleProps,
  ref,
  ...props
}: FilterButtonProps) => {
  return (
    <chakra.button
      paddingY="0.375rem"
      paddingX="0.375rem"
      height={9}
      flexShrink={0}
      borderRadius="0.5rem"
      borderWidth="1px"
      backgroundColor="neutral.light.1"
      borderColor="neutral.light.4"
      color="neutral.light.6"
      aria-selected={isOpen}
      aria-checked={Boolean(count)}
      _checked={{
        borderColor: "neutral.light.4",
        color: "neutral.light.8",
      }}
      _hover={{
        borderColor: "neutral.light.5",
        color: "neutral.light.8",
      }}
      _active={{
        borderColor: "neutral.light.4",
        color: "neutral.light.7",
      }}
      _selected={{
        borderColor: "neutral.light.6",
        color: "neutral.light.7",
      }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      transition="all 0.3s ease-in-out"
      gap={2}
      overflow="hidden"
      {...props}
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    >
      <HStack
        marginLeft={((typeof count === "number" || hasArrow) && 1) || undefined}
        flex={1}
        spacing={2}
        height={6}
        overflow="hidden"
      >
        {hasIcon && (
          <IconSvg
            name="filter"
            boxSize={3}
            color="neutral.light.5"
            _hover={{
              color: "neutral.light.7",
            }}
            aria-selected={isOpen}
            _selected={{
              color: "neutral.light.7",
            }}
          />
        )}
        <chakra.span
          minWidth="4rem"
          textAlign="left"
          textStyle="875"
          isTruncated
          {...titleProps}
        >
          {title || "Filter"}
        </chakra.span>
      </HStack>

      {typeof count === "number" && (
        <Center height={5}>
          <Center
            whiteSpace="nowrap"
            backgroundColor="neutral.light.7"
            borderRadius="0.375rem"
            minWidth={6}
            height={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="neutral.light.1"
            padding={2}
            textAlign="center"
            verticalAlign="middle"
            textStyle="8125"
          >
            {count}
          </Center>
        </Center>
      )}
      {hasArrow && <ArrowToggle marginRight={1} boxSize={3} isOpen={isOpen} />}
    </chakra.button>
  )
}

export default memo(FilterButton)
