import { Flex } from "@chakra-ui/react"
import React from "react"

import DetailsInfoItemDivider from "ui/shared/DetailsInfoItemDivider"
import MetadataItemArray from "./MetadataItemArray"
import MetadataItemObject from "./MetadataItemObject"
import MetadataItemPrimitive from "./MetadataItemPrimitive"
import { sortFields } from "./utils"

interface Props {
  data: Record<string, unknown>
  level?: number
}

const MetadataAccordion = ({ data, level = 0 }: Props) => {
  const isFlat = Object.entries(data).every(
    ([, value]) => typeof value !== "object",
  )

  const renderItem = React.useCallback(
    (name: string, value: unknown) => {
      switch (typeof value) {
        case "string":
        case "number":
        case "boolean": {
          return (
            <MetadataItemPrimitive
              key={name}
              name={name}
              value={value}
              isFlat={isFlat}
              level={level}
            />
          )
        }

        case "object": {
          if (value === null) {
            return (
              <MetadataItemPrimitive
                alignItems="flex-start"
                key={name}
                name={name}
                value={value}
                isFlat={isFlat}
                level={level}
              />
            )
          }

          if (Array.isArray(value) && value.length > 0) {
            return (
              <MetadataItemArray
                key={name}
                name={name}
                value={value}
                level={level}
              />
            )
          }

          if (Object.keys(value).length > 0) {
            return (
              <MetadataItemObject
                key={name}
                name={name}
                value={value as Record<string, unknown>}
                level={level}
              />
            )
          }

          return null
        }

        default: {
          return (
            <MetadataItemPrimitive
              key={name}
              name={name}
              value={String(value)}
              isFlat={isFlat}
              level={level}
            />
          )
        }
      }
    },
    [level, isFlat],
  )

  return (
    <Flex
      flexDirection="column"
      rowGap={3}
      bg="neutral.light.1"
      p="20px"
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral.light.3"
    >
      {Object.entries(data)
        .sort(sortFields)
        .map(([key, value], index) => (
          <>
            {Boolean(index) && (
              <DetailsInfoItemDivider
                mt={{ base: 0, lg: 0 }}
                mb={{ base: 0, lg: 0 }}
              ></DetailsInfoItemDivider>
            )}
            {renderItem(key, value)}
          </>
        ))}
    </Flex>
  )
}

export default React.memo(MetadataAccordion)
