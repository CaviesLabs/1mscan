import type { ChakraProps } from "@chakra-ui/react"
import { Skeleton } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { debounce } from "lodash"
import type React from "react"
import { memo, useCallback, useState } from "react"
import IconSvg, { type IconSvgProps } from "ui/shared/IconSvg"
import { proxy } from "valtio"
import TooltipV2 from "../tootltip/TooltipV2"

export type Props = {
  isLoading?: boolean
  color?: ChakraProps["color"]
  setValue: (event: React.MouseEvent) => Promise<any> | any
  wrapperProps?: ChakraProps
} & Partial<IconSvgProps>

const copyToClipboard = async (text: string) => {
  try {
    await navigator?.clipboard?.writeText?.(text)
  } catch (err) {
    console.error("Failed to copy: ", err)
  }
}

const CopyToClipboardAsync = ({
  isLoading,
  setValue,
  onClick,
  wrapperProps,
  ...props
}: Props) => {
  const [isWaiting, setIsWaiting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [store] = useState(
    proxy<{ value: string; cached: AnyFunction | null }>({
      value: "",
      cached: null,
    }),
  )

  const handleRebounce = useCallback(
    debounce(() => setIsCopied(false), 3000),
    [],
  )

  const handleCopied = useCallback(() => {
    setIsCopied(true)
    handleRebounce()
  }, [])

  const handleClick = useCallback(
    async (e: React.MouseEvent, onClick: any, setValue: any) => {
      onClick?.(e)
      if (store.cached && store.cached === setValue) {
        await copyToClipboard(store.value).catch(console.log)
        handleCopied()
        return
      }

      store.cached = setValue

      let pmOrValue = setValue?.(e)

      if (pmOrValue instanceof Promise) {
        setIsWaiting(true)
        pmOrValue = await pmOrValue.catch((error) => {
          console.log(error)
          return ""
        })
      }

      const value = String(pmOrValue || "")

      store.value = value

      await copyToClipboard(value).catch(console.log)
      handleCopied()
      setIsWaiting(false)
    },
    [],
  )

  return (
    <Skeleton
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      isLoaded={!isLoading}
      {...wrapperProps}
    >
      <TooltipV2
        placement="top"
        label={
          isCopied
            ? getLanguage("utils.copied")
            : getLanguage("utils.copy_to_clipboard")
        }
        isDisabled={isLoading || isWaiting}
      >
        <IconSvg
          as="button"
          name="copy"
          color="neutral.light.5"
          _groupHover={{
            color: "neutral.light.6",
            _hover: {
              color: "accent.blue",
            },
          }}
          _hover={{
            color: "accent.blue",
          }}
          transitionProperty="color"
          transitionDuration="normal"
          transitionTimingFunction="ease-in-out"
          boxSize={5}
          display="inline-block"
          flexShrink={0}
          onClick={(e) => handleClick(e, onClick, setValue)}
          borderRadius={0}
          {...props}
          isLoading={isWaiting}
        />
      </TooltipV2>
    </Skeleton>
  )
}

export type CopyToClipboardAsyncProps = Partial<Props>

export default memo(CopyToClipboardAsync, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.setValue === next.setValue &&
    prev.onClick === next.onClick &&
    prev.isDisabled === next.isDisabled
  )
})
