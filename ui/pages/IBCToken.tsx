import useApiQuery from "lib/api/useApiQuery"
import { getAssociationTokenData } from "lib/association"
import { memo, useMemo } from "react"
import { TOKEN_INFO_ICS_20 } from "stubs/token"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import Tag from "ui/shared/chakra/Tag"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import IBCTokenDetails from "ui/token/IBCTokenDetails"
import ICS20TokenHolder from "ui/token/ICS20TokenHolder"
import ICS20TokenTransfer from "ui/token/ICS20TokenTransfer"
import SwitchToAssociation from "ui/token/SwitchToAssociation"
import TokenChart from "ui/token/TokenChart"

type Props = {
  hash: string
}

const IBCToken = ({ hash }: Props) => {
  const { data: token, isPlaceholderData } = useApiQuery("ics20_token", {
    pathParams: { hash: hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: TOKEN_INFO_ICS_20,
    },
  })

  const { data: associateToken, isFetching: isFetchingAssociateToken } =
    useApiQuery("token", {
      pathParams: { hash: token?.association?.evm_hash },
      queryOptions: {
        enabled: Boolean(token?.association?.evm_hash && !isPlaceholderData),
      },
    })

  const isLoading = isPlaceholderData || isFetchingAssociateToken

  const data = useMemo(() => {
    if (!token) return undefined

    return {
      ...token,
      association:
        associateToken?.type !== "ERC-404" ? token.association : undefined,
    }
  }, [token, associateToken])

  const associationTokenData = useMemo(
    () => getAssociationTokenData(data),
    [data],
  )

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        title={
          <TokenV2
            token={token}
            isLoading={isLoading}
            iconProps={{ boxSize: 8 }}
            confirmIconPosition="symbol"
            confirmIconProps={{ boxSize: 7 }}
            noCopy
            noLink
            showAssociation
            associationProps={{
              variant: "outline",
              textStyle: "1",
            }}
            nameProps={{ textStyle: "175", color: "neutral.light.8" }}
            symbolProps={{
              textStyle: "15",
              color: "neutral.light.7",
              usdHasParenthesis: true,
            }}
          />
        }
        isLoading={isLoading}
        contentAfter={
          <Tag isLoading={isLoading} textStyle="1" variant="outline">
            IBC Token
          </Tag>
        }
        contentBoxProps={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        secondRow={
          associationTokenData && (
            <SwitchToAssociation
              association={associationTokenData}
              isLoading={isLoading}
            />
          )
        }
      />

      <IBCTokenDetails hash={hash} />

      <ScrollTab
        mt={8}
        cleanupOnTabChange={{ keepQueries: ["slug"] }}
        tabs={[
          {
            id: "token_transfers",
            title: "Token transfers",
            isLoading: isLoading,
            component: ICS20TokenTransfer,
            props: { hash, token, isLoading },
          },
          {
            id: "holders",
            title: "Holders",
            isLoading: isLoading,
            component: ICS20TokenHolder,
            props: { hash, token, isLoading },
          },
          associateToken?.address &&
            associateToken?.type === "ERC-20" && {
              id: "chart",
              title: "Chart",
              isLoading: isLoading || isFetchingAssociateToken,
              isNew: true,
              component: TokenChart,
              props: {
                hash:
                  (associateToken?.type === "ERC-20" &&
                    associateToken.address) ||
                  undefined,
                isLoading: isLoading || isFetchingAssociateToken,
              },
            },
        ]}
      />
    </>
  )
}

export default memo(IBCToken, (prev, next) => {
  return prev.hash === next.hash
})
