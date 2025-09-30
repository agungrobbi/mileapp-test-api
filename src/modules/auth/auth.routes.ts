import express from 'express'

import authController from './auth.controller'

export const authRoutes = express.Router()

authRoutes.post('/login', authController.loginController)
