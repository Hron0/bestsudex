import { type NextRequest, NextResponse } from "next/server"
import logger from "@/lib/logger"

export function loggingMiddleware(request: NextRequest) {
    const start = Date.now()

    // Log incoming request
    logger.info("Incoming Request", {
        method: request.method,
        url: request.url,
        userAgent: request.headers.get("user-agent"),
        timestamp: new Date().toISOString(),
    })

    // Continue with the request
    const response = NextResponse.next()

    // Log response (this will be called after the request is processed)
    const duration = Date.now() - start
    logger.info("Request Completed", {
        method: request.method,
        url: request.url,
        status: response.status,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
    })

    return response
}
