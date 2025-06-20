import { Flex, Image, Link, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { getAssociationTokenData } from "lib/association"
import { useAsset } from "lib/hooks/useAssets"
import { memo, useMemo } from "react"
import { TOKEN_INFO_ICS_20 } from "stubs/token"
import CurrencyValue from "ui/shared/CurrencyValue"
import AddressEntityV2, {
  Copy,
} from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import SkeletonText from "ui/shared/text/SkeletonText"
import { TruncatedTextTail } from "ui/shared/truncate"
import ICS20CountersItem from "./ICS20CountersItem"

interface Props {
  hash: string
}

const IBCTokenDetails = ({ hash }: Props) => {
  const {
    data: token,
    isPlaceholderData: isPlaceholderDataToken,
    isError: isErrorToken,
    error: errorToken,
  } = useApiQuery("ics20_token", {
    pathParams: { hash: hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: TOKEN_INFO_ICS_20,
    },
  })

  const ibcHash = useMemo(() => `ibc/${hash}`, [hash])

  const asset = useAsset(ibcHash)

  const isLoading = isPlaceholderDataToken

  const associationTokenData = useMemo(
    () => getAssociationTokenData(token),
    [token?.type, token?.association],
  )

  if (isErrorToken) {
    throw Error("Token fetch error", {
      cause: errorToken as unknown as Error,
    })
  }

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
        backgroundColor="neutral.light.1"
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
        {asset?.usd_price ? (
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
              autoPrice={ibcHash}
              usdProps={{
                textStyle: "1",
                color: "neutral.light.7",
              }}
            />
          </InfoItem>
        ) : null}
        {asset?.usd_price && (
          <InfoItem
            title={getLanguage("token.fully_market_cap")}
            isLoading={isLoading}
            hint={getLanguage("token.total_supply_mul_price")}
          >
            <CurrencyValue
              isLoading={isLoading}
              value={token?.total_supply}
              decimals={token?.decimals}
            />
          </InfoItem>
        )}
        {BigNumber(token?.total_supply as any).gte(0) && (
          <InfoItem
            title={getLanguage("token.max_total_supply")}
            isLoading={isLoading}
            hint={getLanguage("token.the_total_amount_of_tokens_issued")}
            wordBreak="break-word"
            whiteSpace="pre-wrap"
          >
            <CurrencyValue
              isLoading={isLoading}
              decimals={token?.decimals}
              value={token?.total_supply}
            />
          </InfoItem>
        )}
        <InfoItem
          title={getLanguage("token.holders")}
          isLoading={isLoading}
          hint={getLanguage("token.number_of_accounts_holding_the_token")}
        >
          <ICS20CountersItem
            hash={hash}
            item="token_holders_count"
            isLoading={isLoading}
          ></ICS20CountersItem>
        </InfoItem>
        <InfoItem
          title={getLanguage("token.transfers")}
          isLoading={isLoading}
          hint={getLanguage("token.number_of_transfers_for_the_token")}
        >
          <ICS20CountersItem
            hash={hash}
            item="transfers_count"
            isLoading={isLoading}
          ></ICS20CountersItem>
        </InfoItem>
      </DetailsInfoGroup>
      <DetailsInfoGroup
        flex={1}
        borderWidth="1px"
        backgroundColor="neutral.light.1"
        padding={{
          base: "1rem 1.5rem",
          lg: "1.25rem 1.5rem",
          xl: "1.25rem 2rem",
        }}
        header={{
          hasDivider: true,
          element: <>{getLanguage("token.more_information")}</>,
        }}
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
            associationTokenData
              ? getLanguage(
                  "token.original_is_a_hash_identifying_tokens_that_are_originally_created_and_directly_managed_on_its_blockchain",
                )
              : getLanguage(
                  "token.a_unique_identifier_for_the_factory_token_generated_from_specific_information_related_to_the_token",
                )
          }
          title={
            associationTokenData
              ? getLanguage("token.original")
              : getLanguage("token.hash")
          }
          isTruncated
          isLoading={isLoading}
        >
          <AddressEntityV2
            noName
            address={{
              hash: token?.address,
            }}
            noLink
            noIcon
            isLoading={isLoading}
            truncation="tail"
            textStyle="1"
          />
        </InfoItem>
        {associationTokenData && (
          <InfoItem
            title={getLanguage("token.pointer")}
            hint={getLanguage(
              "token.the_pointer_address_is_a_smart_contract_where_the_tokens_are_managed_on_the_parallel_blockchain_by_calling_from_its_ibc_token",
            )}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
            isTruncated
            isLoading={isLoading}
          >
            <AddressEntityV2
              noName
              truncation="tail"
              address={{
                hash: associationTokenData.associationAddress,
                is_contract: true,
              }}
              isLoading={isLoading}
              color="secondary.01.text"
              textStyle="1"
            />
          </InfoItem>
        )}
        {token?.denom_trace && (
          <InfoItem
            title={getLanguage("token.path")}
            isLoading={isLoading}
            hint={getLanguage(
              "token.the_route_the_token_uses_to_travel_through_the_network_including_details_about_the_port_and_channel_used",
            )}
            isTruncated
          >
            <TruncatedTextTail isLoading={isLoading} flex={1}>
              {token?.denom_trace}
            </TruncatedTextTail>
          </InfoItem>
        )}

        <InfoItem
          title={getLanguage("token.decimals")}
          isLoading={isLoading}
          hint={getLanguage(
            "token.number_of_digits_that_come_after_the_decimal_place_when_displaying_token_value",
          )}
        >
          <SkeletonText isLoading={isLoading} minW={6}>
            {token?.decimals}
          </SkeletonText>
        </InfoItem>

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
        {/* {asset?.official_project_email ? (
          <InfoItem
            title="Official email"
            hint="The official email address of the project"
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
          >
            <Flex alignItems="center" overflow="hidden" gap={2}>
              <Flex w="full" overflow="hidden">
                <Link
                  href={`mailto:${asset?.official_project_email}`}
                  w="full"
                >
                  <Text
                    isTruncated
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {asset?.official_project_email}
                  </Text>
                </Link>
              </Flex>
              <Copy
                isLoading={isLoading}
                address={{
                  hash: asset?.official_project_email,
                  is_contract: false,
                }}
              />
            </Flex>
          </InfoItem>
        ) : null} */}
        {asset?.social_profiles?.length ? (
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
        ) : null}
      </DetailsInfoGroup>
    </Flex>
  )
}

export default memo(IBCTokenDetails, (prev, next) => {
  return prev.hash === next.hash
})
