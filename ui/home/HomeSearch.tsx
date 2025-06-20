import { Heading, Stack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import OptimizationImage from "ui/shared/OptimizationImage"
import SearchBarTop from "ui/snippets/searchBar/SearchBarTop"
import HomeStats from "./HomeStats"
type Props = {}

const HomeSearch = ({}: Props) => {
  return (
    <Stack
      position="relative"
      flexDirection={{ base: "column", "2lg": "row" }}
      alignItems={{
        base: "stretch",
        "2lg": "center",
      }}
      width="full"
      justifyContent="space-between"
      // height={{ lg: "11.25rem" }}
      borderRadius="0.5rem"
      paddingX={{
        base: 0,
        lg: 6,
        "2lg": 8,
      }}
      paddingY={{
        base: 0,
        lg: 6,
      }}
      gap={6}
      boxShadow={{
        base: "none",
        "2lg": "primary",
      }}
    >
      <Stack
        flex={1}
        display={{
          base: "flex",
          lg: "contents",
        }}
        position="relative"
        padding={5}
        boxShadow="primary"
        borderRadius={2}
      >
        <OptimizationImage
          objectFit="cover"
          backgroundColor="secondary.03"
          alt="home_background"
          src="/images/home_background.jpeg"
          hasWrapper
          transform="translateZ(0) !important"
          wrapperProps={{
            boxShadow: "primary",
            boxSize: "full",
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "0.5rem",
            zIndex: 0,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        <Stack flex={1} zIndex={2} gap={{ base: 3, lg: 5 }}>
          <Heading
            as="h1"
            fontSize="2.25rem"
            lineHeight="2.75rem"
            fontWeight={500}
            letterSpacing="-0.0675rem"
            color="neutral.light.1"
          >
            {getLanguage("main_homepage.top_bar.1matrix_blockchain_explorer")}
          </Heading>
          <SearchBarTop
            contentProps={{
              minHeight: {
                base: "18rem",
                lg: "20rem",
              },
              maxHeight: {
                base: "30rem",
                lg: "30rem",
              },
            }}
            searchInputProps={{
              onClick: (e) => {
                const current = e.currentTarget
                if (!current) return
                setTimeout(() => {
                  current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }, 300)
              },
              groupProps: {
                width: "full",
                height: "3rem",
                _hover: {
                  borderColor: "inherit",
                },
              },
              placeholder: getLanguage(
                "main_homepage.top_bar.search_by_address_txn_hash_block_token_nft_collection",
              ),
            }}
            isFullscreen={false}
            boxShadow="primary"
          />
        </Stack>
      </Stack>

      <HomeStats />
    </Stack>
  )
}

export default memo(HomeSearch, () => true)
