import joi from 'joi'

export async function validAuth(req, res, next) {
	const { name, email, password, confirmPassword } = req.body
	if (password !== confirmPassword)
		return res.status(422).send('write correctly to password confirmation')
	const infosToValidate = { name, email, password }
	const accountSchema = joi.object({
		name: joi
			.string()
			.min(3)
			.pattern(/^[a-zA-ZãÃÇ-Üá-ú ]*$/)
			.required(),
		email: joi.string().email().required(),
		password: joi.string().min(5).required(),
	})
	const validation = accountSchema.validate(infosToValidate)
	if (validation.error) return res.status(422).send(validation.error)

	next()
}
