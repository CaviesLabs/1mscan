import { Stack, type StackProps, type TextProps } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import type { FieldError } from "react-hook-form"
import Loading from "ui/shared/Loading"
import SkeletonText from "ui/shared/text/SkeletonText"

type Props = {
  title?: ReactNode
  children: ReactNode
  titleProps?: TextProps
  childrenProps?: StackProps
  isLoading?: boolean
  error?: FieldError
  isDisabled?: boolean
  isPending?: boolean
} & StackProps

const PackItem = ({
  title,
  children,
  titleProps,
  childrenProps,
  isLoading,
  error,
  isDisabled,
  isPending,
  ...props
}: Props) => {
  return (
    <Stack
      aria-disabled={isDisabled}
      aria-invalid={Boolean(error)}
      _disabled={{
        opacity: 0.5,
        pointerEvents: "none",
      }}
      _invalid={{
        borderColor: "accent.red",
      }}
      spacing={2}
      {...props}
    >
      {title && (
        <SkeletonText
          isLoading={isLoading}
          color="neutral.light.5"
          textStyle="87500"
          {...titleProps}
        >
          {title}
        </SkeletonText>
      )}
      <Stack
        paddingX={3}
        paddingY={2}
        rounded={2}
        backgroundColor="neutral.light.1"
        borderColor="neutral.light.4"
        borderWidth="1px"
        {...childrenProps}
      >
        {isPending ? <Loading alignSelf="center" margin="auto" /> : children}
      </Stack>
      {error && (
        <SkeletonText
          alignSelf="flex-end"
          color="accent.red"
          textStyle="875"
          isLoading={isLoading}
        >
          {error.message}
        </SkeletonText>
      )}
    </Stack>
  )
}

export type PackItemProps = Partial<Props>

export default memo(
  PackItem,
  (prev, next) =>
    prev.isLoading === next.isLoading &&
    prev.children === next.children &&
    prev.title === next.title &&
    prev.isPending === next.isPending,
)
