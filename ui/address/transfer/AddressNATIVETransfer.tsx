import { Flex, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { castArrayQueryString } from "lib/router/castArrayQueryString"
import { matchItems } from "lib/router/matchItems"
import { toQueryString } from "lib/router/toQueryString"
import { useSetStateQuery } from "lib/router/useSetStateQuery"
import { ALL_SEI_TOKEN_TYPES_IDS } from "lib/token/tokenTypes"
import { memo } from "react"
import { TOKEN_TRANSFER_CW_20 } from "stubs/token"
import { generateListStub } from "stubs/utils"
import type { TokenType, TokenTypeWithTransfer } from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import AddressTokenTransferFilter from "ui/shared/AddressTokenTransfer/AddressTokenTransferFilter"
import DataListDisplay from "ui/shared/DataListDisplay"
import IconSvg from "ui/shared/IconSvg"
import TokenV2 from "ui/shared/entities/token/TokenEntityV2"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"
import AddressCsvExportLink from "../AddressCsvExportLink"
import AddressTransferTable from "./AddressTransferTable"

type Props = {
  hash: string
  isLoading?: boolean
}

const placeholderData = generateListStub<"token_transfers">(
  TOKEN_TRANSFER_CW_20,
  10,
  {
    next_page_params: null,
  },
)

const AddressNATIVETransfer = ({ hash, isLoading: _isLoading }: Props) => {
  const [token, setToken] = useSetStateQuery("token", [], { throttle: 200 })

  const [filter, setFilter] = useSetStateQuery<"from" | "to">("filter", [], {
    throttle: 200,
  })

  const [type, setType] = useSetStateQuery<
    string | undefined,
    TokenTypeWithTransfer[],
    TokenTypeWithTransfer[]
  >("type", [], {
    throttle: 200,
    decode: (value) => {
      const items = castArrayQueryString<TokenTypeWithTransfer>(value)
      const matches = matchItems<TokenTypeWithTransfer>(
        items,
        ALL_SEI_TOKEN_TYPES_IDS,
        {
          fallback: true,
        },
      )

      return matches
    },
    encode: toQueryString,
  })
  const { isPlaceholderData, data, pagination } = useQueryWithPages({
    resourceName: "address_token_transfers",
    pathParams: { hash: hash },
    filters: token
      ? { token: token }
      : {
          type: toQueryString(type as TokenType[]),
          filter: filter || undefined,
        },
    options: {
      enabled: Boolean(hash && !_isLoading),
      placeholderData: placeholderData,
    },
  })

  const isLoading = _isLoading || isPlaceholderData

  return (
    <DataListDisplay
      actionBar={
        <ActionBar
          paginationChildren={<Pagination pagination={pagination} />}
          exportChildren={
            <AddressCsvExportLink
              address={hash}
              params={{
                type: "token-transfers",
                filterType: "address",
                filterValue: filter,
              }}
              isLoading={isLoading}
            />
          }
          filterProps={{
            gridTemplateColumns: {
              base: "max-content 1fr",
              lg: "max-content max-content max-content max-content",
            },
            alignItems: {
              base: "stretch",
              lg: "center",
            },
          }}
          filterChildren={
            token ? (
              <Flex
                alignItems="center"
                flexWrap="wrap"
                textStyle="1"
                gap={2}
                width="full"
              >
                <Text
                  whiteSpace="nowrap"
                  flexShrink={0}
                  color="neutral.light.7"
                >
                  {getLanguage("address.filtered_by_token")}
                </Text>
                <Flex alignItems="center" overflow="hidden">
                  <TokenV2
                    textStyle="1"
                    token={{
                      address: token,
                    }}
                    isLoading={isLoading}
                  />
                  <IconSvg
                    flexShrink={0}
                    name="close"
                    color="neutral.light.7"
                    boxSize={6}
                    onClick={() => setToken("")}
                  />
                </Flex>
              </Flex>
            ) : (
              <AddressTokenTransferFilter
                directionValue={filter}
                typeValue={type as TokenType[]}
                isLoading={isLoading}
                osType="Cosmos"
                onTypeChange={(nextValue) => {
                  setType(nextValue || [])
                }}
                onDirectionChange={(val: any) => {
                  setFilter(val || "")
                }}
              />
            )
          }
        />
      }
    >
      <AddressTransferTable
        items={data?.items}
        hash={hash}
        isLoading={isLoading}
        page={pagination.snap.page}
      />
    </DataListDisplay>
  )
}

export default memo(AddressNATIVETransfer, (pre, next) => {
  return pre.hash === next.hash && pre.isLoading === next.isLoading
})
