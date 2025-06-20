import { Skeleton, Text, chakra } from "@chakra-ui/react"
import useApiQuery from "lib/api/useApiQuery"
import { useLastSync } from "lib/hooks/useLastSync"
import { memo } from "react"
import { CONTRACT_CODE } from "stubs/codeID"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import BlockEntityV2 from "ui/shared/entities/block/BlockEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"

type Props = {
  codeId: string
}

const CodeIDDetails = ({ codeId }: Props) => {
  const { data, isPlaceholderData } = useApiQuery("contract_code", {
    pathParams: {
      codeId: codeId,
    },
    queryOptions: {
      placeholderData: CONTRACT_CODE,
    },
  })

  const storeTime = useLastSync(data?.store_time, [data?.store_time])
  const isLoading = isPlaceholderData

  return (
    <DetailsInfoGroup
      borderWidth="1px"
      backgroundColor="neutral.light.1"
      padding={{
        base: 4,
        lg: 5,
        xl: 5,
      }}
    >
      <InfoItem
        title="Code ID"
        hint="Unique identifier for the contract code in the SEI Native"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        hasSkeleton
      >
        {codeId || "-"}
      </InfoItem>

      <InfoItem
        title="Creator"
        hint="Address of the individual or entity that created this code ID"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
      >
        <AddressEntityV2
          isLoading={isLoading}
          address={{ hash: data?.creator }}
          noIcon
          isTruncated
          textStyle="1"
          truncation="tail"
        />
      </InfoItem>

      <InfoItem
        title="Trx hash"
        hint="The transaction hash for deploying the Code ID"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
      >
        <TxEntityV2
          isLoading={isLoading}
          hash={data?.store_hash}
          isTruncated
          noCopy={false}
          textStyle="1"
        />
      </InfoItem>

      <InfoItem
        title="CW2 Info"
        hint="Details about the CW2 metadata associated with this contract"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        hasSkeleton
      >
        {data?.cw2_info?.replace("N/A", "") || "-"}
      </InfoItem>

      <InfoItem
        title="Contracts"
        hint="Total number of contracts linked to this code ID"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        hasSkeleton
      >
        {data?.smart_contracts_count}
      </InfoItem>

      <InfoItem
        title="Type"
        hint="Specifies the contract type: CW-20 for tokens, CW-721 for NFTs, or others"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        hasSkeleton
      >
        {data?.type || "-"}
      </InfoItem>

      <InfoItem
        title="At block"
        hint="The blockchain timestamp when this code ID was registered"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        gap={2}
      >
        <BlockEntityV2
          isLoading={isLoading}
          number={data?.store_height}
          isTruncated
          textStyle="1"
        ></BlockEntityV2>
        {storeTime ? (
          <Skeleton isLoaded={!isLoading}>
            <Text isTruncated color="neutral.light.5" textStyle="1">
              <chakra.span display={{ base: "none", lg: "inline-flex" }}>
                |
              </chakra.span>{" "}
              {storeTime}
            </Text>
          </Skeleton>
        ) : (
          <></>
        )}
      </InfoItem>
    </DetailsInfoGroup>
  )
}

export default memo(CodeIDDetails, (prev, next) => prev.codeId === next.codeId)
