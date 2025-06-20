import { Button, Skeleton, chakra } from "@chakra-ui/react"
import config from "configs/app"
import { getLanguage } from "languages/useLanguage"
import { useRouter } from "next/router"
import { route } from "nextjs-routes"
import React from "react"
import type { CsvExportParams } from "types/client/address"
import IconSvg from "ui/shared/IconSvg"

interface Props {
  address: string
  params: CsvExportParams
  className?: string
  isLoading?: boolean
}

const AddressCsvExportLink = ({
  className,
  address,
  params,
  isLoading,
}: Props) => {
  if (!config.features.csvExport.isEnabled) {
    return null
  }

  const router = useRouter()

  return (
    <Skeleton isLoaded={!isLoading}>
      <Button
        className={className}
        variant="tertiary"
        alignItems="center"
        height="2.25rem"
        display="flex"
        flexShrink={0}
        onClick={() => {
          router.push(
            route({
              pathname: "/csv-export",
              query: { ...params, address },
            }) as any,
          )
        }}
        color="neutral.light.7"
        fontSize="0.875rem"
        fontWeight={400}
        lineHeight="1.25rem"
        gap={2}
      >
        <span>{getLanguage("address.export_csv")}</span>
        <IconSvg
          name="download"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize={4}
        />
      </Button>
    </Skeleton>
  )
}

export default React.memo(chakra(AddressCsvExportLink))
