import { debounce } from "lodash"
import { useRouter } from "next/router"
import {
  type MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react"
import { subscribeKey } from "valtio/utils"
import { useBaseContext } from "./BaseProvider"
import type { IStore } from "./types"

type Props = {
  store: IStore
  tabListRef?: MutableRefObject<HTMLElement | null>
  id?: string
  noFallback?: boolean
}

// Offset value for tab scrolling to reveal part of the next tab
const offset = 30

const BaseTrigger = ({ store, id, tabListRef, noFallback }: Props) => {
  const { tabs } = useBaseContext()

  // const freezeContext = useTabFreezeContext();

  // const isFreezeRef = useShallowLayoutMemoRef(
  //   () => freezeContext?.isFreeze,
  //   [freezeContext?.isFreeze],
  // );

  const router = useRouter()

  const tab = useMemo(() => {
    const queryId = router.query[id || "tab"] as string
    const tabIndex = tabs.findIndex((tab) => tab?.id === queryId)

    const tab = tabs[tabIndex]
    if (!tab?.id || tab.comingSoon) {
      if (noFallback) return null
      return tabs?.[0]
    }
    return tab
  }, [router.query[id || "tab"], tabs, noFallback])

  useEffect(() => {
    // if (isFreezeRef.current) return;
    if (!noFallback && !tab?.id) return
    const id = tab?.id || ""
    if (id === store.active_id) return

    store.set_active_id = id
  }, [tab?.id, noFallback])

  const handleScroll = useCallback(
    debounce((index: number | undefined) => {
      if (!tabListRef?.current) return

      const targetElement = tabListRef.current.children[
        index || 0
      ] as HTMLDivElement

      if (targetElement) {
        const targetLeft = targetElement.offsetLeft

        const newX = targetLeft - offset

        tabListRef.current.scrollTo({
          left: newX,
          behavior: "smooth",
        })
      }
    }, 400),
    [],
  )

  /**
   * Scroll to active tab when active_id changes
   */
  useLayoutEffect(
    subscribeKey(store, "active_id", async (active_id) => {
      if (!active_id || active_id === (tabs?.[0]?.id || "")) return
      const tabIndex = tabs.findIndex((tab) => tab.id === active_id)
      handleScroll(tabIndex || 0)
    }),
    [],
  )

  useEffect(() => {
    const scrollFn = () => {
      handleScroll(tabs.findIndex((tab) => tab.id === store.active_id) || 0)
    }
    const observe = new ResizeObserver(scrollFn)

    observe.observe(window.document.body)
    if (tabListRef?.current) {
      observe.observe(tabListRef?.current)
    }
    return () => {
      observe?.disconnect()
    }
  }, [tabListRef?.current])

  return <></>
}

export default memo(BaseTrigger, (prev, next) => {
  return prev.id === next.id && prev.noFallback === next.noFallback
})
