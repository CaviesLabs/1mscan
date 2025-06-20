import type { BoxProps, TableProps } from "@chakra-ui/react"
import { Box, Table } from "@chakra-ui/react"
import { isNil, zipObject, zipWith } from "lodash"
import type React from "react"
import { type CSSProperties, memo, useMemo } from "react"
import { generateKey } from "stubs/utils"

type Props = {
  children: React.ReactNode
  boxProps?: Partial<BoxProps>
  sizes?: (`${number}%` | number)[]
  mins?: Exclude<CSSProperties["minWidth"], `${number}%`>[]
  maxs?: Exclude<CSSProperties["maxWidth"], `${number}%`>[]
} & Partial<TableProps>

const ScrollTable = ({
  children,
  boxProps,
  sizes,
  mins,
  maxs,
  hidden,
  ...props
}: Props) => {
  const dimensions = useMemo(() => {
    const paddedSizes = (sizes || []).filter((x) => !isNil(x))
    const paddedMins = (mins || [])
      .concat(Array(paddedSizes?.length || 0).fill(undefined))
      .slice(0, paddedSizes?.length || 0)
    const paddedMaxs = (maxs || [])
      .concat(Array(paddedSizes?.length || 0).fill(undefined))
      .slice(0, paddedSizes?.length || 0)
    return (
      zipObject(
        paddedSizes.map((_, index) => `&:nth-of-type(${index + 1})`),
        zipWith(paddedMins || [], paddedMaxs || [], (min, max) => ({
          minWidth: min || "auto",
          maxWidth: max || "max-content",
        })),
      ) || {}
    )
  }, [mins, maxs])

  return (
    <Box
      padding={0}
      flex={1}
      overflowX="auto"
      hidden={hidden}
      minHeight="max-content"
      {...boxProps}
    >
      <Table
        css={{
          tbody: {
            tr: {
              td: {
                whiteSpace: "nowrap",
                ...dimensions,
              },
            },
          },
        }}
        backgroundColor="neutral.light.1"
        {...props}
      >
        {Boolean(sizes?.length) && (
          <colgroup>
            {sizes!.map((size, index) => {
              return (
                <col
                  key={generateKey(index, true, size, index)}
                  style={{
                    width: String(size).endsWith("%") ? size : `${size}%`,
                  }}
                />
              )
            })}
          </colgroup>
        )}
        {children}
      </Table>
    </Box>
  )
}

export default memo(ScrollTable, (prev, next) => {
  return (
    prev.sizes === next.sizes &&
    prev.children === next.children &&
    prev.mins === next.mins &&
    prev.maxs === next.maxs
  )
})
