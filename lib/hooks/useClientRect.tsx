import _debounce from "lodash/debounce"
import type { LegacyRef } from "react"
import React from "react"

export default function useClientRect<E extends Element>(): [
  DOMRect | null,
  LegacyRef<E> | undefined,
] {
  const [rect, setRect] = React.useState<DOMRect | null>(null)
  const nodeRef = React.useRef<E>(undefined)

  const ref = React.useCallback((node: E) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
    nodeRef.current = node
  }, [])

  React.useEffect(() => {
    const content = window.document.querySelector("main")
    if (!content) {
      return
    }

    const resizeHandler = _debounce(() => {
      setRect(nodeRef.current?.getBoundingClientRect() ?? null)
    }, 100)

    const resizeObserver = new ResizeObserver(resizeHandler)
    resizeObserver.observe(content)
    resizeObserver.observe(window.document.body)

    return function cleanup() {
      resizeObserver.unobserve(content)
      resizeObserver.unobserve(window.document.body)
    }
  }, [])

  return [rect, ref]
}
