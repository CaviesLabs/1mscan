import type moment from "moment"

export const blockNumberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

export function computeCountdownValues(duration: moment.Duration) {
  // Extract individual time components from the duration
  const days = duration.asDays()
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  // const milliseconds = duration.milliseconds();

  console.log(
    "days: " + days,
    "hours: " + hours,
    "minutes: " + minutes,
    "seconds: " + seconds,
  )

  const absoluteHours = duration.asHours()
  const absoluteMinutes = duration.asMinutes()
  const absoluteSeconds = duration.asSeconds()

  const dozensHours = absoluteHours % 24
  console.log("dozensHours", dozensHours)
  const unitsHours = dozensHours % 10
  const dozensMinutes = absoluteMinutes % 60
  const unitsMinutes = dozensMinutes % 10
  const dozensSeconds = absoluteSeconds % 60
  const unitsSeconds = dozensSeconds % 10

  // Compute total times in different units (as integers)
  const totalSeconds = Math.floor(absoluteSeconds)
  const totalMinutes = Math.floor(absoluteMinutes)
  const totalHours = Math.floor(absoluteHours)

  // Compute counts for animation iterations
  const countSec1 = Math.ceil(totalSeconds / 10) // Number of times the units place of seconds will change
  const countSec10 = Math.ceil(totalSeconds / 60) // Number of times the tens place of seconds will change
  const countMin1 = Math.ceil(totalMinutes / 10) // Number of times the units place of minutes will change
  const countMin10 = Math.ceil(totalMinutes / 60) // Number of times the tens place of minutes will change
  const countHour1 = Math.ceil(totalHours / 10) // Number of times the units place of hours will change
  const countHour3 = Math.ceil(totalHours / 24) // Number of times the tens place of hours will change (for 24-hour format)

  // Compute delays for animations based on the fractional parts
  const sec1Delay = -(10 - unitsSeconds)
  const sec10Delay = -(60 - dozensSeconds)
  const min1Delay = -(60 * (10 - unitsMinutes))
  const min10Delay = -(60 * (60 - dozensMinutes))
  const hour1Delay = -(3600 * (10 - unitsHours))
  const hour3Delay = -(3600 * (24 - dozensHours))

  const titleDelaySecs = (seconds % 60) - 60
  const titleDelayMins = ((minutes % 60) - 60) * 60
  const titleDelayHours = ((hours % 24) - 24) * 3600

  console.log("hour3Delay", hour3Delay)

  return {
    days,
    countSec1,
    countSec10,
    countMin1,
    countMin10,
    countHour1,
    countHour3,
    sec1Delay,
    sec10Delay,
    min1Delay,
    min10Delay,
    hour1Delay,
    hour3Delay,
    titleDelaySecs,
    titleDelayMins,
    titleDelayHours,
    titleDurationSecs: 60,
    titleDurationMins: 3600,
    titleDurationHours: 86400,
  }
}

export const buildKeyframes = (steps: number, duration: number) => {
  const step = 100 / steps

  return [...Array(steps)]
    .map((_, index) => {
      const begin = index * step
      const end = (index + 1) * step
      const trigger = end - 30 / duration
      return `
        ${begin}% {
            transform: translateY(${begin}%);
        }
        ${trigger}% {
            transform: translateY(${begin}%);
        }
        ${end}% {
            transform: translateY(${end}%);
        }
      `
    })
    .join("\n")
}

// const hStep = (100 / 24) * 10;

const per_1_24 = 1 / 24
const hSlipPercentage = 2 / 86400

export const buildHourTensKeyframes = () => {
  // Define the percentages for each digit transition
  const percentages = [0, per_1_24 * 4, per_1_24 * 14, 1]

  // Generate the keyframes based on the percentages
  const keyframes = percentages.map((begin, index) => {
    const end = percentages[index + 1]
    const trigger = end - hSlipPercentage

    return `
      ${begin * 100}% {
        transform: translateY(${(index / 3) * 100}%);
      }
      ${trigger * 100}% {
        transform: translateY(${(index / 3) * 100}%);
      }
      ${end * 100}% {
        transform: translateY(${((index + 1) / 3) * 100}%);
      }
    `
  })

  return keyframes.join("\n")
}

export const createArray = (n: number) => {
  // Create base array from n-1 to n and n to 0 by (i + 1 + n) % n
  // const array = Array.from({ length: n }, (_, i) => (i + 1 + n) % n);
  return Array.from({ length: n }, (_, i) => i)
}

// 1s / duration * 100%
export const getSingleDigitKf = (level: 24 | 60 | undefined) => {
  if (!level) return ""
  if (level === 24) {
    const start = 1 - 1 / 24
    const pivot1 = 1 - 1 / 24 + 0.1 / 24
    const pivot2 = 1 - 0.1 / 24
    return `
  0% { opacity: 1; }
${start * 100}% { opacity: 1; }
${pivot1 * 100}% { opacity: 0; }
${pivot2 * 100}% { opacity: 0; }
  100% { opacity: 1; }    
  }
`
  }
  if (level === 60) {
    const start = 1 - 1 / 60
    const pivot1 = 1 - 1 / 60 + 0.1 / 60
    const pivot2 = 1 - 0.1 / 60

    return `
  0% { opacity: 1; }
${start * 100}% { opacity: 1; }
${pivot1 * 100}% { opacity: 0; }
${pivot2 * 100}% { opacity: 0; }
  100% { opacity: 1; }
`
  }
}
/**
 * Tính tổng thời gian (kỳ vọng) và độ lệch chuẩn tổng
 * theo giả thiết phân phối chuẩn (trung vị ≈ mean).
 *
 * @param median  Trung vị của thời gian 1 lần (≈ mean khi phân phối chuẩn)
 * @param stdDev  Độ lệch chuẩn của thời gian 1 lần
 * @param n       Số lần/quãng cần cộng dồn
 * @returns       { totalMean, totalStdDev }
 */
export function calculateTotalTimeStd(
  median: number,
  stdDev: number,
  n: number,
) {
  if (n < 1) {
    throw new Error("n phải >= 1")
  }

  const totalMean = n * median // n * median
  const totalStdDev = Math.sqrt(n) * stdDev // sqrt(n) * stdDev

  // ----------- Sử dụng -----------

  // Nếu cần khoảng tin cậy 95% (xấp xỉ) thì:
  const z95 = 1.96
  const ciLower = totalMean - z95 * totalStdDev
  const ciUpper = totalMean + z95 * totalStdDev
  console.log(`Khoảng tin cậy 95%: [${ciLower}, ${ciUpper}]`)
  return (ciUpper + ciLower) / 2
}
