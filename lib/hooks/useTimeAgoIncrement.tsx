import { useEffect, useMemo, useState, useTransition } from "react"

import { getLanguage } from "languages/useLanguage"
import { DAY, HOUR, MINUTE, SECOND } from "lib/consts"
import moment from "lib/date/moment"

const getIntervals = (diff: string) => {
  if (
    diff.includes(getLanguage("utils.sec")) ||
    diff.includes(getLanguage("utils.secs"))
  )
    return SECOND
  if (
    diff.includes(getLanguage("utils.min")) ||
    diff.includes(getLanguage("utils.mins"))
  )
    return MINUTE
  if (
    diff.includes(getLanguage("utils.hr")) ||
    diff.includes(getLanguage("utils.hrs"))
  )
    return HOUR
  if (diff.includes(getLanguage("utils.days"))) return DAY
  return null
}

const getValue = (ts: moment.MomentInput) => {
  const mm = moment(ts)
  if (mm.isValid()) return mm
  return null
}

export default function useTimeAgoIncrement(
  ts: moment.MomentInput | undefined | null,
  isEnabled?: boolean,
) {
  const mm = useMemo(() => getValue(ts), [ts])
  const [value, setValue] = useState(mm?.fromNow() || "")
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (!mm) return
    if (!value) return
    if (!isEnabled) return
    const intervalTime = getIntervals(value)
    if (!intervalTime) return
    const interval = setInterval(() => {
      startTransition(() => setValue(mm.fromNow()))
    }, intervalTime)
    return () => clearInterval(interval)
  }, [isEnabled, mm])

  return value
}
