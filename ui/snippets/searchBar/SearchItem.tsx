import { ALL_TOKEN_TYPE_IDS } from "lib/token/tokenTypes"
import type { ISearchCategory, ISearchItem } from "types/api/search"
import SearchAddress from "./SearchAddress"
import SearchBlock from "./SearchBlock"
import SearchToken from "./SearchToken"
import SearchTransaction from "./SearchTransaction"

type Props = {
  item: ISearchItem
  onSelect: AnyFunction
  category: ISearchCategory
}

const TOKEN_CATEGORIES = Object.fromEntries(
  ALL_TOKEN_TYPE_IDS.map((id) => [id.toLowerCase(), true]),
)

const SearchItem = ({ item, category, onSelect }: Props) => {
  return (
    <>
      {TOKEN_CATEGORIES[category] && (
        <SearchToken item={item as any} onSelect={onSelect} />
      )}
      {category === "address" && (
        <SearchAddress item={item as any} onSelect={onSelect} />
      )}
      {category === "block" && (
        <SearchBlock item={item as any} onSelect={onSelect} />
      )}
      {category === "transaction" && (
        <SearchTransaction item={item as any} onSelect={onSelect} />
      )}
    </>
  )
}

export default SearchItem
