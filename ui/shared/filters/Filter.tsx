import type { FlexProps, MenuProps, TextProps } from "@chakra-ui/react"
import { GridItem, Skeleton, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import _, { intersection, isEqual } from "lodash"
import { type ReactNode, memo, useMemo } from "react"
import type { FilterButtonProps } from "ui/shared/filters/FilterButton"
import FilterButton from "ui/shared/filters/FilterButton"
import PopoverFlexiable from "../PopoverModal/PopoverFlexiable"

type ItemOption = {
  id: string
  title: ReactNode
}

type Props<T extends ItemOption> = {
  title?: string
  hasIcon?: boolean
  hasArrow?: boolean
  isLoading?: boolean
  buttonProps?: FilterButtonProps
  buttonGroupProps?: FlexProps
  titleProps?: TextProps
  menuListProps?: FlexProps
  isDisabled?: boolean
} & Partial<MenuProps> &
  (
    | {
        items: T[]
        type: "radio"
        value: T["id"] | "" | undefined
        defaultValue?: T["id"]
        onChange?: (value: T["id"]) => any
        allowToggle?: boolean
      }
    | {
        items: T[]
        type: "checkbox"
        value: T["id"][]
        defaultValue?: T["id"]
        onChange?: (value: T["id"][]) => any
        hasIndicator?: boolean
      }
  )

const Filter = <T extends ItemOption = ItemOption>({
  type = "radio",
  value,
  title,
  hasIcon,
  hasArrow,
  isLoading,
  buttonProps,
  titleProps,
  buttonGroupProps,
  defaultValue,
  items: oldItems,
  onChange,
  menuListProps,
  // @ts-ignore
  hasIndicator,
  // @ts-ignore
  allowToggle,
  isDisabled = false,
  ...menuProps
}: Props<T>) => {
  const items = useMemo(() => {
    const init: ItemOption[] =
      type === "radio" && !defaultValue
        ? [{ title: getLanguage("utils.all"), id: "" }]
        : []
    return init.concat(oldItems) as ItemOption[]
  }, [oldItems, defaultValue])

  const { values, size } = useMemo(
    () =>
      _.chain(oldItems.map((item) => item.id))
        .thru((ids) =>
          type === "checkbox"
            ? intersection(value as string[], ids)
            : intersection([value as string], ids),
        )
        .thru((cleaned) => new Set(cleaned) as Set<string>)
        .thru((idsSet) => ({
          values: idsSet,
          size: idsSet.size,
        }))
        .value(),
    [type, oldItems, value],
  )

  const { content, count, activies } = useMemo(() => {
    if (size === 0) {
      if (type === "checkbox") {
        if (defaultValue) values.add(defaultValue)
      } else {
        values.add(defaultValue || "")
      }
    }

    const selecties = items
      .filter((item) => values.has(item.id))
      .map((item) => item.title)
    const content = selecties.insertDelimiters("; ")

    const count = selecties.length

    return {
      content,
      count,
      activies: values,
    }
  }, [type, values, size, defaultValue])

  return (
    <>
      {title && (
        <GridItem
          textStyle="875"
          color="neutral.light.7"
          isTruncated
          display="flex"
          alignItems="center"
          {...titleProps}
        >
          {title}
        </GridItem>
      )}
      <PopoverFlexiable
        {...menuProps}
        buttonProps={buttonGroupProps}
        position="absolute"
        allowedPlacements={["bottom-start", "bottom-end"]}
        minWidth="var(--parent-width, 10rem)"
        maxWidth="var(--max-width, 95vw)"
        isFlipped={false}
        isShifted={false}
        autoResize={true}
        borderRadius="0.55rem"
        overflow="hidden"
        isDisabled={isDisabled}
        content={({ onClose }) => (
          <chakra.ul width="full" overflowY="auto" {...menuListProps}>
            {items.map((item) => {
              const isActive = activies.has(item.id)

              return (
                <chakra.li
                  key={item.id}
                  height="2.5rem"
                  display="flex"
                  cursor="pointer"
                  alignItems="center"
                  textAlign="left"
                  verticalAlign="middle"
                  gap={1}
                  textStyle="1"
                  paddingX={3}
                  paddingY={2}
                  color="neutral.light.6"
                  transitionProperty="background-color, color"
                  transitionDuration="normal"
                  transitionTimingFunction="ease-in-out"
                  _hover={{
                    backgroundColor: "primary.light.1",
                    color: "neutral.light.8",
                  }}
                  aria-selected={isActive}
                  _selected={{
                    _hover: {
                      color: "primary.light.4",
                    },
                    color: "primary.light.4",
                  }}
                  onClick={() => {
                    if (!onChange) return
                    onClose()
                    if (type === "checkbox") {
                      if (isActive) {
                        values.delete(item.id)
                      } else {
                        values.add(item.id)
                      }
                      onChange([...values.values()] as never)
                      return
                    }

                    if (isActive) {
                      if (allowToggle) onChange("" as never)
                    } else {
                      onChange(item.id as never)
                    }
                  }}
                >
                  {item.title}
                </chakra.li>
              )
            })}
          </chakra.ul>
        )}
      >
        {({ isOpen, onOpen }) => (
          <GridItem flex={1} position="relative" overflow="hidden">
            {_.chain(
              <FilterButton
                isOpen={isOpen}
                hasArrow={hasArrow}
                hasIcon={hasIcon}
                width="full"
                title={content}
                count={hasIndicator ? count : undefined}
                onClick={() => {
                  if (isDisabled) return
                  onOpen()
                }}
                {...buttonProps}
              />,
            )
              .thru((children) => {
                if (isLoading) {
                  return <Skeleton>{children}</Skeleton>
                }
                return children
              })
              .value()}
          </GridItem>
        )}
      </PopoverFlexiable>
    </>
  )
}

export default memo<typeof Filter>(Filter, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.value === next.value &&
    prev.isLoading === next.isLoading &&
    isEqual(prev.items, next.items) &&
    prev.onChange === next.onChange &&
    prev.isDisabled === next.isDisabled
  )
}) as typeof Filter
