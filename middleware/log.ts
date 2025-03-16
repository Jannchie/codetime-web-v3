import { defineNuxtRouteMiddleware, useRequestEvent } from '#app'
import { useLogger } from '@nuxt/kit'
export default defineNuxtRouteMiddleware((to, from) => {
  const logger = useLogger()
  console.log('?')
  // 确定代码在服务器端执行
  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event) {
      return
    }
    // 获取 HTTP 方法
    const method: string | undefined = event.node.req.method

    // 获取用户代理和客户端 IP
    const userAgent: string = event.node.req.headers['user-agent'] || 'Unknown'
    const userIP: string = Array.isArray(event.node.req.headers['x-forwarded-for'])
      ? event.node.req.headers['x-forwarded-for'][0]
      : event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress || 'Unknown'

    // 可选：获取用户信息（假设有会话管理）
    // const userId: string = event.context.session?.user?.id || 'Anonymous';

    // 生成日志信息
    const log = {
      timestamp: new Date().toISOString(),
      method,
      path: to.fullPath,
      from: from.fullPath,
      query: to.query,
      hash: to.hash,
      userAgent,
      userIP,
      // userId, // 根据具体会话管理获取用户信息
    }

    logger.info(log)
    // 此处可将日志发送到日志服务或写入文件
  }
})
