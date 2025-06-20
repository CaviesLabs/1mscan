import type { IconName } from "public/icons/name"
import type { ValidatorDetail } from "types/api/validator"

const STATUS_MAPPING = {
  BOND_STATUS_BONDED: {
    colorScheme: "green",
    text: "Active",
    icon: "success",
  },
  BOND_STATUS_UNBONDING: {
    colorScheme: "yellow",
    icon: "status/warning",
    text: "Inactive",
  },
  BOND_STATUS_UNBONDED: {
    colorScheme: "red",
    icon: "cancel",
    text: "Jailed",
  },
  Bonded: {
    colorScheme: "red",
    icon: "cancel",
    text: "Jailed",
  },
} as const

export const getStatus = (
  status: ValidatorDetail["status"] | undefined,
): {
  colorScheme: string
  text: string
  icon: IconName
} => {
  return (
    STATUS_MAPPING[status!] || {
      colorScheme: "gray",
      text: "Unknown",
      icon: "",
    }
  )
}
