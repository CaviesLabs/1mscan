import { Flex, HStack, Stack, useOutsideClick } from "@chakra-ui/react"
import { memo, useCallback, useContext, useRef } from "react"
import ArrowToggle from "ui/shared/ArrowToggle"
import IconSvg from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"
import { useSnapshot } from "valtio"
import type { SidebarItem } from "../LayoutSidebar/types"
import { LayoutContext } from "../components/LayoutProvider"
import LayoutDropItem from "./LayoutDropItem"

type Props = {
  items: SidebarItem[]
}

const LayoutDrop = ({ items }: Props) => {
  const { store } = useContext(LayoutContext)

  const snap = useSnapshot(store)

  const open = snap.open

  const ref = useRef<HTMLDivElement>(null)

  const onClose = useCallback(() => {
    store.open = false
  }, [])

  const onToggle = useCallback(() => {
    store.open = !store.open
  }, [])

  useOutsideClick({
    ref: ref as any,
    enabled: open,
    handler: onClose,
  })

  return (
    <Flex alignItems="stretch" justifyContent="stretch" position="relative">
      <HStack
        zIndex={997}
        paddingX={3}
        paddingY={3}
        width="full"
        backgroundColor="neutral.light.1"
        justifyContent="space-between"
        ref={ref}
        onClick={onToggle}
        display={{
          base: "flex",
          lg: "none",
        }}
        borderColor="neutral.light.4"
        borderBottomWidth="1px"
      >
        <Tag
          colorScheme="red"
          variant="outline"
          fontSize="1rem"
          lineHeight="1.5rem"
          paddingX="0.375rem"
          paddingY={0}
          gap={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <IconSvg name="tools/default" boxSize={4} color="inherit" />
          <span>Sei Tools</span>
        </Tag>
        <ArrowToggle isOpen={open} />
      </HStack>

      <Stack
        justifyContent={{
          base: "flex-end",
          lg: "flex-start",
        }}
        data-state={open ? "open" : "closed"}
        _open={{
          transform: {
            base: "translateY(0)",
            lg: "none",
          },

          // visibility: {
          //   base: "visible",
          //   lg: "visible",
          // },
          // height: {
          //   base: `calc(2rem + 2.5rem * ${items.length} + 0.5rem * ${Math.max(items.length - 1, 0)})`,
          //   lg: "auto",
          // },
          // opacity: 1,
        }}
        // opacity={{
        //   base: 0.75,
        //   lg: 1,
        // }}
        backgroundColor="neutral.light.1"
        overflow="hidden"
        transform={{
          base: "translateY(-100%)",
          lg: "none",
        }}
        // height={{
        //   base: "0",
        //   lg: "auto",
        // }}
        transitionProperty="transform, box-shadow"
        transitionDuration="0.5s"
        transitionTimingFunction="ease-in-out"
        willChange="transform, box-shadow"
        position={{
          base: "absolute",
          lg: "relative",
        }}
        left={0}
        zIndex={{
          base: 1,
          lg: "auto",
        }}
        top={{
          base: "100%",
          lg: "0",
        }}
        // visibility={{
        //   base: "hidden",
        //   lg: "visible",
        // }}
        right={0}
        boxShadow={{
          base: "0px 5px 8px 0px rgba(0, 0, 0, 0.03)",
          lg: "none",
        }}
        borderColor="neutral.light.4"
        borderRightWidth={{
          lg: "1px",
        }}
        borderLeftWidth={{
          lg: "1px",
        }}
        // borderTopWidth={{
        //   base: "1px",
        //   lg: "0px",
        // }}
        borderBottomRadius={2}
      >
        <Stack
          paddingX={2}
          paddingY={{
            base: 4,
            lg: 8,
          }}
          alignItems="stretch"
          spacing={2}
          maxHeight="full"
          whiteSpace="nowrap"
          flexShrink={0}
          justifyContent={{
            base: "flex-end",
            lg: "flex-start",
          }}
        >
          {items.map((item) => {
            return <LayoutDropItem key={item.id} item={item}></LayoutDropItem>
          })}
        </Stack>
      </Stack>
    </Flex>
  )
}

export default memo(LayoutDrop, (prev, next) => {
  return prev.items === next.items
})
