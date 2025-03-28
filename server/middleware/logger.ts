// server/middleware/logger.ts
import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const { req } = event.node
  const { url, method } = req
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress // 获取真实 IP
  const userAgent = req.headers['user-agent']
  const timestamp = new Date().toISOString()

  const logMessage = `[${timestamp}] ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`

  // eslint-disable-next-line no-console
  console.log(logMessage)
  event.context.startTime = Date.now()
})
