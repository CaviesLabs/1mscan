import type { ButtonProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import type { IconName } from "public/icons/name"
import type { IconSvgProps } from "ui/shared/IconSvg"
import IconSvg from "ui/shared/IconSvg"

type Props = {
  src?: string
  name?: IconName
  iconSvgProps?: IconSvgProps
} & Partial<ButtonProps>

const WalletItem = ({ name, src, iconSvgProps, ...props }: Props) => {
  return (
    <Button
      display="flex"
      justifyContent="center"
      alignItems="center"
      variant="unstyled"
      backgroundColor="neutral.light.8"
      borderRadius="0.375rem"
      borderWidth="0.5px"
      borderColor="neutral.light.7"
      overflow="hidden"
      boxSize={7}
      padding="0.16rem"
      {...props}
    >
      {name && !src && (
        <IconSvg
          boxSize="full"
          name={name}
          overflow="hidden"
          {...iconSvgProps}
        ></IconSvg>
      )}
      {!name && src && (
        <IconSvg
          boxSize="full"
          src={src}
          overflow="hidden"
          {...iconSvgProps}
        ></IconSvg>
      )}
    </Button>
  )
}

export default WalletItem
