export async function validateSchema(req, res, next, schema) {
	const validation = schema.validate(req.body)
	if (validation.error)
		return res.status(422).send(error.details.map(({ message }) => message))
	next()
}
