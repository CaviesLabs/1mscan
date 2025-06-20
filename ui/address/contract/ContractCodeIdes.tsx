import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  chakra,
  useDisclosure,
} from "@chakra-ui/react"
import { appHost } from "configs/frontend/chain/api"
import { chainKey } from "configs/frontend/chain/utils"
import { getLanguage } from "languages/useLanguage"
import React from "react"
import IconSvg from "ui/shared/IconSvg"
import { default as LinkExternal } from "ui/shared/LinkExternal"
import OptimizationImage from "ui/shared/OptimizationImage"

interface Props {
  className?: string
  hash: string
  isLoading?: string
}

const ContractCodeIde = ({ className, hash, isLoading }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  if (isLoading) {
    return <Skeleton h={8} w="92px" borderRadius="base" />
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start" isLazy>
      <PopoverTrigger>
        <Button
          className={className}
          size="sm"
          variant="primary"
          onClick={onToggle}
          isActive={isOpen}
          aria-label="Open source code in IDE"
          px={2}
          h="2.25rem"
          textStyle="1"
          flexShrink={0}
        >
          <span>{getLanguage("address.open_in")}</span>
          <IconSvg
            name="arrows/east-mini"
            transform={isOpen ? "rotate(90deg)" : "rotate(-90deg)"}
            transitionDuration="faster"
            boxSize={5}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="240px">
        <PopoverBody>
          <chakra.span color="text_secondary" fontSize="xs">
            {getLanguage("address.redactors")}
          </chakra.span>
          <Flex
            flexDir="column"
            alignItems="flex-start"
            columnGap={6}
            rowGap={3}
            mt={3}
          >
            <LinkExternal
              key="Remix IDE"
              href={`https://remix.ethereum.org/?address=${hash}&blockscout=${appHost + `/${chainKey}`}`}
              display="inline-flex"
              alignItems="center"
            >
              <OptimizationImage
                alt="remix_ide"
                src="/images/remix.svg"
                mr={2}
                hasWrapper
                wrapperProps={{
                  boxSize: 5,
                }}
              />
              Remix IDE
            </LinkExternal>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(chakra(ContractCodeIde))
