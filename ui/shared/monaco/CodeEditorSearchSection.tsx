import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"
import React from "react"

import type { SearchResult } from "./types"

import CodeEditorFileIcon from "./CodeEditorFileIcon"
import CodeEditorSearchResultItem from "./CodeEditorSearchResultItem"
import getFileName from "./utils/getFileName"
import useThemeColors from "./utils/useThemeColors"

interface Props {
  data: SearchResult
  onItemClick: (filePath: string, lineNumber: number) => void
}

const CodeEditorSearchSection = ({ data, onItemClick }: Props) => {
  const fileName = getFileName(data.file_path)

  const handleFileLineClick = React.useCallback(
    (event: React.MouseEvent) => {
      const lineNumber = Number(
        (event.currentTarget as HTMLDivElement).getAttribute(
          "data-line-number",
        ),
      )
      if (!Object.is(lineNumber, Number.NaN)) {
        onItemClick(data.file_path, Number(lineNumber))
      }
    },
    [data.file_path, onItemClick],
  )

  const themeColors = useThemeColors()

  return (
    <AccordionItem borderWidth="0px" _last={{ borderBottomWidth: "0px" }}>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            py={0}
            px={2}
            _hover={{ bgColor: themeColors["custom.list.hoverBackground"] }}
            fontSize="13px"
            transitionDuration="0"
            lineHeight="22px"
            alignItems="center"
          >
            <Box
              className="codicon codicon-tree-item-expanded"
              transform={isExpanded ? "rotate(0deg)" : "rotate(-90deg)"}
              width="20px"
              height="22px"
              py="3px"
              flexShrink={0}
            />
            <CodeEditorFileIcon mr="4px" fileName={fileName} />
            <Box
              mr="8px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              textAlign="left"
            >
              {fileName}
            </Box>
            <Box
              className="monaco-count-badge"
              ml="auto"
              bgColor={themeColors["badge.background"]}
              flexShrink={0}
            >
              {data.matches.length}
            </Box>
          </AccordionButton>
          <AccordionPanel p={0}>
            {data.matches.map((match) => (
              <CodeEditorSearchResultItem
                key={
                  data.file_path +
                  "_" +
                  match.startLineNumber +
                  "_" +
                  match.startColumn
                }
                filePath={data.file_path}
                onClick={handleFileLineClick}
                {...match}
              />
            ))}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default React.memo(CodeEditorSearchSection)
