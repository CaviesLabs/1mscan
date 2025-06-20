import { Stack } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  title: ReactNode
  children: ReactNode
  isLoading?: boolean
}

const HomeValidatorsStat = ({ title, children, isLoading }: Props) => {
  return (
    <Stack
      padding={3}
      borderColor="neutral.light.3"
      borderWidth={1}
      backgroundColor="neutral.light.1"
      borderRadius={2}
      gap={1}
      justifyContent="space-between"
    >
      {title && (
        <SkeletonText
          isLoading={isLoading}
          color="neutral.light.7"
          textStyle="8125"
        >
          {title}
        </SkeletonText>
      )}
      {children}
    </Stack>
  )
}

export default memo(HomeValidatorsStat, (prev, next) => {
  return prev.title === next.title && prev.children === next.children
})
