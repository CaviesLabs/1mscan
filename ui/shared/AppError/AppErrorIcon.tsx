import { type BoxProps, Stack, chakra, useToken } from "@chakra-ui/react"
import { memo } from "react"

// const ICONS: Record<string, IconName> = {
//   "404": "error-pages/404",
//   "403": "error-pages/403",
//   "422": "error-pages/422",
//   "429": "error-pages/429",
//   "500": "error-pages/500",
// };

type Props = {
  status: number | undefined
} & BoxProps

const AppErrorIcon = ({ status, children, ...props }: Props) => {
  const neutralLight3 = useToken("colors", "neutral.light.3")

  return (
    <Stack
      width="full"
      textAlign="center"
      paddingX={4}
      overflow="hidden"
      position="relative"
      minHeight="40rem"
      flex={1}
      {...props}
    >
      <chakra.span
        fontSize="clamp(150px, 20vw, 700px)"
        fontWeight="bold"
        userSelect="none"
        color="neutral.light.2"
        lineHeight="2"
        minHeight="100%"
        sx={{
          WebkitTextStroke: "clamp(2px, 0.15vw, 0.5rem)",
          WebkitTextStrokeColor: neutralLight3,
        }}
      >
        {status ?? 500}
      </chakra.span>
      {children}
    </Stack>
  )
}

export default memo(AppErrorIcon, (prev, next) => prev.status === next.status)
