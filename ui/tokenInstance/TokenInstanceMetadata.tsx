import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import type { TokenInstance } from "types/api/token"
import DataListDisplay from "ui/shared/DataListDisplay"
import TokenInstanceMetadataProvider from "./TokenInstanceMetadataProvider"
import MetadataAccordion from "./metadata/MetadataAccordion"

interface Props {
  data: TokenInstance["metadata"] | undefined
  isLoading?: boolean
}

const TokenInstanceMetadata = ({ data, isLoading }: Props) => {
  return (
    <DataListDisplay
      emptyText={getLanguage("token.there_is_no_metadata_for_this_nft")}
      emptyProps={{
        borderWidth: "1px",
        borderRadius: "base",
        borderColor: "neutral.light.3",
      }}
      isEmpty={!data}
    >
      <TokenInstanceMetadataProvider isLoading={isLoading}>
        <MetadataAccordion data={data!} />
      </TokenInstanceMetadataProvider>
    </DataListDisplay>
  )
}

export default memo(TokenInstanceMetadata, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.data === next.data
})
