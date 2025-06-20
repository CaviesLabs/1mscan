import type React from "react"
import { createContext, useState } from "react"

type Props = {
  children: React.ReactNode
  isLoading: boolean | undefined
}

type Context = {
  openingHash: string | undefined
  setOpeningHash: (hash: string | undefined) => void
  isLoading: boolean | undefined
}
export const TrxAssociationContext = createContext<Partial<Context>>({
  openingHash: undefined,
}) as React.Context<Context>

const TrxAssociationProvider = ({ children, isLoading }: Props) => {
  const [openingHash, setOpeningHash] = useState<string | undefined>(undefined)

  return (
    <TrxAssociationContext.Provider
      value={{ openingHash, setOpeningHash, isLoading }}
    >
      {children}
    </TrxAssociationContext.Provider>
  )
}

export default TrxAssociationProvider
