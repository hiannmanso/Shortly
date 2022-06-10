import express from 'express'
import { signInPOST, signUpPOST } from '../Controllers/authControllers.js'
import { validateSchema } from '../Middlewares/validateSchema.js'
import signInSchema from '../Schemas/signInSchema/signInSchema.js'
import signUpSchema from '../Schemas/signupSchema/signUpSchema.js'

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
