import { Box } from "@chakra-ui/react"
import { memo } from "react"
import TxEntityV2 from "ui/shared/entities/tx/TxEntityV2"

type Props = {
  hash?: string
}

const TxSubHeading = ({ hash }: Props) => {
  return (
    <Box
      display={{ base: "block", lg: "flex" }}
      alignItems="center"
      width="full"
      gap={2}
    >
      <TxEntityV2
        hash={hash}
        noLink
        hasIcon
        color="neutral.light.7"
        textStyle="1"
        iconProps={{ color: "secondary.02.text", boxSize: 5 }}
      />
    </Box>
  )
}

export default memo(TxSubHeading, (prev, next) => {
  return prev.hash === next.hash
})
