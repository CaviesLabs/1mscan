import { Text } from "@chakra-ui/react"
import CodeIDVerificationForm from "ui/codeIdVerification/CodeIDVerificationForm"
import ContractVerificationSkeleton from "ui/contractVerification/ContractVerificationSkeleton"
import DataListDisplay from "ui/shared/DataListDisplay"
import PageTitle from "ui/shared/Page/PageTitle"

const CodeIDVerification = () => {
  return (
    <>
      <PageTitle
        title="Verify & publish code ID source code"
        hasDefaultBackLink
      />
      <DataListDisplay
        mt={8}
        placeholder={
          <ContractVerificationSkeleton></ContractVerificationSkeleton>
        }
        gap={6}
      >
        <Text textStyle="875" color="neutral.light.6" width="full">
          Source code verification provides transparency for users interacting
          with smart contracts{" "}
          <Text as="span" color="neutral.light.7" textStyle="87500">
            which is instantiated from Code ID source code
          </Text>
          . By uploading link GitHub source code, 1Mscan will match the compiled
          code with that on the blockchain. Just like contracts, a smart
          contract should provide end users with more information on what they
          are "digitally signing" for and give users an opportunity to audit the
          code to independently verify that it actually does what it is supposed
          to do.
        </Text>
        <CodeIDVerificationForm />
      </DataListDisplay>
    </>
  )
}

export default CodeIDVerification
