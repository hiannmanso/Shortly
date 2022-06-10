import db from '../database.js'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export async function signUpPOST(req, res) {
	const { name, email, password } = req.body
	const encryptedPassword = bcrypt.hashSync(password, 10)
	const query = `INSERT INTO users (name,email,password) VALUES($1,$2,$3)`
	try {
		await db.query(query, [name, email, encryptedPassword])
		res.sendStatus(201)
	} catch (error) {
		console.log(error)
		res.status(422).send(error)
	}
}
export async function signInPOST(req, res) {
	const { email, password } = req.body
	const token = v4()
	try {
		const query = `SELECT * FROM users WHERE email = $1`
		const user = await db.query(query, [email])
		console.log(user)
		if (
			user.rowCount == 0 ||
			!bcrypt.compareSync(password, user.rows[0].password)
		) {
			return res.sendStatus(401)
		}

		const newSession = `INSERT INTO sessions ("userID",token) VALUES ($1,$2)`
		await db.query(newSession, [user.rows[0].id, token])

		res.status(200).send(token)
	} catch (error) {
		console.log(error)
		res.status(422).send(error)
	}
}
