import { Center, Flex, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { getIsNFT } from "lib/getOSType"
import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { AddressTokenBalance } from "types/api/address"
import type { TokenType } from "types/api/token"
import Divider from "ui/shared/Divider"
import LinkInternal from "ui/shared/LinkInternal"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import { smoothScroll } from "ui/utils/dom"
import TokenSelectItem from "./TokenSelectItem"

type Props = {
  tokenType: TokenType
  items: AddressTokenBalance[] | undefined
  hash: string
  total: number
}

const TokenSelectCategory = ({
  tokenType,
  hash,
  items: _items,
  total,
}: Props) => {
  const tokenCategory = useMemo(() => getIsNFT(tokenType), [tokenType])

  const items = useMemo(() => {
    return _items?.slice(0, 6) || []
  }, [_items])

  const isOverflow = useMemo(
    () => items.length < (_items?.length || 0),
    [items, _items],
  )

  return (
    <DetailsInfoGroup
      flexDirection="column"
      backgroundColor="neutral.light.2"
      padding="0 !important"
      margin="0 !important"
      overflow="hidden"
      transition="none"
      hasCollapsed={Boolean(items.length)}
      header={{
        hasArrow: false,
        element: ({ isExpanded }) => (
          <Flex
            justifyContent="space-between"
            paddingX={3}
            paddingY={2}
            width="full"
            overflow="hidden"
            alignItems="center"
            backgroundColor={
              !isExpanded ? "neutral.light.3" : "neutral.light.2"
            }
            transition="all 0.3s ease-in-out"
          >
            <Text
              textStyle="875"
              fontWeight={isExpanded ? 700 : 400}
              transitionProperty="all"
              transitionDuration="0.2s"
              transitionTimingFunction="ease-in-out"
            >
              {(tokenType === "ICS-20" && getLanguage("token.ibc_tokens")) ||
                (tokenType === "NATIVE" &&
                  getLanguage("token.native_tokens")) ||
                tokenType}{" "}
              ({total ?? ""})
            </Text>
          </Flex>
        ),
      }}
    >
      <Flex
        transition="none"
        flexDirection="column"
        gap={1}
        paddingY={1}
        alignItems="stretch"
        _empty={{
          display: "none",
        }}
      >
        {items?.map((data) => (
          <Flex
            transition="none"
            flexDirection="column"
            gap={1}
            alignItems="stretch"
            key={generateKey(
              0,
              false,
              data.token?.address,
              data.value,
              data.token_id,
            )}
            _first={{
              "& .token-select_divider": {
                marginX: 0,
              },
            }}
          >
            <Divider
              orientation="horizontal"
              marginX={3}
              width="auto"
              flexShrink={0}
              backgroundColor="neutral.light.3"
              className="token-select_divider"
            ></Divider>
            <TokenSelectItem data={data} tokenType={tokenType} />
          </Flex>
        ))}

        {isOverflow && (
          <>
            <Divider
              orientation="horizontal"
              marginX={3}
              width="auto"
              flexShrink={0}
              backgroundColor="neutral.light.3"
              className="token-select_divider"
            ></Divider>
            <Center paddingY={3} alignItems="stretch">
              <LinkInternal
                href={route({
                  pathname: "/address/[hash]",
                  query: {
                    hash: hash,
                    tab: "token_holdings",
                    token_holdings:
                      (tokenCategory !== "nft" && tokenType.toLowerCase()) ||
                      "nfts",
                    nfts:
                      (tokenCategory === "nft" && tokenType.toLowerCase()) ||
                      undefined,
                  },
                })}
                replace={true}
                onClick={() => {
                  document.body.click()
                  smoothScroll("routed-tabs")
                }}
              >
                {getLanguage("address.see_more")}...
              </LinkInternal>
            </Center>
          </>
        )}
      </Flex>
    </DetailsInfoGroup>
  )
}

export default memo(TokenSelectCategory, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.items === next.items &&
    prev.total === next.total &&
    prev.tokenType === next.tokenType
  )
})
