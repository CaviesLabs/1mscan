import { Center, HStack, Skeleton, Stack, Td, Tr } from "@chakra-ui/react"
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement"
import { route } from "nextjs-routes"
import { memo } from "react"
import type { IContractCode } from "types/api/codeID"
import CurrencyValue from "ui/shared/CurrencyValue"
import IconSvg from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"
import CodeIDVerified from "./CodeIDVerified"

type Props = {
  isLoading?: boolean
  item: IContractCode | undefined
}

const CodeIDTableItem = ({ isLoading, item }: Props) => {
  const timeAgo = useTimeAgoIncrement(item?.store_time)

  return (
    <Tr>
      <Td>
        <HStack spacing={1}>
          <Center boxSize={4}>
            {item?.is_verfified && (
              <IconSvg
                name="success"
                isLoading={isLoading}
                boxSize={4}
              ></IconSvg>
            )}
          </Center>
          {item?.code_id ? (
            <LinkInternal
              isLoading={isLoading}
              href={route({
                pathname: "/code-id/[id]",
                query: { id: item?.code_id },
              })}
            >
              {item?.code_id}
            </LinkInternal>
          ) : (
            "-"
          )}
        </HStack>
      </Td>
      <Td>
        <Stack spacing={1} overflow="hidden" maxWidth="13rem">
          <TxEntityV2 hash={item?.store_hash} isLoading={isLoading} />
          {timeAgo && (
            <Skeleton
              color="neutral.light.5"
              textStyle="8125"
              isLoaded={!isLoading}
            >
              <span>{timeAgo}</span>
            </Skeleton>
          )}
        </Stack>
      </Td>

      <Td textAlign="center">
        <CurrencyValue
          value={item?.smart_contracts_count}
          decimals={0}
          isLoading={isLoading}
        ></CurrencyValue>
      </Td>
      <Td>
        <AddressEntityV2
          address={{
            hash: item?.creator,
          }}
          isLoading={isLoading}
        />
      </Td>

      <Td textAlign="center">
        <SkeletonText isLoading={isLoading}>{item?.type || "-"}</SkeletonText>
      </Td>

      <Td>
        <CodeIDVerified
          isLoading={isLoading}
          verified_at={item?.verified_at}
        ></CodeIDVerified>
      </Td>
    </Tr>
  )
}

export default memo(CodeIDTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.item === next.item
})
