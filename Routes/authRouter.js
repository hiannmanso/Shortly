import express from 'express'
import {
	signInGET,
	signInPOST,
	signUpPOST,
} from '../Controllers/authControllers.js'
import { validAuth } from '../Middlewares/validAuth.js'

const authRouter = express.Router()

authRouter.post('/signup', validAuth, signUpPOST)
authRouter.post('/signin', signInPOST)
authRouter.get('/signup', signInGET)

export default authRouter
