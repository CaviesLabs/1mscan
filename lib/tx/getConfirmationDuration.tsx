import { Text } from "@chakra-ui/react"
import { getLanguage } from "languages/useLanguage"

export default function getConfirmationString(durations: Array<number>) {
  if (durations.length === 0) {
    return ""
  }

  const [lower, upper] = durations.map((time) => time / 1_000)

  if (!upper) {
    return (
      <Text color="neutral.light.6" textStyle="1" display="flex">
        {getLanguage(
          "transaction_details_page.evm_details.details_tab_content.confirmed_within",
        )}{" "}
        <Text color="neutral.light.7" ml={2}>
          {lower.toLocaleString()} {getLanguage("utils.secs")}
        </Text>
      </Text>
    )
  }

  if (lower === 0) {
    return (
      <Text color="neutral.light.6" textStyle="1" display="flex">
        {getLanguage(
          "transaction_details_page.evm_details.details_tab_content.confirmed_within",
        )}{" "}
        ≤{" "}
        <Text color="neutral.light.7" ml={2}>
          {lower.toLocaleString()} {getLanguage("utils.secs")}
        </Text>
      </Text>
    )
  }

  return (
    <Text color="neutral.light.6" textStyle="1" display="flex">
      {getLanguage(
        "transaction_details_page.evm_details.details_tab_content.confirmed_within",
      )}{" "}
      <Text color="neutral.light.7" ml={2}>
        {lower.toLocaleString()} - ${upper.toLocaleString()}{" "}
        {getLanguage("utils.secs")}
      </Text>
    </Text>
  )
}
