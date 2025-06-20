import type { BoxProps, ImageProps } from "@chakra-ui/react"
import { Skeleton } from "@chakra-ui/react"
import type { ComponentType } from "react"
import { Suspense, memo } from "react"
import IconSVGV2Trigger from "./IconSVGV2Trigger"

export type IconSVGV2Data =
  | {
      data:
        | Promise<ComponentType<any> | null | undefined>
        | ComponentType<any>
        | null
        | undefined
      src?: undefined
    }
  | {
      src: string
      data?: undefined
    }

export type IconSVGV2Size =
  | {
      width: BoxProps["width"]
      height: BoxProps["height"]
      boxSize?: undefined
    }
  | {
      boxSize: BoxProps["boxSize"]
      width?: undefined
      height?: undefined
    }

type Props = {
  fallback?: ComponentType<any>
  isLoading?: boolean
  isDisabled?: boolean
  imageProps?: Partial<ImageProps>
  alt?: string
} & Omit<BoxProps, "data" | "width" | "height" | "boxSize"> &
  IconSVGV2Data &
  IconSVGV2Size

const IconSVGV2 = ({ fallback: Fallback = Skeleton, ...props }: Props) => {
  return (
    <Suspense fallback={<Fallback width="100%" height="100%" {...props} />}>
      <IconSVGV2Trigger fallback={Fallback} {...props} />
    </Suspense>
  )
}

export type IconSVGV2Props = Partial<Props>

export default memo(IconSVGV2)
