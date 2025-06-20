// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = process.env.RE_CAPTCHA_SECRET_KEY || ""

export async function handleCheckCloudflareSession(captchaToken: string) {
  try {
    // Validate the token by calling the
    const formData = new FormData()
    formData.append("secret", SECRET_KEY)
    formData.append("response", captchaToken)

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    })

    const outcome = await result.json()
    return !!outcome.success
  } catch {
    return false
  }
}
