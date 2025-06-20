import { memo } from "react"

type Props = {
  error: Error
}

const AppErrorDisruption = ({ error }: Props) => {
  console.error(error)
  return <div>App Error with Disruption!</div>
}

export default memo(AppErrorDisruption, (prev, next) => {
  return prev.error === next.error
})
