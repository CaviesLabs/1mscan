import { type RefObject, memo, useEffect } from "react"
import { useInView } from "react-intersection-observer"

type Props = {
  focusRef?: RefObject<HTMLDivElement | null>
  hasNextPage: boolean | undefined
  fetchNextPage?: () => void
}

const InfinityScrollTrigger = ({
  focusRef,
  hasNextPage,
  fetchNextPage,
}: Props) => {
  const { ref } = useInView({
    triggerOnce: true,
    initialInView: false,
    delay: 200,
    threshold: 0,
    skip: !hasNextPage,
    onChange(inView) {
      if (inView) {
        fetchNextPage?.()
      }
    },
  })

  useEffect(() => {
    if (focusRef?.current) {
      ref(focusRef?.current)
    }
  }, [focusRef?.current])

  return <></>
}

export default memo(InfinityScrollTrigger, (prev, next) => {
  return (
    prev.focusRef?.current === next.focusRef?.current &&
    prev.hasNextPage === next.hasNextPage &&
    prev.fetchNextPage === next.fetchNextPage
  )
})
