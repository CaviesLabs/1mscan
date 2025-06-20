import type { BoxProps } from "@chakra-ui/react"
import { Center, Skeleton } from "@chakra-ui/react"
import { memo } from "react"
import type { OnChangeEvent } from "ui/types/input"
import { newOnChangeEvent } from "ui/utils/dom"
import IconSvg from "../IconSvg"

type Props<T extends string | undefined> = {
  sorting: T | undefined
  value1: T
  value2: T
  isLoading?: boolean
  onChange?: OnChangeEvent<T, HTMLDivElement>
} & Partial<Omit<BoxProps, "onChange">>

const SortIndicator = <T extends string | undefined = string>({
  sorting,
  value1,
  value2,
  isLoading,
  onChange,
  onClick,
  ...props
}: Props<T>) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Center
        flexDirection="column"
        height={5}
        width={4}
        position="relative"
        cursor="pointer"
        onClick={(e) => {
          const nextValue =
            sorting !== value1 && sorting !== value2
              ? value1
              : sorting === value1
                ? value2
                : undefined
          const event = newOnChangeEvent(nextValue)
          onChange?.(event as any)
          onClick?.(e)
        }}
        {...props}
      >
        <IconSvg
          display={
            sorting === value1 || (sorting !== value1 && sorting !== value2)
              ? "block"
              : "none"
          }
          position="absolute"
          top="-0.1rem"
          boxSize={4}
          name="arrows/east-mini"
          color="neutral.light.5"
          transform="rotate(90deg)"
        />

        <IconSvg
          display={
            sorting === value2 || (sorting !== value1 && sorting !== value2)
              ? "block"
              : "none"
          }
          boxSize={4}
          name="arrows/east-mini"
          color="neutral.light.5"
          transform="rotate(-90deg)"
          position="absolute"
          bottom="-0.1rem"
        />
      </Center>
    </Skeleton>
  )
}

export default memo(SortIndicator)
