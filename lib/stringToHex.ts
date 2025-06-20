export default function stringToHex(str: string) {
  let hex = ""
  for (let i = 0; i < str.length; i++) {
    hex += str.toLowerCase().charCodeAt(i).toString(16)
  }
  return `0x${hex.slice(hex.length - 10, hex.length - 1)}`
}
