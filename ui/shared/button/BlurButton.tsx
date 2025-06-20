import { type ButtonProps, Tooltip, chakra } from "@chakra-ui/react"
import { forwardRef } from "react"

interface BlurButtonProps extends ButtonProps {
  isDisabled?: boolean
  disabledTooltip?: string
}

const BlurButton = forwardRef<HTMLButtonElement, BlurButtonProps>(
  (
    { isDisabled, children, onClick, color, disabledTooltip, ...props },
    ref,
  ) => {
    return (
      <Tooltip label={disabledTooltip}>
        <chakra.button
          ref={ref}
          color={color}
          onClick={onClick}
          disabled={isDisabled}
          _hover={!isDisabled ? { textDecoration: "underline" } : {}}
          _disabled={{
            filter: "blur(0.5px)",
            cursor: "not-allowed",
            opacity: 0.7,
          }}
          {...props}
        >
          {children}
        </chakra.button>
      </Tooltip>
    )
  },
)

BlurButton.displayName = "BlurButton"

export default BlurButton
