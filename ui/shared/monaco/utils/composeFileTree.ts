import type { File, FileTree } from "../types"

import stripLeadingSlash from "lib/stripLeadingSlash"

import sortFileTree from "./sortFileTree"

export default function composeFileTree(files: Array<File>) {
  const result: FileTree = []
  type Level = {
    result: FileTree
  } & Record<string, any>
  const level: Level = { result }

  files.forEach((file) => {
    const path = stripLeadingSlash(file.file_path)
    const segments = path.split("/")

    segments.reduce((acc, segment, currentIndex, array) => {
      if (!acc[segment]) {
        acc[segment] = { result: [] }
        acc.result.push({
          name: segment,
          ...(currentIndex === array.length - 1
            ? file
            : { children: acc[segment].result }),
        })
      }
      acc.result.sort(sortFileTree)

      return acc[segment]
    }, level)
  })

  return result.sort(sortFileTree)
}
