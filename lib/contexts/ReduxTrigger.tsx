import { onPathnameChange } from "lib/redux/reducers/navigation"
import { useAppDispatch } from "lib/redux/store"
import { useRouter } from "next/router"
import { memo, useEffect } from "react"

type Props = {}

const ReduxTrigger = ({}: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch(onPathnameChange())
  }, [window.location.pathname, router.pathname])

  return <></>
}

export default memo(ReduxTrigger, () => true)
