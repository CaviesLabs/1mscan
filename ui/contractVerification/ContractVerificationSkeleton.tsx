import { Flex, Skeleton } from "@chakra-ui/react"
import { memo } from "react"
import TextInputFloating from "ui/shared/forms/TextInputFloating"
import ContractVerificationFormGroup from "./ContractVerificationFormGroup"
import ContractVerificationFormRow from "./ContractVerificationFormRow"

type Props = {
  //
}

const ContractVerificationSkeleton = ({}: Props) => {
  return (
    <Flex
      width="full"
      flexDirection="column"
      gap={6}
      alignItems="stretch"
      flex={1}
    >
      {[...Array(2)].map((_, index) => (
        <ContractVerificationFormGroup
          key={index}
          title={
            <Skeleton height={9} width={{ base: "full", lg: "30%" }}></Skeleton>
          }
        >
          <ContractVerificationFormRow
            firstChildren={
              <Skeleton width="full">
                <TextInputFloating></TextInputFloating>
              </Skeleton>
            }
          ></ContractVerificationFormRow>
        </ContractVerificationFormGroup>
      ))}
    </Flex>
  )
}

export default memo(ContractVerificationSkeleton, () => true)
