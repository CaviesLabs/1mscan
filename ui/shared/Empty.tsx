import type { CenterProps, LayoutProps, TextProps } from "@chakra-ui/react"
import { Center, Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import IconSvg from "./IconSvg"

type Props = {
  text?: React.ReactNode
  boxSize?: LayoutProps["boxSize"]
  textProps?: TextProps
} & Partial<CenterProps>

const Empty = ({ text, boxSize, textProps, ...props }: Props) => {
  return (
    <Center flexDirection="column" flex={1} padding={4} {...props}>
      <IconSvg name="empty" boxSize={boxSize ?? "10rem"}></IconSvg>
      <Text
        textStyle="1"
        color="neutral.light.7"
        textAlign="center"
        {...textProps}
      >
        {text ?? getLanguage("utils.no_data_found")}
      </Text>
    </Center>
  )
}

export type EmptyProps = Props

export default memo(Empty)
