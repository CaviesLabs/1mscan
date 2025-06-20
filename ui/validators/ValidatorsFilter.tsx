import { getLanguage } from "languages/useLanguage"
import { setQuery } from "lib/router/setQuery"
import { memo } from "react"
import Filter from "ui/shared/filters/Filter"

type Props = {
  status: any
}

const ValidatorsFilter = ({ status }: Props) => {
  return (
    <Filter
      title={getLanguage("validators_page.validators.label")}
      items={[
        {
          id: "active",
          title: getLanguage("validators_page.validators.active_option"),
        },
        {
          id: "inactive",
          title: getLanguage("validators_page.validators.inactive_option"),
        },
        {
          id: "jailed",
          title: getLanguage("validators_page.validators.jailed_option"),
        },
      ]}
      defaultValue="active"
      value={status}
      type="radio"
      hasArrow={true}
      onChange={(value) => {
        setQuery("status", value)
      }}
    ></Filter>
  )
}

export default memo(ValidatorsFilter, (prev, next) => {
  return prev.status === next.status
})
