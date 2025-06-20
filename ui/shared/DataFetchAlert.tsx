import { Alert, AlertDescription, type AlertProps } from "@chakra-ui/react"
import { memo } from "react"

const DataFetchAlert = (props: AlertProps) => {
  return (
    <Alert
      variant="verifyContract"
      colorScheme="red"
      width="fit-content"
      {...props}
    >
      <AlertDescription>
        Something went wrong. Try refreshing the page or come back later.
      </AlertDescription>
    </Alert>
  )
}

export default memo(DataFetchAlert, () => true)
