export const getBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes("chrome")) {
    return "chrome"
  } else if (userAgent.includes("firefox")) {
    return "firefox"
  }
  return null
}
