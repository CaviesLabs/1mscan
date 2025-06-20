import {
  Box,
  type ButtonProps,
  Center,
  chakra,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react"
import { memo, useRef } from "react"
import IconSvg from "../IconSvg"
import { PopoverModalContent, PopoverModalTrigger } from "../PopoverModal"
import PopoverModalContextProvider from "../PopoverModal/PopoverModalContext"
import GlobalWalletContent from "./GlobalWalletContent"
import GlobalWalletModal from "./GlobalWalletModal"
import { useGlobalWallet } from "./useGlobalWallet"

type Props = {} & ButtonProps

const GlobalWallet = ({ ...props }: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure()
  const contentRef = useRef<HTMLDivElement | null>(null)

  useOutsideClick({
    ref: contentRef as any,
    handler: onClose,
  })

  const {
    evmHash,
    nativeHash,
    isEVMConnected,
    isNATIVEConnected,
    connectEVM,
    connectNATIVE,
    disconnectEVM,
    disconnectNATIVE,
    count,
  } = useGlobalWallet()

  return (
    <Box
      position={{
        base: "static",
        lg: "relative",
      }}
      {...props}
      ref={contentRef}
    >
      <GlobalWalletModal />
      <PopoverModalContextProvider isOpen={isOpen}>
        <PopoverModalTrigger>
          <chakra.button
            onClick={onToggle}
            data-active={isOpen || undefined}
            _active={{
              borderColor: "neutral.light.6",
              color: "neutral.light.7",
            }}
            display="flex"
            alignItems="center"
            whiteSpace="nowrap"
            flexShrink={0}
            gap={2}
            order={2}
            color="neutral.light.6"
            transitionProperty="width, height, border-color"
            transitionDuration="0.3s"
            transitionTimingFunction="ease-in-out"
            borderColor="neutral.light.4"
            paddingX={3}
            paddingY={2}
            borderWidth="1px"
            backgroundColor="neutral.light.1"
            borderRadius="1.5rem"
            _hover={{
              borderColor: "neutral.light.5",
              color: "neutral.light.7",
            }}
          >
            <IconSvg name="wallet" boxSize="20px" color="neutral.light.6" />
            <Center
              borderRadius="full"
              backgroundColor="secondary.03"
              overflow="hidden"
              boxSize={5}
            >
              <chakra.span
                textStyle="75"
                lineHeight="normal"
                color="neutral.light.1"
                whiteSpace="nowrap"
                display="block"
              >
                {count}
              </chakra.span>
            </Center>
          </chakra.button>
        </PopoverModalTrigger>

        <PopoverModalContent
          borderRadius="0.75rem"
          width={{
            base: "20rem",
            lg: "20rem",
          }}
          maxWidth={{
            base: "calc(100vw - 2rem)",
            lg: "calc(100vw - 2rem)",
          }}
          height={{
            base: "9.0625rem",
            lg: "9.0625rem",
          }}
          backgroundColor="neutral.light.1"
          position={{
            base: "absolute",
            lg: "absolute",
          }}
          left={{ base: "unset", lg: "unset" }}
          right={{
            base: "1rem",
            lg: "-1rem",
          }}
          overflow="hidden"
          top={{ base: "7rem", lg: "calc(100% + 0.5rem)" }}
        >
          <GlobalWalletContent
            evmHash={evmHash}
            isEVMConnected={isEVMConnected}
            connectEVM={connectEVM}
            disconnectEVM={disconnectEVM}
            nativeHash={nativeHash}
            isNATIVEConnected={isNATIVEConnected}
            connectNATIVE={connectNATIVE}
            disconnectNATIVE={disconnectNATIVE}
            onClose={onClose}
          />
        </PopoverModalContent>
      </PopoverModalContextProvider>
    </Box>
  )
}

export default memo(GlobalWallet, () => true)
