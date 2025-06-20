import { getLanguage } from "languages/useLanguage"
import { memo, useMemo } from "react"
import IconSvg from "ui/shared/IconSvg"
import type { TagProps } from "ui/shared/chakra/Tag"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"

type Props = {
  status: "success" | "error" | undefined | null | "ok" | "pending" | "loading"
  isLoading?: boolean
} & Partial<TagProps>

const TxStatusIcon = ({ status, isLoading, ...props }: Props) => {
  const { icon, color, label } = useMemo(() => {
    if (status === "success" || status === "ok") {
      return {
        icon: "status/success",
        color: "secondary.02",
        label: getLanguage("transactions_page.contract_execution_completed"),
      }
    }
    if (status === "error") {
      return {
        icon: "status/error",
        color: "secondary.05",
        label: getLanguage(
          "transactions_page.error_occurred_during_contract_execution",
        ),
      }
    }
    if (status === "loading") {
      return {
        icon: "loading",
        color: "secondary.06",
        label: getLanguage("transactions_page.transaction_is_loading"),
      }
    }
    return {
      icon: "status/pending",
      color: "secondary.06",
      label: getLanguage("transactions_page.transaction_is_pending"),
    }
  }, [status])

  return (
    <TooltipV2 label={label}>
      <IconSvg
        cursor="pointer"
        isLoading={isLoading}
        boxSize={4}
        name={icon as any}
        color={color}
        {...props}
      />
    </TooltipV2>
  )
}

export default memo(TxStatusIcon, (prev, next) => {
  return prev.status === next.status && prev.isLoading === next.isLoading
})
