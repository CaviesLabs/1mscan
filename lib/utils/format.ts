export const ethToSeiString = (value: string | undefined) => {
  return value
    ? String(value).replaceAll(/eth|Eth|ETH|gwei|Gwei|GWEI/g, (match) => {
        switch (match) {
          case "eth":
            return "sei"
          case "Eth":
            return "Sei"
          case "ETH":
            return "SEI"
          case "gwei":
            return "nsei"
          case "Gwei":
            return "Nsei"
          case "GWEI":
            return "NSEI"
          default:
            return match
        }
      })
    : ""
}
export const ethToSeiObject = <T extends object>(value: T) => {
  return JSON.parse(ethToSeiString(JSON.stringify(value))!) as T
}

export const parseTxMethod = (method: string) => {
  if (!method) return ""
  return method
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(".")
}
