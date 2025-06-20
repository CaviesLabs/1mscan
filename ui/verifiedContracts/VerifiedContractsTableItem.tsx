import { Flex, Td, Tr } from "@chakra-ui/react"
import BigNumber from "bignumber.js"

import type { VerifiedContract } from "types/api/contracts"

import config from "configs/app"
import moment from "lib/date/moment"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

interface Props {
  data: VerifiedContract
  isLoading?: boolean
}

const VerifiedContractsTableItem = ({ data, isLoading }: Props) => {
  const balance =
    data.coin_balance && data.coin_balance !== "0"
      ? BigNumber(data.coin_balance)
          .div(10 ** config.chain.currency.decimals)
          .dp(6)
          .toFormat()
      : "0"

  return (
    <Tr role="group">
      <Td>
        <AddressEntityV2
          address={data.address}
          isLoading={isLoading}
          // noCopy
          gap={1}
          showAddress
          iconProps={{
            alignSelf: "flex-start",
          }}
          copyProps={{
            wrapperProps: {
              alignSelf: "flex-end",
            },
          }}
        />
      </Td>
      <Td textAlign="left">
        <SkeletonText isLoading={isLoading} textStyle="875">
          {balance}
        </SkeletonText>
      </Td>
      <Td textAlign="right">
        <SkeletonText isLoading={isLoading} textStyle="875">
          {data.tx_count ? data.tx_count.toLocaleString() : "0"}
        </SkeletonText>
      </Td>
      <Td>
        {/* <Flex flexWrap="wrap" columnGap={2}> */}
        <SkeletonText isLoading={isLoading} textTransform="capitalize">
          {data.language}
        </SkeletonText>
        <SkeletonText
          ml={1}
          isLoading={isLoading}
          color="neutral.light.6"
          wordBreak="break-all"
        >
          <span>{data.compiler_version}</span>
        </SkeletonText>
        {/* </Flex> */}
      </Td>

      <Td textAlign="right">
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          width="full"
          columnGap={1}
        >
          <IconSvg
            name="status/success"
            boxSize={4}
            color="green.500"
            isLoading={isLoading}
          />
          <SkeletonText isLoading={isLoading}>
            {moment(data.verified_at).fromNow()}
          </SkeletonText>
        </Flex>
      </Td>
    </Tr>
  )
}

export default memo(VerifiedContractsTableItem, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.data === next.data
})
