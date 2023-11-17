export function getWeekDifference(currentDate: Date, baseDate: Date): number {
  const time1 = currentDate.getTime()
  const time2 = baseDate.getTime()
  const day = baseDate.getUTCDay()
  const refTime = (7 - day) * 24 * 60 * 60 * 1000 + time2
  const timeDiff = Math.abs(Math.abs(refTime - time1))
  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000
  const weekDiff = Math.ceil(timeDiff / oneWeekInMillis)
  return -weekDiff
}
