import { Center, Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { useRouter } from "next/router"
import { memo, useMemo } from "react"
import SearchBarTop from "../searchBar/SearchBarTop"
import LangSelect from "./LangSelect"
import TopBarStats from "./TopBarStats"

const TopBar = () => {
  const router = useRouter()
  const homePage = useMemo(() => router.pathname === "/", [router.pathname])
  // const dispatch = useAppDispatch();

  return (
    <Center backgroundColor="neutral.light.1" zIndex={998}>
      <Flex
        width="full"
        paddingY={{ base: 2, lg: "0.375rem", xl: "0.5rem" }}
        gap={{ base: 3, lg: 4 }}
        flexWrap="wrap"
        alignItems="center"
        maxWidth={{ base: "full", xl: "1440px" }}
        paddingX={{ base: 4, lg: 5, "2lg": 8, xl: 10 }}
        height="3.25rem"
        backgroundColor="neutral.light.1"
        justifyContent="space-between"
      >
        <TopBarStats flex={1} />
        {!homePage && (
          <SearchBarTop
            isFullscreen
            searchInputProps={{
              placeholder: getLanguage(
                "header.search_bar.enter_keyword_for_searching",
              ),
            }}
            contentProps={{
              zIndex: 1000,
              minHeight: {
                base: "unset",
                lg: "20rem",
              },
              maxHeight: {
                base: "100dvh",
                lg: "85dvh",
              },
            }}
          />
        )}
        <LangSelect />
      </Flex>
    </Center>
  )
}

export default memo(TopBar, () => true)
