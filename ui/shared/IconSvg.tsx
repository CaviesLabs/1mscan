import { Box, type BoxProps, Skeleton, chakra } from "@chakra-ui/react"
import { omit } from "lodash"
import type { IconName } from "public/icons/name"
import { type ForwardedRef, memo } from "react"
import type { OptimizationImageProps } from "./OptimizationImage"
import OptimizationImage from "./OptimizationImage"

export type { IconName }

export const href = "/icons/sprite.svg"

// Define props for component.
export type Props = (
  | ({ src: string } & { name?: never })
  | ({ name: IconName } & { src?: never })
) & {
  alt?: string
  isLoading?: boolean
  isDisabled?: boolean
  optimizationImageProps?: Partial<OptimizationImageProps>
  ref?: ForwardedRef<HTMLDivElement>
} & BoxProps

export type IconSvgProps = Omit<Props, "src" | "name">

const IconSvg = ({
  name,
  src,
  isLoading,
  alt,
  isDisabled,
  onClick,
  optimizationImageProps,
  ref,
  ...props
}: Props) => {
  if (isLoading) {
    return (
      <Skeleton
        height="full"
        width="full"
        {...omit(props, "color", "backgroundColor", "background")}
      ></Skeleton>
    )
  }

  return (
    <Box
      ref={ref}
      flexShrink={0}
      position="relative"
      height="full"
      width="full"
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
      {...props}
    >
      {name && (
        <chakra.svg w="100%" h="100%">
          <use href={`${href}#${name}`} />
        </chakra.svg>
      )}
      {src && (
        <OptimizationImage
          alt={alt || src}
          w="100%"
          h="100%"
          src={src}
          {...optimizationImageProps}
        />
      )}
    </Box>
  )
}

export default memo(IconSvg)
