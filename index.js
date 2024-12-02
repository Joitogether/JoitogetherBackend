import express from 'express'
import 'dotenv/config'
import { errorMiddleware } from './src/middlewares/errorMiddleware.js'
import activityRouter from './src/routes/activityRoutes.js'
// import { fbApp } from './src/config/firebase.js';
import userRouter from './src/routes/userRoutes.js'
import applicationRouter from './src/routes/applicationRoutes.js'
import cors from 'cors'


const app = express()
const port = 3030

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// routes
app.use('/activities', activityRouter)
app.use('/users', userRouter)
app.use('/applications', applicationRouter)

// error 
app.use(errorMiddleware)


// server start
app.listen(port,'0.0.0.0', () => {
  console.log(`server running on port ${port}`)
})