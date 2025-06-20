import { Skeleton, type TextProps, chakra } from "@chakra-ui/react"
import { type ForwardedRef, type ReactNode, memo } from "react"

type Props = {
  children: ReactNode
  isLoading?: boolean
  ref?: ForwardedRef<HTMLSpanElement>
} & TextProps

// const TEXT_PROPS = [
//   "as",
//   "noOfLines",
//   "fontWeight",
//   "fontSize",
//   "fontStyle",
//   "letterSpacing",
//   "textDecoration",
//   "textTransform",
//   "lineHeight",
//   "textAlign",
//   "verticalAlign",
//   "wordBreak",
//   "textStyle",
//   "color",
//   "backgroundColor",
//   "bg",
//   "bgColor",
//   "background",
//   "border",
//   "borderColor",
//   "borderWidth",
//   "borderStyle",
//   "gap",
//   "columnGap",
//   "rowGap",
//   "flexWrap",
//   "justifyContent",
//   "alignItems",
//   "isTruncated",
//   "display",
// ];

const SkeletonText = ({
  children,
  isLoading,
  whiteSpace,
  ref,
  ...props
}: Props) => {
  // const [textProps, otherProps] = useSplitProps(props, TEXT_PROPS);

  const textSlot = (
    <chakra.span
      display="inline-flex"
      whiteSpace={whiteSpace}
      borderColor="neutral.light.4"
      _empty={{
        display: "none",
      }}
      alignItems="center"
      {...props}
      ref={ref}
    >
      {children}
    </chakra.span>
  )

  if (isLoading)
    return (
      <Skeleton
        display="inline-flex"
        whiteSpace={whiteSpace}
        isLoaded={!isLoading}
        {...props}
      >
        {textSlot}
      </Skeleton>
    )

  return textSlot
}

export default memo(SkeletonText)
