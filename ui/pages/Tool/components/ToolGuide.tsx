import { Code } from "@chakra-ui/react"
import { type ForwardedRef, memo } from "react"
import ProfileModal, { type ProfileContentState } from "ui/profile/ProfileModal"

type Props = {
  ref?: ForwardedRef<ProfileContentState>
  title: string
  message: string
}

const ToolGuide = ({ ref, message, title }: Props) => {
  return (
    <ProfileModal
      title={title}
      ref={ref}
      hasCloseButton
      cancelTitle="I got it"
      cancelProps={{
        variant: "outline",
      }}
    >
      <Code
        textStyle="1"
        whiteSpace="pre-line"
        color="neutral.light.6"
        backgroundColor="neutral.light.1"
        // padding={2}
        rounded={2}
      >
        {message}
      </Code>
    </ProfileModal>
  )
}

export default memo(ToolGuide, (prev, next) => {
  return prev.ref === next.ref
})
