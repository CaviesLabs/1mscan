/**
 * Compresses an object using MessagePack and encodes it into a URL-safe string.
 * @param obj The object to compress.
 * @returns The compressed and URL-encoded string.
 */
export const zipObjectToUrl = (obj: Record<string, any>): string => {
  // Encode object into a Buffer
  //   const buffer = encode(obj);

  // Convert Buffer to Base64 and make it URL-safe
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

/**
 * Decodes a URL-safe string, decompresses it using MessagePack, and parses it back into an object.
 * @param urlSafeString The compressed and URL-encoded string.
 * @returns The original object.
 */
export const unzipUrlToObject = <T extends object = object>(
  urlSafeString: string,
): T => {
  // Convert URL-safe Base64 back to standard Base64
  const base64 = urlSafeString.replace(/-/g, "+").replace(/_/g, "/")

  // Decode Base64 into a Uint8Array

  return JSON.parse(atob(base64))
}
