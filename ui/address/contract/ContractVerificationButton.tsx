import { Button, Skeleton } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"
import { setRouter } from "lib/router/setQuery"
import { memo } from "react"

type Props = {
  addressHash: string
  isLoading: boolean | undefined
}

const ContractVerificationButton = ({ addressHash, isLoading }: Props) => {
  return (
    <Skeleton borderRadius="base" flexShrink={0} isLoaded={!isLoading}>
      <Button
        paddingX={2}
        paddingY="0.375rem"
        borderRadius="0.5rem"
        flexShrink={0}
        variant="solid"
        onClick={() => {
          setRouter(
            "/address/[hash]/contract-verification",
            { hash: addressHash || "" },
            { cleanQuery: true },
          )
        }}
        fontSize="0.875rem"
        lineHeight="1.25rem"
        fontWeight={400}
        height="unset"
      >
        {getLanguage("address.verify_&_publish")}
      </Button>
    </Skeleton>
  )
}

export default memo(ContractVerificationButton, (prev, next) => {
  return (
    prev.isLoading === next.isLoading && prev.addressHash === next.addressHash
  )
})
