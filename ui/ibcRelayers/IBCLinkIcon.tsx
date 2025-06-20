import type { CenterProps } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"
import { memo } from "react"
import type { IBCChainDetails } from "types/api/ibcRelayer"
import IconSvg from "ui/shared/IconSvg"

type Props = {
  isLoading?: boolean
  state: IBCChainDetails["state"]
} & Partial<CenterProps>

const IBCLinkIcon = ({ state, isLoading, ...props }: Props) => {
  return (
    <Center boxSize="3rem" {...props}>
      <IconSvg
        width={5}
        height={5}
        isLoading={isLoading}
        color={`secondary.${(state === "OPEN" && "02") || (state === "CLOSE" && "05")}.text`}
        name={
          (state === "OPEN" && "link-connect") ||
          (((state === "CLOSE" && "unlink") || undefined) as any)
        }
      ></IconSvg>
    </Center>
  )
}

export default memo(IBCLinkIcon, (prev, next) => {
  return prev.isLoading === next.isLoading && prev.state === next.state
})
