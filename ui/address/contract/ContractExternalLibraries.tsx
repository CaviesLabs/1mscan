import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  StackDivider,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"

import type { SmartContractExternalLibrary } from "types/api/contract"

import { getLanguage } from "languages/useLanguage"
import useIsMobile from "lib/hooks/useIsMobile"
import IconSvg from "ui/shared/IconSvg"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"

interface Props {
  className?: string
  data: Array<SmartContractExternalLibrary>
  isLoading?: boolean
}

const Item = (data: SmartContractExternalLibrary) => {
  return (
    <Flex flexDir="column" py={2} w="100%" rowGap={1}>
      <Box>{data.name}</Box>
      <AddressEntityV2
        address={{ hash: data.address_hash, is_contract: true }}
        fontWeight={500}
      />
    </Flex>
  )
}

const ContractExternalLibraries = ({ className, data, isLoading }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isMobile = useIsMobile()

  if (isLoading) {
    return <Skeleton h={8} w="150px" borderRadius="base" />
  }

  if (data.length === 0) {
    return null
  }

  const button = (
    <Button
      className={className}
      size="sm"
      variant="outline"
      colorScheme="gray"
      onClick={onToggle}
      isActive={isOpen}
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      textStyle="875"
      color="neutral.light.6"
      borderRadius="0.5rem"
      px={2}
      aria-label="View external libraries"
    >
      <span>
        {data.length} {data.length > 1 ? "Libraries" : "Library"}{" "}
      </span>
      <IconSvg name="status/warning" boxSize={5} color="orange.400" ml="2px" />
      <IconSvg
        name="arrows/east-mini"
        transform={isOpen ? "rotate(90deg)" : "rotate(-90deg)"}
        transitionDuration="faster"
        boxSize={5}
        ml={2}
      />
    </Button>
  )

  const content = (
    <>
      <Heading size="sm">
        {getLanguage("address.external_libraries")} ({data.length})
      </Heading>
      <Alert variant="verifyContract" colorScheme="orange" mt={4}>
        {getLanguage(
          "address.the_linked_library_s_source_code_may_not_be_the_real_one_check_the_source_code_at_the_library_address_if_any_if_you_want_to_be_sure_in_case_if_there_is_any_library_linked",
        )}
      </Alert>
      <VStack
        divider={<StackDivider borderColor="divider" />}
        spacing={2}
        mt={4}
        maxH={{ lg: "50vh" }}
        overflowY="scroll"
      >
        {data.map((item) => (
          <Item key={item.address_hash} {...item} />
        ))}
      </VStack>
    </>
  )

  if (isMobile) {
    return (
      <>
        {button}
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalContent paddingTop={4}>
            <ModalCloseButton />
            {content}
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start" isLazy>
      <PopoverTrigger>{button}</PopoverTrigger>
      <PopoverContent w="400px">
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ContractExternalLibraries
