import { Box, Flex, Stack } from "@chakra-ui/react"
import _ from "lodash"
import { type ReactElement, type ReactNode, memo } from "react"
import Footer from "ui/snippets/footer/Footer"
import Header from "ui/snippets/header/Header"
import TopBar from "ui/snippets/topBar/TopBar"

type Props = {
  children?: ReactNode
  customContent?: ReactNode
  getSubLayout?: ((page: ReactElement) => ReactNode) | undefined
}

const Content = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex
      as="main"
      flexDirection="column"
      marginX="auto"
      width="full"
      height="full"
      maxWidth="1440px"
      minHeight="max(100dvh, 40rem)"
      paddingX={{ base: 4, lg: 5, "2lg": 8, xl: 10 }}
      paddingY={{
        base: 4,
        lg: 6,
      }}
      // display="flex"
      // flex={1}
    >
      {children}
    </Flex>
  )
}

const LayoutDefault = ({ children, customContent, getSubLayout }: Props) => {
  return (
    <Stack alignItems="stretch" position="relative" spacing={0}>
      <TopBar />
      <Box
        width="full"
        height="1px"
        zIndex={997}
        backgroundColor="neutral.light.4"
      ></Box>
      <Header />
      <div id="top-slot"></div>
      {_.chain(<>{customContent || children}</>)
        .thru((content) => {
          if (getSubLayout) {
            return getSubLayout(content)
          }
          return <Content>{content}</Content>
        })
        .value()}

      <Footer />
    </Stack>
  )
}

export default memo(LayoutDefault, (prev, next) => {
  return (
    prev.customContent === next.customContent && prev.children === next.children
  )
})
