import { Flex, Grid, HStack, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { TOKEN_INSTANCE } from "stubs/token"
import { generateKey, generateListStub } from "stubs/utils"
import type { TokenInfo } from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import IconSvg from "ui/shared/IconSvg"
import AddressV2 from "ui/shared/entities/address/AddressEntityV2"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import TokenInventoryItem from "./TokenInventoryItem"

const placeholderData = generateListStub<"token_inventory">(TOKEN_INSTANCE, 8, {
  next_page_params: null,
})

type Props = {
  token: TokenInfo | undefined
  ownerFilter?: string
  hash: string
  setOwnerFilter: AnyFunction
  isLoading?: boolean
  isActive?: boolean
}

const TokenInventory = ({
  ownerFilter,
  hash,
  setOwnerFilter,
  token,
  isLoading: _isLoading,
  isActive,
}: Props) => {
  const { data, pagination, isPlaceholderData } = useQueryWithPages({
    resourceName: "token_inventory",
    pathParams: { hash: hash },
    filters: (ownerFilter && { holder_address_hash: ownerFilter }) || undefined,
    options: {
      enabled: Boolean(token?.address && !_isLoading && isActive),
      placeholderData: placeholderData,
    },
  })

  const items = data?.items

  const isLoading = isPlaceholderData || _isLoading

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          mainProps={{
            flex: 1,
          }}
          moreInfoProps={{
            alignSelf: {
              base: "flex-start",
              lg: "flex-end",
            },
            width: "auto",
          }}
          paginationChildren={<Pagination pagination={pagination} />}
          alignItems="stretch"
          flexDirection="column"
        >
          {ownerFilter && (
            <Flex
              flex={1}
              whiteSpace="nowrap"
              flexShrink={0}
              alignItems="center"
              flexWrap="wrap"
              columnGap={2}
              rowGap={1}
              overflow="hidden"
            >
              <Text textStyle="1" color="neutral.light.7" flexShrink={0}>
                {getLanguage("token.filtered_by_owner")}
              </Text>
              <HStack spacing={2} overflow="hidden">
                <AddressV2
                  textStyle="1"
                  address={{ hash: ownerFilter }}
                  truncation="tail"
                />
                <IconSvg
                  flexShrink={0}
                  name="close"
                  color="neutral.light.7"
                  boxSize={6}
                  onClick={() => setOwnerFilter("")}
                />
              </HStack>
            </Flex>
          )}
        </ActionBar>
      }
    >
      <Grid
        flex={1}
        columnGap={{ base: 3, lg: 6 }}
        rowGap={{ base: 3, lg: 6 }}
        gridTemplateColumns={{
          base: "100%",
          lg: "repeat(4, minmax(calc(25% - 1.25rem), 1fr))",
          xl: "repeat(6, minmax(calc(16.66% - 1.25rem), 1fr))",
        }}
        gridTemplateRows="minmax(max-content, 100%)"
      >
        {items?.map((item, index) => (
          <TokenInventoryItem
            key={generateKey(index, isLoading, token?.address || "", item.id)}
            item={item}
            isLoading={isLoading}
            token={token!}
          />
        ))}
      </Grid>
    </DataListDisplay>
  )
}

export default memo(TokenInventory, (prev, next) => {
  return (
    prev.token?.address === next.token?.address &&
    prev.ownerFilter === next.ownerFilter &&
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.isActive === next.isActive
  )
})
