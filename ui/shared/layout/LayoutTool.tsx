import { Flex, Stack } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import LayoutDropChecked from "./LayoutDrop/LayoutDropChecked"
import type { SideBarSectionItem } from "./LayoutSidebar/types"
import tool from "./constants/tool"

const LayoutTool = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      alignItems="stretch"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      overflow="hidden"
      zIndex={3}
      justifyContent="stretch"
      marginX="auto"
      width="full"
      height="full"
      maxWidth="1440px"
      minHeight="max(100dvh, 40rem)"
      _empty={{
        display: "none",
      }}
    >
      <LayoutDropChecked navs={tool as SideBarSectionItem[]}>
        <Stack
          as="main"
          paddingY={6}
          paddingX={{
            base: 4,
            lg: 5,
          }}
          flex={1}
          spacing={4}
          overflow="hidden"
          alignItems="stretch"
        >
          {children}
        </Stack>
      </LayoutDropChecked>
    </Flex>
  )
}

export default memo(LayoutTool, (prev, next) => {
  return prev.children === next.children
})
