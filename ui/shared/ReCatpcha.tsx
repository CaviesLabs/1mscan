import { getEnvValue } from "configs/hydration/utils"
import Turnstile, { type TurnstileProps } from "react-turnstile"

type Props = {
  onCaptcha?(token: string): void
  onCaptchaVerified?(isValid: boolean): void
  autoVerify?: boolean
} & Omit<TurnstileProps, "sitekey">

export const ReCaptcha = ({
  onCaptcha,
  onCaptchaVerified,
  autoVerify = true,
  ...props
}: Props) => {
  const handleVerifyCaptcha = (token: string) => {
    fetch("/api/captcha-session", {
      method: "POST",
      body: JSON.stringify({ captchaToken: token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isValid) {
          onCaptchaVerified?.(true)
        } else {
          onCaptchaVerified?.(false)
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <>
      <Turnstile
        size="compact"
        appearance="always"
        execution="render"
        sitekey={getEnvValue("NEXT_PUBLIC_RE_CAPTCHA_APP_SITE_KEY") || ""}
        onVerify={(token) => {
          console.log("Captcha verified")
          onCaptcha?.(token)
          if (autoVerify) {
            handleVerifyCaptcha(token)
          }
        }}
        {...props}
      />
    </>
  )
}
