import { type MimeType, fileTypeFromStream } from "file-type"

export async function detectURLType(url: string) {
  try {
    const response = await fetch(url)
    const headerMimeType = response.headers.get("content-type")
    if (headerMimeType) return headerMimeType

    const fileType = await fileTypeFromStream(response.body!)
    return fileType?.mime
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export const IMAGE_MIME_TYPES = [
  "image",
  "image/svg+xml",

  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/flif",
  "image/tiff",
  "image/bmp",
  "image/icns",
  "image/vnd.ms-photo",
  "image/vnd.adobe.photoshop",
  "image/bpg",
  "image/j2c",
  "image/jp2",
  "image/jpx",
  "image/jpm",
  "image/mj2",
  "image/heif",
  "image/heif-sequence",
  "image/heic",
  "image/heic-sequence",
  "image/ktx",
  "image/apng",
  "image/avif",
  "image/jxl",
  "image/jls",
  "image/vnd.dwg",
] as MimeType[]

export const VIDEO_MIME_TYPES = [
  "video",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/vnd.avi",
  "video/mpeg",
  "video/3gpp",
  "video/ogg",
  "video/mp2t",
  "video/3gpp2",
  "video/MP1S",
  "video/MP2P",
] as MimeType[]

export const HTML_MIME_TYPES = ["html", "text/html", "application/xhtml+xml"]

export const IMAGE_MIME_SET = new Set(IMAGE_MIME_TYPES)
export const VIDEO_MIME_SET = new Set(VIDEO_MIME_TYPES)
export const HTML_MIME_SET = new Set(HTML_MIME_TYPES)

export const getNFTMineType = (mime: any) => {
  if (IMAGE_MIME_SET.has(mime)) return "image"
  if (VIDEO_MIME_SET.has(mime)) return "video"
  // const part = mime.split("/");
  // const firstPart = part[0];

  // if (firstPart === "image") return "image";
  // if (firstPart === "video") return "video";

  if (HTML_MIME_SET.has(mime)) return "html"
  return undefined
}
