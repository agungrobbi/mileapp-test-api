export const env = {
  PORT: Number(process.env.PORT) || 3000,
  SECRET_KEY: process.env.SECRET_KEY || 'mileapp-secret-key-2024',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000',
}
