import _ from "lodash"
import { route } from "nextjs-routes"
import { memo } from "react"
import type { TokenType } from "types/api/token"
import LinkInternal from "ui/shared/LinkInternal"

type Props = {
  id?: string | number | undefined | null
  isLoading?: boolean
  association: {
    self: "Pointer" | "Original"
    associationType: "Pointer" | "Original"
    associationAddress: string
    associationTokenType: TokenType
  }
}

const SwitchToAssociation = ({ association, isLoading, id }: Props) => {
  const associationTokenType = association.associationTokenType
  return (
    <LinkInternal
      isLoading={isLoading}
      textStyle="1"
      textDecoration="underline"
      color="secondary.01.text"
      href={route({
        pathname: "/token/[...slug]",
        query: {
          slug: _.chain([association.associationAddress])
            .tap((slug) => {
              if (id) {
                slug.push("instance", String(id || ""))
              }
            })
            .value(),
        },
      })}
    >{`Switch to ${association.associationType} ${
      (
        associationTokenType === "NATIVE" &&
          associationTokenType.capitalizeFirstLetter()
      ) ||
      (associationTokenType === "ICS-20" && "IBC") ||
      associationTokenType
    }`}</LinkInternal>
  )
}

export default memo(SwitchToAssociation, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.association === next.association &&
    prev.id === next.id
  )
})
