import { chakra } from "@chakra-ui/react"
import { millisecondsToDays } from "lib/date/moment"
import { memo, useMemo } from "react"

type Props = {
  value: any
}

const CreditTime = ({ value }: Props) => {
  const days = useMemo(() => {
    return millisecondsToDays(value)
  }, [value])

  return (
    <chakra.span>
      {days} {typeof days === "number" && days > 1 ? "days" : "day"}
    </chakra.span>
  )
}

export default memo(CreditTime)
