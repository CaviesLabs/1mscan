import { type ReactNode, createContext, useContext } from "react"

type Props = {
  children: ReactNode
  isFreeze: boolean
}

type TabFreezeContextType = {
  isFreeze: boolean
}

export const TabFreezeContext = createContext<TabFreezeContextType | undefined>(
  undefined,
)

const TabFreezeContextProvider = ({ children, isFreeze }: Props) => {
  return (
    <TabFreezeContext.Provider value={{ isFreeze }}>
      {children}
    </TabFreezeContext.Provider>
  )
}

export const useTabFreezeContext = () => {
  const context = useContext(TabFreezeContext)
  if (!context) return undefined
  return context
}

export default TabFreezeContextProvider
