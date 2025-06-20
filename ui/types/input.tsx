import type { ChangeEvent } from "react"

export type OnChangeEvent<T = unknown, D extends HTMLElement = HTMLElement> = (
  e: Omit<ChangeEvent<D>, "target"> & {
    target?: Omit<HTMLInputElement, "value"> & { value?: T | null }
  },
) => void
