import type { Context, ReactNode } from "react"
import React, { createContext, useContext } from "react"

type Props = {
  isLoading?: boolean
  children?: ReactNode
}

type TokenInstanceMetadataContextProps = { isLoading?: boolean }

export const TokenInstanceMetadataContext = createContext<
  Partial<TokenInstanceMetadataContextProps>
>({})
const TokenInstanceMetadataProvider = ({ isLoading, children }: Props) => {
  return (
    <TokenInstanceMetadataContext.Provider value={{ isLoading }}>
      {children}
    </TokenInstanceMetadataContext.Provider>
  )
}

export const useTokenInstanceMetadataContext = () =>
  useContext(
    TokenInstanceMetadataContext as Context<
      Partial<TokenInstanceMetadataContextProps>
    >,
  )
export default TokenInstanceMetadataProvider
