import type { ArrayElement } from "types/utils"
import type { FileTree } from "../types"

export default function sortFileTree(
  a: ArrayElement<FileTree>,
  b: ArrayElement<FileTree>,
) {
  if ("children" in a && !("children" in b)) {
    return -1
  }

  if ("children" in b && !("children" in a)) {
    return 1
  }

  return a.name.localeCompare(b.name)
}
