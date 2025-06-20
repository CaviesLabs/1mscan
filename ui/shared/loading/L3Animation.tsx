import { Box } from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"

// Define the keyframes
const progressAnimation = keyframes`
  100% {
    background-size: 100% 100%;
  }
`

// Define the animation
const progressAnimationStyle = `${progressAnimation} 6s ease-out infinite`

function L3Animation() {
  return (
    <Box
      css={{
        background: `repeating-linear-gradient(135deg,rgba(213, 142, 142, 0) 0 8.4px,rgba(213,142,142,0.75) 0 16.8px) left/0%   100% no-repeat,
         repeating-linear-gradient(135deg,rgba(213,142,142,0.2) 0 8.4px,rgba(213,142,142,0.1) 0 16.8px) left/100% 100%;`,
      }}
      width="100%"
      height="0.5rem"
      opacity="0.8"
      borderRadius="0.5rem"
      backgroundPosition="left"
      backgroundRepeat="no-repeat, repeat"
      backgroundSize="0% 100%, 100% 100%"
      animation={progressAnimationStyle}
    />
  )
}

export default L3Animation
