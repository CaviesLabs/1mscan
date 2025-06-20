import { type ReactNode, createContext, useContext } from "react"
import type { IStore, TabItem } from "./types"

const BaseContext = createContext<{
  tabs: TabItem<object, any>[]
  store: IStore
  isLoading: any
}>(null as any)

type Props = {
  store: IStore
  tabs: TabItem<object, any>[]
  isLoading: any
  children: ReactNode
}

const BaseProvider = ({ store, tabs, isLoading, children }: Props) => {
  return (
    <BaseContext.Provider
      value={{
        store,
        tabs,
        isLoading,
      }}
    >
      {children}
    </BaseContext.Provider>
  )
}

export const useBaseContext = () => {
  return useContext(BaseContext)
}

export default BaseProvider
