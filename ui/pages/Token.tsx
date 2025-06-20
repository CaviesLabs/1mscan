import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { AssociationTypeEnum, getAssociationTokenData } from "lib/association"
import { getIsNFT } from "lib/getOSType"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import Router from "next/router"
import { memo, useEffect, useMemo } from "react"
import * as tokenStubs from "stubs/token"
import type { TokenInfo, TokenTypeWithTransfer } from "types/api/token"
import AddressContract from "ui/address/AddressContract"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import Tag from "ui/shared/chakra/Tag"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import SwitchToAssociation from "ui/token/SwitchToAssociation"
import TokenChart from "ui/token/TokenChart"
import TokenDetails from "ui/token/TokenDetails"
import TokenHolder from "ui/token/TokenHolder"
import TokenInventory from "ui/token/TokenInventory"
import TokenTransfer from "ui/token/TokenTransfer"

export type TokenTabs = "token_transfers" | "holders" | "inventory"

type Props = {
  hash: string
}

export const getOriginalAddress = (
  token: TokenInfo<TokenTypeWithTransfer> | undefined | null,
) => {
  if (!token) return ""
  const associationData = getAssociationTokenData(token)
  if (!associationData) return token.address

  if (associationData.self === AssociationTypeEnum.Original) {
    return token.address
  }

  return associationData.associationAddress
}

const TokenPage = ({ hash }: Props) => {
  const [ownerFilter, setOwnerFilter] = useSetStateQuery("holder_address_hash")

  const {
    data: token,
    isPlaceholderData,
    error,
  } = useApiQuery("token", {
    pathParams: { hash: hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: tokenStubs.TOKEN_INFO_ERC_20 as TokenInfo,
    },
  })

  const associationAddress = useMemo(() => {
    if (!token?.type || !token.association || token.type === "ERC-404")
      return undefined
    const temp = token.type.slice(0, 2)
    return (
      (temp === "ER" && token.association.sei_hash) ||
      token.association.evm_hash ||
      undefined
    )
  }, [token?.type, token?.association])

  const { data: associateToken, isFetching: isFetchingAssociateToken } =
    useApiQuery("token", {
      pathParams: { hash: associationAddress },
      queryOptions: {
        enabled: Boolean(
          associationAddress &&
            token?.address &&
            !isPlaceholderData &&
            token.type !== "ERC-404",
        ),
      },
    })

  const { data: address, isPending: isAddressPending } = useApiQuery(
    "address",
    {
      pathParams: { hash: hash },
      queryOptions: {
        enabled: Boolean(hash),
      },
    },
  )

  const data = useMemo(() => {
    if (!token) return undefined

    return {
      ...token,
      association:
        token.type !== "ERC-404" && associateToken?.type !== "ERC-404"
          ? token.association
          : undefined,
    }
  }, [token, associateToken])

  const associationTokenData = useMemo(
    () => getAssociationTokenData(data),
    [data],
  )

  const isLoading = isPlaceholderData || isFetchingAssociateToken

  const { isNft, isHybrid } = useMemo(() => {
    if (isLoading) return { isNft: false, isHybrid: false, type: data?.type }
    const type = getIsNFT(data?.type)
    return {
      type,
      isNft: type === "nft",
      isHybrid: type === "hybrid",
    }
  }, [data?.type, isLoading])

  useEffect(() => {
    if (isLoading) return
    if (error || !token) {
      Router.replace(
        {
          pathname: "/address/[hash]",
          query: { hash: hash },
        },
        undefined,
        { scroll: false, shallow: true },
      )
    }
  }, [error, token, isLoading, hash])

  return (
    <>
      <PageTitle
        width="full"
        hasDefaultBackLink
        title={
          <TokenV2
            token={data}
            isLoading={isLoading}
            iconProps={{ boxSize: 8 }}
            confirmIconProps={{ boxSize: 7 }}
            noCopy
            noLink
            nameProps={{ textStyle: "175", color: "neutral.light.8" }}
            symbolProps={{
              textStyle: "15",
              color: "neutral.light.7",
              usdHasParenthesis: true,
            }}
            associationProps={{
              textStyle: "1",
              variant: "outline",
            }}
            showAssociation={Boolean(data?.association)}
          />
        }
        isLoading={isLoading}
        contentBoxProps={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        contentAfter={
          <Tag
            colorScheme="gray"
            textStyle="1"
            tagProps={{
              textStyle: "1",
            }}
            isLoading={isLoading}
            variant="outline"
          >
            {data?.type}
          </Tag>
        }
        secondRow={
          associationTokenData && (
            <SwitchToAssociation
              association={associationTokenData}
              isLoading={isLoading}
            />
          )
        }
      />

      <TokenDetails token={data} isLoading={isLoading} hash={hash} />

      <ScrollTab
        mt={8}
        gap={5}
        cleanupOnTabChange={{
          keepQueries: ["slug"],
        }}
        tabs={[
          (isNft || isHybrid) && {
            id: "inventory",
            title: getLanguage("token.inventory"),
            isLoading: isLoading,
            component: TokenInventory,
            props: {
              isLoading,
              token: data,
              hash,
              ownerFilter,
              setOwnerFilter,
            },
          },
          {
            id: "token_transfers",
            title: isNft
              ? getLanguage("token.nft_transfers")
              : getLanguage("token.token_transfers"),
            isLoading: isLoading,
            component: TokenTransfer,
            props: {
              hash,
              token: data,
              isLoading,
            },
          },
          {
            id: "holders",
            title: getLanguage("token.holders"),
            isLoading: isLoading,
            component: TokenHolder,
            props: {
              token: data,
              isLoading,
              hash,
            },
          },
          (token?.type === "ERC-20" || associateToken?.type === "ERC-20") && {
            id: "chart",
            title: getLanguage("token.chart"),
            isLoading: isLoading,
            isNew: true,
            component: TokenChart,
            props: {
              hash:
                (token?.type === "ERC-20" && token.address) ||
                (associateToken?.type === "ERC-20" && associateToken.address) ||
                undefined,
              isLoading,
            },
          },
          address?.is_contract && {
            id: "contract",
            isLoading: isLoading || isAddressPending,
            isChecked: address?.is_verified,
            title: getLanguage("token.contract"),
            component: AddressContract,
            props: {
              hash,
            },
            comingSoon: data?.type === "CW-721" || data?.type === "CW-20",
          },
        ]}
      />
    </>
  )
}

export default memo(TokenPage, (prev, next) => {
  return prev.hash === next.hash
})
