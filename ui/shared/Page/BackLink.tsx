import { chainKey } from "configs/frontend/chain/utils"
import { customThrottle } from "lib/hooks/useShallow"
import type { RootState } from "lib/redux/store"
import { useAppSelector } from "lib/redux/store"
import Router from "next/router"
import { memo } from "react"
import IconSvg from "../IconSvg"

const onClickBack = customThrottle((e, previousPathname: string) => {
  e?.preventDefault()

  const url = new URL(window.location.origin + previousPathname)
  url.searchParams.set("chain", chainKey)

  Router.replace(url.toString(), undefined, { scroll: false, shallow: true })
}, 1000)

type Props = {
  isLoading?: boolean
}

const BackLink = ({ isLoading }: Props) => {
  const stack = useAppSelector((state: RootState) => state.navigation.stack)
  const previousPathname = stack[stack.length - 2]
  if (!previousPathname) return null
  return (
    <IconSvg
      aria-invalid={!previousPathname}
      isLoading={isLoading}
      name="arrows/east-left"
      boxSize={9}
      color="neutral.light.6"
      cursor="pointer"
      onClick={(e) => {
        onClickBack(e, previousPathname)
      }}
      _invalid={{
        display: "none",
      }}
    />
  )
}

export default memo(BackLink, (prev, next) => {
  return prev.isLoading === next.isLoading
})
