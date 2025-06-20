import { Box } from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"

// Define the keyframes
const l2Animation = keyframes`
  0%, 100% {
    transform: translate(0%);
    box-shadow: 0 0 #D5C86EFF, 0 0 #DF4ABDFF;
  }
  40% {
    transform: translate(500%);
    box-shadow: -15px 0 #F53948FF, -30px 0 #E3AAD6;
  }
  50% {
    transform: translate(500%);
    box-shadow: 0 0 #5C90F7FF, 0 0 #E3AAD6;
  }
  90% {
    transform: translate(0%);
    box-shadow: 15px 0 #2574F2FF, 30px 0 #2DDD88FF;
  }
`

// Define the animation
const l2AnimationStyle = `${l2Animation} 1.5s infinite`

function L2Animation() {
  return (
    <Box
      width="1rem"
      height="1rem"
      borderRadius="50%"
      bg="#F10C49"
      opacity="0.8"
      animation={l2AnimationStyle}
    />
  )
}

export default L2Animation
