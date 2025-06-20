import { store } from "lib/redux/store"
import type React from "react"
import { memo } from "react"
import { Provider } from "react-redux"

type Props = {
  children: React.ReactNode
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}

export default memo(ReduxProvider, (prev, next) => {
  return prev.children === next.children
})
