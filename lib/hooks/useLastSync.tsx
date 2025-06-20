import moment, { getTimeZone } from "lib/date/moment"
import { useMemo } from "react"

export const useLastSync = (dataUpdatedAt: any, watchList?: any[]) => {
  return useMemo(() => {
    const currentTimeZone = getTimeZone()
    const mm = moment(dataUpdatedAt)
    if (!mm.isValid()) return false
    return mm.format(`DD/MM/YYYY HH:mm:ss [UTC${currentTimeZone}]`)
  }, watchList || [])
}
