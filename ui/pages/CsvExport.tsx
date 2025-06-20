import { Button, Flex, Skeleton } from "@chakra-ui/react"
import type { IResourceName } from "lib/api/resources"
import useApiQuery from "lib/api/useApiQuery"
import throwOnAbsentParamError from "lib/errors/throwOnAbsentParamError"
import { useRouter } from "next/router"
import { memo } from "react"
import { AddressFromToFilterValues } from "types/api/address"
import type { CsvExportParams } from "types/client/address"
import CsvExportForm from "ui/csvExport/CsvExportForm"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TextInputFloating from "ui/shared/forms/TextInputFloating"

interface ExportTypeEntity {
  text: string
  resource: IResourceName
  fileNameTemplate: string
  filterType?: CsvExportParams["filterType"]
  filterValues?: Readonly<Array<CsvExportParams["filterValue"]>>
}

const EXPORT_TYPES: Partial<Record<CsvExportParams["type"], ExportTypeEntity>> =
  {
    transactions: {
      text: "transactions",
      resource: "csv_export_txs",
      fileNameTemplate: "transactions",
      filterType: "address",
      filterValues: AddressFromToFilterValues,
    },
    "internal-transactions": {
      text: "internal transactions",
      resource: "csv_export_internal_txs",
      fileNameTemplate: "internal_transactions",
      filterType: "address",
      filterValues: AddressFromToFilterValues,
    },
    "token-transfers": {
      text: "token transfers",
      resource: "csv_export_token_transfers",
      fileNameTemplate: "token_transfers",
      filterType: "address",
      filterValues: AddressFromToFilterValues,
    },
    // logs: {
    //   text: "logs",
    //   resource: "csv_export_logs",
    //   fileNameTemplate: "logs",
    //   filterType: "topic",
    // },
    // holders: {
    //   text: "holders",
    //   resource: "csv_export_token_holders",
    //   fileNameTemplate: "holders",
    // },
  }

const isCorrectExportType = (type: string): type is CsvExportParams["type"] =>
  Object.keys(EXPORT_TYPES).includes(type)

const CsvExport = () => {
  const router = useRouter()

  const addressHash = router.query.address?.toString() || ""
  const exportTypeParam = router.query.type?.toString() || ""
  const exportType = isCorrectExportType(exportTypeParam)
    ? EXPORT_TYPES[exportTypeParam]
    : null
  const filterTypeFromQuery = router.query.filterType?.toString() || null
  const filterValueFromQuery = router.query.filterValue?.toString()

  const addressQuery = useApiQuery("address", {
    pathParams: { hash: addressHash },
    queryOptions: {
      enabled: Boolean(addressHash),
    },
  })

  // const tokenQuery = useApiQuery("token", {
  //   pathParams: { hash: addressHash },
  //   queryOptions: {
  //     enabled: Boolean(addressHash) && exportTypeParam === "holders",
  //   },
  // });

  // const isLoading =
  //   addressQuery.isPending ||
  //   (exportTypeParam === "holders" && tokenQuery.isPending);

  throwOnAbsentParamError(addressHash)
  throwOnAbsentParamError(exportType)

  if (!exportType) {
    return null
  }

  const filterType =
    filterTypeFromQuery === exportType.filterType ? filterTypeFromQuery : null
  const filterValue = (() => {
    if (!filterType || !filterValueFromQuery) {
      return null
    }

    if (
      exportType.filterValues &&
      !exportType.filterValues?.includes(filterValueFromQuery)
    ) {
      return null
    }

    return filterValueFromQuery
  })()

  return (
    <>
      <PageTitle title="Export data to CSV file" hasDefaultBackLink />
      <Flex paddingY={4} gap={2} flexWrap="wrap" flexDirection="column">
        <Flex
          alignItems="center"
          flexWrap="wrap"
          overflow="hidden"
          maxWidth="full"
          gap={2}
          textStyle="1"
          color="neutral.light.7"
        >
          <span>Export {exportType.text} for address </span>
          <AddressEntityV2
            address={{
              hash: addressHash,
              is_contract: true,
              implementations: null,
            }}
            truncation="tail"
            noCopy
          />

          {filterType && filterValue && (
            <span>
              with applied filter by {filterType} ({filterValue}){" "}
            </span>
          )}
          <span>to CSV file. </span>
        </Flex>
        <span>Exports are limited to the last 10K {exportType.text}.</span>
      </Flex>

      <DataListDisplay
        isError={addressQuery.isError}
        isLoading={addressQuery.isPending}
        placeholder={
          <Flex
            paddingY={4}
            display="flex"
            flexDirection="column"
            gap={6}
            alignItems="flex-start"
          >
            <Flex
              columnGap={4}
              rowGap={6}
              flexDir={{ base: "column", lg: "row" }}
              alignItems={{ base: "stretch", lg: "center" }}
              flexWrap="wrap"
              width="full"
            >
              <Skeleton>
                <TextInputFloating
                  formControlProps={{
                    width: { base: "full", lg: "18.875rem" },
                  }}
                ></TextInputFloating>
              </Skeleton>
              <Skeleton>
                <TextInputFloating
                  formControlProps={{
                    width: { base: "full", lg: "18.875rem" },
                  }}
                ></TextInputFloating>
              </Skeleton>
            </Flex>
            <Skeleton
              width={{ base: "full", lg: "18.875rem" }}
              height="4.75rem"
            ></Skeleton>
            <Skeleton>
              <Button
                variant="solid"
                size="md"
                type="submit"
                loadingText="Download"
              >
                Download
              </Button>
            </Skeleton>
          </Flex>
        }
      >
        <CsvExportForm
          hash={addressHash}
          resource={exportType.resource}
          exportType={
            isCorrectExportType(exportTypeParam) ? exportTypeParam : undefined
          }
          filterType={filterType}
          filterValue={filterValue}
          fileNameTemplate={exportType.fileNameTemplate}
        />
      </DataListDisplay>
    </>
  )
}

export default memo(CsvExport, () => true)
