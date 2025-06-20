import type { BoxProps } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { shapes } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import type { Options } from "@dicebear/shapes"
import { memo, useMemo } from "react"

type IconProps = {
  hash: string | undefined
  size: number
  color?: string
} & Partial<BoxProps>

type Props = IconProps

const COLORS = Object.freeze([
  "01888C", // teal
  "FC7500", // bright orange
  "034F5D", // dark teal
  "F73F01", // orangered
  "FC1960", // magenta
  "C7144C", // raspberry
  "F3C100", // goldenrod
  "1598F2", // lightning blue
  "2465E1", // sail blue
  "F19E02", // gold
]) as string[]

const SHAPES = Object.freeze([
  "ellipseFilled",
  "polygonFilled",
  "rectangleFilled",
]) as Options["shape1"]

export const createAvatarUri = (
  hash: string | undefined | null,
  size: number,
) => {
  if (!hash) return ""
  return createAvatar(shapes, {
    size: size,
    backgroundColor: COLORS,
    radius: 50,
    seed: hash,
    shape1: SHAPES,
    shape1Color: COLORS,
    shape2: SHAPES,
    shape2Color: COLORS,
    shape3: SHAPES,
    shape3Color: COLORS,
  }).toDataUri()
}

const AddressIdenticon = ({ size, hash, ...props }: Props) => {
  const avatar = useMemo(() => {
    return createAvatarUri(hash, size)
  }, [hash, size])
  return (
    <Image
      objectFit="cover"
      boxSize={`${size}px`}
      borderRadius="full"
      overflow="hidden"
      src={avatar}
      {...props}
    ></Image>
  )
}

export default memo(AddressIdenticon)
