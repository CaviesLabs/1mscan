import DOMPurify from "dompurify"
import { checkIsURL } from "utils/validate"
import { checkImage, checkVideo } from "../entities/base/utils"
export const sanitizeNFT = (src: string | null | undefined) => {
  if (!src) return
  return DOMPurify.sanitize(src)
}

export const checkNFTType = async (url: string | undefined) => {
  if (!url) return undefined
  if (!checkIsURL(url)) return undefined
  if (await checkImage(url).catch(() => undefined)) {
    return "image"
  }

  if (await checkVideo(url).catch(() => undefined)) {
    return "video"
  }

  if (
    await fetch(url, {
      method: "HEAD",
    })
      .then((res) => {
        return res.headers.get("content-type")?.includes("text/html")
      })
      .catch((error) => {
        console.log(error)
        return
      })
  ) {
    return "html"
  }
  return undefined
}
