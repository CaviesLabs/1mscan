import { Text, type TextProps, Th, Tr } from "@chakra-ui/react"
import { memo } from "react"

type Props = {} & TextProps

const TableNotice = ({ children, ...props }: Props) => {
  return (
    <Tr>
      <Th colSpan={100} borderBottomWidth="0px !important">
        <Text
          textStyle="8125"
          color="neutral.light.7"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          {...props}
        >
          {children}
        </Text>
      </Th>
    </Tr>
  )
}

export default memo(TableNotice)
