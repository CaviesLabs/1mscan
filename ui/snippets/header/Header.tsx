import { Center, Flex, HStack, chakra, useOutsideClick } from "@chakra-ui/react"
import { memo, useRef } from "react"
import ActionToggle from "ui/shared/button/ActionToggle"
import GlobalWallet from "ui/shared/globalWallet/GlobalWallet"
import { useSnapshot } from "valtio"
import HeaderLogo from "./HeaderLogo"
import NavBarTrigger from "./NavBarTrigger"
import NavGroup from "./NavGroup"
import { type INavItems, items } from "./config"
import type { INavActivePath, INavGroupExpandable } from "./types"

type Props = {}

const Header = ({}: Props) => {
  const store = useStore<
    {
      open: boolean
      active: INavActivePath<INavItems>
    } & Record<INavGroupExpandable<INavItems>, boolean>
  >({
    open: false,
    active: "home",
  })

  const ref = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const snap = useSnapshot(store)

  useOutsideClick({
    enabled: snap.open,
    ref: navRef as any,
    handler: () => {
      store.open = false
    },
  })

  return (
    <Center
      justifyItems="center"
      width="full"
      alignItems="stretch"
      borderBottomWidth="1px"
      borderBottomColor="neutral.light.4"
      boxShadow="md"
      backgroundColor="neutral.light.1"
      zIndex={997}
    >
      <HStack
        as="header"
        id="header"
        ref={ref}
        height="3.75rem"
        maxWidth={{ base: "100%", xl: "1440px" }}
        width="full"
        justifyContent="space-between"
        paddingX={{ base: 4, lg: 5, "2lg": 8, xl: 10 }}
        position={{
          base: "static",
          lg: "relative",
        }}
        alignSelf="center"
      >
        <HeaderLogo
          onClick={() => {
            store.open = false
          }}
        />

        <HStack spacing={{ base: 2, lg: 8 }}>
          <GlobalWallet order={2} />
          <HStack order={{ base: 4, lg: 1 }} ref={navRef}>
            <ActionToggle
              isOpen={snap.open}
              onClick={() => {
                store.open = !store.open
                if (store.open) {
                  ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                } else {
                  document.body.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              }}
              display={{ base: "flex", lg: "none" }}
            />
            <Flex
              data-state={snap.open ? "open" : "closed"}
              _open={{
                transform: {
                  base: "translateX(-100%)",
                  lg: "none",
                },
                borderLeftWidth: {
                  base: "1px",
                  lg: 0,
                },
              }}
              willChange="transform, border-top-width"
              transitionProperty={{
                base: "transform, border-top-width",
                lg: "none",
              }}
              transitionDuration="0.7s"
              transitionTimingFunction="ease"
              display={{ base: "flex", lg: "contents" }}
              flexDirection={{ base: "column", lg: "row" }}
              alignItems={{
                base: "stretch",
                lg: "center",
              }}
              position={{
                base: "absolute",
                lg: "static",
              }}
              top="calc(7rem + 1px)"
              boxShadow={{ base: "none", lg: "none" }}
              width={{
                base: "calc(100vw - 2px)",
                lg: "auto",
              }}
              borderLeftWidth={{
                base: 0,
                lg: 0,
              }}
              left="100%"
              bottom={{ base: "31.3125rem", lg: "16.8125rem" }}
              zIndex={2}
              paddingX={{ base: 4, lg: 0 }}
              backgroundColor="neutral.light.1"
              paddingTop={{
                base: 8,
                lg: 0,
              }}
              gap={3}
              borderColor="neutral.light.4"
              borderTopWidth={{
                base: "1px",
                lg: 0,
              }}
            >
              <chakra.nav
                display="flex"
                flexDirection={{ base: "column", lg: "row" }}
                gap={{
                  base: 0,
                  lg: 5,
                  "2lg": 6,
                  xl: 8,
                }}
                alignItems={{
                  base: "stretch",
                  lg: "center",
                }}
              >
                <NavBarTrigger store={store} />
                {items.map((item) => {
                  return <NavGroup key={item.id} group={item} store={store} />
                })}
              </chakra.nav>
            </Flex>
          </HStack>
        </HStack>
      </HStack>
    </Center>
  )
}

export default memo(Header, () => true)
