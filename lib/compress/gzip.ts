import pako from "pako"
/**
 * Decompress a gzip-compressed string using pako.
 * @param encodedString - The encoded string (either in hex or base64 format).
 * @param encoding - The encoding type of the input string ('hex' or 'base64'). Defaults to 'hex'.
 * @returns The decompressed string data.
 */
export function decompressGzip(
  encodedString: string,
  encoding: "hex" | "base64" = "hex",
): string {
  let byteArray: Uint8Array

  // Convert the encoded string into a Uint8Array based on the encoding type
  if (encoding === "hex") {
    byteArray = Uint8Array.from(
      encodedString
        .match(/.{1,2}/g)
        ?.map((byte) => Number.parseInt(byte, 16)) || [],
    )
  } else if (encoding === "base64") {
    const binaryString = window.atob(encodedString)
    byteArray = Uint8Array.from(
      [...binaryString].map((char) => char.charCodeAt(0)),
    )
  } else {
    throw new Error("Unsupported encoding. Only hex or base64 are allowed.")
  }

  // Decompress the data using pako
  const decompressedData = pako.inflate(byteArray, { to: "string" })

  return decompressedData
}

export const compressGzip = (
  data: string,
  encoding: "hex" | "base64" = "hex",
): string => {
  const compressedData = pako.gzip(data)

  // Convert the compressed data into a hex or base64 string
  let compressedString: string
  if (encoding === "hex") {
    compressedString = Array.from(new Uint8Array(compressedData))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  } else if (encoding === "base64") {
    compressedString = window.btoa(
      String.fromCharCode(...new Uint8Array(compressedData)),
    )
  } else {
    throw new Error("Unsupported encoding. Only hex or base64 are allowed.")
  }

  return compressedString
}
