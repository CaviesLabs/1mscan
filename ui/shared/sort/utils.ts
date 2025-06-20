import { last } from "lodash"

export interface Option<Sort extends string> {
  title: string
  id: Sort | undefined
}

export type ISortDirection = "asc" | "desc"

export type combinedSortType<
  SFs extends ReadonlyArray<K>,
  K extends string = string,
> = `${SFs[number]}-${ISortDirection}`

export type combinedSortApi<
  SFs extends ReadonlyArray<K>,
  K extends string = string,
> = `${SFs[number]}:${ISortDirection}`

export const getSortOptions = <SFs extends ReadonlyArray<string>>(
  SortFields: SFs,
) => {
  type ISortType = (typeof SortFields)[number]

  type ICombinedSortType = `${ISortType}-${ISortDirection}`

  const SORT_OPTIONS: Option<ICombinedSortType>[] = [
    { title: "Default", id: undefined },
    ...SortFields.flatMap((id) =>
      ["asc", "desc"].map(
        (indicator) =>
          ({
            id: `${id}-${indicator}`,
            title: `${id?.capitalizeFirstLetter?.() || ""} ${indicator}`,
          }) as Option<ICombinedSortType>,
      ),
    ),
  ]

  return SORT_OPTIONS
}

export const getApiSort = <
  SFs extends ReadonlyArray<K>,
  K extends string = string,
>(
  sort: combinedSortType<SFs> | undefined,
) => {
  if (!sort) return undefined

  const direction = last(sort.split("-")) as ISortDirection

  const field = sort.replace(`-${direction}`, "")

  return `${field}:${direction}` as combinedSortApi<SFs>
}
