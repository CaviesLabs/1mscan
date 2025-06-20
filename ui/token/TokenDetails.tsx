import { Flex, Image, Link, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import {
  AssociationTypeEnum,
  getAssociationTokenData,
  isAssociationHasContract,
} from "lib/association"
import { getIsNFT } from "lib/getOSType"
import { useAsset } from "lib/hooks/useAssets"
import { memo, useMemo } from "react"
import type { TokenInfo } from "types/api/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressV2, { Copy } from "ui/shared/entities/address/AddressEntityV2"
import TokenSymbol from "ui/shared/entities/token/TokenSymbol"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"
import CountersItem from "./CountersItem"

type Props = {
  token: TokenInfo | undefined
  hash: string
  isLoading?: boolean
}

const TokenDetails = ({ token, isLoading, hash }: Props) => {
  const associationTokenData = useMemo(
    () => getAssociationTokenData(token),
    [token?.type, token?.association],
  )

  const asset = useAsset(hash)

  const isNFT = useMemo(() => getIsNFT(token?.type), [token?.type])

  const tokenHasContract = useMemo(
    () => isAssociationHasContract(token?.type),
    [token?.type],
  )

  const associationHasContract = useMemo(
    () => isAssociationHasContract(associationTokenData?.associationTokenType),
    [associationTokenData?.associationTokenType],
  )

  return (
    <Flex
      alignItems="stretch"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      gap={{ base: 4, lg: 5 }}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <DetailsInfoGroup
        flex={1}
        borderWidth="1px"
        header={{
          hasDivider: true,
          element: <>{getLanguage("token.overview")}</>,
        }}
        padding={{
          base: "1rem 1.5rem",
          lg: "1.25rem 1.5rem",
          xl: "1.25rem 2rem",
        }}
        contentProps={{
          alignItems: "stretch",
          paddingTop: 5,
        }}
      >
        {asset?.usd_price && (
          <InfoItem
            title={getLanguage("token.price")}
            hint={getLanguage("token.price_per_token_on_the_exchanges")}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            isLoading={isLoading}
          >
            <CurrencyValue
              value={1}
              decimals={0}
              hideValue
              isLoading={isLoading}
              autoPrice={hash}
              usdProps={{
                textStyle: "1",
                color: "neutral.light.7",
              }}
            />
          </InfoItem>
        )}

        {asset?.usd_price && (
          <InfoItem
            title={getLanguage("token.fully_market_cap")}
            hint={getLanguage("token.total_supply_mul_price")}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            isLoading={isLoading}
          >
            <CurrencyValue
              isLoading={isLoading}
              value={token?.total_supply}
              decimals={isNFT === "nft" ? 0 : token?.decimals}
              autoPrice={hash}
              hideValue
              usdProps={{
                textStyle: "1",
                color: "neutral.light.7",
              }}
            />
          </InfoItem>
        )}

        {token?.type !== "ERC-1155" &&
          BigNumber(token?.total_supply as any).gte(0) && (
            <InfoItem
              title={getLanguage("token.max_total_supply")}
              hint={getLanguage("token.the_total_amount_of_tokens_issued")}
              titleProps={{
                width: {
                  base: "full",
                  lg: "15rem",
                },
              }}
              wordBreak="break-word"
              whiteSpace="pre-wrap"
              isLoading={isLoading}
            >
              <CurrencyValue
                isLoading={isLoading}
                currency={
                  <TokenSymbol
                    identifier={hash}
                    defaultSymbol={token?.symbol}
                    noLink
                  />
                }
                accuracy={isNFT === "nft" ? 0 : "full"}
                decimals={isNFT === "nft" ? 0 : token?.decimals}
                value={token?.total_supply}
                stickyCurrency
                isTruncated
              />
            </InfoItem>
          )}
        {token?.type === "ERC-1155" && (
          <InfoItem
            title={getLanguage("token.items")}
            hint={getLanguage("token.the_sum_of_total_quantities_per_token_id")}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            isLoading={isLoading}
          >
            <CurrencyValue
              isLoading={isLoading}
              currency={token?.symbol || ""}
              decimals={0}
              value={token?.items}
            ></CurrencyValue>
          </InfoItem>
        )}
        <InfoItem
          title={getLanguage("token.holders")}
          hint={getLanguage("token.number_of_accounts_holding_the_token")}
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
          }}
          isLoading={isLoading}
        >
          <CountersItem
            hash={hash}
            item="token_holders_count"
            isLoading={isLoading}
          ></CountersItem>
        </InfoItem>
        <InfoItem
          title={getLanguage("token.transfers")}
          hint={getLanguage("token.number_of_transfers_for_the_token")}
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
          }}
          isLoading={isLoading}
        >
          <CountersItem
            hash={hash}
            item="transfers_count"
            isLoading={isLoading}
          ></CountersItem>
        </InfoItem>
      </DetailsInfoGroup>

      <DetailsInfoGroup
        flex={1}
        borderWidth="1px"
        header={{
          hasDivider: true,
          element: <>{getLanguage("token.more_information")}</>,
        }}
        backgroundColor="neutral.light.1"
        padding={{
          base: "1rem 1.5rem",
          lg: "1.25rem 1.5rem",
          xl: "1.25rem 2rem",
        }}
        overflow="hidden"
      >
        <InfoItem
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
          }}
          _first={{
            marginTop: 5,
          }}
          hint={
            (associationTokenData?.self === AssociationTypeEnum.Pointer &&
              getLanguage(
                "token.the_pointer_address_is_a_smart_contract_where_the_tokens_nfts_are_managed_on_the_parallel_blockchain_by_calling_from_its_original_contract",
              )) ||
            (associationTokenData?.self === AssociationTypeEnum.Original &&
              getLanguage(
                "token.original_is_a_smart_contract_or_a_hash_identifying_tokens_nfts_that_are_originally_created_and_directly_managed_on_its_blockchain",
              )) ||
            getLanguage("token.the_contract_address_of_token")
          }
          title={associationTokenData?.self || getLanguage("token.contract")}
          isTruncated
          isLoading={isLoading}
        >
          <AddressV2
            noName
            noIcon={!tokenHasContract}
            address={{
              hash: token?.address,
              is_contract: tokenHasContract,
            }}
            isLoading={isLoading}
            truncation="tail"
            textStyle="1"
          />
        </InfoItem>
        {associationTokenData && (
          <InfoItem
            title={associationTokenData.associationType}
            hint={
              (associationTokenData?.associationType ===
                AssociationTypeEnum.Pointer &&
                getLanguage(
                  "token.the_pointer_address_is_a_smart_contract_where_the_tokens_nfts_are_managed_on_the_parallel_blockchain_by_calling_from_its_original_contract",
                )) ||
              (associationTokenData?.associationType ===
                AssociationTypeEnum.Original &&
                getLanguage(
                  "token.original_is_a_smart_contract_or_a_hash_identifying_tokens_nfts_that_are_originally_created_and_directly_managed_on_its_blockchain",
                )) ||
              ""
            }
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            isTruncated
            isLoading={isLoading}
          >
            <AddressV2
              noName
              noIcon={!associationHasContract}
              truncation="tail"
              address={{
                hash: associationTokenData.associationAddress,
                is_contract: associationHasContract,
              }}
              isLoading={isLoading}
              color="secondary.01.text"
              textStyle="1"
            />
          </InfoItem>
        )}
        {isNFT && token?.decimals && (
          <InfoItem
            title={getLanguage("token.decimals")}
            hint={getLanguage(
              "token.number_of_digits_that_come_after_the_decimal_place_when_displaying_token_value",
            )}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            isLoading={isLoading}
          >
            <SkeletonText noOfLines={1} isLoading={isLoading}>
              {token?.decimals}
            </SkeletonText>
          </InfoItem>
        )}
        {asset?.official_project_website ? (
          <InfoItem
            title={getLanguage("token.official_website")}
            hint={getLanguage("token.the_official_website_of_the_project")}
          >
            <Flex alignItems="center" overflow="hidden" gap={2}>
              <Flex w="full" overflow="hidden">
                <Link href={asset?.official_project_website} w="full">
                  <Text
                    isTruncated
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {asset?.official_project_website}
                  </Text>
                </Link>
              </Flex>
              <Copy
                isLoading={isLoading}
                address={{
                  hash: asset?.official_project_website,
                  is_contract: false,
                }}
              />
            </Flex>
          </InfoItem>
        ) : null}

        {(asset?.social_profiles?.length || asset?.official_project_email) && (
          <InfoItem
            title={getLanguage("token.social_profiles")}
            hint={getLanguage("token.the_social_profiles_of_the_project")}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            alignItems="flex-start"
          >
            <Flex
              alignItems="center"
              overflow="hidden"
              columnGap="32px"
              rowGap="16px"
              flexWrap="wrap"
            >
              {asset.official_project_email ? (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  key={asset.official_project_email}
                  cursor="pointer"
                  onClick={() => {
                    window.open(
                      `mailto:${asset.official_project_email}`,
                      "_blank",
                    )
                  }}
                >
                  <Link
                    href={asset.official_project_email}
                    target="_blank"
                  ></Link>
                  <Image
                    src="/icons/social/email.svg"
                    width="20px"
                    height="20px"
                    alt="social"
                  />
                </Flex>
              ) : null}
            </Flex>
          </InfoItem>
        )}
      </DetailsInfoGroup>
    </Flex>
  )
}

export default memo(TokenDetails, (prev, next) => {
  return (
    prev.token?.address === next.token?.address &&
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash
  )
})
