import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'

import { env } from '@/config/env'
import { ApiResponse } from '@src/types'
import { authRoutes } from '@src/modules/auth/auth.routes'
import { ApiError } from '@src/lib/apiResponse'
import { errorHandler } from '@src/middleware/error.middleware'

const app = express()

// Helmet setup
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
)
app.disable('x-powered-by')

// CORS setup
const allowedOrigins = env.CORS_ORIGINS.split(',')
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      callback(new ApiError(StatusCodes.FORBIDDEN, 'Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    exposedHeaders: ['Set-Cookie', 'X-CSRF-Token'],
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

// Routes
app.use('/api/auth', authRoutes)

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date(),
      uptime: process.uptime(),
    },
  })
})

app.use((req: Request, res: Response) => {
  new ApiError(StatusCodes.NOT_FOUND, 'Endpoint not found')
})

// Additional security headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'same-origin')
  next()
})

// Error handling middleware
app.use(errorHandler)

// App listen for development
app.listen(env.PORT, () => {
  if (env.NODE_ENV === 'development') {
    console.log(`\nMock API server is running!`)
    console.log(`URL: http://localhost:${env.PORT}`)
    console.log(`Environment: ${env.NODE_ENV}`)
    console.log(`Test Credentials:`)
    console.log(`   Email: admin@gmail.com`)
    console.log(`   Password: password\n`)
  }
})
