import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Skeleton,
  Text,
  Tooltip,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { Element } from "react-scroll"

import type { SmartContractMethod } from "types/api/contract"

import { getLanguage } from "languages/useLanguage"
import { route } from "nextjs-routes"

import ExpandIcon from "ui/shared/ExpandIcon"
import Hint from "ui/shared/Hint"
import IconSvg from "ui/shared/IconSvg"

interface Props<T extends SmartContractMethod> {
  data: T
  index: number
  id: number
  addressHash?: string
  renderContent: (item: T, index: number, id: number) => React.ReactNode
  isLoading?: boolean
}

const ContractMethodsAccordionItem = <T extends SmartContractMethod>({
  data,
  index,
  id,
  addressHash,
  renderContent,
  isLoading,
}: Props<T>) => {
  const url = React.useMemo(() => {
    if (!("method_id" in data)) {
      return ""
    }

    return route({
      pathname: "/address/[hash]",
      query: {
        hash: addressHash ?? "",
        tab: "read_contract",
      },
      hash: data.method_id,
    })
  }, [addressHash, data])

  const { hasCopied, onCopy } = useClipboard(url, 1000)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCopyLinkClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onCopy()
    },
    [onCopy],
  )

  if (isLoading) {
    return (
      <Skeleton height="4.125rem" width="full" borderRadius="0.5rem"></Skeleton>
    )
  }
  return (
    <AccordionItem
      // as="section"
      // _first={{ borderTopWidth: 0 }}
      // _last={{ borderBottomWidth: 0 }}
      borderWidth="1px"
      borderColor="neutral.light.4"
      backgroundColor="neutral.light.1"
      borderRadius="0.5rem"
      padding={5}
    >
      {({ isExpanded }) => (
        <>
          {/* @ts-ignore */}
          <Element
            as="h2"
            name={"method_id" in data ? `method_${data.method_id}` : ""}
          >
            <AccordionButton
              _hover={{ bgColor: "inherit" }}
              wordBreak="break-all"
              textAlign="left"
              padding={0}
              display="flex"
              justifyContent="space-between"
            >
              <Flex alignItems="center" gap="0.625rem">
                {"method_id" in data && (
                  <Tooltip
                    label={
                      hasCopied
                        ? getLanguage("utils.copied")
                        : getLanguage("utils.copy")
                    }
                    isOpen={isOpen || hasCopied}
                    onClose={onClose}
                  >
                    <Box
                      boxSize={4}
                      color="neutral.light.7"
                      _hover={{ color: "primary.light.3" }}
                      onClick={handleCopyLinkClick}
                      onMouseEnter={onOpen}
                      onMouseLeave={onClose}
                    >
                      <IconSvg name="link" boxSize="full" />
                    </Box>
                  </Tooltip>
                )}
                <Text textStyle="400" fontWeight={400} mr={1}>
                  {index + 1}.{" "}
                  {data.type === "fallback" || data.type === "receive"
                    ? data.type
                    : data.name}
                </Text>
              </Flex>
              <Flex alignItems="center">
                {data.type === "fallback" && (
                  <Hint
                    isLoading={isLoading}
                    label={getLanguage(
                      "address.the_fallback_function_is_executed_on_a_call_to_the_contract_if_none_of_the_other_functions_match_the_given_function_signature_or_if_no_data_was_supplied_at_all_and_there_is_no_receive_ether_function_the_fallback_function_always_receives_data_but_in_order_to_also_receive_ether_it_must_be_marked_payable",
                    )}
                  />
                )}
                {data.type === "receive" && (
                  <Hint
                    label={getLanguage(
                      "address.the_receive_function_is_executed_on_a_call_to_the_contract_with_empty_calldata_this_is_the_function_that_is_executed_on_plain_ether_transfers_e_g_via_send_or_transfer_if_no_such_function_exists_but_a_payable_fallback_function_exists_the_fallback_function_will_be_called_on_a_plain_ether_transfer_if_neither_a_receive_ether_nor_a_payable_fallback_function_is_present_the_contract_cannot_receive_ether_through_regular_transactions_and_throws_an_exception",
                    )}
                  />
                )}

                <ExpandIcon isExpanded={isExpanded}></ExpandIcon>
              </Flex>
            </AccordionButton>
          </Element>
          <AccordionPanel padding={0} marginTop={4}>
            <Divider
              color="neutral.light.3"
              height="1px"
              width="full"
            ></Divider>
            <Flex flexDirection="column" gap={4} width="full" marginTop={4}>
              {renderContent(data, index, id)}
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default React.memo(ContractMethodsAccordionItem)
