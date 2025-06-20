import type { Dispatch, ReactNode, SetStateAction } from "react"
import { createContext, useEffect, useState } from "react"

type Props = {
  children?: ReactNode
  defaultIsTruncated?: boolean
  highPriorityIsTruncated?: boolean
}

export type Truncated = {
  isTruncated: boolean
  setIsTruncated: Dispatch<SetStateAction<boolean>>
}

export const TruncatedContext = createContext<Partial<Truncated>>({})

const TruncatedProvider = ({
  children,
  defaultIsTruncated,
  highPriorityIsTruncated,
}: Props) => {
  const [isTruncated, setIsTruncated] = useState(
    Boolean(defaultIsTruncated || highPriorityIsTruncated),
  )
  useEffect(() => {
    if (typeof defaultIsTruncated === "boolean") return
    if (highPriorityIsTruncated === true) {
      setIsTruncated(true)
      return
    }
    if (highPriorityIsTruncated === false) {
      setIsTruncated(false)
      return
    }
  }, [highPriorityIsTruncated])
  return (
    <TruncatedContext.Provider
      value={{
        isTruncated,
        setIsTruncated: defaultIsTruncated ? undefined : setIsTruncated,
      }}
    >
      {children}
    </TruncatedContext.Provider>
  )
}

export default TruncatedProvider
