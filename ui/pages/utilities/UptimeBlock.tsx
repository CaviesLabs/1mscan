import type { CenterProps } from "@chakra-ui/react"
import { Center, Skeleton, Text } from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"
import BigNumber from "bignumber.js"
import SuccessSVG from "public/icons/status/success.svg"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import PopoverShow from "ui/shared/PopoverModal/PopoverShow"
import Tag from "ui/shared/chakra/Tag"
import IconSVGV2 from "ui/shared/icon/IconSVGV2"
import type { IBlockUptimeStatus } from "./types"

type Props = {
  status: IBlockUptimeStatus
  isLoading?: boolean
  blockHeight: string
  noTooltip?: boolean
} & Partial<CenterProps>

const resize = keyframes`
  0% {
    transform: scale(1.2);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.85);
  }
  95% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const UptimeBlock = ({
  status,
  isLoading,
  blockHeight,
  noTooltip,
  ...props
}: Props) => {
  if (isLoading) {
    return <Skeleton width="1.25rem" height="1rem" borderRadius="0.25rem" />
  }
  return (
    <PopoverShow
      isDisabled={noTooltip}
      bodyProps={{
        padding: "0.25rem 0",
        overflowY: "auto",
        maxHeight: "15rem",
      }}
      trigger="hover"
      closeDelay={30}
      openDelay={10}
      content={
        <Center
          flexDirection="column"
          alignItems="center"
          gap={1}
          paddingX="1.25rem"
          paddingY="0.25rem"
          backgroundColor="neutral.light.1"
          borderRadius="0.25rem"
        >
          <Text textStyle="1" color="neutral.light.7">
            {BigNumber(blockHeight).toFormat(0)}
          </Text>

          <Tag colorScheme={status === "missed" ? "red" : "green"} gap={1}>
            <IconSVGV2 data={SuccessSVG} boxSize={4} />
            <Text textStyle="1">{status.capitalizeFirstLetter()}</Text>
          </Tag>
        </Center>
      }
    >
      <Center
        width="1.25rem"
        height="1rem"
        cursor="pointer"
        transform="scale(1)"
        transformOrigin="center left"
        borderRadius="0.25rem"
        backgroundColor={status === "missed" ? "accent.red" : "secondary.02"}
        borderColor="0.25rem"
        position="relative"
        _last={{ animation: `${resize} 0.25s ease-in-out` }}
        {...props}
      >
        {status === "proposed" && (
          <IconSvg
            name="check"
            color="neutral.light.1"
            width={5}
            height={4}
            borderRadius="full"
            overflow="hidden"
          ></IconSvg>
        )}
      </Center>
    </PopoverShow>
  )
}

export default memo(UptimeBlock, (prev, next) => {
  return prev.status === next.status && prev.isLoading === next.isLoading
})
