import { Flex, Text, chakra } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import ContractVerificationFormGroup from "ui/contractVerification/ContractVerificationFormGroup"
import ContractVerificationFormRow from "ui/contractVerification/ContractVerificationFormRow"
import CodeIDVerificationInput from "./CodeIDVerificationInput"
import { default as CodeIDVerificationSelect } from "./CodeIDVerificationSelect"
import CodeIDVerificationSubmit from "./CodeIDVerificationSubmit"
import type { IForm } from "./utils"
import { schema } from "./utils"

type Props = {
  codeId?: string
}

const initForm = (raw: Partial<IForm>) => {
  return {
    codeId: raw.codeId || undefined,
  }
}

const CodeIDVerificationForm = ({ codeId }: Props) => {
  const formApi = useForm<IForm>({
    defaultValues: initForm({ codeId }),
    resolver: zodResolver(schema),
  })
  const { reset } = formApi

  useEffect(() => {
    reset(initForm({ codeId }))
  }, [codeId])
  return (
    <FormProvider {...formApi}>
      <chakra.form
        noValidate
        onSubmit={() => {}}
        display="flex"
        width="full"
        gap={6}
        flexDirection="column"
        alignItems="flex-start"
      >
        <Flex
          width="full"
          flexDirection="column"
          gap={6}
          alignItems="stretch"
          flex={1}
        >
          <ContractVerificationFormGroup title="Code ID to verify">
            <ContractVerificationFormRow
              isMerge
              firstChildren={
                <CodeIDVerificationInput
                  name="codeId"
                  placeholder="Code ID"
                  isDisabled={Boolean(codeId)}
                  isReadOnly={codeId !== undefined && codeId !== ""}
                ></CodeIDVerificationInput>
              }
            ></ContractVerificationFormRow>
          </ContractVerificationFormGroup>
          <ContractVerificationFormGroup title="Compiled wasm file name">
            <ContractVerificationFormRow
              isMerge
              firstChildren={
                <CodeIDVerificationInput
                  name="fileName"
                  placeholder="xxx.wasm"
                ></CodeIDVerificationInput>
              }
            ></ContractVerificationFormRow>
          </ContractVerificationFormGroup>
          <ContractVerificationFormGroup title="Link GitHub source tode">
            <ContractVerificationFormRow
              firstChildren={
                <CodeIDVerificationInput
                  name="github"
                  placeholder="placeholder"
                  isRequired
                ></CodeIDVerificationInput>
              }
              secondChildren={
                <Flex
                  flexDirection="column"
                  flex={1}
                  textStyle="875"
                  color="neutral.light.6"
                >
                  <Text>
                    Enter the Github URL at the right commit version of source
                    code you would like to verify
                  </Text>
                  <Text>E.g: http://github.com/***/commit/***</Text>
                </Flex>
              }
            ></ContractVerificationFormRow>
          </ContractVerificationFormGroup>

          <ContractVerificationFormGroup title="Compiler version">
            <ContractVerificationFormRow
              isMerge
              firstChildren={
                <CodeIDVerificationSelect
                  placeholder="Verification method (complier type)"
                  items={[
                    {
                      value: "placeholder",
                      label: "placeholder",
                    },
                  ]}
                  name="compiler"
                  isRequired
                ></CodeIDVerificationSelect>
              }
            ></ContractVerificationFormRow>
          </ContractVerificationFormGroup>
        </Flex>

        <CodeIDVerificationSubmit />
      </chakra.form>
    </FormProvider>
  )
}

export default CodeIDVerificationForm
