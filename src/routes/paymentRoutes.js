import express from 'express'
import * as paymentController from '../controllers/paymentController.js'

const router = express.Router()

router.post('/encrypt', paymentController.paymentEncrytOrder)

export default router