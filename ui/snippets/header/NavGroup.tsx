import {
  Divider,
  Flex,
  Stack,
  type StackProps,
  useOutsideClick,
} from "@chakra-ui/react"
import { memo, useCallback, useRef } from "react"
import IconSvg from "ui/shared/IconSvg"
import { useSnapshot } from "valtio"
import { default as NavItem } from "./NavItem"
import { type IStore, groups } from "./config"
import type { INavGroup } from "./types"

type Props = {
  group: INavGroup
  store: IStore
} & StackProps

const NavGroup = ({ group, store, ...props }: Props) => {
  const snap = useSnapshot(store)
  const isExpanded = Boolean(snap[group.id as never])
  const ref = useRef<HTMLDivElement>(null)

  const getIsMobile = useCallback(() => {
    const style = window.getComputedStyle(ref.current!)
    return style.position === "static"
  }, [])

  useOutsideClick({
    ref: ref as any,
    enabled: isExpanded && ref.current?.style.position !== "static",
    handler: () => {
      if (!isExpanded) return

      const isMobile = getIsMobile()
      if (isMobile) {
        return
      }

      store[group.id as never] = false as never
    },
  })

  // const handlePrefetch = useCallback(
  //   debounce(() => {
  //     group?.items?.forEach((item: any) => {
  //       if (!item?.nextRoute?.pathname) return;
  //       console.log("prefetching", item?.nextRoute?.pathname);
  //       Router.prefetch(
  //         route({
  //           pathname: item?.nextRoute?.pathname,
  //           query: {
  //             ...(item?.nextRoute?.query || {}),
  //             chain: chainKey,
  //           },
  //         }),
  //       );
  //     });
  //   }, 300),
  //   [group?.items],
  // );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      store[group.id as never] = !(store[group.id as never] || false) as never
      if (!group.items?.length) {
        store.open = false
      }
      if (getIsMobile() && store[group.id as never]) {
        groups.forEach((g) => {
          if (g.id !== group.id) {
            store[g.id as never] = false as never
          }
        })

        // handlePrefetch();

        // const element = e.currentTarget as HTMLAnchorElement | null;
        // if (!element) return;
        // const curGroup = element.parentElement;
        // const prevGroup = curGroup?.previousElementSibling;
        // setTimeout(() => {
        //   prevGroup?.scrollIntoView({
        //     behavior: "smooth",
        //     block: "start",
        //   });
        // }, 600);
      }
    },
    [group],
  )

  return (
    <Flex
      flexDirection="column"
      alignItems="stretch"
      position={{
        base: "static",
        lg: "relative",
      }}
      ref={ref}
      width={{
        base: "full",
        lg: "max-content",
      }}
      borderTopColor="neutral.light.3"
      _notFirst={{
        base: {
          borderTopWidth: "1px",
        },
        lg: {
          borderTopWidth: "0px !important",
        },
      }}
    >
      <NavItem
        onClick={handleClick}
        item={group}
        isActive={snap.active.split("===")[0] === group.id}
        data-state={isExpanded ? "open" : "closed"}
        width={{
          base: "full",
          lg: "max-content",
        }}
        scroll={!group.items?.length}
        borderColor="neutral.light.3"
        backgroundColor="none"
        paddingX={{
          base: 0,
          lg: 0,
        }}
        _open={{
          color: "neutral.light.8 !important",
        }}
        _closed={{
          color: {
            base: "neutral.light.6",
            lg: "neutral.light.7",
          },
        }}
        sx={{
          _hover: {
            lg: {
              color: "primary.light.4 !important",
              backgroundColor: "none",
            },
          },
          _selected: {
            color: "primary.light.4 !important",
          },
        }}
      >
        {Boolean(group.items?.length) && (
          <IconSvg
            data-state={isExpanded ? "open" : "closed"}
            _open={{
              transform: "rotate(180deg)",
              color: "primary.light.4",
            }}
            transitionProperty="transform, color"
            transitionDuration="0.2s"
            transitionTimingFunction="linear"
            name="arrows/east-solid"
            boxSize={3}
            translateY="50%"
            color="inherit"
          />
        )}
      </NavItem>
      <Stack
        _empty={{
          display: "none",
        }}
        data-state={isExpanded ? "open" : "closed"}
        position={{
          base: "relative",
          lg: "absolute",
        }}
        paddingLeft={{
          base: 4,
          lg: 0,
        }}
        overflow="hidden"
        _open={{
          base: {
            height: "auto",
            opacity: 1,
          },
          lg: {
            zIndex: 2,
            opacity: 1,
            transform: "scale(1)",
          },
        }}
        _closed={{
          base: {
            height: 0,
            opacity: 0,
          },
          lg: { zIndex: -1, opacity: 0, transform: "scale(0.85)" },
        }}
        zIndex={{
          base: 1,
          lg: -1,
        }}
        transitionProperty={{
          base: "opacity, height",
          lg: "opacity, transform, z-index",
        }}
        transitionDuration="normal"
        transitionTimingFunction="ease-in-out"
        alignItems="stretch"
        spacing={0}
        borderRadius={{
          lg: "0.5rem",
        }}
        transformOrigin="top right"
        borderColor="neutral.light.3"
        backgroundColor="neutral.light.1"
        borderWidth={{
          lg: "1px",
        }}
        paddingY={{
          lg: 1,
        }}
        top={{
          lg: "calc(100% + 0.25rem)",
        }}
        right={{
          lg: "calc((100% - 10vw) / 5)",
        }}
        width={{
          base: "full",
          lg: "max-content",
        }}
        boxShadow={{
          lg: "0px 24px 48px 0px rgba(0, 0, 0, 0.10)",
        }}
        role="group"
        {...props}
      >
        {group.items?.map((item, index) => {
          if (item === "divider") {
            return (
              <Divider
                key={index}
                orientation="horizontal"
                display={{ base: "none", lg: "block" }}
                backgroundColor="neutral.light.3"
                width="full"
                height="0.5px"
              />
            )
          }
          return (
            <NavItem
              key={item.id}
              item={item}
              onClick={() => {
                store.open = false
                store[group.id as never] = false as never
              }}
              minWidth="10rem"
              isScrollTop
              isActive={snap.active === `${group.id}===${item.id}`}
            />
          )
        })}
      </Stack>
    </Flex>
  )
}

export default memo(NavGroup, (prev, next) => {
  return prev.group === next.group && prev.store === next.store
})
