import type { BoxProps, ChakraProps, ImageProps } from "@chakra-ui/react"
import { Box, Image as ChakraImage, Skeleton, chakra } from "@chakra-ui/react"
import type {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from "next/legacy/image"
import NextImage from "next/legacy/image"
import type { ReactNode, RefAttributes } from "react"
import { forwardRef, useEffect, useMemo, useState, useTransition } from "react"

export function cdnLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(`https://assets.1mscan.com${src}`)
  url.searchParams.set("format", "auto")
  url.searchParams.set("width", width.toString())
  url.searchParams.set("quality", (quality || 75).toString())
  return url.href
}

const style = {
  WebkitTransform: "translateZ(0)",
  WebkitMaskImage: "-webkit-radial-gradient(circle, white 100%, black 100%)",
}

type BaseImageProps = Omit<NextImageProps, "src" | "fill"> &
  RefAttributes<HTMLImageElement> & {
    isCDN?: boolean
    hasWrapper?: boolean
    wrapperProps?: BoxProps
    src: NextImageProps["src"] | undefined | null
    isError?: boolean
    isLoading?: boolean
  } & Pick<ImageProps, "fallback">

const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>(
  (
    {
      hasWrapper,
      wrapperProps,
      src,
      fallback,
      onError,
      isCDN,
      isError: parentIsError,
      isLoading,
      ...props
    },
    ref,
  ) => {
    const [, startTransition] = useTransition()
    const [isError, setIsError] = useState(false)

    useEffect(() => {
      startTransition(() => {
        setIsError(false)
      })
    }, [src])

    useEffect(() => {
      if (typeof parentIsError === "boolean") {
        startTransition(() => {
          setIsError(parentIsError)
        })
      }
    }, [parentIsError])

    const imageContent = useMemo(() => {
      // Boring avatars
      if (src?.toString().includes("source.boringavatars")) {
        return (
          <ChakraImage
            src={src.toString()}
            style={style}
            {...(props as any)}
            onError={(e) => {
              if (!onError) {
                startTransition(() => {
                  setIsError(true)
                })
                return
              }
              onError(e)
            }}
            objectFit={props.objectFit || "cover"}
          />
        )
      }

      return (
        <NextImage
          layout="fill"
          objectFit="cover"
          src={String(src || "")}
          style={style}
          {...props}
          onError={(e) => {
            if (!onError) {
              startTransition(() => {
                setIsError(true)
              })
              return
            }
            onError(e)
          }}
          loader={isCDN ? cdnLoader : undefined}
        ></NextImage>
      )
    }, [src, isCDN, props])

    const content = isLoading ? (
      <Skeleton
        width="full"
        height="full"
        {...props}
        objectFit="cover"
      ></Skeleton>
    ) : isError && fallback ? (
      fallback
    ) : (
      imageContent
    )

    if (hasWrapper) {
      return (
        <Box position="relative" {...wrapperProps} ref={ref}>
          {content}
        </Box>
      )
    }
    return content
  },
)

export type OptimizationImageProps = BaseImageProps & Omit<ChakraProps, "fill">

const OptimizationImage = chakra<(props: OptimizationImageProps) => ReactNode>(
  BaseImage,
  {
    baseStyle: {},
    shouldForwardProp: (prop) =>
      [
        "ref",
        "width",
        "height",
        "src",
        "alt",
        "quality",
        "placeholder",
        "blurDataURL",
        "loader ",
        "loading",
        "priority",
        "layout",
        "isCDN",
        "fill",
        "hasWrapper",
        "wrapperProps",
        "fallback",
        "isError",
        "isLoading",
        "objectFit",
        "onError",
      ].includes(prop),
  },
)

export default OptimizationImage
