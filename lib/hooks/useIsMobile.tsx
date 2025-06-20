import { useBreakpointValue } from "@chakra-ui/react"

export default function useIsMobile(ssr = true) {
  return useBreakpointValue({ base: true, lg: false }, { ssr })
}

export function useIsLg(ssr = true) {
  return useBreakpointValue({ lg: true }, { ssr })
}

export function useIs2Lg(ssr = true) {
  return useBreakpointValue({ "2lg": true }, { ssr })
}

export function useIsXl(ssr = true) {
  return useBreakpointValue({ xl: true }, { ssr })
}
