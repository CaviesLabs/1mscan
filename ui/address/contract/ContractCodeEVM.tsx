import { Alert, Flex, chakra } from "@chakra-ui/react"
import type React from "react"
import { memo, useMemo } from "react"

import type { SmartContract } from "types/api/contract"

import { getLanguage } from "languages/useLanguage"
import useApiQuery from "lib/api/useApiQuery"
import type { Address } from "types/api/address"
import DataListDisplay from "ui/shared/DataListDisplay"
import RawDataSnippet from "ui/shared/RawDataSnippet"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import ContractCodeInfo from "./ContractCodeInfo"
import ContractSourceCode from "./ContractSourceCode"
import ContractVerificationButton from "./ContractVerificationButton"
import { generateCloneContractBytecode } from "./utils"

type Props = {
  hash: string | undefined
  address: Address | undefined
  contract: SmartContract | undefined
  isLoading?: boolean
}

const ContractCodeEVM = ({
  contract,
  hash,
  address,
  isLoading: _isLoading,
}: Props) => {
  const minimalImplementAddress = useMemo(() => {
    if (!address?.implementations?.length || !contract?.deployed_bytecode)
      return undefined

    return address.implementations.find((implementation) => {
      const eip1167Bytecode = generateCloneContractBytecode(
        implementation.address,
      )

      if (eip1167Bytecode === contract.deployed_bytecode) {
        return implementation
      }
    })?.address
  }, [address?.implementations, contract?.deployed_bytecode])

  const { data: implementationAddress, isFetching: isFetchingImplementation } =
    useApiQuery("address", {
      pathParams: { hash: minimalImplementAddress },
      queryOptions: {
        enabled: Boolean(minimalImplementAddress),
      },
    })

  const {
    data: implementationContract,
    isFetching: isFetchingImplementationContract,
  } = useApiQuery("contract", {
    pathParams: { hash: minimalImplementAddress },
    queryOptions: {
      enabled: Boolean(minimalImplementAddress),
    },
  })

  const data = useMemo(() => {
    if (implementationContract) {
      return implementationContract
    }
    return contract
  }, [implementationContract, contract])

  const canBeVerified = !data?.is_self_destructed && !data?.is_verified

  const isLoading =
    _isLoading || isFetchingImplementation || isFetchingImplementationContract

  return (
    <DataListDisplay>
      <ContractCodeInfo
        isLoading={isLoading}
        data={data}
        addressHash={hash}
        minimalImplementAddress={minimalImplementAddress}
      ></ContractCodeInfo>

      <Flex marginTop={5} flexDir="column" rowGap={5}>
        {(() => {
          let constructorArgs = undefined as React.ReactNode | undefined
          if (!data?.decoded_constructor_args) {
            constructorArgs = data?.constructor_args
          } else {
            constructorArgs = (
              <Flex flexDirection="column" gap={4}>
                <span>{data.constructor_args}</span>

                {data.decoded_constructor_args.map(
                  ([value, { name, type }], index) => {
                    const valueEl =
                      type === "address" ? (
                        <AddressEntityV2
                          address={{ hash: value }}
                          noIcon
                          display="inline-flex"
                          maxW="100%"
                          truncation="tail"
                        />
                      ) : (
                        <span>{value}</span>
                      )

                    return (
                      <Flex key={index} gap={1}>
                        <chakra.span width="15rem">
                          Arg [{index}] {name || ""} ({type}):{" "}
                        </chakra.span>
                        {valueEl}
                      </Flex>
                    )
                  },
                )}
              </Flex>
            )
          }
          if (!constructorArgs) return <></>
          return (
            <RawDataSnippet
              showCopy={!canBeVerified}
              data={constructorArgs}
              title={getLanguage("address.constructor_arguments")}
              isLoading={isLoading}
            />
          )
        })()}

        {data?.source_code && (
          <ContractSourceCode
            address={minimalImplementAddress || hash!}
            implementations={
              implementationAddress?.implementations ||
              address?.implementations ||
              []
            }
          />
        )}
        {data?.compiler_settings ? (
          <RawDataSnippet
            showCopy={!canBeVerified}
            data={JSON.stringify(data.compiler_settings, undefined, 4)}
            title={getLanguage("address.compiler_settings")}
            isLoading={isLoading}
          />
        ) : null}
        {data?.abi && (
          <RawDataSnippet
            showCopy={!canBeVerified}
            data={JSON.stringify(data?.abi, undefined, 4)}
            title={getLanguage("address.contract_abi")}
            isLoading={isLoading}
          />
        )}
        {data?.creation_bytecode && (
          <RawDataSnippet
            showCopy={!canBeVerified}
            data={data.creation_bytecode}
            title={getLanguage("address.contract_creation_code")}
            rightSlot={
              canBeVerified && (
                <ContractVerificationButton
                  isLoading={isLoading}
                  addressHash={hash!}
                ></ContractVerificationButton>
              )
            }
            beforeSlot={
              data.is_self_destructed ? (
                <Alert status="info" whiteSpace="pre-wrap" mb={3}>
                  {getLanguage(
                    "address.contracts_that_self_destruct_in_their_constructors_have_no_contract_code_published_and_cannot_be_verified_displaying_the_init_data_provided_of_the_creating_transaction",
                  )}
                </Alert>
              ) : null
            }
            isLoading={isLoading}
          />
        )}
        {data?.deployed_bytecode && (
          <RawDataSnippet
            showCopy={!canBeVerified}
            data={data.deployed_bytecode}
            title={getLanguage("address.deployed_bytecode")}
            rightSlot={
              !data?.creation_bytecode &&
              canBeVerified && (
                <ContractVerificationButton
                  isLoading={isLoading}
                  addressHash={hash!}
                ></ContractVerificationButton>
              )
            }
            isLoading={isLoading}
          />
        )}
      </Flex>
    </DataListDisplay>
  )
}

export default memo(ContractCodeEVM, (prev, next) => {
  return (
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.contract === next.contract &&
    prev.address === next.address
  )
})
