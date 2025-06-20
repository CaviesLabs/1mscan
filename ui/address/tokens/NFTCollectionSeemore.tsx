import { Center } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import LinkInternal from "ui/shared/LinkInternal"

type Props = {
  href: string
}

const NFTCollectionSeemore = ({ href }: Props) => {
  return (
    <Center
      as={LinkInternal}
      id="see-more"
      display="none"
      flexDirection="column"
      gap={1}
      width="full"
      borderRadius="0.75"
      aspectRatio={1}
      backgroundColor="neutral.light.1"
      color="neutral.light.6"
      textStyle="875"
      borderWidth="1px"
      borderColor="neutral.light.4"
      cursor="pointer"
      href={href}
      _hover={{
        textDecoration: "none",
      }}
    >
      <IconSvg name="plus" boxSize={6} color="inherit" />
      <span>{getLanguage("address.see_more")}</span>
    </Center>
  )
}

export default memo(NFTCollectionSeemore, (prev, next) => {
  return prev.href === next.href
})
