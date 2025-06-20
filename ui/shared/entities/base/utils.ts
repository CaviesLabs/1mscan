export type IconSize = "md" | "lg"

export function getIconProps(size: IconSize | string = "md") {
  switch (size) {
    case "md": {
      return {
        boxSize: "20px", // for tables, lists and regular content
      }
    }
    case "lg": {
      return {
        boxSize: "30px", // for headings
      }
    }
    default: {
      return {
        boxSize: size as any,
      }
    }
  }
}

export const TEXT_PROPS = [
  "as",
  "noOfLines",
  "fontWeight",
  "boxSize",
  "fontStyle",
  "letterSpacing",
  "textDecoration",
  "textTransform",
  "lineHeight",
  "textAlign",
  "verticalAlign",
  "wordBreak",
  "textStyle",
  "color",
  "backgroundColor",
  "bg",
  "bgColor",
  "background",
  "border",
  "borderColor",
  "borderWidth",
  "borderStyle",
  "whiteSpace",
  "fontSize",
]

export function convertBoxSize(boxSize: string | number) {
  // If boxSize is already a number, no conversion is needed
  if (typeof boxSize === "number") {
    return boxSize * 16
  }

  if (typeof boxSize === "string") {
    // Remove 'rem', convert to a number, and multiply by root size (16px)
    if (boxSize.endsWith("rem"))
      return Number.parseFloat(boxSize.replace("rem", "")) * 16

    // Remove 'px' and convert to a number
    if (boxSize.endsWith("px"))
      return Number.parseFloat(boxSize.replace("px", ""))

    if (boxSize === "sm") return 14
    if (boxSize === "lg") return 18
  }

  // If boxSize is not 'px' or 'rem', default to 0
  return 16
}

/**
 * Checks if an image can be loaded from the given URL within a specified timeout.
 *
 * @param url - The URL of the image to check.
 * @param timeout - Optional. The maximum time (in milliseconds) to wait for the image to load. Defaults to 10000 ms.
 * @returns A promise that resolves with the URL if the image loads successfully, or rejects with an error if it fails to load or times out.
 */
export const checkImage = (url: any, timeout?: number) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = (error) => reject(error)
    setTimeout(
      () => reject(new Error(`Timeout: Load image ${url}`)),
      timeout ?? 10000,
    )
    img.src = url
  })
}

/**
 * Checks if a video can be loaded from the given URL within a specified timeout.
 *
 * @param url - The URL of the video to check.
 * @param timeout - Optional. The maximum time (in milliseconds) to wait for the video to load. Defaults to 10000 ms.
 * @returns A promise that resolves with the URL if the video loads successfully, or rejects with an error if it fails to load or times out.
 */
export const checkVideo = (url: any, timeout?: number) => {
  return new Promise<string>((resolve, reject) => {
    const video = document.createElement("video")
    video.onloadeddata = () => resolve(url)
    video.onerror = (error) => reject(error)
    setTimeout(
      () => reject(new Error(`Timeout: Load video ${url}`)),
      timeout ?? 10000,
    )
    video.src = url
  })
}

/**
 * Checks if an HTML document can be loaded from the given URL within a specified timeout.
 *
 * @param url - The URL of the HTML document to check.
 * @param timeout - Optional. The maximum time in milliseconds to wait for the document to load. Defaults to 10000 ms.
 * @returns A promise that resolves with the URL if the document loads successfully, or rejects with an error if it fails to load or times out.
 */
export const checkHTML = (url: string, timeout = 10000): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.referrerPolicy = "no-referrer"
    iframe.allowFullscreen = false
    iframe.allow = ""

    const timer = setTimeout(() => {
      reject(new Error(`Timeout: Load HTML ${url}`))
      iframe.remove()
    }, timeout)

    iframe.onload = () => {
      clearTimeout(timer)
      resolve(url)
      iframe.remove()
    }

    iframe.onerror = () => {
      clearTimeout(timer)
      reject(new Error(`Cannot load URL: ${url}`))
      iframe.remove()
    }

    document.body.appendChild(iframe)
    iframe.src = url
  })
}
