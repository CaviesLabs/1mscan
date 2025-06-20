import { Button, Flex, chakra, useToast } from "@chakra-ui/react"
import React from "react"
import type { SubmitHandler } from "react-hook-form"
import { FormProvider, useForm } from "react-hook-form"

import type { CsvExportParams } from "types/client/address"
import { type FormFields, schema } from "./types"

import buildUrl from "lib/api/buildUrl"
import moment from "lib/date/moment"
import downloadBlob from "lib/downloadBlob"

// import CsvExportFormReCaptcha from "./CsvExportFormReCaptcha";
import { zodResolver } from "@hookform/resolvers/zod"
import type { IResourceName } from "lib/api/resources"
import { ReCaptcha } from "ui/shared/ReCatpcha"
import CsvExportFormField from "./CsvExportFormField"

interface Props {
  hash: string
  resource: IResourceName
  filterType?: CsvExportParams["filterType"] | null
  filterValue?: CsvExportParams["filterValue"] | null
  fileNameTemplate: string
  exportType: CsvExportParams["type"] | undefined
}

const CsvExportForm = ({
  hash,
  resource,
  filterType,
  filterValue,
  fileNameTemplate,
  exportType,
}: Props) => {
  const formApi = useForm<FormFields>({
    mode: "onBlur",
    defaultValues: {
      from: moment().subtract(1, "day").format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
    },
    resolver: zodResolver(schema),
  })
  const { handleSubmit, formState } = formApi

  const toast = useToast()

  const [captchaToken, setCaptchaToken] = React.useState("")

  const onFormSubmit: SubmitHandler<FormFields> = React.useCallback(
    async (data) => {
      try {
        const url = buildUrl(resource, { hash } as never, {
          address_id: hash,
          from_period: exportType !== "holders" ? data.from : null,
          to_period: exportType !== "holders" ? data.to : null,
          filter_type: filterType,
          filter_value: filterValue,
          recaptcha_response: data.reCaptcha,
        })

        const response = await fetch(url, {
          headers: {
            "content-type": "application/octet-stream",
          },
        })

        if (!response.ok) {
          throw new Error()
        }

        const blob = await response.blob()
        const fileName =
          exportType === "holders"
            ? `${fileNameTemplate}_${hash}.csv`
            : `${fileNameTemplate}_${hash}_${data.from}_${data.to}${filterType && filterValue ? "_with_filter_type_" + filterType + "_value_" + filterValue : ""}.csv`
        downloadBlob(blob, fileName)
      } catch (error) {
        toast({
          position: "top-right",
          title: "Error",
          description:
            (error as Error)?.message ||
            "Something went wrong. Try again later.",
          status: "error",
          variant: "subtle",
          isClosable: true,
        })
      }
    },
    [
      resource,
      hash,
      exportType,
      filterType,
      filterValue,
      fileNameTemplate,
      toast,
    ],
  )

  return (
    <FormProvider {...formApi}>
      <chakra.form
        paddingY={4}
        noValidate
        onSubmit={handleSubmit(onFormSubmit)}
        display="flex"
        flexDirection="column"
        gap={6}
        alignItems="flex-start"
      >
        <Flex
          columnGap={4}
          rowGap={6}
          flexDir={{ base: "column", lg: "row" }}
          alignItems={{ base: "stretch", lg: "flex-start" }}
          flexWrap="wrap"
          width="full"
        >
          <CsvExportFormField name="from" />
          <CsvExportFormField name="to" />
        </Flex>

        <ReCaptcha
          onCaptcha={(token) => {
            setCaptchaToken(token)
          }}
        />
        <Button
          variant="solid"
          size="md"
          type="submit"
          isLoading={formState.isSubmitting}
          loadingText="Download"
          isDisabled={!formState.isValid || !captchaToken}
        >
          Download
        </Button>
      </chakra.form>
    </FormProvider>
  )
}

export default React.memo(CsvExportForm)
