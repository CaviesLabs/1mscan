import { Button, Flex, Skeleton } from "@chakra-ui/react"
import { useContext } from "react"
import type { Association } from "types/api/transaction"
import IconSvg from "ui/shared/IconSvg"
import { TrxAssociationContext } from "./TrxAssociationProvider"

type Props = {
  association: Association | undefined | null
  hash: string
  children: React.ReactNode
  subKey?: any
  isLoading?: boolean
}

const TrxExpander = ({
  association,
  hash,
  children,
  subKey,
  isLoading: _isLoading,
}: Props) => {
  const { openingHash, isLoading, setOpeningHash } = useContext(
    TrxAssociationContext,
  )

  if (isLoading || _isLoading || !association) return children

  const currentlyOpen = openingHash === `${hash}${subKey ? "_" + subKey : ""}`
  return (
    <Flex columnGap={2} overflow="hidden">
      <Skeleton
        boxSize={5}
        flexShrink={0}
        isLoaded={!isLoading || !association}
      >
        {association && (
          <Button variant="unstyled" boxSize={5}>
            <IconSvg
              name="arrows/east-solid"
              boxSize={5}
              onClick={() => {
                if (currentlyOpen) {
                  setOpeningHash(undefined)
                  return
                }
                setOpeningHash(`${hash}${subKey ? "_" + subKey : ""}`)
              }}
              transition="transform 0.15s linear"
              color="neutral.light.6"
              transform={!currentlyOpen ? "rotate(-90deg)" : undefined}
            ></IconSvg>
          </Button>
        )}
      </Skeleton>
      {children}
    </Flex>
  )
}

export default TrxExpander
