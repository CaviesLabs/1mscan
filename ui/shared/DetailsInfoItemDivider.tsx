import type { GridItemProps } from "@chakra-ui/react"
import { GridItem, chakra } from "@chakra-ui/react"

const DetailsInfoItemDivider = (props: GridItemProps) => {
  return (
    <GridItem
      {...props}
      colSpan={{ base: undefined, lg: 2 }}
      mt={{ base: 2, lg: 3 }}
      mb={{ base: 0, lg: 3 }}
      borderBottom="1px solid"
      borderColor="divider"
    />
  )
}

export default chakra(DetailsInfoItemDivider)
