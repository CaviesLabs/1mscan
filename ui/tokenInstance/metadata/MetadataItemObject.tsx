import { Box } from "@chakra-ui/react"
import React from "react"

import MetadataAccordion from "./MetadataAccordion"
import MetadataAccordionItem from "./MetadataAccordionItem"
import MetadataAccordionItemTitle from "./MetadataAccordionItemTitle"

interface Props {
  name: string
  value: Record<string, unknown>
  level: number
}

const MetadataItemObject = ({ name, value, level }: Props) => {
  if (level >= 4) {
    return (
      <MetadataAccordionItem level={level} isFlat>
        <MetadataAccordionItemTitle name={name} />
        <Box whiteSpace="pre-wrap">{JSON.stringify(value, undefined, 2)}</Box>
      </MetadataAccordionItem>
    )
  }

  return (
    <MetadataAccordionItem
      flexDir={{ lg: "column" }}
      alignItems="stretch"
      py={0}
      isFlat
      level={level}
    >
      <MetadataAccordionItemTitle name={name} />

      <MetadataAccordion
        data={value as Record<string, unknown>}
        level={level + 1}
      />
    </MetadataAccordionItem>
  )
}

export default React.memo(MetadataItemObject)
