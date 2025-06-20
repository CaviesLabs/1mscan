export default function shortenString(
  hash: string | null,
  headLength: number | undefined = 4,
  tailLength: number | undefined = 4,
) {
  if (!hash) {
    return ""
  }

  return (
    hash.slice(0, headLength || hash.length - tailLength) +
    "..." +
    hash.slice(-tailLength)
  )
}
