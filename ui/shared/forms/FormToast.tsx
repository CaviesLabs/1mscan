import { EventEmitter } from "events"
import {
  Center,
  Code,
  type CodeProps,
  HStack,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react"
import { chainKey } from "configs/frontend/chain/utils"
import { route } from "nextjs-routes"
import type { ForwardedRef, ReactNode } from "react"
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import type { ProfileContentState } from "../../profile/ProfileModal"
import ProfileModal from "../../profile/ProfileModal"
import { multipleRef } from "../../utils/dom"
import IconSvg from "../IconSvg"
import LinkExternal from "../LinkExternal"
import CopyToClipboardAsync from "../copyToClipboard/CopyToClipboardAsync"

type Props = {
  //
}

type FormToastState = {
  //
} & ProfileContentState

type ToastInfo = {
  title?: ReactNode
  content?: ReactNode
  description?: ReactNode
  code?: string
  tx?: string
}

type FormToastEvent = {
  success: [ToastInfo | undefined]
  error: [ToastInfo | undefined]
  close: []
}

const FormToastEventEmitter = new EventEmitter<FormToastEvent>()

const FormError = ({
  code,
  ...props
}: {
  code: string
} & CodeProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [code])

  useEffect(() => {
    setTimeout(() => {
      const codeContentElement = codeRef?.current?.querySelector("span")
      const codeHeight = codeRef.current?.getBoundingClientRect().height || 0
      const codeContentHeight =
        codeContentElement?.getBoundingClientRect().height || 0

      if (codeHeight < codeContentHeight) {
        setIsTruncated(true)
      } else {
        setIsTruncated(false)
      }
    }, 50)
  }, [code, codeRef?.current])

  return (
    <Code
      tabIndex={1}
      variant="error"
      gap={1}
      alignItems="stretch"
      isTruncated
      maxWidth="full"
      justifyContent="space-between"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      {...props}
    >
      <HStack justifyContent="space-between" flexShrink={1}>
        <Text color="secondary.05.text" textStyle="1">
          Error message
        </Text>
        <CopyToClipboardAsync setValue={() => code} />
      </HStack>

      <Text
        ref={codeRef}
        flex={1}
        maxWidth="full"
        overflow="hidden"
        noOfLines={isOpen ? undefined : 3}
      >
        <chakra.span whiteSpace="pre-line" wordBreak="break-word">
          {code}
        </chakra.span>
      </Text>
      {isTruncated && (
        <chakra.span
          flexShrink={1}
          textStyle="875"
          color="accent.blue"
          _hover={{
            textDecoration: "underline",
          }}
          cursor="pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          View {isOpen ? "less" : "more"}
        </chakra.span>
      )}
    </Code>
  )
}

const FormToast = (props: Props, parentRef: ForwardedRef<FormToastState>) => {
  const ref = useRef<FormToastState>(null)
  const [title, setTitle] = useState<ReactNode>()
  const [content, setContent] = useState<ReactNode>()
  const [code, setCode] = useState<string>()
  const [status, setStatus] = useState<"success" | "error">()
  const [tx, setTx] = useState<string>()
  const [description, setDescription] = useState<ReactNode>()

  const handleClean = useCallback(() => {
    setTitle(undefined)
    setContent(undefined)
    setCode(undefined)
    setTx(undefined)
    setDescription(undefined)
    setStatus(undefined)
  }, [])

  useEffect(() => {
    const successListener = (info?: ToastInfo) => {
      ref.current?.onClose()
      setStatus("success")
      setTitle(info?.title || undefined)
      setContent(info?.content || undefined)
      setCode(info?.code || undefined)
      setTx(info?.tx || undefined)
      setDescription(info?.description || undefined)
      ref.current
        ?.onOpen()
        .catch((error) => {
          console.warn(error?.description)
        })
        .finally(handleClean)
    }
    const errorListener = (info?: ToastInfo) => {
      ref.current?.onClose()
      setStatus("error")
      setTitle(info?.title || undefined)
      setContent(info?.content || undefined)
      setCode(info?.code || undefined)
      setTx(info?.tx || undefined)
      setDescription(info?.description || undefined)
      ref.current
        ?.onOpen()
        .catch((error) => {
          console.warn(error?.description)
        })
        .finally(handleClean)
    }
    const closeListener = () => {
      ref.current?.onClose()
      handleClean()
    }
    FormToastEventEmitter.on("success", successListener)
    FormToastEventEmitter.on("error", errorListener)
    FormToastEventEmitter.on("close", closeListener)
    return () => {
      FormToastEventEmitter.off("success", successListener)
      FormToastEventEmitter.off("error", errorListener)
      FormToastEventEmitter.off("close", closeListener)
    }
  }, [])
  return (
    <ProfileModal
      ref={(el) => {
        multipleRef(el, parentRef, ref)
      }}
      sx={{ gap: "0px !important" }}
      onSubmit={undefined}
      footerMoreInfoProps={{
        display: "none",
      }}
      actionsProps={{ marginTop: 6, flex: 1 }}
      cancelProps={{
        flex: 1,
        height: "3rem",
        variant: "ghost",
      }}
      headerProps={{
        justifyContent: "flex-end",
      }}
      width={{
        base: "calc(100vw - 2rem)",
        lg: "30rem",
      }}
      modalProps={{
        scrollBehavior: "outside",
      }}
    >
      <VStack spacing={6}>
        <Center
          alignSelf="stretch"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          padding={6}
        >
          <Center
            position="relative"
            width="8.75rem"
            height="7.5rem"
            borderRadius="base"
            boxShadow="0px -2px 8px -2px rgba(0, 0, 0, 0.06), 0px 24px 48px -24px rgba(27, 0, 43, 0.10), 0px 12px 24px -4px rgba(27, 0, 43, 0.24)"
            borderWidth="1px"
            borderColor="neutral.light.1"
            backgroundColor={
              status === "success" ? "#3C8847" : "rgba(211, 182, 240, 0.80)"
            }
          >
            <IconSvg
              boxSize="5.25rem"
              name={
                status === "success" ? "status/file-success" : "status/electron"
              }
            ></IconSvg>
          </Center>
        </Center>

        <Text color="neutral.light.8" textStyle="125" textAlign="center">
          {title ??
            ((status === "success" && "Successful") ||
              (status === "error" && "Transaction failed") ||
              "")}
        </Text>

        <Text
          color="neutral.light.7"
          textStyle="1"
          _empty={{ display: "none" }}
        >
          {description ??
            ((status === "error" && "Oops! Something went wrong.") || "")}
        </Text>

        {content && (
          <Text color="neutral.light.7" textStyle="1">
            {content}
          </Text>
        )}
        {code && <FormError code={code} />}
        {tx && (
          <LinkExternal
            textAlign="center"
            href={route({
              pathname: "/tx/[hash]",
              query: {
                hash: tx,
                chain: chainKey,
              },
            })}
          >
            View details transaction
          </LinkExternal>
        )}
      </VStack>
    </ProfileModal>
  )
}

export const useFormToast = () => ({
  success: (info?: ToastInfo) => {
    FormToastEventEmitter.emit("success", info)
  },
  error: (info?: ToastInfo) => {
    FormToastEventEmitter.emit("error", info)
  },
  close: () => {
    FormToastEventEmitter.emit("close")
  },
})

export default memo(forwardRef(FormToast))
