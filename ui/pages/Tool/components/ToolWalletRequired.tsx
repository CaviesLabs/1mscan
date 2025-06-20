import { Center, chakra } from "@chakra-ui/react"
import { type PropsWithChildren, memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import {
  type IConnectType,
  useGlobalWallet,
} from "ui/shared/globalWallet/useGlobalWallet"
import PackItem from "./PackItem"
import ToolButton from "./ToolButton"

type Props = {
  addressType: IConnectType | undefined
  title: string
  isPending?: boolean
} & PropsWithChildren

const ToolWalletRequired = ({
  addressType,
  title,
  children,
  isPending,
}: Props) => {
  const { isConnected, onConnect } = useGlobalWallet({
    tracking: addressType,
  })
  if (isConnected && !isPending) {
    return children
  }
  return (
    <PackItem
      spacing={5}
      childrenProps={{
        alignItems: "center",
        justifyContent: "center",
        paddingY: "5rem",
        paddingX: 5,
        spacing: 5,
      }}
      isPending={isPending}
    >
      <Center
        rounded="full"
        borderWidth="1px"
        boxSize="5rem"
        borderColor="neutral.light.4"
      >
        <IconSvg
          name="tools/wallet"
          boxSize="2.25rem"
          color="neutral.light.7"
        />
      </Center>
      <chakra.span color="neutral.light.7" textStyle="1">
        {title}
      </chakra.span>
      <ToolButton
        onClick={() => {
          onConnect?.()
        }}
      >
        Connect wallet
      </ToolButton>
    </PackItem>
  )
}

export default memo(ToolWalletRequired, (prev, next) => {
  return (
    prev.addressType === next.addressType &&
    prev.title === next.title &&
    prev.isPending === next.isPending &&
    prev.children === next.children
  )
})
