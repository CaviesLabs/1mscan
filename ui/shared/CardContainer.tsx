import { Flex, type FlexProps, Text, type TextProps } from "@chakra-ui/react"

export const InfoCardContainer = ({
  children,
  ...props
}: { children: React.ReactNode } & FlexProps) => {
  return (
    <Flex
      p="20px"
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral.light.3"
      flexDir="column"
      gap="20px"
      bg="white"
      {...props}
    >
      {children}
    </Flex>
  )
}

export const InfoCardContainerTitle = ({
  children,
  ...props
}: { children: React.ReactNode } & TextProps) => {
  return (
    <Text fontSize="20px" fontWeight="600" color="neutral.light.8" {...props}>
      {children}
    </Text>
  )
}
