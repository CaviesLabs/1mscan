import { Flex } from "@chakra-ui/react"
import { Fragment, memo } from "react"
import { generateKey } from "stubs/utils"
import type { AddressCollection } from "types/api/address"
import type { NFTTokenType } from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Divider from "ui/shared/Divider"
import Pagination from "ui/shared/pagination/Pagination"
import type { IPagination } from "ui/shared/pagination/types"
import NFTCollectionItem from "./NFTCollectionItem"

type Props = {
  items: AddressCollection[] | undefined
  isLoading?: boolean
  hash: string | undefined
  tokenType: NFTTokenType
  pagination: IPagination
}

const NFTCollection = ({
  items,
  isLoading,
  hash,
  tokenType,
  pagination,
}: Props) => {
  return (
    <DataListDisplay
      isEmpty={!items?.length}
      isLoading={isLoading}
      loadingProps={{
        borderWidth: "1px",
        borderRadius: "0.5rem",
        borderColor: "neutral.light.3",
      }}
      emptyProps={{
        borderWidth: "1px",
        borderRadius: "0.5rem",
        borderColor: "neutral.light.3",
      }}
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
        />
      }
    >
      <Flex flexDirection="column" gap={6}>
        {items?.map((item, index) => (
          <Fragment
            key={generateKey(index, isLoading, tokenType, item.token?.address)}
          >
            <NFTCollectionItem
              collection={item}
              hash={hash}
              isLoading={isLoading}
              tokenType={tokenType}
            ></NFTCollectionItem>
            {index !== items.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Flex>
    </DataListDisplay>
  )
}

export default memo(NFTCollection, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.items === next.items &&
    prev.hash === next.hash &&
    prev.tokenType === next.tokenType &&
    prev.pagination === next.pagination
  )
})
