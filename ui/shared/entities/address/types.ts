import type { AddressParam } from "types/api/addressParams"

export type IAddress =
  | ({
      hash: AddressParam["hash"] | undefined | null
    } & Partial<
      Pick<
        AddressParam,
        "name" | "is_contract" | "is_verified" | "implementations"
      >
    > & {
        image_url?: string | null
      })
  | undefined
