import { Link, Text } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import TextareaFloating from "ui/shared/forms/TextareaFloating"
import ContractVerificationFormRow from "../ContractVerificationFormRow"
import { descriptionStyle } from "../styles"

interface Props {
  isVyper?: Readonly<boolean>
}

const ContractVerificationFieldCode = ({ isVyper }: Props) => {
  const { control, register } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormRow
      firstChildren={
        <Controller
          name="code"
          control={control}
          rules={{ required: true }}
          render={({
            field: { value: code, onChange, onBlur },
            fieldState: { error },
            formState: { isSubmitting },
          }) => {
            return (
              <TextareaFloating
                {...register("code")}
                value={code}
                name="code"
                onBlur={onBlur}
                placeholder="Contract code"
                onChange={onChange}
                error={error}
                isRequired
                isDisabled={isSubmitting}
              ></TextareaFloating>
            )
          }}
        />
      }
      secondChildren={
        !isVyper && (
          <Text {...descriptionStyle}>
            <span>
              We recommend using flattened code. This is necessary if your code
              utilizes a library or inherits dependencies. Use the{" "}
            </span>
            <Link
              href="https://github.com/poanetwork/solidity-flattener"
              target="_blank"
            >
              POA solidity flattener
            </Link>
            <span> or the </span>
            <Link
              href="https://www.npmjs.com/package/truffle-flattener"
              target="_blank"
            >
              Truffle flattener
            </Link>
          </Text>
        )
      }
    ></ContractVerificationFormRow>
  )
}

export default ContractVerificationFieldCode
