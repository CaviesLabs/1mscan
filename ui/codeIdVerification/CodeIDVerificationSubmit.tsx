import { Button, Text } from "@chakra-ui/react"
import { memo } from "react"
import { useFormContext } from "react-hook-form"
import type { IForm } from "./utils"

type Props = {
  //
}

const CodeIDVerificationSubmit = ({}: Props) => {
  const {
    formState: { isSubmitting },
  } = useFormContext<IForm>()
  return (
    <Button
      variant="solid"
      size="lg"
      isLoading={isSubmitting}
      loadingText="Verify & publish"
      alignSelf={{ base: "stretch", lg: "flex-start" }}
    >
      <Text variant="light1">Verify & publish</Text>
    </Button>
  )
}

export default memo(CodeIDVerificationSubmit)
