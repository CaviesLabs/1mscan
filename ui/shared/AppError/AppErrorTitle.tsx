import { Heading } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"

interface Props {
  title: ReactNode
}

const AppErrorTitle = ({ title }: Props) => {
  return (
    <Heading
      textStyle="225"
      letterSpacing="-0.0675rem"
      color="neutral.light.8"
      fontFamily="body"
      wordBreak="break-word"
      whiteSpace="normal"
      textAlign="center"
      overflow="hidden"
    >
      {title}
    </Heading>
  )
}

export default memo(AppErrorTitle, (prev, next) => {
  return prev.title === next.title
})
