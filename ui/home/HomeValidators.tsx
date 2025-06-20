import {
  Center,
  HStack,
  Image,
  Stack,
  type StackProps,
  Text,
} from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { memo } from "react"
import { generateKey, generateListStub } from "stubs/utils"
import { VALIDATOR_INFO } from "stubs/validator"
import Tag from "ui/shared/chakra/Tag"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import { mapValidatorsAPR } from "ui/validators/apr"
import HomeLayout from "./HomeLayout"
import HomeValidatorsStats from "./HomeValidatorsStats"

type Props = {} & StackProps

const placeholderData = generateListStub<"validators">(VALIDATOR_INFO, 4, {
  next_page_params: null,
})

const HomeValidators = (props: Props) => {
  const { data: stakingPool, isFetched: isFetchedStakingPool } = useApiQuery(
    "params_staking_pool",
    {
      queryOptions: {},
    },
  )

  const { data: mint, isFetched: isFetchedMint } = useApiQuery("params_mint", {
    queryOptions: {},
  })

  const { data: validators, isPlaceholderData } = useApiQuery("validators", {
    queryParams: {
      status: "active",
      limit: 4,
    },
    queryOptions: {
      enabled: Boolean(isFetchedStakingPool && isFetchedMint),
      select: (data) => {
        return mapValidatorsAPR(
          stakingPool?.pool.bonded_tokens,
          mint?.params.token_release_schedule,
          data?.items,
          {
            slice: true,
          },
        )
      },
      placeholderData: placeholderData,
    },
  })

  const isLoading = isPlaceholderData

  return (
    <HomeLayout
      overflow="hidden"
      gap={1}
      titleBoxProps={{}}
      title={getLanguage("main_homepage.validators_section.validators")}
      href="/validators"
      paddingTop={2}
      contentProps={{
        gap: 3,
      }}
      {...props}
    >
      <HomeValidatorsStats />
      <Stack gap={2}>
        <Text textStyle="87500" color="neutral.light.7">
          {getLanguage(
            "main_homepage.validators_section.top_validators_by_voting_power",
          )}
        </Text>
        {validators?.map((validator, index) => (
          <HStack
            key={generateKey(index, isLoading, validator.operator_address)}
            padding={2}
            borderColor="neutral.light.3"
            borderWidth={1}
            backgroundColor="neutral.light.1"
            borderRadius={2}
            justifyContent="space-between"
            direction="row"
            gap={3}
            alignItems="center"
          >
            <Center
              boxSize={7}
              borderRadius="full"
              borderWidth={1}
              borderColor="neutral.light.3"
              flexShrink={0}
            >
              <Image boxSize={5} src="/images/1m.png" alt="1m" />
            </Center>

            <HStack
              flex={1}
              gap={2}
              justifyContent="space-between"
              overflow="hidden"
            >
              <Stack gap={1} overflow="hidden">
                <AddressEntityV2
                  noIcon
                  noCopy
                  address={{
                    hash: validator.operator_address,
                    name: validator.name,
                  }}
                  isValidator
                  isLoading={isLoading}
                  textStyle="1"
                  color="neutral.light.8"
                  isTruncated
                />
                <HStack gap={1} overflow="hidden">
                  <Tag
                    // width="2.75rem"
                    minWidth="unset"
                    paddingX={0}
                    borderRadius="0.125rem"
                    isLoading={isLoading}
                    height="0.875rem"
                    minHeight="unset"
                    fontSize="0.75rem"
                    lineHeight="normal"
                    colorScheme="green"
                    variant="unborder"
                    paddingY={0}
                  >
                    {getLanguage("main_homepage.validators_section.active")}
                  </Tag>
                  <SkeletonText
                    isLoading={isLoading}
                    textStyle="8125"
                    color="neutral.light.7"
                  >
                    {getLanguage("main_homepage.validators_section.commission")}
                    : {validator.commission}
                  </SkeletonText>
                </HStack>
              </Stack>
              <Stack
                gap={1}
                alignItems="flex-end"
                textAlign="right"
                overflow="hidden"
              >
                <SkeletonText
                  isLoading={isLoading}
                  textStyle="1500"
                  color="accent.blue"
                >
                  {validator.voting_power_percentage}
                </SkeletonText>

                <SkeletonText
                  isLoading={isLoading}
                  textStyle="8125"
                  color="neutral.light.7"
                >
                  {getLanguage("main_homepage.validators_section.uptime")}:{" "}
                  {validator.uptime}
                </SkeletonText>
              </Stack>
            </HStack>
          </HStack>
        ))}
      </Stack>
    </HomeLayout>
  )
}

export default memo(HomeValidators, () => true)
