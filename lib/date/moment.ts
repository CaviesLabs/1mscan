import { getLang, getLanguage } from "languages/useLanguage"
import moment, { type Moment } from "moment"
import "moment-timezone"

declare module "moment" {
  interface Moment {
    fromPast(this: Moment, past: Moment): string
    format(
      formatStr: keyof LongDateFormatSpec | "short",
      fallback?: string,
    ): string
  }
}

export const DATE_FORMAT = "llll"

// Convert milliseconds to date
export const millisecondsToDays = (value: any) => {
  const ms = Number(value)
  if (Number.isNaN(ms)) return ""
  return ms / (1000 * 60 * 60 * 24)
}

// Update locale with your custom relativeTimeConfig
moment.updateLocale(getLang(), {
  longDateFormat: {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A",
    llll: "MMM DD YYYY HH:mm:ss (Z UTC)", // Custom format
  },
  relativeTime: {
    future: "in %s",
    past: `%s ${getLanguage("utils.ago")}`,
    s: `%d ${getLanguage("utils.secs")}`,
    ss: `%d ${getLanguage("utils.secs")}`,
    m: `%d ${getLanguage("utils.min")}`,
    mm: `%d ${getLanguage("utils.mins")}`,
    h: `%d ${getLanguage("utils.hr")}`,
    hh: `%d ${getLanguage("utils.hrs")}`,
    dd: `%d ${getLanguage("utils.days")}`,
  },
  invalidDate: "-",
})

moment.locale(getLang())

const originalFromNow = moment.prototype.fromNow as Moment["fromNow"]

// Save the original format function
const originalFormat = moment.prototype.format

// Override the format function of moment
moment.prototype.format = function (formatStr: string, fallback = ""): string {
  if (!this.isValid()) return fallback
  if (!(this.year() >= 1970)) return fallback

  // Check for the custom format "short"
  if (formatStr === "short") {
    const formattedDate = originalFormat.call(this, "MMM Do YYYY, HH:mm") // Format date with ordinal numbers
    const utcOffset = this.utcOffset() / 60 // Get the UTC offset in hours
    const timezoneStr = `(UTC ${utcOffset >= 0 ? "+" : ""}${utcOffset})` // Format the UTC offset
    return `${formattedDate} ${timezoneStr}` // Combine the formatted date and UTC offset
  }

  // Use the original format function for other formats
  return originalFormat.call(this, formatStr)
}

moment.prototype.fromPast = function (
  this: moment.Moment,
  past: moment.Moment,
) {
  const duration = moment.duration(this.diff(past))
  const seconds = duration.asSeconds()
  const minutes = duration.asMinutes()
  const hours = duration.asHours()
  const days = duration.asDays()

  if (seconds < 60) {
    return seconds < 2
      ? `1 ${getLanguage("utils.sec")}`
      : `${Math.floor(seconds)} ${getLanguage("utils.secs")}`
  } else if (minutes < 60) {
    return minutes < 2
      ? `1 ${getLanguage("utils.min")}`
      : `${Math.floor(minutes)} ${getLanguage("utils.mins")}`
  } else if (hours < 48) {
    return hours < 2
      ? `1 ${getLanguage("utils.hr")}`
      : `${Math.floor(hours)} ${getLanguage("utils.hrs")}`
  } else {
    return `${Math.floor(days)} ${getLanguage("utils.days")}`
  }
}

moment.prototype.fromNow = function (
  this: moment.Moment,
  ...args: Parameters<typeof originalFromNow>
) {
  if (this.locale() !== getLang()) return originalFromNow.apply(this, args)

  const now = moment()

  return `${now.fromPast(this)} ${getLanguage("utils.ago")}`
}

/**
 * Get client side timezone.
 *
 * @returns {(+|-)HH:mm} - Where `HH` is 2 digits hours and `mm` 2 digits minutes.
 * @example
 * // From Indian/Reunion with UTC+4
 * // '+04:00'
 * getTimeZone()
 */
export const getTimeZone = () => {
  const timezoneOffset = new Date().getTimezoneOffset()
  const offset = Math.abs(timezoneOffset)
  const offsetOperator = timezoneOffset < 0 ? "+" : "-"
  const offsetHours = Math.floor(offset / 60)
    .toString()
    .padStart(2, "0")
  const offsetMinutes = Math.floor(offset % 60)
    .toString()
    .padStart(2, "0")

  return `${offsetOperator}${offsetHours}:${offsetMinutes}`
}

export default moment
