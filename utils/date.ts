export function getWeekDifference(date1: Date, date2: Date): number {
  const time1 = date1.getTime()
  const time2 = date2.getTime()
  const day = date2.getUTCDay()
  const timeDiff = Math.abs(Math.abs(time2 - time1) + day * 24 * 60 * 60 * 1000)
  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000
  const weekDiff = Math.floor(timeDiff / oneWeekInMillis)
  return weekDiff
}
