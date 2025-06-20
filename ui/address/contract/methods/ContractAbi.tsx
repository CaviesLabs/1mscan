import { Accordion, Button, Flex, Skeleton, Text } from "@chakra-ui/react"
import _range from "lodash/range"
import React from "react"

import type { SmartContractMethod } from "./types"

import ContractAbiItem from "./ContractAbiItem"
import useFormSubmit from "./useFormSubmit"
import useScrollToMethod from "./useScrollToMethod"

interface Props {
  abi: Array<SmartContractMethod>
  addressHash: string | undefined
  isLoading?: boolean
}

const ContractAbi = ({ abi, addressHash, isLoading }: Props) => {
  const [expandedSections, setExpandedSections] = React.useState<Array<number>>(
    abi.length === 1 ? [0] : [],
  )
  const [id, setId] = React.useState(0)

  useScrollToMethod(abi, setExpandedSections)

  const handleFormSubmit = useFormSubmit({ addressHash: addressHash || "" })

  const handleAccordionStateChange = React.useCallback(
    (newValue: Array<number>) => {
      setExpandedSections(newValue)
    },
    [],
  )

  const handleExpandAll = React.useCallback(() => {
    if (!abi) {
      return
    }

    if (expandedSections.length < abi.length) {
      setExpandedSections(_range(0, abi.length))
    } else {
      setExpandedSections([])
    }
  }, [abi, expandedSections.length])

  const handleReset = React.useCallback(() => {
    setId((id) => id + 1)
  }, [])

  return (
    <Flex flexDirection="column" width="full" gap={3}>
      <Flex justifyContent="space-between">
        <Skeleton isLoaded={!isLoading}>
          <Text color="neutral.light.8" textStyle="1500">
            Contract information
          </Text>
        </Skeleton>

        <Flex alignItems="center" gap={3}>
          {abi.length > 1 && (
            <Skeleton isLoaded={!isLoading}>
              <Button variant="tertiary" onClick={handleExpandAll}>
                {expandedSections.length === abi.length ? "Collapse" : "Expand"}{" "}
                all
              </Button>
            </Skeleton>
          )}
          <Skeleton isLoaded={!isLoading}>
            <Button variant="tertiary" onClick={handleReset}>
              Reset
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
        {abi.map((item, index) => (
          <ContractAbiItem
            key={[index, isLoading ? "loading_" + index : "loaded"].join("-")}
            data={item}
            id={id}
            index={index}
            addressHash={addressHash}
            onSubmit={handleFormSubmit}
          />
        ))}
      </Accordion>
    </Flex>
  )
}

export default React.memo(ContractAbi)
