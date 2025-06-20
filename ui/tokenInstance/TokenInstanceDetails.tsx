import { Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { AssociationTypeEnum, getAssociationTokenData } from "lib/association"
import { getAddressType } from "lib/getOSType"
import parseMetadata from "lib/token/parseMetadata"
import { memo, useMemo } from "react"
import type { TokenInstance } from "types/api/token"
import Divider from "ui/shared/Divider"
import IconSvg from "ui/shared/IconSvg"
import CopyToClipboardAsync from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import { getAssociationAddressData } from "ui/shared/entities/address/utils"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import NftMedia from "ui/shared/nft/NftMedia"
import { TruncatedTextDynamic } from "ui/shared/truncate"
import SwitchToAssociation from "ui/token/SwitchToAssociation"
import TokenInstanceMetadataItem from "./details/TokenInstanceMetadataInfo"
import TokenInstanceTransfersCount from "./details/TokenInstanceTransfersCount"

interface Props {
  data?: TokenInstance
  isLoading?: boolean
  id: string
  hash: string
}

const TokenInstanceDetails = ({ data, isLoading: _isLoading, id }: Props) => {
  const associationTokenData = useMemo(
    () => getAssociationTokenData(data?.token),
    [data?.token],
  )

  const metadata = useMemo(() => parseMetadata(data?.metadata), [data])

  const isLoading = _isLoading

  const associatedTokenData = useMemo(
    () => getAssociationTokenData(data?.token),
    [data?.token],
  )

  const associationOwnerData = useMemo(() => {
    if (!data?.owner) return
    if (data.token.type === "ERC-1155") return
    const addressType = getAddressType(data.owner.hash)!
    return getAssociationAddressData(addressType, data?.owner?.association)!
  }, [
    data?.is_unique,
    data?.owner?.hash,
    data?.owner?.association,
    data?.token.type,
  ])

  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      columnGap={5}
      flex={1}
      rowGap="2.75rem"
      justifyContent="stretch"
      alignItems={{
        base: "stretch",
        lg: "flex-start",
      }}
    >
      <Flex flexShrink={0} flexDirection="column" alignItems="center" gap={6}>
        <NftMedia
          url={data?.animation_url || data?.image_url || ""}
          alignSelf={{ base: "center", lg: "flex-start" }}
          isLoading={isLoading}
          width={{
            base: "full",
            lg: "27.5rem",
          }}
          boxSize={{ base: "full", lg: "27.5rem" }}
          boxShadow="2xl"
          borderWidth="1px"
          borderColor="neutral.light.1"
          backgroundColor="neutral.light.3"
          padding={{ base: 4, lg: 5 }}
          borderRadius="0.5rem"
        />
        {associationTokenData && (
          <SwitchToAssociation
            association={associationTokenData!}
            id={id}
            isLoading={isLoading}
          />
        )}
      </Flex>

      <Flex gap={6} flexDirection="column" overflow="hidden" width="full">
        <DetailsInfoGroup
          flex={1}
          gap={5}
          backgroundColor="neutral.light.1"
          header={{
            hasDivider: true,
            element: (
              <Flex alignItems="center" gap={3}>
                <IconSvg name="package" boxSize={6} />
                <Text textStyle="125" color="neutral.light.7">
                  {getLanguage("token.overview")}
                </Text>
              </Flex>
            ),
          }}
        >
          {Boolean(metadata?.name) && (
            <InfoItem
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
              }}
              title={getLanguage("token.name")}
              hint={getLanguage("token.the_name_of_nft")}
              isLoading={isLoading}
              hasSkeleton
            >
              {metadata!.name}
            </InfoItem>
          )}

          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            title={getLanguage("token.creator")}
            hint={getLanguage(
              "token.address_that_deployed_this_token_contract",
            )}
            isLoading={isLoading}
          >
            <AddressV2
              address={{
                hash: data?.creator_address_hash,
              }}
              isLoading={isLoading}
              noIcon
              truncation="tail"
              textStyle="1"
            />
          </InfoItem>

          {data?.token.type !== "ERC-1155" && !associationOwnerData && (
            <InfoItem
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
              }}
              hint={getLanguage("token.current_owner_of_this_nft")}
              title={getLanguage("token.owner")}
              isTruncated
              isLoading={isLoading}
            >
              <AddressV2
                address={data?.owner as any}
                isLoading={isLoading}
                noIcon
                truncation="tail"
                textStyle="1"
                showWarning="burn"
              />
            </InfoItem>
          )}

          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            title={associationTokenData?.self || getLanguage("token.contract")}
            hint={
              (associationTokenData?.self === AssociationTypeEnum.Pointer &&
                getLanguage(
                  "token.the_pointer_address_is_a_smart_contract_where_the_tokens_nfts_are_managed_on_the_parallel_blockchain_by_calling_from_its_original_contract",
                )) ||
              (associationTokenData?.self === AssociationTypeEnum.Original &&
                getLanguage(
                  "token.original_is_a_smart_contract_or_a_hash_identifying_tokens_nfts_that_are_originally_created_and_directly_managed_on_its_blockchain",
                )) ||
              getLanguage("token.the_contract_address_that_handle_this_nft")
            }
            isLoading={isLoading}
            overflow="hidden"
          >
            <AddressV2
              address={{
                ...data?.owner,
                hash: data?.token.address as any,
                name: "",
              }}
              noIcon
              isLoading={isLoading}
              textStyle="1"
              truncation="tail"
            />
          </InfoItem>

          {Boolean(associatedTokenData) && (
            <InfoItem
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
              }}
              title={associatedTokenData?.associationType}
              hint={
                (associatedTokenData?.associationType === "Original" &&
                  getLanguage(
                    "token.original_is_a_smart_contract_identifying_tokens_nfts_that_are_originally_created_and_directly_managed_on_its_blockchain",
                  )) ||
                (associatedTokenData?.associationType === "Pointer" &&
                  getLanguage(
                    "token.the_pointer_address_is_a_smart_contract_where_the_nfts_are_managed_on_the_parallel_blockchain_by_calling_from_its_original_contract",
                  )) ||
                undefined
              }
              isLoading={isLoading}
              overflow="hidden"
            >
              <AddressV2
                address={{
                  hash: associatedTokenData?.associationAddress!,
                }}
                isLoading={isLoading}
                textStyle="1"
                truncation="tail"
                color="secondary.01.text"
                noIcon
              />
            </InfoItem>
          )}

          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            title={getLanguage("token.token_id")}
            hint={getLanguage("token.the_unique_id_of_this_nft_on_collection")}
            isLoading={isLoading}
            overflow="hidden"
          >
            <TruncatedTextDynamic isLoading={isLoading} tailLength={4}>
              {data?.id}
            </TruncatedTextDynamic>
            <CopyToClipboardAsync
              setValue={() => data?.id}
              isLoading={isLoading}
            />
          </InfoItem>
          <InfoItem
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            title={getLanguage("token.activities")}
            hint={getLanguage(
              "token.number_of_transfers_for_the_token_instance",
            )}
            isLoading={isLoading}
          >
            <TokenInstanceTransfersCount
              hash={data?.token.address}
              id={id}
              isLoading={isLoading}
            />
          </InfoItem>
        </DetailsInfoGroup>

        {associationOwnerData && (
          <DetailsInfoGroup
            flex={1}
            gap={5}
            hasCollapsed
            backgroundColor="neutral.light.1"
            header={{
              hasArrow: true,
              hasDivider: true,
              icon: <IconSvg name="owner" boxSize={6} />,
              element: <>{getLanguage("token.owner")}</>,
            }}
          >
            <InfoItem
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
              }}
              hint={getLanguage("token.the_evm_address_of_token_owner")}
              title={getLanguage("token.evm_address")}
              isTruncated
              isLoading={isLoading}
            >
              <AddressV2
                address={{
                  hash: data?.owner?.association?.evm_hash,
                }}
                isLoading={isLoading}
                noIcon
                truncation="tail"
                textStyle="1"
                color="secondary.01.text"
                showWarning="burn"
              />
            </InfoItem>

            <InfoItem
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
              }}
              hint={getLanguage("token.the_native_address_of_token_owner")}
              title={getLanguage("token.native_address")}
              isTruncated
              isLoading={isLoading}
            >
              <AddressV2
                address={{
                  hash: data?.owner?.association?.sei_hash,
                }}
                isLoading={isLoading}
                noIcon
                truncation="tail"
                textStyle="1"
                color="secondary.03.text"
                showWarning="burn"
              />
            </InfoItem>
          </DetailsInfoGroup>
        )}

        {Boolean(metadata?.attributes?.length) && (
          <DetailsInfoGroup
            flex={1}
            backgroundColor="neutral.light.1"
            hasCollapsed
            header={{
              hasArrow: true,
              icon: <IconSvg name="group-properties" boxSize={6} />,
              element: `${getLanguage("token.properties")} (${
                metadata?.attributes?.length || 0
              })`,
            }}
          >
            <Divider marginTop={2} />
            <Grid
              marginTop={5}
              gap={3}
              templateColumns={{
                base: "100%",
                lg: "repeat(3, minmax(calc(33.33% - 0.75rem), 1fr))",
                xl: "repeat(4, minmax(calc(25% - 0.75rem), 1fr))",
              }}
              overflow="hidden"
            >
              {metadata?.attributes?.map((attribute, index) => (
                <GridItem key={index}>
                  <TokenInstanceMetadataItem
                    data={attribute}
                    isLoading={isLoading}
                  />
                </GridItem>
              ))}
            </Grid>
          </DetailsInfoGroup>
        )}

        {Boolean(metadata?.description) && (
          <DetailsInfoGroup
            flex={1}
            backgroundColor="neutral.light.1"
            hasCollapsed
            header={{
              hasArrow: true,
              icon: <IconSvg name="nft-description" boxSize={6} />,
              element: <>{getLanguage("token.description")}</>,
            }}
          >
            <Divider marginTop={2} />
            <Skeleton
              marginTop={5}
              isLoaded={!isLoading}
              color="neutral.light.7"
              textStyle="1"
            >
              <span>{metadata?.description}</span>
            </Skeleton>
          </DetailsInfoGroup>
        )}
      </Flex>
    </Flex>
  )
}

export default memo(TokenInstanceDetails, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.data === next.data &&
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading
  )
})
