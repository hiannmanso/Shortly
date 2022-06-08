import db from '../database.js'
import { nanoid } from 'nanoid'

export async function shortenPOST(req, res) {
	const { authorization } = req.headers
	const { url } = req.body
	const token = authorization?.replace('Bearer', '').trim()
	const shortly = nanoid(10)
	if (!token)
		return res.status(401).send(`erro em encontrar o token: ${token}`)
	try {
		const findUser = `SELECT * 
        FROM sessions 
        JOIN users ON sessions."userID" = users.id 
		WHERE token = $1`
		const user = await db.query(findUser, [token])

		const query = `INSERT INTO shortlys ("userID",url,"shortUrl") VALUES($1,$2,$3)`
		const createShorten = await db.query(query, [
			user.rows[0].id,
			url,
			shortly,
		])
		res.status(201).send({ shortUrl: shortly })
	} catch (error) {
		console.log(error)
		res.status(422).send(error)
	}
}

export async function shortenGET(req, res) {
	const { id } = req.params

	try {
		const query = `SELECT id,"shortUrl",url FROM shortlys WHERE id = $1`
		const shorten = await db.query(query, [id])
		if (shorten.rowCount == 0) return res.sendStatus(404)
		res.status(200).send(shorten.rows[0])
	} catch (error) {
		res.status(400).send(error)
	}
}

export async function shortenUrlGET(req, res) {}
