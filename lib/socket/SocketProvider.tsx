// https://hexdocs.pm/phoenix/js/
import { getEnvValueV2 } from "configs/frontend/chain/configs"
import { chainKey } from "configs/frontend/chain/utils"
import { Socket } from "phoenix"
import React, {
  memo,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export const SocketContext = React.createContext<Socket | null>(null)

interface SocketProviderProps {
  children: ReactNode
}

function SocketProvider({ children }: SocketProviderProps) {
  const [socket] = useState(
    new Socket(`${getEnvValueV2(`${chainKey}.WEBSOCKET_HOST`)}/socket/v2`),
  )

  useMemo(() => {
    socket.connect()
  }, [])

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export function useSocket() {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export default memo(SocketProvider, (prev, next) => {
  return prev.children === next.children
})
