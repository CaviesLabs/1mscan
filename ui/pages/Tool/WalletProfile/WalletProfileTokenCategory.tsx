import { Flex } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { Fragment, memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import type { TokenType } from "types/api/token"
import Divider from "ui/shared/Divider"
import Loading from "ui/shared/Loading"
import type { IConnectType } from "ui/shared/globalWallet/useGlobalWallet"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import type { IInfinateResponse } from "ui/shared/pagination/useQueryWithInfinity"
import WalletProfileCoinItem from "./WalletProfileCoinItem"
import WalletProfileTokenItem from "./WalletProfileTokenItem"

type Props = {
  tokenType:
    | Extract<TokenType, "NATIVE" | "ICS-20" | "ERC-20" | "ERC-404" | "CW-20">
    | "COIN"
  pages: IInfinateResponse<"address_tokens">[] | undefined
  isNextPageLoading: boolean
  fetchNextPage?: () => void
  hasNextPage: boolean
  total: number
  isLoading: boolean | undefined
  addressType: Extract<IConnectType, "evm" | "native">
}

const WalletProfileTokenCategory = ({
  tokenType,
  pages,
  isNextPageLoading,
  fetchNextPage,
  hasNextPage,
  total,
  addressType,
}: Props) => {
  const hasItems = useMemo(() => {
    return pages?.some((page) => page.items.length)
  }, [pages])
  return (
    <DetailsInfoGroup
      flexDirection="column"
      backgroundColor="unset"
      padding="0 !important"
      margin="0 !important"
      overflow="hidden"
      borderWidth="1px"
      transition="none"
      headerProps={{
        paddingY: 3,
        color: "neutral.light.8",
        textStyle: "1700",
        paddingX: 3,
        backgroundColor: "neutral.light.2",
      }}
      hasCollapsed={hasItems}
      header={{
        hasArrow: true,
        hasDivider: true,
        element: `${
          (tokenType === "ICS-20" && getLanguage("token.ibc_tokens")) ||
          (tokenType === "NATIVE" && getLanguage("token.native_tokens")) ||
          (tokenType === "COIN" && "SEI") ||
          tokenType
        }${tokenType !== "COIN" && total >= 0 ? ` (${total})` : ""}`,
      }}
      contentProps={{
        backgroundColor: "neutral.light.1",
        gap: 1,
        paddingY: 1,
        alignItems: "stretch",
        flexDirection: "column",
        _empty: {
          display: "none",
        },
      }}
    >
      {pages?.map((data) => (
        <Flex
          transition="none"
          flexDirection="column"
          gap={1}
          alignItems="stretch"
          key={generateKey(0, false, data.page)}
        >
          {data?.items?.map((item, index) => {
            return (
              <Fragment
                key={generateKey(
                  index,
                  false,
                  data.page,
                  item.value,
                  item.token_id,
                  item.token?.address,
                  item.token?.base_denom,
                )}
              >
                {tokenType === "COIN" && (
                  <WalletProfileCoinItem
                    item={item}
                    addressType={addressType}
                  />
                )}
                {tokenType !== "COIN" && (
                  <WalletProfileTokenItem
                    item={item}
                    hasNextPage={index === data.items.length - 1 && hasNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                )}

                <Divider
                  orientation="horizontal"
                  marginX={3}
                  width="unset"
                  height="1px"
                  alignSelf="stretch"
                  flexShrink={0}
                  backgroundColor="neutral.light.4"
                  _last={{
                    display: "none",
                  }}
                ></Divider>
              </Fragment>
            )
          })}
        </Flex>
      ))}

      {isNextPageLoading && (
        <Loading
          display="none"
          alignSelf="center"
          justifySelf="center"
          height="3.5rem"
        />
      )}
    </DetailsInfoGroup>
  )
}

export default memo(WalletProfileTokenCategory, (prev, next) => {
  return (
    prev.pages === next.pages &&
    prev.isNextPageLoading === next.isNextPageLoading &&
    prev.tokenType === next.tokenType &&
    prev.fetchNextPage === next.fetchNextPage &&
    prev.hasNextPage === next.hasNextPage &&
    prev.total === next.total &&
    prev.isLoading === next.isLoading &&
    prev.addressType === next.addressType
  )
})
