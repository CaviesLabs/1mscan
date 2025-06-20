import { Grid } from "@chakra-ui/react"
import { useMemoEffect } from "lib/hooks/useShallow"
import { useForm } from "react-hook-form"
import { generateKey } from "stubs/utils"
import type { AddressNFT } from "types/api/address"
import type { NFTTokenType } from "types/api/token"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import Pagination from "ui/shared/pagination/Pagination"
import type { IPagination } from "ui/shared/pagination/types"
import NFTItem from "./NFTItem"

type Props = {
  isLoading?: boolean
  items: AddressNFT[] | undefined
  tokenType: NFTTokenType
  pagination: IPagination
  q: string
  setQ: (q: string) => void
}

const NFTListItem = ({
  items,
  isLoading,
  tokenType,
  pagination,
  q,
  setQ,
}: Props) => {
  const { control, reset } = useForm({
    defaultValues: {
      search: q,
    },
  })

  useMemoEffect(() => {
    if (!q) {
      reset()
    }
  }, [!q])

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
        <ActionBar paginationChildren={<Pagination pagination={pagination} />}>
          {/* <Controller
            name="search"
            control={control}
            render={({ field: { ref, value, onChange } }) => (
              <SearchInput
                ref={ref}
                placeholder="Search by name or address"
                value={value}
                groupProps={{
                  maxWidth: { lg: "25rem" },
                }}
                onChange={(e) => {
                  const next = e.target.value || "";
                  onChange(next);
                  setQ(next);
                }}
              />
            )}
          /> */}
        </ActionBar>
      }
    >
      <Grid
        justifyContent="space-between"
        templateColumns={{
          base: "100%",
          lg: "repeat(4, minmax(calc(25% - 1.25rem), 1fr))",
          xl: "repeat(6, minmax(calc(16.66% - 1.25rem), 1fr))",
        }}
        gridTemplateRows="max-content"
        gap={5}
      >
        {items?.map((nft, index) => {
          if (!nft?.token) return null
          return (
            <NFTItem
              key={generateKey(
                index,
                isLoading,
                tokenType,
                nft.token?.address,
                nft.id,
              )}
              withTokenLink
              tokenInstance={nft}
              isLoading={isLoading}
            ></NFTItem>
          )
        })}
      </Grid>
    </DataListDisplay>
  )
}

export default NFTListItem
