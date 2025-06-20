import { Flex, HStack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { getAssociationTokenData } from "lib/association"
// import { isSeiAddress } from "lib/getOSType";
import { memo, useEffect, useMemo } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { TOKEN_INSTANCE } from "stubs/token"
import PageTitle from "ui/shared/Page/PageTitle"
import ScrollTab from "ui/shared/Tabs/ScrollTab"
import Tag from "ui/shared/chakra/Tag"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import { TruncatedTextTail } from "ui/shared/truncate"
import ButtonRefresh from "ui/token/ButtonRefresh"
import NFTInstanceHolder from "ui/token/NFTInstanceHolder"
import NFTInstanceTransfer from "ui/token/NFTInstanceTransfer"
import TokenInstanceDetails from "ui/tokenInstance/TokenInstanceDetails"
import TokenInstanceMetadata from "ui/tokenInstance/TokenInstanceMetadata"
// import WebpacyScoreModal from "ui/token/WebpacyPopup";

type Props = {
  hash: string
  id: string
}

const TokenInstancePagination = ({
  id,
  hash,
  tabId,
}: {
  id: string
  hash: string
  tabId: "item_activities" | "holders" | "metadata" | string
}) => {
  const { pagination: paginationTokenTransfers } = useQueryWithPages({
    resourceName: "token_instance_transfers",
    pathParams: { hash, id: encodeURIComponent(id) },

    options: {
      enabled: tabId === "item_activities",
    },
  })

  const { pagination: paginationTokenHolders } = useQueryWithPages({
    resourceName: "token_instance_holders",
    pathParams: { hash, id: encodeURIComponent(id) },
    options: {
      enabled: tabId === "holders",
    },
  })

  if (tabId !== "item_activities" && tabId !== "holders") {
    return <></>
  }

  return (
    <Pagination
      pagination={
        ((tabId === "item_activities" && paginationTokenTransfers) ||
          (tabId === "holders" && paginationTokenHolders) ||
          undefined) as any
      }
    />
  )
}

const TokenInstance = ({ hash, id }: Props) => {
  const { showBoundary } = useErrorBoundary()
  const {
    data: instance,
    isPlaceholderData,
    error,
    refetch,
  } = useApiQuery("token_instance", {
    pathParams: { hash, id: encodeURIComponent(id) },
    queryOptions: {
      enabled: Boolean(hash && id),
      placeholderData: TOKEN_INSTANCE,
    },
  })

  const associationTokenData = useMemo(
    () => getAssociationTokenData(instance?.token),
    [instance?.token],
  )
  // console.log(instance);

  const { data: associateToken, isFetching } = useApiQuery("token", {
    pathParams: { hash: associationTokenData?.associationAddress },
    queryOptions: {
      enabled: Boolean(
        associationTokenData?.associationAddress &&
          instance?.token?.address &&
          !isPlaceholderData &&
          instance.token.type !== "ERC-404",
      ),
    },
  })

  const data = useMemo(() => {
    if (!instance) return undefined
    return {
      ...instance,
      token: {
        ...instance.token,
        association:
          instance?.token.type === "ERC-404" ||
          associateToken?.type === "ERC-404"
            ? undefined
            : instance.token.association,
      },
    }
  }, [instance, associateToken])

  const isLoading = isPlaceholderData || isFetching

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
    <>
      <PageTitle
        hasDefaultBackLink
        isLoading={isLoading}
        contentAfter={
          <Flex alignItems="center" gap="8px">
            <HStack spacing={3} flexWrap="wrap">
              {data?.token.association && (
                <Tag colorScheme="orange" isLoading={isLoading} flexShrink={0}>
                  {associationTokenData?.self}
                </Tag>
              )}
              <Tag flexShrink={0} isLoading={isLoading}>
                {data?.token?.type}
              </Tag>
            </HStack>
            {/* <TokenV2
              isLoading={isLoading}
              token={data?.token as any}
              noSymbol
              confirmIconPosition="name"
              textStyle="1"
              iconProps={{ borderRadius: "0.25rem", boxSize: 8 }}
              copyProps={{
                boxSize: 5,
              }}
              gap={3}
            /> */}
          </Flex>
        }
        title={
          <TruncatedTextTail label={`ID ${data?.id}`}>
            ID {data?.id}
          </TruncatedTextTail>
        }
        // rowBoxProps={{ flexDirection: "row", flexWrap: "wrap" }}
        contentBoxProps={{ flex: 1 }}
        secondRowProps={{
          position: "relative",
          paddingTop: 0,
          paddingY: 0,
          order: 2,
          width: "full",
        }}
        secondRow={
          <TokenV2
            isLoading={isLoading}
            token={data?.token as any}
            noSymbol
            confirmIconPosition="name"
            textStyle="1"
            iconProps={{ borderRadius: "0.25rem", boxSize: 8 }}
            copyProps={{
              boxSize: 5,
            }}
            gap={3}
          />
        }
        thirdRowProps={{
          order: { base: 3, lg: 1 },
          marginTop: { base: 2, lg: 0 },
        }}
        // rightContent={
        //   isSeiAddress(hash) ? null : <WebpacyScoreModal address={hash} />
        // }

        rightContent={
          (data?.token?.type?.endsWith("-721") ||
            data?.token?.type === "ERC-404") && (
            <ButtonRefresh
              id={id}
              hash={hash}
              isLoading={isLoading}
              refetch={refetch}
            />
          )
        }

        // thirdRow={
        //   (data?.token?.type?.endsWith("-721") ||
        //     data?.token?.type === "ERC-404") && (
        //     <ButtonRefresh
        //       id={id}
        //       hash={hash}
        //       isLoading={isLoading}
        //       refetch={refetch}
        //     />
        //   )
        // }
      />

      <TokenInstanceDetails
        isLoading={isLoading}
        data={data}
        hash={hash}
        id={id}
      />

      <ScrollTab
        mt={8}
        minHeight="30rem"
        isLoading={isLoading}
        cleanupOnTabChange={{
          keepQueries: ["slug"],
        }}
        rightSlot={({ activeId }) => (
          <TokenInstancePagination id={id} hash={hash} tabId={activeId} />
        )}
        tabs={[
          {
            id: "item_activities",
            title: getLanguage("token.item_activities"),
            component: NFTInstanceTransfer,
            props: {
              token: data?.token,
              isLoading,
              id,
              hash,
            },
          },
          data?.token.type === "ERC-1155" && {
            id: "holders",
            title: getLanguage("token.holders"),
            component: NFTInstanceHolder,
            props: {
              id,
              hash,
              token: data?.token,
              isLoading,
            },
          },
          {
            id: "metadata",
            title: getLanguage("token.metadata"),
            component: TokenInstanceMetadata,
            props: {
              data: data?.metadata,
              isLoading,
            },
          },
        ]}
      />
    </>
  )
}

export default memo(TokenInstance, (prev, next) => {
  return prev.hash === next.hash && prev.id === next.id
})
