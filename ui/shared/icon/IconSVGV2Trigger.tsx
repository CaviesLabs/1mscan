"use client"

import {
  Center,
  type FlexProps,
  Image,
  type ImageProps,
  Skeleton,
} from "@chakra-ui/react"
import { type ComponentType, memo, use, useMemo } from "react"
import type { IconSVGV2Data } from "./IconSVGV2"

type Props = IconSVGV2Data & {
  fallback: ComponentType<any>
  isLoading?: boolean
  imageProps?: Partial<ImageProps>
  isDisabled?: boolean
  alt?: string
} & Omit<FlexProps, "data">

const IconSVGV2Trigger = ({
  data,
  fallback: Fallback = Skeleton,
  isLoading,
  children,
  src,
  alt,
  imageProps,
  isDisabled,
  onClick,
  ...props
}: Props & {}) => {
  const pm = useMemo(() => Promise.resolve(data), [data])

  const Data = use<ComponentType<any> | null | undefined>(pm)

  return (
    <Center
      aria-disabled={isDisabled}
      _disabled={{
        opacity: 0.5,
        cursor: "default",
      }}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
          e.stopPropagation()
        } else {
          onClick?.(e)
        }
      }}
      flexShrink={0}
      overflow="hidden"
      {...props}
    >
      {(isLoading && <Fallback width="100%" height="100%" />) ||
        (Data && <Data style={{ width: "100%", height: "100%" }} />) ||
        (src && (
          <Image
            alt={alt || src}
            width="100%"
            height="100%"
            src={src}
            {...imageProps}
          />
        )) ||
        children}
    </Center>
  )
}

export default memo(IconSVGV2Trigger)
