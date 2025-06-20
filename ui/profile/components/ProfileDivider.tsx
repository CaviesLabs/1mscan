import { Box } from "@chakra-ui/react"
import Divider from "ui/shared/Divider"

type Props = {
  //
}

const ProfileDivider = ({}: Props) => {
  return (
    <Box paddingX={{ base: 2, lg: 3 }}>
      <Divider></Divider>
    </Box>
  )
}

export default ProfileDivider
