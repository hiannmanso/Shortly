import express from 'express'
import { signInPOST, signUpPOST } from '../Controllers/authControllers.js'
import { validateSchema } from '../Middlewares/validateSchema.js'
import signInSchema from '../schemas/signInSchemaa.js/signinSchema.js'
import signUpSchema from '../schemas/signupSchema/signUpSchema.js'

const authRouter = express.Router()

authRouter.post(
	'/signup',
	(req, res, next) => validateSchema(req, res, next, signUpSchema),
	signUpPOST
)
authRouter.post(
	'/signin',
	(req, res, next) => validateSchema(req, res, next, signInSchema),
	signInPOST
)

export default authRouter
