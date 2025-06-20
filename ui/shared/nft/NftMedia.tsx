import { type BoxProps, Center, Skeleton, chakra } from "@chakra-ui/react"
import { type HTMLProps, memo, useCallback } from "react"
import { InView, type PlainChildrenProps } from "react-intersection-observer"
import { useSnapshot } from "valtio"
import { checkNFTType } from "./utils"

type Props = {
  url: string | null | undefined
  isLoading?: boolean
  type?: "image" | "video" | "html"
  fallback?: string
} & Partial<Omit<PlainChildrenProps, keyof HTMLProps<HTMLElement>>> &
  Partial<BoxProps>

const skeleton = (
  <Center
    overflow="hidden"
    borderRadius="0.4rem"
    position="absolute"
    inset={0}
    zIndex={1}
    maxWidth="100%"
    maxHeight="100%"
    backgroundColor="neutral.light.2"
  >
    <Skeleton borderRadius="0.4rem" boxSize="full" />
  </Center>
)

const NftMedia = ({
  url,
  isLoading,
  type,
  fallback = "/icons/nft-placeholder.svg",
  onClick,
  ...props
}: Props) => {
  // const _url = useMemo(() => urlParser(raw as any) || "", [raw]);
  const store = useStore<{
    cache: null | "" | string
    category: string
    url: string
    loaded: boolean
  }>({
    cache: null,
    category: "",
    url: "",
    loaded: false,
  })

  const handleLoad = useCallback(
    async (url: string) => {
      if (store.cache === url) return
      if (type) {
        store.category = type
        store.url = url
        store.loaded = true
        return
      }
      store.cache = url

      const category = await checkNFTType(url).catch(() => undefined)

      if (category) {
        store.category = category
        store.url = url
      } else {
        store.category = "image"
        store.url = ""
      }
      store.loaded = true
    },
    [type],
  )

  const onError = useCallback((src: string) => {
    if (src === fallback) return
    store.category = "image"
    store.url = ""
    store.loaded = true
  }, [])

  const snap = useSnapshot(store)

  return (
    <Center
      as={InView}
      width="100%"
      maxWidth="100%"
      position="relative"
      cursor="pointer"
      aspectRatio={1}
      skip={isLoading}
      triggerOnce
      delay={100}
      threshold={0}
      initialInView={false}
      onChange={(inView: boolean) => {
        if (inView) {
          handleLoad(url || "")
        }
      }}
      borderRadius="0.4rem"
      backgroundColor="neutral.light.1"
      overflow="hidden"
      data-blank={!snap.url}
      aria-busy={!snap.loaded}
      borderStyle="solid"
      sx={{
        '&[data-blank="true"]': {
          borderWidth: "1px",
          borderColor: "neutral.light.4",
          _loading: {
            borderWidth: 0,
          },
        },
        iframe: {
          pointerEvents: "none",
        },
      }}
      _loading={{
        borderWidth: 0,
      }}
      onClick={(e) => {
        if (isLoading) {
          e.preventDefault()
          return
        }
        onClick?.(e)
      }}
      {...props}
    >
      {!snap.loaded && skeleton}
      <Center
        as={
          (snap.category === "image" && chakra.img) ||
          (snap.category === "video" && chakra.video) ||
          (snap.category === "html" && chakra.iframe) ||
          "img"
        }
        width="full"
        height="full"
        objectFit="cover"
        transitionProperty="transform"
        transitionDuration="0.3s"
        transitionTimingFunction="ease-in-out"
        cursor="pointer"
        backgroundColor="neutral.light.1"
        borderRadius="0.4rem"
        overflow="hidden"
        _hover={{
          transform: {
            lg: "scale(1.2)",
          },
        }}
        onClick={(e) => e.preventDefault()}
        onError={(e: any) => {
          onError(e.currentTarget.src)
        }}
        {...((snap.category === "video" &&
          ({
            loading: "lazy",
            autoPlay: true,
            disablePictureInPicture: true,
            loop: true,
            muted: true,
            playsInline: true,
          } as object)) ||
          (snap.category === "html" && {
            sandbox: "",
            referrerPolicy: "no-referrer",
            allow: "",
          }) ||
          undefined)}
        zIndex={0}
        src={snap.url || fallback}
      ></Center>
    </Center>
  )
}

export type INftMediaProps = Props

export default memo(NftMedia, (prev, next) => {
  return (
    prev.url === next.url &&
    prev.isLoading === next.isLoading &&
    prev.type === next.type
  )
})
