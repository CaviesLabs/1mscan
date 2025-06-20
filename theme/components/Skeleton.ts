import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { keyframes } from "@chakra-ui/system"

// Fade animation for skeleton
const fade = keyframes({
  "0%": { opacity: 0.2 },
  "50%": { opacity: 0.35 },
  "100%": { opacity: 0.2 },
})

const start = "rgba(16, 17, 18, 0.06)"
const end = "rgba(16, 17, 18, 0.09)"

const baseStyle = defineStyle(() => {
  return {
    "--skeleton-start-color": start,
    "--skeleton-end-color": end,
    speed: 1,
    opacity: 1,
    borderRadius: "md",
    backgroundColor: "var(--skeleton-start-color)",
    animation: `${fade} 1.5s infinite ease-in-out`,
  }
})

const Skeleton = defineStyleConfig({
  baseStyle,
})

export default Skeleton
