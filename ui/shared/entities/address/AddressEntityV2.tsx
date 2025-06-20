import type { FlexProps, TextProps } from "@chakra-ui/react"
import { Flex, Skeleton } from "@chakra-ui/react"
import { getIsContract } from "lib/getOSType"
import _ from "lodash"
import { route } from "nextjs-routes"
import ContractSVG from "public/icons/contracts/contract.svg"
import ProxySVG from "public/icons/contracts/proxy.svg"
import ContractVerifiedSVG from "public/icons/contracts/verified.svg"
import { type ReactNode, memo, useCallback, useMemo } from "react"
import CopyToClipboardAsync, {
  type CopyToClipboardAsyncProps,
} from "ui/shared/copyToClipboard/CopyToClipboardAsync"
import IconSVGV2, { type IconSVGV2Props } from "ui/shared/icon/IconSVGV2"
import {
  TruncatedTextConstant,
  TruncatedTextDynamic,
  TruncatedTextTail,
  type TruncatedTextTooltipProps,
} from "ui/shared/truncate"
import { useSnapshot } from "valtio"
import AddressWarning from "../base/AddressWarning"
import { TEXT_PROPS, convertBoxSize } from "../base/utils"
import { createAvatarUri } from "./AddressIdenticon"
import AddressLink, { type AddressLinkProps } from "./AddressLink"
import AddressName, { type AddressNameProps } from "./AddressName"
import type { IAddress } from "./types"

type IconProps = {
  address: IAddress
  isLoading?: boolean
  noIcon?: boolean
  noTooltip?: boolean
  /**
   * Only support rem and level.
   * @default 1rem
   * eg. 1rem, 2rem, 1, 2, 3, ...
   */
  boxSize?: `${number}rem` | `${number}px` | number
} & Omit<IconSVGV2Props, "boxSize" | "width" | "height" | "src">

const Icon = ({
  noIcon,
  address,
  isLoading,
  noTooltip,
  boxSize = "1rem",
  imageProps,
  alt,
  ...props
}: IconProps) => {
  const _boxSize = useMemo(() => convertBoxSize(boxSize), [boxSize])

  const store = useStore({
    src: "",
  })

  const onError = useCallback(() => {
    if (!address?.hash) {
      store.src = ""
      return
    }
    store.src = createAvatarUri(address?.hash, _boxSize)
  }, [address?.hash, _boxSize])

  const { data, color } = useMemo(
    () =>
      _.chain(null)
        .thru(() => {
          // if (validator_image_url) {
          //   return {
          //     src: validator_image_url,
          //     label: address?.name,
          //     isDisabled: Boolean(noTooltip || !address?.name),
          //   };
          // }
          const isProxy = Boolean(address?.implementations?.length)
          const isVerified = address?.is_verified
          if (isProxy) {
            if (isVerified) {
              return {
                data: ProxySVG,
                color: "secondary.02",
                label: "Verified proxy contract",
                isDisabled: Boolean(noTooltip),
              }
            }
            return {
              data: ProxySVG,
              color: "neutral.light.6",
              label: "Proxy contract",
              isDisabled: Boolean(noTooltip),
            }
          }

          const isContract = getIsContract(address as any)

          if (isContract) {
            if (isVerified) {
              return {
                data: ContractVerifiedSVG,
                color: "secondary.02",
                label: "Verified contract",
                isDisabled: Boolean(noTooltip),
              }
            }
            return {
              data: ContractSVG,
              color: "neutral.light.6",
              label: "Contract",
              isDisabled: Boolean(noTooltip),
            }
          }

          const hasImage = Boolean(
            address?.image_url && address.image_url !== "validator-default.svg",
          )
          if (hasImage) {
            return {
              src: address?.image_url,
              label: address?.name,
              isDisabled: Boolean(noTooltip || !address?.name),
            }
          }
          return {
            src: createAvatarUri(address?.hash, _boxSize),
            label: address?.name,
            isDisabled: Boolean(noTooltip || !address?.name),
          }
        })
        .thru(({ data, src, color, label, isDisabled }) => {
          store.src = src || ""
          return {
            data,
            color,
            label,
            isDisabled,
          }
        })
        .value(),
    [
      address?.hash,
      address?.is_contract,
      address?.is_verified,
      address?.implementations,
      noTooltip,
      _boxSize,
      // validator_image_url,
    ],
  )

  const snap = useSnapshot(store)

  if (noIcon || !address?.hash || address?.hash === "N/A") {
    return <></>
  }

  if (isLoading)
    return <Skeleton boxSize={4} borderRadius="full" flexShrink={0}></Skeleton>

  return (
    <IconSVGV2
      flexShrink={0}
      data={data as never}
      src={snap.src as never}
      color={color}
      boxSize={boxSize}
      borderRadius="full"
      overflow="hidden"
      alt={(alt || address.name || "address") as never}
      {...props}
      imageProps={{
        ...imageProps,
        onError: onError,
      }}
    />
  )
}

type HashProps = ({
  address: IAddress
  isLoading?: boolean
  fallback?: ReactNode
  noLink?: boolean
  linkProps?: Partial<AddressLinkProps>
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  isValidator?: boolean
  noTooltip?: boolean
} & TextProps) &
  (
    | {
        truncation: "tail"
        headLength?: undefined | never
        tailLength?: undefined | never
      }
    | {
        truncation: "constant"
        headLength?: number
        tailLength?: number
      }
    | {
        truncation: "dynamic"
        headLength?: undefined
        tailLength?: undefined
      }
  )

const Hash = ({
  address,
  truncation = "constant",
  headLength = 10,
  tailLength = 9,
  isLoading,
  fallback,
  noLink,
  linkProps,
  tooltipProps,
  color,
  isValidator,
  noTooltip,
  ...props
}: HashProps) => {
  const defaultHref = useMemo(
    () =>
      route({
        pathname: (isValidator && "/validator/[hash]") || "/address/[hash]",
        query: {
          hash: address?.hash?.replace?.("factory/", "") || "",
        },
      }),
    [address?.hash],
  )
  const isLinkDisabled = useMemo(
    () =>
      noLink ||
      !address?.hash ||
      address.hash === "N/A" ||
      address.hash === "usei" ||
      address.hash.startsWith("factory/") ||
      address.hash.startsWith("ibc/"),
    [address?.hash, noLink],
  )

  if (truncation === "tail") {
    return (
      <AddressLink
        href={defaultHref}
        isDisabled={isLinkDisabled}
        color={color}
        isLoading={isLoading}
        {...linkProps}
      >
        <TruncatedTextTail
          textStyle="875"
          isLoading={isLoading}
          tooltipProps={tooltipProps}
          fallback={fallback}
          isDisabled={noTooltip}
          {...props}
        >
          {address?.hash?.replace?.("N/A", "")?.replace?.("usei", "")}
        </TruncatedTextTail>
      </AddressLink>
    )
  }

  if (truncation === "dynamic") {
    return (
      <AddressLink
        href={defaultHref}
        isDisabled={isLinkDisabled}
        isLoading={isLoading}
        {...linkProps}
      >
        <TruncatedTextDynamic
          textStyle="875"
          tooltipProps={tooltipProps}
          isLoading={isLoading}
          fallback={typeof fallback === "string" ? fallback : "N/A"}
          color={color}
          headLength={headLength}
          tailLength={tailLength}
          isDisabled={noTooltip}
          {...props}
        >
          {address?.hash?.replace?.("N/A", "")?.replace?.("usei", "") || ""}
        </TruncatedTextDynamic>
      </AddressLink>
    )
  }

  return (
    <AddressLink
      href={defaultHref}
      isDisabled={isLinkDisabled}
      isLoading={isLoading}
      {...linkProps}
    >
      <TruncatedTextConstant
        headLength={headLength}
        tailLength={tailLength}
        textStyle="875"
        tooltipProps={tooltipProps}
        isLoading={isLoading}
        fallback={fallback}
        color={color}
        isDisabled={noTooltip}
        {...props}
      >
        {address?.hash?.replace?.("N/A", "")?.replace?.("usei", "") || ""}
      </TruncatedTextConstant>
    </AddressLink>
  )
}

type CopyProps = {
  isNa?: boolean
  noCopy?: boolean
  address: IAddress
  isLoading?: boolean
} & Partial<CopyToClipboardAsyncProps>

export const Copy = memo(
  ({ isNa, noCopy, address, isLoading, ...props }: CopyProps) => {
    const setValue = useCallback(() => address?.hash, [address?.hash])

    if (isNa || noCopy || !address?.hash || address?.hash === "N/A") {
      return <></>
    }

    return (
      <CopyToClipboardAsync
        isLoading={isLoading}
        setValue={setValue}
        {...props}
      ></CopyToClipboardAsync>
    )
  },
  (prev, next) =>
    prev.isLoading === next.isLoading &&
    prev.address === next.address &&
    prev.noCopy === next.noCopy,
)

type AddressV2Props = {
  address: IAddress
  nameProps?: Partial<AddressNameProps>
  iconProps?: Omit<IconProps, "address">
  linkProps?: Partial<AddressLinkProps>
  fallback?: ReactNode
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  noIcon?: boolean
  noCopy?: boolean
  noLink?: boolean
  hashProps?: Omit<
    HashProps,
    "address" | "tooltipProps" | "truncation" | "headLength" | "tailLength"
  >
  showAddress?: boolean
  noName?: boolean
  showWarning?: "burn"
  isValidator?: boolean
  copyProps?: Partial<CopyProps>
  contentProps?: Partial<FlexProps>
  middleSlot?: ReactNode
} & TextProps &
  (
    | {
        truncation: "tail"
        headLength?: never
        tailLength?: never
      }
    | {
        truncation: "constant"
        headLength: number
        tailLength: number
      }
    | {
        truncation: "dynamic"
        headLength?: number
        tailLength?: number
      }
    | {
        truncation?: undefined
        headLength?: undefined
        tailLength?: undefined
      }
  )

const AddressV2 = ({
  iconProps,
  linkProps,
  noIcon,
  address,
  isLoading,
  noTooltip,
  tooltipProps,
  fallback = "N/A",
  nameProps,
  noCopy,
  noLink,
  hashProps,
  truncation = "constant",
  headLength,
  tailLength,
  showAddress,
  noName,
  showWarning,
  isValidator,
  copyProps,
  contentProps,
  middleSlot,
  ...props
}: AddressV2Props) => {
  const [textProps, otherProps] = useSplitProps(props, TEXT_PROPS)

  return (
    <Flex gap={1} alignItems="center" overflow="hidden" {...otherProps}>
      <Icon
        address={address}
        isLoading={isLoading}
        noIcon={noIcon}
        {...iconProps}
      />

      <Flex
        flexDirection="column"
        gap={1}
        alignItems="stretch"
        overflow="hidden"
        {...contentProps}
      >
        {!noName && address?.name && (
          <AddressName
            address={address}
            isLoading={isLoading}
            noTooltip={noTooltip}
            tooltipProps={tooltipProps}
            linkProps={linkProps}
            noLink={noLink}
            showAddress={showAddress}
            isValidator={isValidator}
            {...textProps}
            {...nameProps}
          />
        )}
        {middleSlot}
        {(showAddress || noName || !address?.name) && (
          <Hash
            address={address}
            isLoading={isLoading}
            fallback={fallback}
            noLink={noLink || Boolean(showAddress && !noName && address?.name)}
            tooltipProps={tooltipProps}
            truncation={truncation as any}
            headLength={headLength}
            tailLength={tailLength}
            isValidator={isValidator}
            noTooltip={noTooltip}
            {...textProps}
            {...hashProps}
          />
        )}
      </Flex>

      <Copy
        isLoading={isLoading}
        address={address}
        noCopy={noCopy}
        {...copyProps}
      />

      {showWarning && (
        <AddressWarning
          hash={address?.hash}
          isLoading={isLoading}
          showWarning={showWarning}
        />
      )}
    </Flex>
  )
}

export type AddressEntityV2Props = Partial<
  Omit<AddressV2Props, "truncation" | "headLength" | "tailLength">
>

export { Icon }

export default memo(AddressV2)
