import express from 'express'
import { signInPOST, signUpPOST } from '../Controllers/authControllers.js'
import { validAuth } from '../Middlewares/validAuth.js'

const authRouter = express.Router()

authRouter.post('/signup', validAuth, signUpPOST)
authRouter.post('/signin', signInPOST)

export default authRouter
