import { Accordion, Button, Flex, Skeleton, Text } from "@chakra-ui/react"
import _range from "lodash/range"
import React from "react"
import { scroller } from "react-scroll"

import type { SmartContractMethod } from "types/api/contract"

import { getLanguage } from "languages/useLanguage"
import ContractMethodsAccordionItem from "./ContractMethodsAccordionItem"

interface Props<T extends SmartContractMethod> {
  data: Array<T>
  addressHash?: string
  renderItemContent: (item: T, index: number, id: number) => React.ReactNode
  isLoading?: boolean
}

const ContractMethodsAccordion = <T extends SmartContractMethod>({
  data,
  addressHash,
  renderItemContent,
  isLoading,
}: Props<T>) => {
  const [expandedSections, setExpandedSections] = React.useState<Array<number>>(
    data.length === 1 ? [0] : [],
  )
  const [id, setId] = React.useState(0)

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "")

    if (!hash) {
      return
    }

    const index = data.findIndex(
      (item) => "method_id" in item && item.method_id === hash,
    )
    if (index > -1) {
      scroller.scrollTo(`method_${hash}`, {
        duration: 500,
        smooth: true,
        offset: -100,
      })
      setExpandedSections([index])
    }
  }, [data])

  const handleAccordionStateChange = React.useCallback(
    (newValue: Array<number>) => {
      setExpandedSections(newValue)
    },
    [],
  )

  const handleExpandAll = React.useCallback(() => {
    if (!data) {
      return
    }

    if (expandedSections.length < data.length) {
      setExpandedSections(_range(0, data.length))
    } else {
      setExpandedSections([])
    }
  }, [data, expandedSections.length])

  const handleReset = React.useCallback(() => {
    setId((id) => id + 1)
  }, [])

  if (data.length === 0) {
    return null
  }

  return (
    <Flex flexDirection="column" gap={3}>
      <Flex justifyContent="space-between">
        <Skeleton isLoaded={!isLoading}>
          <Text
            color="neutral.light.8"
            fontSize="1rem"
            lineHeight="1.5rem"
            fontWeight={400}
          >
            {getLanguage("address.contract_information")}
          </Text>
        </Skeleton>

        <Flex alignItems="center" gap={3}>
          {data.length > 1 && (
            <Skeleton isLoaded={!isLoading}>
              <Button variant="tertiary" onClick={handleExpandAll}>
                {expandedSections.length === data.length
                  ? getLanguage("address.collapse")
                  : getLanguage("address.expand")}{" "}
                {getLanguage("address.all")}
              </Button>
            </Skeleton>
          )}
          <Skeleton isLoaded={!isLoading}>
            <Button variant="tertiary" onClick={handleReset}>
              {getLanguage("address.reset")}
            </Button>
          </Skeleton>
        </Flex>
      </Flex>
      <Accordion
        allowMultiple
        position="relative"
        onChange={handleAccordionStateChange}
        index={expandedSections}
        display="flex"
        flexDirection="column"
        gap={2}
        width="full"
      >
        {data.map((item, index) => (
          <ContractMethodsAccordionItem
            key={index + "_" + isLoading}
            data={item}
            id={id}
            index={index}
            isLoading={isLoading}
            addressHash={addressHash}
            renderContent={
              renderItemContent as (
                item: SmartContractMethod,
                index: number,
                id: number,
              ) => React.ReactNode
            }
          />
        ))}
      </Accordion>
    </Flex>
  )
}

export default React.memo(ContractMethodsAccordion)
