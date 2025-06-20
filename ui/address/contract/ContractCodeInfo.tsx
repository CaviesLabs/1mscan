import { Alert, Box, Flex, Skeleton, Text, chakra } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { route } from "nextjs-routes"
import { memo, useCallback } from "react"
import type { SmartContract } from "types/api/contract"
import Divider from "ui/shared/Divider"
import IconSvg from "ui/shared/IconSvg"
import LinkExternal from "ui/shared/LinkExternal"
import LinkInternal from "ui/shared/LinkInternal"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import DetailsInfoGroup from "ui/shared/group/DetailsInfoGroup"
import InfoItem from "ui/shared/group/InfoItem"
import TruncatedTextTooltip from "ui/shared/truncate/TruncatedTextTooltip"
import ContractVerificationButton from "./ContractVerificationButton"

type Props = {
  isLoading: boolean
  data: SmartContract | undefined
  addressHash: string | undefined
  minimalImplementAddress: string | undefined
}

const ContractInfoContent = ({
  children,
  isLoading,
}: {
  children: React.ReactNode
  isLoading: boolean
}) => {
  return (
    <Skeleton isLoaded={!isLoading} overflow="hidden">
      <TruncatedTextTooltip label={children}>
        <Text isTruncated color="neutral.light.6" textStyle="1">
          {children}
        </Text>
      </TruncatedTextTooltip>
    </Skeleton>
  )
}

const ContractCodeInfo = ({
  isLoading,
  data,
  addressHash,
  minimalImplementAddress,
}: Props) => {
  const verifiedTime = useCallback(() => {
    try {
      const date = new Date(data?.verified_at as any)
      return date.toLocaleString()
    } catch (err) {
      console.warn("Error parsing date", err)
      return ""
    }
  }, [data])

  const rows = [
    data?.name && (
      <InfoItem
        key="name"
        isTruncated
        overflow="hidden"
        color="neutral.light.6"
        fontSize="1rem"
        lineHeight="1.5rem"
        fontWeight={500}
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="Contract name"
        displayPadding="none"
      >
        <ContractInfoContent isLoading={isLoading}>
          {data?.name}
        </ContractInfoContent>
      </InfoItem>
    ),

    data?.evm_version && (
      <InfoItem
        key="evm_version"
        isTruncated
        overflow="hidden"
        color="neutral.light.6"
        fontSize="1rem"
        lineHeight="1.5rem"
        fontWeight={500}
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="EVM version"
        displayPadding="none"
      >
        <ContractInfoContent isLoading={isLoading}>
          {data?.evm_version}
        </ContractInfoContent>
      </InfoItem>
    ),
    data?.optimization_runs && (
      <InfoItem
        key="optimization_runs"
        isTruncated
        overflow="hidden"
        color="neutral.light.6"
        fontSize="1rem"
        lineHeight="1.5rem"
        fontWeight={500}
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="Optimization runs"
        displayPadding="none"
      >
        <ContractInfoContent isLoading={isLoading}>
          {String(data?.optimization_runs)}
        </ContractInfoContent>
      </InfoItem>
    ),
    data?.file_path && (
      <InfoItem
        key="file_path"
        isTruncated
        overflow="hidden"
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="Contract file path"
        displayPadding="none"
        wordBreak="break-word"
      >
        <ContractInfoContent isLoading={isLoading}>
          {data?.file_path}
        </ContractInfoContent>
      </InfoItem>
    ),
    data?.compiler_version && (
      <InfoItem
        key="compiler_version"
        isTruncated
        overflow="hidden"
        color="neutral.light.6"
        fontSize="1rem"
        lineHeight="1.5rem"
        fontWeight={500}
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="Compiler version"
        displayPadding="none"
      >
        <ContractInfoContent isLoading={isLoading}>
          {data?.compiler_version}
        </ContractInfoContent>
      </InfoItem>
    ),
    typeof data?.optimization_enabled === "boolean" && (
      <InfoItem
        key="optimization_enabled"
        isTruncated
        overflow="hidden"
        color="neutral.light.6"
        fontSize="1rem"
        lineHeight="1.5rem"
        fontWeight={500}
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="Optimization enabled"
        displayPadding="none"
      >
        <ContractInfoContent isLoading={isLoading}>
          {data?.optimization_enabled ? "True" : "False"}
        </ContractInfoContent>
      </InfoItem>
    ),
    data?.verified_at && (
      <InfoItem
        key="verified_at"
        isTruncated
        overflow="hidden"
        color="neutral.light.6"
        fontSize="1rem"
        lineHeight="1.5rem"
        fontWeight={500}
        titleProps={{
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 500,
        }}
        py={0}
        title="Verified at"
        displayPadding="none"
      >
        <ContractInfoContent isLoading={isLoading}>
          {verifiedTime()}
        </ContractInfoContent>
      </InfoItem>
    ),
  ].filter(Boolean)

  return (
    <Flex flexDir="column" rowGap={5} _empty={{ display: "none" }}>
      {minimalImplementAddress && (
        <Skeleton isLoaded={!isLoading}>
          <Alert
            variant="verifyContract"
            colorScheme="orange"
            flexWrap="wrap"
            whiteSpace="pre-wrap"
            gap={0}
          >
            <span>{getLanguage("address.minimal_proxy_contract_for")} </span>
            <Flex display="inline-flex" gap={0}>
              <AddressEntityV2
                address={{
                  hash: minimalImplementAddress,
                  is_contract: true,
                  implementations: null,
                }}
                truncation="constant"
                headLength={4}
                tailLength={4}
                noCopy
              />
              <span>. </span>
            </Flex>
            <Box>
              <LinkExternal
                noIcon
                textStyle="875"
                href="https://eips.ethereum.org/EIPS/eip-1167"
                display="inline-flex"
              >
                EIP-1167
              </LinkExternal>
              <span>
                {" "}
                -{" "}
                {getLanguage(
                  "address.minimal_bytecode_implementation_that_delegates_all_calls_to_a_known_address",
                )}
              </span>
            </Box>
          </Alert>
        </Skeleton>
      )}

      {data?.is_verified && (
        <Skeleton isLoaded={!isLoading}>
          <Alert
            variant="success"
            flexWrap="wrap"
            gap={3}
            display="flex"
            alignItems="center"
          >
            <Flex
              alignItems="center"
              gap={3}
              fontSize="0.875rem"
              lineHeight={5}
            >
              {data.is_partially_verified ? (
                <IconSvg
                  boxSize={4}
                  name="loading"
                  color="secondary.02"
                ></IconSvg>
              ) : (
                <IconSvg
                  boxSize={4}
                  name="status/success"
                  color="secondary.02"
                ></IconSvg>
              )}
              {getLanguage("address.contract_source_code_verified")} (
              {data.is_partially_verified
                ? getLanguage("address.partial")
                : getLanguage("address.exact")}{" "}
              {getLanguage("address.match")})
            </Flex>
            {data.is_partially_verified && addressHash && (
              <ContractVerificationButton
                isLoading={isLoading}
                addressHash={addressHash}
              ></ContractVerificationButton>
            )}
          </Alert>
        </Skeleton>
      )}
      {/* {verificationAlert} */}
      {data?.is_changed_bytecode && (
        <Alert variant="verifyContract" colorScheme="orange">
          {getLanguage(
            "address.warning_contract_bytecode_has_been_changed_and_does_not_match_the_verified_one_therefore_interaction_with_this_smart_contract_may_be_risky",
          )}
        </Alert>
      )}
      {!data?.is_verified &&
        data?.verified_twin_address_hash &&
        !minimalImplementAddress && (
          <Alert
            variant="verifyContract"
            colorScheme="orange"
            flexDirection="column"
            alignItems="flex-start"
            textStyle="1"
            gap={1}
          >
            <Box width="full">
              <chakra.span>
                {getLanguage(
                  "address.contract_is_not_verified_however_we_found_a_verified_contract_with_the_same_bytecode_in_1mscan_db",
                )}
              </chakra.span>
              <AddressEntityV2
                address={{
                  hash: data.verified_twin_address_hash,
                  is_contract: true,
                  implementations: null,
                }}
                noIcon
                width="fit-content"
                flexShrink={0}
                display="inline-flex"
              />
            </Box>
            <Box width="full">
              <chakra.span>
                {getLanguage(
                  "address.all_functions_displayed_below_are_from_abi_of_that_contract_in_order_to_verify_current_contract_proceed_with",
                )}
              </chakra.span>
              <LinkInternal
                href={route({
                  pathname: "/address/[hash]/contract-verification",
                  query: { hash: addressHash || "" },
                })}
              >
                {getLanguage("address.verify_&_publish")}
              </LinkInternal>
              <span> {getLanguage("address.page")}</span>
            </Box>
          </Alert>
        )}

      {data?.is_verified && (
        <Flex
          justifyContent="space-between"
          gap={{ base: 3, lg: "2.5rem", xl: "5rem" }}
          alignItems="stretch"
          borderWidth="1px"
          borderColor="neutral.light.3"
          borderRadius="0.5rem"
          flexWrap="wrap"
          overflow="hidden"
          padding={{ base: 4, lg: 5 }}
          flexDirection={{ base: "column", lg: "row" }}
          backgroundColor="neutral.light.1"
        >
          <DetailsInfoGroup
            backgroundColor="neutral.light.1"
            border={0}
            flex={1}
            overflow="hidden"
            padding={0}
            contentProps={{ padding: 0 }}
          >
            {rows.slice(0, Math.ceil(rows.length / 2))}
          </DetailsInfoGroup>
          <Divider
            orientation="vertical"
            py={0}
            alignSelf="stretch"
            height="unset"
            display={{ lg: "none" }}
          ></Divider>
          <DetailsInfoGroup
            backgroundColor="neutral.light.1"
            border={0}
            flex={1}
            overflow="hidden"
            padding={0}
            contentProps={{ padding: 0 }}
          >
            {rows.slice(Math.ceil(rows.length / 2))}
          </DetailsInfoGroup>
        </Flex>
      )}
    </Flex>
  )
}

export default memo(ContractCodeInfo, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.data === next.data &&
    prev.addressHash === next.addressHash &&
    prev.minimalImplementAddress === next.minimalImplementAddress
  )
})
