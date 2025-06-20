import { Td, Tr } from "@chakra-ui/react"
import { chainKey } from "configs/frontend/chain/utils"
import { getLanguage } from "languages/useLanguage"
import _ from "lodash"
import { route } from "nextjs-routes"
import { memo } from "react"
import type { AddressesItem } from "types/api/addresses"
import type { OSType } from "types/base"
import CurrencyValue from "ui/shared/CurrencyValue"
import LinkExternal from "ui/shared/LinkExternal"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  item: AddressesItem
  isLoading: boolean | undefined
  index: number
  page: number
  osType: OSType
}

const TopAccounTableItem = ({
  item,
  isLoading,
  index,
  page,
  osType,
}: Props) => {
  return (
    <Tr role="group">
      <Td>
        <SkeletonText isLoading={isLoading}>
          {(page - 1) * 50 + index + 1}
        </SkeletonText>
      </Td>
      <Td>
        <AddressEntityV2
          address={item}
          isLoading={isLoading}
          truncation="constant"
          headLength={10}
          tailLength={10}
        />
      </Td>
      <Td textAlign="right">
        {_.chain(item)
          .thru((item) => {
            if (item.association) {
              return (
                <LinkExternal
                  display="inline-flex"
                  isLoading={isLoading}
                  href={route({
                    pathname: "/address/[hash]",
                    query: {
                      hash:
                        osType === "Cosmos"
                          ? item.association.evm_hash
                          : item.association.sei_hash,
                      chain: chainKey,
                    },
                  })}
                >
                  {getLanguage("top_accounts_page.associated_values.yes")}
                </LinkExternal>
              )
            }
            return (
              <SkeletonText isLoading={isLoading} textAlign="right">
                {getLanguage("top_accounts_page.associated_values.no")}
              </SkeletonText>
            )
          })
          .value()}
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.coin_balance}
          isLoading={isLoading}
          osType={osType}
        />
      </Td>

      <Td textAlign="right">
        <CurrencyValue
          value={item.tx_count}
          decimals={0}
          accuracy={0}
          isLoading={isLoading}
        ></CurrencyValue>
      </Td>
    </Tr>
  )
}

export default memo(TopAccounTableItem, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.item.hash === next.item.hash &&
    prev.index === next.index &&
    prev.page === next.page
  )
})
