import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import { BLOCK } from "stubs/block"
import { generateListStub } from "stubs/utils"
import NumberWidgetsList from "ui/block/NumberWidgetsList"
import BlocksTable from "ui/blocks/BlocksTable"
import ActionBar from "ui/shared/ActionBar"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import Pagination from "ui/shared/pagination/Pagination"
import useQueryWithPages from "ui/shared/pagination/useQueryWithPages"

const placeholderData = generateListStub<"blocks">(BLOCK, 20, {
  next_page_params: null,
})
const BlocksPageContent = () => {
  const { data, isPlaceholderData, pagination, dataUpdatedAt } =
    useQueryWithPages({
      resourceName: "blocks",
      filters: { type: "block" },
      options: {
        placeholderData: placeholderData,
      },
    })

  const isLoading = isPlaceholderData

  return (
    <>
      <PageTitle title={getLanguage("blocks_page.blocks")} />
      <NumberWidgetsList mt={8}></NumberWidgetsList>
      <DataListDisplay
        mt={5}
        actionBar={
          <ActionBar
            paginationChildren={<Pagination pagination={pagination} />}
          ></ActionBar>
        }
      >
        <BlocksTable
          items={data?.items}
          page={pagination.snap.page}
          isLoading={isLoading}
          dataUpdatedAt={dataUpdatedAt}
        />
      </DataListDisplay>
    </>
  )
}

export default memo(BlocksPageContent, () => true)
