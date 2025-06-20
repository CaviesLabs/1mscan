import {
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Tooltip,
  VStack,
  chakra,
} from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { SEI_APP_IO } from "configs/shared/seiio"
import { getLanguage } from "languages/useLanguage"
import { currentChainConfig } from "lib/hooks/useCurrentChain"
import { memo, useMemo } from "react"
import type { ValidatorDetail } from "types/api/validator"
import IconSvg from "ui/shared/IconSvg"
import LinkExternal from "ui/shared/LinkExternal"
import Tag from "ui/shared/chakra/Tag"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import AddressIdenticon from "ui/shared/entities/address/AddressIdenticon"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import { getStatus } from "./utils"

export type Props = {
  hash: string
  validator: (ValidatorDetail & { apr: string }) | undefined
  isLoading: boolean | undefined
}

export const ValidatorDetails = ({ hash, validator, isLoading }: Props) => {
  const { colorScheme, icon, text } = useMemo(() => {
    return getStatus(validator?.status)
  }, [validator?.status])
  return (
    <DetailsInfoGroup
      width="full"
      padding={{
        base: "1rem 1.5rem",
        lg: "1.25rem 1.5rem",
        xl: "1.25rem 2rem",
      }}
      gap={5}
      contentProps={{
        flexDirection: {
          base: "column",
          lg: "row",
        },
        alignItems: "stretch",
        gap: {
          base: 5,
          lg: 10,
        },
      }}
      header={{
        hasDivider: true,
        element: (
          <Flex
            alignItems="center"
            gap={3}
            flex={1}
            justifyContent="space-between"
            isTruncated
          >
            <HStack gap={3} isTruncated>
              <IconSvg
                name="group-properties"
                boxSize={6}
                isLoading={isLoading}
              />
              <AddressEntityV2
                address={{
                  hash,
                  is_contract: false,
                  name: validator?.description?.moniker,
                }}
                iconProps={{ boxSize: 6 }}
                truncation="tail"
                textStyle="125"
                isValidator
                flex={1}
                gap={2}
                noIcon
                noLink
                noCopy
                noTooltip
                isLoading={isLoading}
              />
              <Tag
                colorScheme={colorScheme}
                isLoading={isLoading}
                gap={1}
                variant="outline"
                display="flex"
                alignItems="center"
              >
                <IconSvg name={icon} boxSize={4}></IconSvg> {text}
              </Tag>
            </HStack>

            <Button
              as={LinkExternal}
              isLoading={isLoading}
              variant="subtle"
              paddingX={2}
              paddingY="0.38rem"
              href={`${SEI_APP_IO[currentChainConfig?.networkType]}/stake/${
                validator?.operator_address
              }`}
              _hover={{ textDecoration: "none", color: "inherit" }}
              noIcon
            >
              {getLanguage("validator_page.delegate")}
            </Button>
          </Flex>
        ),
      }}
      leftContent={
        <VStack spacing={4}>
          <Skeleton
            isLoaded={!isLoading}
            rounded="full"
            overflow="hidden"
            boxSize={{ base: "8.75rem", lg: "7.5rem" }}
            flexShrink={0}
          >
            <Image
              src={validator?.image_url || ""}
              alt={validator?.description?.moniker}
              boxSize="full"
              overflow="hidden"
              fallback={<AddressIdenticon size={140} hash={hash} />}
            />
          </Skeleton>

          <Tag
            variant="outline"
            isLoading={isLoading}
            width="max-content"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            gap={2}
            colorScheme="orange"
            paddingX={4}
            paddingY={2}
          >
            <VStack spacing={1}>
              <chakra.p textAlign="center" textStyle="875">
                {getLanguage("validator_page.summary.vote_power")}
              </chakra.p>
              <chakra.p textStyle="1700">
                {BigNumber(validator?.tokens || 0)
                  .div(1e6)
                  .toFormat(4, {
                    groupSeparator: " ",
                    groupSize: 3,
                    decimalSeparator: ".",
                  })}
                SEI
              </chakra.p>
            </VStack>
            <HStack textAlign="center" spacing={4}>
              <chakra.span textStyle="8125">
                {getLanguage("validator_page.summary.percentage")}
              </chakra.span>
              <chakra.span textStyle="8125700">
                {validator?.percent_voting_power}%
              </chakra.span>
            </HStack>
          </Tag>
        </VStack>
      }
    >
      <Stack overflow="hidden" spacing={0} flex={1}>
        <InfoItem
          title={getLanguage("validator_page.summary.apr")}
          swapTitle
          hint={getLanguage(
            "validator_page.summary.annual_percentage_rate_the_yearly_return_on_staked_tokens_excluding_compounding",
          )}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "8.75rem",
            },
          }}
          hasSkeleton
        >
          {validator?.apr}%
        </InfoItem>

        <InfoItem
          title={getLanguage("validator_page.summary.account")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "8.75rem",
            },
          }}
        >
          <AddressEntityV2
            address={{
              hash: validator?.account_address,
            }}
            iconProps={{ boxSize: 5 }}
            truncation="tail"
            textStyle="1"
            noIcon
            maxW="100%"
            isLoading={isLoading}
          />
        </InfoItem>

        <InfoItem
          title={getLanguage("validator_page.summary.operator")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "8.75rem",
            },
          }}
        >
          <AddressEntityV2
            address={{
              hash: validator?.operator_address,
            }}
            iconProps={{ boxSize: 5 }}
            truncation="tail"
            textStyle="1"
            noIcon
            maxW="100%"
            noLink
            isLoading={isLoading}
          />
        </InfoItem>

        <InfoItem
          title={getLanguage("validator_page.summary.consensus")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "8.75rem",
            },
          }}
        >
          <AddressEntityV2
            noLink
            noIcon
            maxW="100%"
            address={{
              hash: validator?.consensus_address,
            }}
            iconProps={{ boxSize: 5 }}
            truncation="tail"
            textStyle="1"
            isLoading={isLoading}
          />
        </InfoItem>

        <InfoItem
          title={getLanguage("validator_page.summary.hex")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "8.75rem",
            },
          }}
        >
          <AddressEntityV2
            address={{
              hash: validator?.consensus_hex_address,
            }}
            iconProps={{ boxSize: 5 }}
            truncation="tail"
            textStyle="1"
            noIcon
            maxW="100%"
            isLoading={isLoading}
          />
        </InfoItem>

        {validator?.description?.website && (
          <InfoItem
            title={getLanguage("validator_page.summary.website")}
            displayPadding="none"
            isLoading={isLoading}
            titleProps={{
              width: {
                base: "full",
                lg: "8.75rem",
              },
            }}
          >
            <Tooltip label={validator?.description.website}>
              <Link
                w="max-content"
                overflow="hidden"
                textOverflow="ellipsis"
                href={validator?.description.website}
              >
                {validator?.description.website}
              </Link>
            </Tooltip>
          </InfoItem>
        )}
        {validator?.description?.details && (
          <InfoItem
            title={getLanguage("validator_page.summary.details")}
            alignSelf="flex-start"
            // contentDisplay="contents"
            displayPadding="none"
            isLoading={isLoading}
            titleProps={{
              width: {
                base: "full",
                lg: "8.75rem",
              },
            }}
          >
            <Skeleton textStyle="1" isLoaded={!isLoading}>
              <span>{validator?.description?.details}</span>
            </Skeleton>
          </InfoItem>
        )}
      </Stack>
    </DetailsInfoGroup>
  )
}

export default memo(ValidatorDetails, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.hash === next.hash &&
    prev.validator === next.validator
  )
})
