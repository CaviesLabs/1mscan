import { Flex, Text } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"

interface Props {
  title?: ReactNode
  children?: ReactNode
}

const ContractVerificationFormGroup = ({ title, children }: Props) => {
  return (
    <Flex flexDirection="column" gap={3} width="full">
      {title && <Text variant="light8">{title}</Text>}
      {children}
    </Flex>
  )
}

export default memo(ContractVerificationFormGroup, (prev, next) => {
  return prev.title === next.title && prev.children === next.children
})
