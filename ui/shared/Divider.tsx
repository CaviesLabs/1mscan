import type { BoxProps } from "@chakra-ui/react"
import { Box, Skeleton } from "@chakra-ui/react"
import type { RefObject } from "react"
import { memo, useMemo } from "react"
import type { IResponsive } from "ui/types/responsive"

type IOrientation = "horizontal" | "vertical"

type Props = {
  orientation?: IResponsive<IOrientation>
  isLoading?: boolean
  mode?: BoxProps["height"]
  ref?: RefObject<HTMLDivElement>
} & Partial<BoxProps>

const mapOrientationWidth = (
  orientation: IOrientation | undefined,
  mode: BoxProps["height"],
) =>
  (orientation === "horizontal" && (mode ?? "full")) ||
  (orientation === "vertical" && "1px") ||
  undefined

const mapOrientationHeight = (
  orientation: IOrientation | undefined,
  mode: BoxProps["height"],
) =>
  (orientation === "horizontal" && "1px") ||
  (orientation === "vertical" && (mode ?? "full")) ||
  undefined

const Divider = ({
  orientation = "horizontal",
  isLoading,
  mode = "full",
  ref,
  ...props
}: Props) => {
  const width = useMemo(
    () =>
      typeof orientation === "string"
        ? mapOrientationWidth(orientation, mode)
        : typeof orientation === "object"
          ? {
              base: mapOrientationWidth(orientation.base, mode),
              lg: mapOrientationWidth(orientation.lg, mode),
              "2lg": mapOrientationWidth(orientation["2lg"], mode),
              xl: mapOrientationWidth(orientation.xl, mode),
            }
          : "unset",
    [orientation],
  )

  const height = useMemo(
    () =>
      typeof orientation === "string"
        ? mapOrientationHeight(orientation, mode)
        : typeof orientation === "object"
          ? {
              base: mapOrientationHeight(orientation.base, mode),
              lg: mapOrientationHeight(orientation.lg, mode),
              "2lg": mapOrientationHeight(orientation["2lg"], mode),
              xl: mapOrientationHeight(orientation.xl, mode),
            }
          : "unset",
    [orientation],
  )

  if (isLoading)
    return (
      <Skeleton
        width={width}
        height={height}
        {...({ width: props?.width, height: props?.height } as any)}
      ></Skeleton>
    )
  return (
    <Box
      flexShrink={0}
      display="block"
      width={width as any}
      height={height as any}
      backgroundColor="neutral.light.4"
      {...props}
      ref={ref}
    ></Box>
  )
}

export default memo(Divider)
