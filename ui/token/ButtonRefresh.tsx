import type { ButtonProps } from "@chakra-ui/react"
import { Button, Skeleton, chakra, useToast } from "@chakra-ui/react"
import useApiFetch from "lib/api/useApiFetch"
import { useShallowLayoutMemoRef } from "lib/hooks/useShallow"
import { LocalStorageProvider } from "lib/providers/storage.provider"
import { memo, useCallback, useEffect, useState } from "react"
import IconSvg from "ui/shared/IconSvg"
import TooltipV2 from "ui/shared/tootltip/TooltipV2"

type Props = ButtonProps & {
  id: string
  hash: string
  refetch: AnyFunction
  isLoading?: boolean
}

const ButtonRefresh = ({ id, hash, isLoading, refetch, ...props }: Props) => {
  const storage = LocalStorageProvider.getInstance()

  const toast = useToast()
  const apiFetch = useApiFetch()
  const [counter, setCounter] = useState(
    Number(storage.getItem(`refresh_counter_${hash}_${id}`) ?? "0"),
  )
  const [isFetching, setIsFetching] = useState(false)

  const couterRef = useShallowLayoutMemoRef(() => counter, [counter])

  const timer = useCallback(
    (initTick: number) => {
      let tick = initTick
      setCounter(tick)
      storage.setItem(`refresh_counter_${hash}_${id}`, tick.toString())

      const interval = setInterval(() => {
        if (tick <= 0) {
          clearInterval(interval)
          storage.removeItem(`refresh_counter_${hash}_${id}`)
        } else {
          setCounter(--tick)
          storage.setItem(`refresh_counter_${hash}_${id}`, tick.toString())
        }
      }, 1000)
    },
    [storage, hash, id, setCounter],
  )

  const refresh = useCallback(() => {
    if (couterRef.current <= 0) {
      setIsFetching(true)

      timer(10)

      apiFetch("refresh_metadata", {
        fetchParams: {
          method: "PUT",
          body: { refresh_metadata_for_existed_nft: "true" },
        },
        pathParams: { hash: hash, id: encodeURIComponent(id) },
      })
        .then(() => {
          refetch()
          toast({
            position: "top-right",
            title: "Success",
            description:
              "Metadata refresh has been added to the queue, please come back shortly to see new updates",
            status: "success",
            variant: "subtle",
            isClosable: true,
          })
        })
        .catch(() => {
          toast({
            position: "top-right",
            title: "Error",
            description: "Failed to refresh token metadata",
            status: "error",
            variant: "subtle",
            isClosable: true,
          })
        })
        .finally(() => {
          setIsFetching(false)
        })
    }
  }, [hash, id])

  useEffect(() => {
    const tick = Number(storage.getItem(`refresh_counter_${hash}_${id}`) ?? "0")
    setCounter(tick)

    timer(tick)
  }, [hash, id])

  return (
    <TooltipV2
      label={`Can refresh after ${counter}s`}
      isDisabled={counter <= 0}
    >
      <Skeleton isLoaded={!isLoading}>
        <Button
          variant="tertiary"
          alignSelf="flex-start"
          display="flex"
          gap={2}
          size="sm"
          paddingX="0.625rem"
          paddingY={2}
          isLoading={isFetching}
          height="2.25rem"
          minWidth="5.9375rem"
          onClick={(e) => {
            e.preventDefault()
            refresh()
          }}
          isDisabled={counter > 0}
          {...props}
        >
          <IconSvg name="refresh" color="inherit" boxSize={4} />
          <chakra.span textStyle="875">Refresh</chakra.span>
        </Button>
      </Skeleton>
    </TooltipV2>
  )
}

export default memo(ButtonRefresh, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.hash === next.hash &&
    prev.isLoading === next.isLoading &&
    prev.refetch === next.refetch
  )
})
