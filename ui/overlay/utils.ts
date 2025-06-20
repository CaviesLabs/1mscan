import { close, open } from "lib/redux/reducers/overlay"
import { useAppDispatch, useAppSelector } from "lib/redux/store"
import { useCallback, useId } from "react"

export const useOverlay = () => {
  const id = useId()
  const dispath = useAppDispatch()
  const isOpen = useAppSelector((state) => state.overlay.currentId === id)
  return {
    onOpen: useCallback(() => {
      dispath(open({ id }))
    }, [id]),
    onClose: useCallback(() => {
      dispath(close())
    }, [id]),
    isOpen,
  }
}
