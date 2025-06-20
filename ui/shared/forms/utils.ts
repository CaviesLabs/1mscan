export function smartSearchInArray(arr: string[], query: string) {
  const keywords = (query.trim() || "")
    ?.split(/\s+/)
    .filter((keyword) => keyword.trim() !== "")

  const normalizedKeywords = keywords.map((keyword) =>
    keyword
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
  )

  const matchedIndexes = arr.map((str, index) => {
    const normalizedStr = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()

    const isMatch = normalizedKeywords.every((keyword) =>
      normalizedStr.includes(keyword),
    )

    return isMatch ? index : -1
  })

  const validIndexes = matchedIndexes.filter((index) => index !== -1)

  return validIndexes
}
