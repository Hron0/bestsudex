import { app } from "@/backend/server"
import { handle } from "hono/vercel"

// Hono
export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
