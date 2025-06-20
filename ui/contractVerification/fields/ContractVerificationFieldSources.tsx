import { Flex, Text, chakra } from "@chakra-ui/react"
import type React from "react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"

import type { FormFields } from "../types"

import FileInput from "ui/shared/forms/FileInput"

import ContractVerificationFormRow from "../ContractVerificationFormRow"
import { descriptionStyle } from "../styles"

type FileTypes = ".sol" | ".yul" | ".json" | ".vy"

interface Props {
  name?: "sources" | "interfaces"
  fileTypes: Array<FileTypes>
  multiple?: boolean
  title: string
  hint: string | React.ReactNode
}

const ContractVerificationFieldSources = ({
  fileTypes,
  multiple,
  title,
  hint,
  name = "sources",
}: Props) => {
  const { control, register } = useFormContext<FormFields>()

  return (
    <ContractVerificationFormRow
      firstChildren={
        <Controller
          name={name}
          control={control}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
            formState: { isSubmitting },
          }) => {
            const { remove } = useFieldArray({
              control: control,
              name: name as any,
            })

            return (
              <FileInput
                {...register(name)}
                name={name}
                accept={fileTypes.join(",")}
                multiple={multiple}
                files={value as any}
                onChange={onChange}
                onDelete={(index) => {
                  if (multiple) {
                    remove(index)
                  } else {
                    onChange([])
                  }
                }}
                placeholder={
                  <Flex
                    flex={1}
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text
                      fontWeight={400}
                      color="neutral.light.7"
                      fontSize="1rem"
                      lineHeight="1.5rem"
                    >
                      Drop file{multiple ? "s" : ""} or{" "}
                      <chakra.span color="accent.blue">browse here</chakra.span>
                    </Text>
                    <Text {...descriptionStyle}>{title}</Text>
                  </Flex>
                }
                isDisabled={isSubmitting}
                error={error}
                onBlur={onBlur}
              >
                {({ isDragOver }) => <>{isDragOver}</>}
              </FileInput>
            )
          }}
        />
      }
      secondChildren={hint && <Text {...descriptionStyle}>{hint}</Text>}
    ></ContractVerificationFormRow>
  )
}

export default ContractVerificationFieldSources
