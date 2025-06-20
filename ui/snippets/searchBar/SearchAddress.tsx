import { route } from "nextjs-routes"
import { memo, useMemo } from "react"
import type { ISearchAddress } from "types/api/search"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import SearchLink from "./SearchLink"

type Props = {
  item: ISearchAddress & {
    identifier: string
  }
  onSelect: AnyFunction
}

const SearchAddress = ({ item, onSelect }: Props) => {
  const href = useMemo(() => {
    return route({
      pathname: "/address/[hash]",
      query: {
        hash: item.address?.replace?.("factory/", "") || "",
      },
    })
  }, [item.address])

  return (
    <SearchLink href={href} onClick={onSelect}>
      <AddressEntityV2
        address={{
          hash: item.address,
          name: item.name,
          is_contract: item.type === "contract",
          is_verified: item.is_smart_contract_verified,
        }}
        truncation="tail"
        iconProps={{ boxSize: 8 }}
        nameProps={{ color: "neutral.light.7", textStyle: "875" }}
        hashProps={{ color: "neutral.light.6", textStyle: "8125" }}
        noTooltip
        noCopy
        gap={5}
        noLink
      />
    </SearchLink>
  )
}

export default memo(SearchAddress, (prev, next) => {
  return prev.item.identifier === next.item.identifier
})
