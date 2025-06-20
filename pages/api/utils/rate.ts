// Rate limiting variables
const requestCounts = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT = 500
const RATE_LIMIT_WINDOW_MS = 1 * 60 * 1000 // 1 minute

// Rate limit function
export const checkRateLimit = (ip: string) => {
  const now = Date.now()
  const requestInfo = requestCounts.get(ip) || { count: 0, timestamp: now }

  if (now - requestInfo.timestamp > RATE_LIMIT_WINDOW_MS) {
    // Reset count if the window has passed
    requestCounts.set(ip, { count: 1, timestamp: now })
    return false
  } else if (requestInfo.count < RATE_LIMIT) {
    // Increment count if still within limit
    requestInfo.count += 1
    requestCounts.set(ip, requestInfo)
    return false
  }

  // Rate limit exceeded
  return true
}
