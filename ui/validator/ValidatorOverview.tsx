import { Grid, HStack, Stack, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import { useAsset } from "lib/hooks/useAssets"
import { formatLargeNumber } from "lib/utils/formatLargeNumber"
import moment from "moment"
import ms from "ms"
import AlarmSVG from "public/icons/alarm.svg"
import { memo, useMemo } from "react"
import { generateKey } from "stubs/utils"
import { VALIDATOR_UPTIME } from "stubs/validator"
import type { ValidatorDetail } from "types/api/validator"
import UptimeBlock from "ui/pages/utilities/UptimeBlock"
import UptimeCatalog from "ui/pages/utilities/UptimeCatalog"
import CurrencyValue from "ui/shared/CurrencyValue"
import IconSvg from "ui/shared/IconSvg"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import IconSVGV2 from "ui/shared/icon/IconSVGV2"

type Props = {
  hash: string
  validator: ValidatorDetail | undefined
  isLoading: boolean | undefined
  isActive?: boolean
}

const uptimePlaceholderData = {
  data: Array.from({ length: 100 }, () => VALIDATOR_UPTIME),
}

const ValidatorOverview = ({ validator, isLoading, isActive, hash }: Props) => {
  const { data: unbondingTime } = useApiQuery("params_staking", {
    queryOptions: {
      enabled: isActive,
      select: (data) => {
        const dateNum = Number(ms(data.params.unbonding_time as any))
        if (!(dateNum > 0)) {
          return "-"
        }

        return moment.duration(dateNum).asDays()
      },
    },
  })

  const seiPrice = useAsset("usei", {
    select(data) {
      return data.usd_price
    },
  })

  const { data: uptimes, isPlaceholderData: isUptimeLoading } = useApiQuery(
    "validator_uptime",
    {
      pathParams: {
        address: hash,
      },
      queryParams: {
        limit: 100,
      },
      queryOptions: {
        enabled: isActive,
        placeholderData: uptimePlaceholderData,
        select: (data) => {
          return data.data
        },
      },
    },
  )

  const {
    selfBondedFormated,
    delegatorsBondedFormated,
    delegatorsBondedUsdFormated,
    selfBondedPercentageFormated,
  } = useMemo(() => {
    if (isLoading) {
      return {
        selfBondedFormated: "-",
        delegatorsBondedFormated: "-",
        delegatorsBondedUsdFormated: undefined,
        selfBondedPercentageFormated: undefined,
      }
    }

    const delegatorsBondedBn = BigNumber(validator?.delegator_shares!).div(1e6)

    const delegatorsBondedUsdBn = delegatorsBondedBn.times(
      seiPrice ?? Number.NaN,
    )

    const selfBondedPercentage = BigNumber(validator?.self_delegation_balance!)
      .div(
        BigNumber(validator?.delegator_shares!).plus(
          validator?.self_delegation_balance!,
        ),
      )
      .times(100)

    const isSmallSelfPercentage =
      selfBondedPercentage.gt(0) && selfBondedPercentage.lt(0.01)

    return {
      selfBondedFormated: `${formatLargeNumber(
        validator?.self_delegation_balance,
        {
          decimals: 6,
          accuracy: 2,
          sticky: true,
          fallback: "-",
        },
      )} SEI`,

      delegatorsBondedFormated: delegatorsBondedBn.gte(0)
        ? `${formatLargeNumber(delegatorsBondedBn, {
            decimals: 0,
            accuracy: 2,
            sticky: true,
            fallback: "-",
          })} SEI`
        : "-",
      selfBondedPercentageFormated: selfBondedPercentage.gte(0)
        ? `(${isSmallSelfPercentage ? "<" : ""}${BigNumber.max(selfBondedPercentage, 0.01).toFixed(2)}%)`
        : undefined,
      delegatorsBondedUsdFormated: delegatorsBondedUsdBn.gte(0)
        ? `$${formatLargeNumber(delegatorsBondedUsdBn, {
            decimals: 0,
            accuracy: 2,
            sticky: true,
            fallback: "-",
          })}`
        : undefined,
    }
  }, [validator, isLoading, seiPrice])

  return (
    <Stack
      flex={1}
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      gap={5}
    >
      <DetailsInfoGroup
        header={{
          hasDivider: true,
          icon: <IconSvg name="stats" boxSize={6} />,
          element: <>{getLanguage("validator_page.overview.statics")}</>,
        }}
        gap={{
          base: 4,
          lg: 5,
        }}
        width="full"
        flex={1}
        padding={{
          base: "1rem 1.5rem",
          lg: "1.25rem 1.5rem",
          xl: "1.25rem 2rem",
        }}
      >
        <InfoItem
          title={getLanguage("validator_page.overview.self_bonded")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
          }}
          hasSkeleton
        >
          <HStack gap={1}>
            <Text>{selfBondedFormated}</Text>
            <Text color="neutral.light.6" textStyle="875">
              {selfBondedPercentageFormated}
            </Text>
          </HStack>
        </InfoItem>
        <InfoItem
          title={getLanguage("validator_page.overview.delegators_bonded")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
          }}
          hasSkeleton
        >
          <HStack>
            <span>{delegatorsBondedFormated}</span>{" "}
            {delegatorsBondedUsdFormated && (
              <Text color="neutral.light.6" textStyle="875">
                ({delegatorsBondedUsdFormated})
              </Text>
            )}
          </HStack>
        </InfoItem>

        {validator?.commission?.commission_rates?.rate && (
          <InfoItem
            title={getLanguage("validator_page.overview.commission")}
            displayPadding="none"
            isLoading={isLoading}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
          >
            <CurrencyValue
              value={validator?.commission?.commission_rates?.rate}
              decimals={-2}
              currency="%"
              stickyCurrency={false}
              isLoading={isLoading}
              keepIntegerPart
            />
          </InfoItem>
        )}
        {validator?.commission?.commission_rates?.max_rate && (
          <InfoItem
            title={getLanguage("validator_page.overview.max_rate")}
            displayPadding="none"
            isLoading={isLoading}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
          >
            <CurrencyValue
              value={validator?.commission?.commission_rates?.max_rate}
              decimals={-2}
              currency="%"
              stickyCurrency={false}
              isLoading={isLoading}
              keepIntegerPart
            />
          </InfoItem>
        )}
        {validator?.commission?.commission_rates?.max_change_rate && (
          <InfoItem
            title={getLanguage("validator_page.overview.max_change_rate")}
            displayPadding="none"
            isLoading={isLoading}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
          >
            <CurrencyValue
              value={validator?.commission?.commission_rates?.max_change_rate}
              decimals={-2}
              currency="%"
              stickyCurrency={false}
              isLoading={isLoading}
              keepIntegerPart
            />
          </InfoItem>
        )}

        <InfoItem
          title={getLanguage("validator_page.overview.lock_period")}
          displayPadding="none"
          isLoading={isLoading}
          titleProps={{
            width: {
              base: "full",
              lg: "15rem",
            },
          }}
          hasSkeleton
        >
          {unbondingTime} {getLanguage("utils.days")}
        </InfoItem>
      </DetailsInfoGroup>

      <DetailsInfoGroup
        header={{
          hasDivider: true,
          icon: <IconSVGV2 data={AlarmSVG} boxSize={6} />,
          element: <>{getLanguage("validator_page.overview.uptime")}</>,
        }}
        gap={{
          base: 4,
          lg: 5,
        }}
        width="full"
        flex={1}
        padding={{
          base: "1rem 1.5rem",
          lg: "1.25rem 1.5rem",
          xl: "1.25rem 2rem",
        }}
        contentProps={{
          gap: 5,
        }}
      >
        <Stack gap={0}>
          <InfoItem
            title={`${getLanguage("validator_page.overview.window_uptime")}:`}
            displayPadding="none"
            isLoading={isLoading}
            titleProps={{
              width: {
                base: "full",
                lg: "15rem",
              },
            }}
          >
            <CurrencyValue
              value={validator?.uptime}
              decimals={0}
              currency="%"
              accuracy={2}
              stickyCurrency={false}
              isLoading={isLoading}
              keepIntegerPart
            />
          </InfoItem>
        </Stack>

        <Stack gap={5}>
          <Grid
            gridTemplateColumns="repeat(auto-fill, 1.25rem)"
            gridTemplateRows="repeat(auto-fill, 1rem)"
            gap={1}
          >
            {uptimes?.map((uptime, index) => (
              <UptimeBlock
                key={generateKey(index, isUptimeLoading, uptime.height)}
                isLoading={isUptimeLoading}
                blockHeight={uptime.height}
                status={
                  uptime.is_proposed
                    ? "proposed"
                    : uptime.signed
                      ? "signed"
                      : "missed"
                }
              />
            ))}
          </Grid>

          <UptimeCatalog isLoading={isLoading} />
        </Stack>
      </DetailsInfoGroup>
    </Stack>
  )
}

export default memo(ValidatorOverview, (prev, next) => {
  return (
    prev.isActive === next.isActive &&
    prev.hash === next.hash &&
    prev.validator === next.validator &&
    prev.isLoading === next.isLoading
  )
})
