import type { TextProps } from "@chakra-ui/react"
import { VStack } from "@chakra-ui/react"
import { route } from "nextjs-routes"
import { type ReactNode, memo, useMemo } from "react"
import {
  TruncatedTextTail,
  type TruncatedTextTooltipProps,
} from "ui/shared/truncate"
import AddressLink, { type AddressLinkProps } from "./AddressLink"
import type { IAddress } from "./types"

type NameProps = {
  address:
    | IAddress
    | {
        hash: string
        name?: string
      }
  isLoading?: boolean
  noTooltip?: boolean
  tooltipProps?: Partial<TruncatedTextTooltipProps>
  linkProps?: Partial<AddressLinkProps>
  noLink?: boolean
  showAddress?: boolean
  isValidator?: boolean
  fallback?: string
  postfix?: ReactNode
} & TextProps

const AddressName = ({
  address,
  isLoading,
  noTooltip,
  tooltipProps,
  linkProps,
  noLink,
  color,
  showAddress,
  isValidator,
  fallback = "",
  postfix,
  ...props
}: NameProps) => {
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

  const addressName = address?.name || fallback

  return (
    <AddressLink
      href={defaultHref}
      isDisabled={isLinkDisabled}
      color={color}
      {...linkProps}
    >
      <TruncatedTextTail
        isDisabled={noTooltip}
        isLoading={isLoading}
        textStyle="875"
        label={
          <VStack spacing={0}>
            <strong>{addressName}</strong>
            {!showAddress && address?.hash && <span>{address?.hash}</span>}
          </VStack>
        }
        tooltipProps={tooltipProps}
        {...props}
      >
        {addressName}
      </TruncatedTextTail>
      {postfix}
    </AddressLink>
  )
}

export type AddressNameProps = Partial<NameProps>

export default memo(AddressName)
