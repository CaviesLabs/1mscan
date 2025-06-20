import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import IconSVGV2 from "ui/shared/icon/IconSVGV2"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"
import type { TokenConfirmProps } from "./types"

export enum AssetReputation {
  UNKNOWN = "unknown",
  NEUTRAL = "neutral",
  OK = "ok",
  SUSPICIOUS = "suspicious",
}

const REPUTATION_MAP = {
  [AssetReputation.OK]: {
    icon: "/icons/reputation/ok.svg",
    tooltip: getLanguage("token.reputation_ok"),
  },
  [AssetReputation.SUSPICIOUS]: {
    icon: "/icons/reputation/suspicious.svg",
    tooltip: getLanguage("token.reputation_unsafe"),
  },
  [AssetReputation.UNKNOWN]: {
    icon: "/icons/reputation/unknown.svg",
    tooltip: getLanguage("token.reputation_unknown"),
  },
  [AssetReputation.NEUTRAL]: {
    icon: "/icons/reputation/neutral.svg",
    tooltip: getLanguage("token.reputation_neutral"),
  },
}

const TokenConfirm = ({ isLoading, asset, ...props }: TokenConfirmProps) => {
  const isVerified = Boolean(asset)

  if (!isVerified) return null

  const data =
    REPUTATION_MAP[asset?.reputation as any] ||
    REPUTATION_MAP[AssetReputation.UNKNOWN]

  return (
    <TooltipV2 label={data.tooltip}>
      <IconSVGV2
        isLoading={isLoading}
        src={data.icon}
        boxSize={5}
        cursor="pointer"
        color="secondary.04"
        borderRadius="full"
        backgroundColor="transparent"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...(props as any)}
      />
    </TooltipV2>
  )
}

export default memo(TokenConfirm)
