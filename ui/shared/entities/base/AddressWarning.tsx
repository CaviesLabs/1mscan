import { getLanguage } from "languages/useLanguage"
import { getIsNilEVMAddress } from "lib/getOSType"
import { useMemo } from "react"
import Hint, { type HintProps } from "ui/shared/Hint"

type Props = {
  isLoading?: boolean
  hash: string | undefined | null
  showWarning: "burn" | undefined
} & Partial<HintProps>

const AddressWarning = ({ hash, isLoading, showWarning, ...props }: Props) => {
  const label = useMemo(() => {
    if (showWarning === "burn")
      if (getIsNilEVMAddress(hash)) {
        return getLanguage(
          "token.null_address_tokens_sent_here_are_burned_forever",
        )
      }
    if (!hash) {
      return getLanguage(
        "token.token_may_be_burned_or_owner_data_needs_refresh",
      )
    }

    return undefined
  }, [hash])
  if (!label) return <></>
  return (
    <Hint
      label={label}
      isLoading={isLoading}
      tooltipProps={{
        placement: "top",
      }}
      {...props}
    />
  )
}

export default AddressWarning
