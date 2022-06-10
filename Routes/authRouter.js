import express from 'express'
import { signInPOST, signUpPOST } from '../Controllers/authControllers.js'
import { validateSchema } from '../Middlewares/validateSchema.js'
// import signInSchema from '../Schemas/signInSchema/signInSchema.js'
// import signUpSchema from '../Schemas/signupSchema/signUpSchema.js'

const authRouter = express.Router()

authRouter.post('/signup', signUpPOST)
authRouter.post('/signin', signInPOST)

export default authRouter
