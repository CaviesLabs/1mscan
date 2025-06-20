import { Flex, chakra } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import type { ChangeEvent } from "react"
import React from "react"

import type { SmartContractMethodOutput } from "types/api/contract"

import config from "configs/app"
import { WEI } from "lib/consts"
import AddressEntityV2 from "ui/shared/entities/address/AddressEntityV2"
import CheckboxForm from "ui/shared/forms/CheckboxForm"

function castValueToString(
  value: number | string | boolean | object | bigint | undefined,
): string {
  switch (typeof value) {
    case "string":
      return value
    case "boolean":
      return String(value)
    case "undefined":
      return ""
    case "number":
      return value.toLocaleString(undefined, { useGrouping: false })
    case "bigint":
      return value.toString()
    case "object":
      return JSON.stringify(value, undefined, 2)
  }
}

interface Props {
  data: SmartContractMethodOutput
}

const ContractMethodStatic = ({ data }: Props) => {
  const [value, setValue] = React.useState<string>(
    castValueToString(data.value),
  )
  const [label, setLabel] = React.useState("SEI")

  const handleCheckboxChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const initialValue = castValueToString(data.value)

      if (event.target.checked) {
        setValue(BigNumber(initialValue).div(WEI).toFixed())
        setLabel(config.chain.currency.symbol || "SEI")
      } else {
        setValue(BigNumber(initialValue).toFixed())
        setLabel("USEI")
      }
    },
    [data.value],
  )

  const content = (() => {
    if (
      typeof data.value === "string" &&
      data.type === "address" &&
      data.value
    ) {
      return (
        <AddressEntityV2
          truncation="tail"
          address={{ hash: data.value }}
          noIcon
        />
      )
    }

    return (
      <chakra.span wordBreak="break-all" whiteSpace="pre-wrap">
        ({data.type}): {String(value)}
      </chakra.span>
    )
  })()

  return (
    <Flex flexDir={{ base: "column", lg: "row" }} columnGap={4} rowGap={2}>
      {content}
      {(data.type.includes("int256") || data.type.includes("int128")) && (
        <CheckboxForm
          controlProps={{ width: "unset" }}
          onChange={handleCheckboxChange}
          isChecked={label === "SEI"}
        >
          {label}
        </CheckboxForm>
      )}
    </Flex>
  )
}

export default ContractMethodStatic
