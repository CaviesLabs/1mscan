import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  Box,
  Flex,
  Text,
  Tooltip,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { Element } from "react-scroll"

import type { FormSubmitHandler, SmartContractMethod } from "./types"

import { route } from "nextjs-routes"

import CopyToClipboard from "ui/shared/CopyToClipboard"
import Hint from "ui/shared/Hint"
import Tag from "ui/shared/chakra/Tag"

import Divider from "ui/shared/Divider"
import ExpandIcon from "ui/shared/ExpandIcon"
import IconSvg from "ui/shared/IconSvg"
import ContractMethodForm from "./form/ContractMethodForm"
import { getElementName } from "./useScrollToMethod"

interface Props {
  data: SmartContractMethod
  index: number
  id: number
  addressHash: string | undefined
  onSubmit: FormSubmitHandler
}

const ContractAbiItem = ({ data, index, id, addressHash, onSubmit }: Props) => {
  const [attempt, setAttempt] = React.useState(0)

  const url = React.useMemo(() => {
    if (!("method_id" in data)) {
      return ""
    }

    return route({
      pathname: "/address/[hash]",
      query: {
        hash: addressHash ?? "",
        tab: "contract",
        contract: "read_contract",
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

  const handleCopyMethodIdClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
    },
    [],
  )

  const handleReset = React.useCallback(() => {
    setAttempt((prev) => prev + 1)
  }, [])

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
            name={"method_id" in data ? getElementName(data.method_id) : ""}
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
                    label={hasCopied ? "Copied!" : "Copy link"}
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
                <Text textStyle="400" color="neutral.light.8" mr={1}>
                  {index + 1}.{" "}
                  {data.type === "fallback" || data.type === "receive"
                    ? data.type
                    : data.name}
                </Text>
              </Flex>

              <Flex alignItems="center">
                {data.type === "fallback" && (
                  <Hint
                    label={`The fallback function is executed on a call to the contract if none of the other functions match 
                     the given function signature, or if no data was supplied at all and there is no receive Sei function. 
                     The fallback function always receives data, but in order to also receive Sei it must be marked payable.`}
                  />
                )}
                {data.type === "receive" && (
                  <Hint
                    label={`The receive function is executed on a call to the contract with empty calldata. 
                 This is the function that is executed on plain Sei transfers (e.g. via .send() or .transfer()). 
                 If no such function exists, but a payable fallback function exists, the fallback function will be called on a plain Sei transfer. 
                 If neither a receive Sei nor a payable fallback function is present, 
                 the contract cannot receive Sei through regular transactions and throws an exception.`}
                  />
                )}
                {"method_id" in data && (
                  <>
                    <Tag>{data.method_id}</Tag>
                    <CopyToClipboard
                      text={`${data.name} (${data.method_id})`}
                      onClick={handleCopyMethodIdClick}
                    />
                  </>
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
              {"is_invalid" in data && data.is_invalid ? (
                <Alert variant="verifyContract" colorScheme="orange">
                  An error occurred while parsing the method signature.
                </Alert>
              ) : (
                <ContractMethodForm
                  key={id + "_" + index + "_" + attempt}
                  data={data}
                  attempt={attempt}
                  onSubmit={onSubmit}
                  onReset={handleReset}
                  isOpen={isExpanded}
                />
              )}
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

export default React.memo(ContractAbiItem)
