import { Flex, Select, Skeleton, Text } from "@chakra-ui/react"
import React from "react"

import type { AddressImplementation } from "types/api/addressParams"
import type { SmartContract } from "types/api/contract"

import useApiQuery from "lib/api/useApiQuery"
import * as stubs from "stubs/contract"
import CodeEditor from "ui/shared/monaco/CodeEditor"
import formatFilePath from "ui/shared/monaco/utils/formatFilePath"

import { getLanguage } from "languages/useLanguage"
import ContractCodeIdes from "./ContractCodeIdes"
import ContractExternalLibraries from "./ContractExternalLibraries"

function getEditorData(contractInfo: SmartContract | undefined) {
  if (!contractInfo || !contractInfo.source_code) {
    return undefined
  }

  const extension = (() => {
    switch (contractInfo.language) {
      case "vyper":
        return "vy"
      case "yul":
        return "yul"
      default:
        return "sol"
    }
  })()

  return [
    {
      file_path: formatFilePath(contractInfo.file_path || `index.${extension}`),
      source_code: contractInfo.source_code,
    },
    ...(contractInfo.additional_sources || []).map((source) => ({
      ...source,
      file_path: formatFilePath(source.file_path),
    })),
  ]
}

interface SourceContractOption {
  address: string
  label: string
}

interface Props {
  address: string
  implementations?: Array<AddressImplementation>
}

export const ContractSourceCode = ({ address, implementations }: Props) => {
  const options: Array<SourceContractOption> = React.useMemo(() => {
    return [
      { label: "Proxy", address },
      ...(implementations || [])
        .filter((item) => item.name && item.address !== address)
        .map(({ name, address }, item, array) => ({
          address,
          label: array.length === 1 ? "Implementation" : `Impl: ${name}`,
        })),
    ]
  }, [address, implementations])

  const [sourceContract, setSourceContract] =
    React.useState<SourceContractOption>(options[0])

  const contractQuery = useApiQuery("contract", {
    pathParams: { hash: sourceContract.address },
    queryOptions: {
      refetchOnMount: false,
      placeholderData: stubs.CONTRACT_CODE_VERIFIED,
    },
  })

  const editorData = React.useMemo(() => {
    return getEditorData(contractQuery.data)
  }, [contractQuery.data])

  const isLoading = contractQuery.isPlaceholderData

  const handleSelectChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextOption = options.find(
        ({ address }) => address === event.target.value,
      )
      if (nextOption) {
        setSourceContract(nextOption)
      }
    },
    [options],
  )

  const heading = (
    <Skeleton isLoaded={!isLoading} fontWeight={500}>
      <Text as="span" color="neutral.light.8" textStyle="1500">
        {getLanguage("address.contract_source_code")}
      </Text>
      {contractQuery.data?.language && (
        <Text
          whiteSpace="pre"
          as="span"
          textStyle="875"
          color="neutral.light.6"
          textTransform="capitalize"
        >
          {" "}
          ({contractQuery.data.language})
        </Text>
      )}
    </Skeleton>
  )

  const select =
    options.length > 1 ? (
      <Select
        size="xs"
        value={sourceContract.address}
        onChange={handleSelectChange}
        w="auto"
        maxW={{ lg: "200px", xl: "400px" }}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        textStyle="875"
        color="neutral.light.6"
        borderRadius="0.5rem"
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 2,
        }}
        minWidth="9.25rem"
        height="2.25rem"
      >
        {options.map((option) => (
          <option key={option.address} value={option.address}>
            {option.label}
          </option>
        ))}
      </Select>
    ) : null

  const externalLibraries = contractQuery.data?.external_libraries ? (
    <ContractExternalLibraries
      data={contractQuery.data.external_libraries}
      isLoading={isLoading}
    />
  ) : null

  const ides = (
    <ContractCodeIdes hash={sourceContract.address} isLoading={isLoading} />
  )

  // const copyToClipboard =
  //   contractQuery.data && editorData?.length === 1 ? (
  //     <CopyToClipboard
  //       text={contractQuery.data.source_code}
  //       isLoading={isLoading}
  //       ml={{ base: "auto", lg: "auto" }}
  //     />
  //   ) : null;

  const content = (() => {
    if (isLoading) {
      return <Skeleton h="557px" w="100%" />
    }

    if (!editorData) {
      return null
    }

    return (
      <CodeEditor
        key={sourceContract.address}
        data={editorData}
        remappings={contractQuery.data?.compiler_settings?.remappings}
        libraries={contractQuery.data?.external_libraries ?? undefined}
        language={contractQuery.data?.language ?? undefined}
        mainFile={editorData[0]?.file_path}
        contractName={contractQuery.data?.name ?? undefined}
      />
    )
  })()

  return (
    <section>
      <Flex alignItems="center" mb={3} columnGap={3} rowGap={2} flexWrap="wrap">
        {heading}
        {select}
        {externalLibraries}

        {ides}
        {/* {copyToClipboard} */}
      </Flex>
      {content}
    </section>
  )
}

export default React.memo(ContractSourceCode)
