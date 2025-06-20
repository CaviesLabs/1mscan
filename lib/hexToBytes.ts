export default function hexToBytes(hex: string) {
  const bytes: number[] = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(Number.parseInt(hex.substring(c, c + 2), 16))
  }
  return bytes
}
