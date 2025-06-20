import { Stack, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { isEvmTransactionTest, isNativeTransactionTest } from "lib/getOSType"
import { useShallowMemoRef } from "lib/hooks/useShallow"
import _, { debounce } from "lodash"
import { memo, useCallback, useEffect, useMemo, useRef } from "react"
import { useFormContext } from "react-hook-form"
import {
  CATEGORY_INFO,
  CATEGORY_INFO_IDS,
  type ISearchCategory,
  type ISearchItem,
  getItemCategory,
  getItemIdentifier,
} from "types/api/search"
import DataListDisplay from "ui/shared/DataListDisplay"
import SearchItem from "./SearchItem"
import SearchRecents from "./SearchRecents"
import SearchTabs from "./SearchTabs"
import type { IForm } from "./types"
import {
  type ISearchDBItem,
  SearchHistoryDB,
  canScrollY,
  isElementInContainer,
  regexPositiveString,
} from "./utils"

interface Props {
  data: ISearchItem[] | undefined
  isLoading: boolean | undefined
  isError: boolean | undefined
  q: string | undefined
  setSearch: (q: string) => void
  onClose: () => void
}

const SearchMenu = ({
  data,
  isLoading,
  isError,
  q,
  setSearch,
  onClose,
}: Props) => {
  const { getValues, setValue } = useFormContext<IForm>()

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dbRef = useRef<SearchHistoryDB | null>(null)

  const itemsGroups = useMemo(() => {
    const search = (getValues("search") || "").trim()

    if (!search || !data?.length) {
      return []
    }
    const groups = Object.fromEntries(
      CATEGORY_INFO_IDS.map((id) => {
        const score = _.chain(id)
          .thru((id) => {
            if (
              (isEvmTransactionTest(search) ||
                isNativeTransactionTest(search)) &&
              id === "transaction"
            ) {
              return 5
            }

            if (search.startsWith("0x")) {
              if (id.startsWith("erc")) {
                return 5
              }
              if (id === "address") {
                return 4
              }
            }

            if (search.startsWith("sei")) {
              if (id.startsWith("cw")) {
                return 5
              }
              if (search.startsWith("factory")) {
                return 4
              }
              if (search.startsWith("ibc")) {
                return 3
              }
              if (id === "address") {
                return 2
              }
            }
            if (search.startsWith("ibc") && id.startsWith("ics-20")) {
              return 6
            }
            if (search.startsWith("factory") && id === "native") {
              return 6
            }

            return 0
          })
          .value()

        return [
          id,
          {
            items: [] as ISearchItem[],
            keys: new Set<string>([]),
            score,
          },
        ]
      }),
    ) as Record<
      ISearchCategory,
      {
        items: ISearchItem[]
        keys: Set<string>
        score: number
      }
    >

    data?.forEach((item) => {
      const category = getItemCategory(item)
      if (!category) {
        return
      }
      const group = groups[category]

      if (!group) {
        return
      }
      const identifier = getItemIdentifier(item)
      if (!identifier) {
        return
      }
      if (group.keys.has(identifier)) {
        return
      }

      group.items.push({
        ...item,
        category,
        identifier,
      })
      group.keys.add(identifier)
    })

    // check is formed block
    if ((groups.block?.items.length || 0) === 0) {
      if (regexPositiveString.test(search)) {
        const height = Number(search)
        groups.block?.items.push({
          type: "block",
          block_number: height,
          description: "Unformed block",
        })
      }
    }

    return Object.entries(groups)
      .filter(([, group]) => group.keys.size)
      .sort(([, { score: aScore }], [, { score: bScore }]) => {
        return bScore - aScore // desc
      })
      .map(([id, group]) => ({
        id,
        title: CATEGORY_INFO[id].title,
        items: group.items,
      })) as {
      id: ISearchCategory
      title: string
      items: (ISearchItem & {
        identifier: string
      })[]
    }[]
  }, [data])

  const activeTab = useCallback((index: number) => {
    containerRef.current?.setAttribute("data-index", index.toString())
  }, [])

  useEffect(() => {
    if (!itemsGroups.length) {
      return
    }

    contentRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    activeTab(0)

    const handleScroll = debounce(() => {
      const content = contentRef.current
      if (!content) {
        return
      }

      if (!canScrollY(content)) {
        activeTab(itemsGroups.length - 1)
        return
      }

      const elements = content.children

      const contentBounding = content.getBoundingClientRect()
      const contentTop = contentBounding.top
      const contentBottom = contentBounding.bottom

      for (let i = 1; i < elements.length; i++) {
        const element = elements[i]
        const elementBounding = element.getBoundingClientRect()
        const elementTop = elementBounding.top
        const elementBottom = elementBounding.bottom

        if (
          isElementInContainer(
            contentTop,
            contentBottom,
            elementTop,
            elementBottom,
          )
        ) {
          activeTab(i - 1)
          break
        }
      }
    }, 500)
    contentRef.current?.addEventListener("scroll", handleScroll)
    return () => {
      contentRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [itemsGroups])

  useEffect(() => {
    SearchHistoryDB.createInstance()
      .then((db) => {
        dbRef.current = db
        db.getAllKeywords().then((items) => {
          setValue("recents", items.slice(0, 10))
          activeTab(0)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const clearHistory = useCallback(() => {
    if (!dbRef.current) {
      return
    }
    dbRef.current.clearAll()
    setValue("recents", [])
  }, [])

  const addHistory = useCallback(
    (item: { id: number | undefined; keyword: string }) => {
      if (!dbRef.current) {
        return
      }

      dbRef.current.addKeyword(item.id, item.keyword).then((items) => {
        setValue("recents", items)
      })
    },
    [],
  )

  const selectHistory = useCallback((item: ISearchDBItem) => {
    setSearch(item.keyword)
    addHistory({ id: item.id, keyword: item.keyword })
  }, [])

  const deleteHistory = useCallback((item: ISearchDBItem) => {
    if (!dbRef.current) {
      return
    }

    dbRef.current.removeKeyword(item).then((item) => {
      setValue(
        "recents",
        getValues("recents").filter((x) => x.id !== item.id),
      )
    })
  }, [])

  const qRef = useShallowMemoRef(() => q, [q])

  const onSelect = useCallback(() => {
    if (!qRef.current) {
      return
    }
    onClose()
    addHistory({ id: undefined, keyword: qRef.current })
  }, [])

  return (
    <DataListDisplay
      gap={0}
      isLoading={isLoading}
      isError={isError}
      isEmpty={q && !itemsGroups.length}
      maxHeight="100%"
      height="unset"
      overflow="hidden"
      emptyText={
        <>
          {getLanguage("header.search_bar.keyword_not_found")}
          <br />
          {getLanguage("header.search_bar.please_check_your_keyword")}
        </>
      }
      emptyProps={{
        boxSize: "6.25rem",
        height: "100%",
        margin: "auto",
        textStyle: "875",
      }}
      loadingProps={{
        height: "full",
        width: "full",
        minHeight: "unset",
        minWidth: "unset",
      }}
      borderTopWidth="1px"
      borderColor="neutral.light.3"
      ref={containerRef}
    >
      <SearchTabs
        itemsGroups={itemsGroups}
        contentRef={contentRef}
        activeTab={activeTab}
      />
      <Stack flex={1} overflowY="auto" ref={contentRef} position="relative">
        <SearchRecents
          onSelect={selectHistory}
          onRemove={deleteHistory}
          isEnabled={!itemsGroups.length}
          onClear={clearHistory}
        />
        {itemsGroups.map((group) => {
          return (
            <Stack
              key={group.id}
              borderTopWidth="1px"
              borderColor="neutral.light.3"
              flex={1}
              gap={0}
              onClick={() => {
                document.body.style.overflowY = "scroll"
              }}
            >
              <Text
                textStyle="8125500"
                color="neutral.light.5"
                marginTop={4}
                marginX={4}
                marginBottom={1}
              >
                {group.title}
              </Text>

              {group.items.map((item) => (
                <SearchItem
                  key={item.identifier}
                  item={item}
                  category={group.id}
                  onSelect={onSelect}
                />
              ))}
            </Stack>
          )
        })}
      </Stack>
    </DataListDisplay>
  )
}

export default memo(SearchMenu, (prev, next) => {
  return (
    prev.q === next.q &&
    prev.data === next.data &&
    prev.isLoading === next.isLoading &&
    prev.isError === next.isError
  )
})
