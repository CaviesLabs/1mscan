import { HStack } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { route } from "nextjs-routes"
import { memo } from "react"
import LinkInternal from "ui/shared/LinkInternal"

type Props = {
  disabled?: boolean | null
}

const LinkToAssociation = ({ disabled }: Props) => {
  return (
    <HStack isTruncated gap="1ch">
      <span>
        {getLanguage("address.not_associated_yet_link_now")}
        {disabled ? "" : ","}
      </span>
      {!disabled && (
        <LinkInternal
          href={route({
            pathname: "/tool/associate",
          })}
        >
          {getLanguage("address.link_now")}
        </LinkInternal>
      )}
    </HStack>
  )
}

export default memo(LinkToAssociation, (prev, next) => {
  return prev.disabled === next.disabled
})
