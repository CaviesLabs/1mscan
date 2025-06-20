import { Box } from "@chakra-ui/react"
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock"
import useIsMobile from "lib/hooks/useIsMobile"
import { memo, useEffect } from "react"

type Props = {
  // isOpen: boolean;
  disabledBodyScrollOn?: {
    mobile?: boolean
    desktop?: boolean
  }
  overlayOn?: {
    mobile?: boolean
    desktop?: boolean
  }
}

const PopoverFlexiableTrigger = ({
  disabledBodyScrollOn,
  overlayOn,
}: Props) => {
  const isMobile = useIsMobile()
  useEffect(() => {
    if (disabledBodyScrollOn?.mobile && isMobile) {
      disableBodyScroll(document.body)
    }
    if (disabledBodyScrollOn?.desktop && !isMobile) {
      disableBodyScroll(document.body)
    }
  }, [isMobile, disabledBodyScrollOn?.desktop, disabledBodyScrollOn?.mobile])

  useEffect(() => {
    return () => clearAllBodyScrollLocks()
  }, [])

  return (
    <Box
      position="fixed"
      zIndex={998}
      backgroundColor="rgba(0, 0, 0, 0.5)"
      inset={0}
      display={{
        base: overlayOn?.mobile ? "block" : "none",
        lg: overlayOn?.desktop ? "block" : "none",
      }}
    />
  )
}

export type PopoverFlexiableTriggerProps = Omit<Props, "isOpen">

export default memo(PopoverFlexiableTrigger, (pre, next) => {
  return (
    pre.disabledBodyScrollOn?.mobile === next.disabledBodyScrollOn?.mobile &&
    pre.disabledBodyScrollOn?.desktop === next.disabledBodyScrollOn?.desktop &&
    pre.overlayOn?.mobile === next.overlayOn?.mobile &&
    pre.overlayOn?.desktop === next.overlayOn?.desktop
  )
})
