import { Code, Text, chakra } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import TextInputFloating from "ui/shared/forms/TextInputFloating"
import ContractVerificationFormRow from "../ContractVerificationFormRow"
import { descriptionStyle } from "../styles"

interface Props {
  hint?: string
  isDisabled?: boolean
}

const ContractVerificationFieldName = ({ hint, isDisabled }: Props) => {
  const { control } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormRow
      firstChildren={
        <Controller
          name="contract_name"
          control={control}
          render={({
            field: { value: contractName, onChange, ...fieldProps },
            fieldState: { error },
            formState: { isSubmitting },
          }) => {
            return (
              <TextInputFloating
                {...fieldProps}
                name="contract_name"
                onChange={onChange}
                value={contractName}
                placeholder="Contract name"
                isRequired
                isDisabled={isDisabled || isSubmitting}
                error={error}
              ></TextInputFloating>
            )
          }}
        />
      }
      secondChildren={
        hint ? (
          <Text {...descriptionStyle}>{hint}</Text>
        ) : (
          <Text {...descriptionStyle}>
            <span>
              Must match the name specified in the code. For example, in{" "}
            </span>
            <Code color="text_secondary">{"contract MyContract {...}"}</Code>
            <span>
              . <chakra.span fontWeight={600}>MyContract</chakra.span> is the
              contract name.
            </span>
          </Text>
        )
      }
    ></ContractVerificationFormRow>
  )
}

export default ContractVerificationFieldName
