import { Link, chakra } from "@chakra-ui/react"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import useApiQuery from "lib/api/useApiQuery"

import SelectInputFloating from "ui/shared/forms/SelectInputFloating"
import ContractVerificationFormRow from "../ContractVerificationFormRow"

interface Props {
  isVyper?: Readonly<boolean>
}

const ContractVerificationFieldEvmVersion = ({ isVyper }: Props) => {
  const { control } = useFormContext<FormFields>()

  const { data: config } = useApiQuery("contract_verification_config")

  return (
    <ContractVerificationFormRow
      firstChildren={
        <Controller
          name="evm_version"
          control={control}
          render={({
            field: { value: evmVersion, onChange, ref, onBlur, ...fieldProps },
            fieldState: { error },
            formState: { isSubmitting },
          }) => {
            const items = React.useMemo(
              () =>
                (isVyper
                  ? config?.vyper_evm_versions
                  : config?.solidity_evm_versions
                )?.map((option) => ({ label: option, value: option })) || [],
              [config],
            )
            return (
              <SelectInputFloating
                {...fieldProps}
                name="evm_version"
                value={evmVersion || ""}
                onChange={onChange}
                isRequired
                placeholder="EVM Version"
                error={error}
                ref={ref}
                items={items}
                onBlur={onBlur}
                isDisabled={isSubmitting}
              ></SelectInputFloating>
            )
          }}
        />
      }
      secondChildren={
        <chakra.div
          color="neutral.light.6"
          fontSize="0.875rem"
          fontWeight={400}
          lineHeight="1.25rem"
        >
          <span>
            The EVM version the contract is written for. If the bytecode does
            not match the version, we try to verify using the latest EVM
            version.{" "}
          </span>
          <Link
            href={
              isVyper
                ? "https://docs.vyperlang.org/en/stable/compiling-a-contract.html#target-options"
                : "https://docs.soliditylang.org/en/latest/using-the-compiler.html#target-options"
            }
            target="_blank"
          >
            EVM version details
          </Link>
        </chakra.div>
      }
    ></ContractVerificationFormRow>
  )
}

export default ContractVerificationFieldEvmVersion
