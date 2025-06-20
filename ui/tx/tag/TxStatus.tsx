import type { TagProps } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import type { StatusTagType } from "types/api/tokenTransfer"
import IconSvg, { type IconSvgProps } from "ui/shared/IconSvg"
import Tag from "ui/shared/chakra/Tag"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"

export type Props = {
  status: StatusTagType | "success" | "loading" | null | undefined
  errorText?: string | null
  isLoading?: boolean
  label?: string
  tagProps?: TagProps
  iconProps?: IconSvgProps
} & TagProps

const TxStatus = ({
  status,
  errorText: _errorText,
  isLoading,
  tagProps,
  iconProps,
  ...props
}: Props) => {
  const { text, icon, colorScheme, label } = useMemo(() => {
    if (status === "success" || status === "ok") {
      return {
        icon: "status/success",
        colorScheme: "green",
        label: getLanguage("transactions_page.contract_execution_completed"),
        text: getLanguage("status.success"),
      }
    }
    if (status === "error") {
      return {
        icon: "status/error",
        colorScheme: "red",
        label:
          _errorText ||
          getLanguage(
            "transactions_page.error_occurred_during_contract_execution",
          ),
        text: getLanguage("status.error"),
      }
    }
    if (status === "loading") {
      return {
        icon: "loading",
        colorScheme: "gray",
        label: getLanguage("transactions_page.transaction_is_loading"),
        text: getLanguage("status.loading"),
      }
    }
    return {
      icon: "status/pending",
      colorScheme: "gray",
      label: getLanguage("transactions_page.transaction_is_pending"),
      text: getLanguage("status.pending"),
    }
  }, [status, _errorText])

  return (
    <TooltipV2 label={label} isDisabled={isLoading}>
      <Tag
        colorScheme={colorScheme}
        variant="subtle"
        display="inline-flex"
        gap={2}
        isLoading={isLoading}
        {...props}
        {...tagProps}
      >
        <IconSvg
          cursor="pointer"
          boxSize={4}
          name={icon as any}
          color="inherit"
          {...iconProps}
        />
        <span>{text}</span>
      </Tag>
    </TooltipV2>
  )
}

export default memo(TxStatus, (prev, next) => {
  return (
    prev.status === next.status &&
    prev.errorText === next.errorText &&
    prev.isLoading === next.isLoading
  )
})
